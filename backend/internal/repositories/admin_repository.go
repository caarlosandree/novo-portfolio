package repositories

import (
	"context"
	"fmt"

	"portfolio-backend/internal/models"

	"github.com/jackc/pgx/v5/pgxpool"
)

type AdminRepository interface {
	UpdateTranslation(ctx context.Context, language, key, value string) error
	GetAllExperiences(ctx context.Context) ([]models.ExperienciaProfissional, error)
	GetExperienceByID(ctx context.Context, id int) (*models.ExperienciaProfissional, error)
	CreateExperience(ctx context.Context, exp models.CreateExperienciaRequest) (int, error)
	UpdateExperience(ctx context.Context, id int, exp models.UpdateExperienciaRequest) error
	DeleteExperience(ctx context.Context, id int) error
	GetNextExperienceIndex(ctx context.Context) (int, error)
	GetExperienceTranslations(ctx context.Context, expIndex int, languages []string) (map[string]models.UpdateExperienciaRequest, error)
}

type adminRepository struct {
	db *pgxpool.Pool
}

func NewAdminRepository(db *pgxpool.Pool) AdminRepository {
	return &adminRepository{db: db}
}

func (r *adminRepository) UpdateTranslation(ctx context.Context, language, key, value string) error {
	query := `
		INSERT INTO translations (language, key_path, value, updated_at)
		VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
		ON CONFLICT (language, key_path)
		DO UPDATE SET value = $3, updated_at = CURRENT_TIMESTAMP
	`

	_, err := r.db.Exec(ctx, query, language, key, value)
	if err != nil {
		return fmt.Errorf("erro ao atualizar tradução: %w", err)
	}

	return nil
}

func (r *adminRepository) GetAllExperiences(ctx context.Context) ([]models.ExperienciaProfissional, error) {
	query := `
		SELECT 
			e.id,
			e.cargo,
			e.empresa,
			e.localizacao,
			e.periodo,
			e.ordem,
			COALESCE(
				(SELECT array_agg(descricao ORDER BY ordem)
				 FROM atividades
				 WHERE experiencia_id = e.id),
				'{}'
			) as atividades
		FROM experiencias e
		ORDER BY e.ordem ASC, e.id ASC
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar experiências: %w", err)
	}
	defer rows.Close()

	var experiences []models.ExperienciaProfissional
	for rows.Next() {
		var exp models.ExperienciaProfissional
		if err := rows.Scan(&exp.ID, &exp.Cargo, &exp.Empresa, &exp.Localizacao, &exp.Periodo, &exp.Ordem, &exp.Atividades); err != nil {
			return nil, fmt.Errorf("erro ao escanear experiência: %w", err)
		}
		experiences = append(experiences, exp)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("erro ao iterar experiências: %w", err)
	}

	return experiences, nil
}

func (r *adminRepository) GetExperienceByID(ctx context.Context, id int) (*models.ExperienciaProfissional, error) {
	query := `
		SELECT 
			e.id,
			e.cargo,
			e.empresa,
			e.localizacao,
			e.periodo,
			e.ordem,
			COALESCE(
				(SELECT array_agg(descricao ORDER BY ordem)
				 FROM atividades
				 WHERE experiencia_id = e.id),
				'{}'
			) as atividades
		FROM experiencias e
		WHERE e.id = $1
	`

	var exp models.ExperienciaProfissional
	err := r.db.QueryRow(ctx, query, id).Scan(
		&exp.ID, &exp.Cargo, &exp.Empresa, &exp.Localizacao, &exp.Periodo, &exp.Ordem, &exp.Atividades,
	)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar experiência: %w", err)
	}

	return &exp, nil
}

func (r *adminRepository) CreateExperience(ctx context.Context, exp models.CreateExperienciaRequest) (int, error) {
	tx, err := r.db.Begin(ctx)
	if err != nil {
		return 0, fmt.Errorf("erro ao iniciar transação: %w", err)
	}
	defer tx.Rollback(ctx)

	// Insere a experiência
	var experienciaID int
	err = tx.QueryRow(ctx, `
		INSERT INTO experiencias (cargo, empresa, localizacao, periodo, ordem)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id
	`, exp.Cargo, exp.Empresa, exp.Localizacao, exp.Periodo, exp.Ordem).Scan(&experienciaID)
	if err != nil {
		return 0, fmt.Errorf("erro ao criar experiência: %w", err)
	}

	// Insere as atividades
	for i, atividade := range exp.Atividades {
		_, err = tx.Exec(ctx, `
			INSERT INTO atividades (experiencia_id, descricao, ordem)
			VALUES ($1, $2, $3)
		`, experienciaID, atividade, i)
		if err != nil {
			return 0, fmt.Errorf("erro ao criar atividade: %w", err)
		}
	}

	if err = tx.Commit(ctx); err != nil {
		return 0, fmt.Errorf("erro ao confirmar transação: %w", err)
	}

	return experienciaID, nil
}

func (r *adminRepository) UpdateExperience(ctx context.Context, id int, exp models.UpdateExperienciaRequest) error {
	tx, err := r.db.Begin(ctx)
	if err != nil {
		return fmt.Errorf("erro ao iniciar transação: %w", err)
	}
	defer tx.Rollback(ctx)

	// Atualiza a experiência
	_, err = tx.Exec(ctx, `
		UPDATE experiencias
		SET cargo = $1, empresa = $2, localizacao = $3, periodo = $4, ordem = $5, updated_at = CURRENT_TIMESTAMP
		WHERE id = $6
	`, exp.Cargo, exp.Empresa, exp.Localizacao, exp.Periodo, exp.Ordem, id)
	if err != nil {
		return fmt.Errorf("erro ao atualizar experiência: %w", err)
	}

	// Remove atividades antigas
	_, err = tx.Exec(ctx, `DELETE FROM atividades WHERE experiencia_id = $1`, id)
	if err != nil {
		return fmt.Errorf("erro ao remover atividades antigas: %w", err)
	}

	// Insere novas atividades
	for i, atividade := range exp.Atividades {
		_, err = tx.Exec(ctx, `
			INSERT INTO atividades (experiencia_id, descricao, ordem)
			VALUES ($1, $2, $3)
		`, id, atividade, i)
		if err != nil {
			return fmt.Errorf("erro ao atualizar atividade: %w", err)
		}
	}

	if err = tx.Commit(ctx); err != nil {
		return fmt.Errorf("erro ao confirmar transação: %w", err)
	}

	return nil
}

func (r *adminRepository) DeleteExperience(ctx context.Context, id int) error {
	_, err := r.db.Exec(ctx, `DELETE FROM experiencias WHERE id = $1`, id)
	if err != nil {
		return fmt.Errorf("erro ao deletar experiência: %w", err)
	}
	return nil
}

func (r *adminRepository) GetNextExperienceIndex(ctx context.Context) (int, error) {
	var maxIndex int
	// Busca todas as chaves de experiência e extrai o maior índice
	rows, err := r.db.Query(ctx, `
		SELECT key_path
		FROM translations
		WHERE key_path LIKE 'experience.experiences.exp%.cargo'
		ORDER BY key_path
	`)
	if err != nil {
		return 0, nil
	}
	defer rows.Close()

	maxIndex = -1
	for rows.Next() {
		var keyPath string
		if err := rows.Scan(&keyPath); err != nil {
			continue
		}
		// Extrai o número de exp{N}
		// key_path será algo como "experience.experiences.exp0.cargo"
		// Precisamos extrair o número após "exp"
		var index int
		if _, err := fmt.Sscanf(keyPath, "experience.experiences.exp%d.cargo", &index); err == nil {
			if index > maxIndex {
				maxIndex = index
			}
		}
	}

	return maxIndex + 1, nil
}

// GetExperienceTranslations busca as traduções de uma experiência por índice
func (r *adminRepository) GetExperienceTranslations(ctx context.Context, expIndex int, languages []string) (map[string]models.UpdateExperienciaRequest, error) {
	expKey := fmt.Sprintf("exp%d", expIndex)
	baseKey := fmt.Sprintf("experience.experiences.%s", expKey)

	translations := make(map[string]models.UpdateExperienciaRequest)

	for _, lang := range languages {
		// Busca os campos principais
		var cargo, empresa, localizacao, periodo *string
		cargoKey := fmt.Sprintf("%s.cargo", baseKey)
		empresaKey := fmt.Sprintf("%s.empresa", baseKey)
		localizacaoKey := fmt.Sprintf("%s.localizacao", baseKey)
		periodoKey := fmt.Sprintf("%s.periodo", baseKey)

		err := r.db.QueryRow(ctx, `
			SELECT 
				MAX(CASE WHEN key_path = $1 THEN value END) as cargo,
				MAX(CASE WHEN key_path = $2 THEN value END) as empresa,
				MAX(CASE WHEN key_path = $3 THEN value END) as localizacao,
				MAX(CASE WHEN key_path = $4 THEN value END) as periodo
			FROM translations
			WHERE language = $5 AND (key_path = $1 OR key_path = $2 OR key_path = $3 OR key_path = $4)
		`,
			cargoKey,
			empresaKey,
			localizacaoKey,
			periodoKey,
			lang,
		).Scan(&cargo, &empresa, &localizacao, &periodo)

		// Se não encontrar traduções, continua para o próximo idioma
		if err != nil {
			continue
		}

		// Converte ponteiros para strings
		cargoStr := ""
		empresaStr := ""
		localizacaoStr := ""
		periodoStr := ""
		if cargo != nil {
			cargoStr = *cargo
		}
		if empresa != nil {
			empresaStr = *empresa
		}
		if localizacao != nil {
			localizacaoStr = *localizacao
		}
		if periodo != nil {
			periodoStr = *periodo
		}

		// Busca as atividades
		atividadeRows, err := r.db.Query(ctx, `
			SELECT value
			FROM translations
			WHERE language = $1 AND key_path LIKE $2
			ORDER BY CAST(SUBSTRING(key_path FROM '\.(\d+)$') AS INTEGER)
		`, lang, fmt.Sprintf("%s.atividades.%%", baseKey))

		var atividades []string
		if err == nil {
			defer atividadeRows.Close()
			for atividadeRows.Next() {
				var atividade string
				if err := atividadeRows.Scan(&atividade); err == nil {
					atividades = append(atividades, atividade)
				}
			}
		}

		// Só adiciona se houver pelo menos um campo preenchido
		if cargoStr != "" || empresaStr != "" || localizacaoStr != "" || periodoStr != "" || len(atividades) > 0 {
			translations[lang] = models.UpdateExperienciaRequest{
				Cargo:       cargoStr,
				Empresa:     empresaStr,
				Localizacao: localizacaoStr,
				Periodo:     periodoStr,
				Ordem:       0, // Ordem não é salva nas traduções
				Atividades:  atividades,
			}
		}
	}

	return translations, nil
}
