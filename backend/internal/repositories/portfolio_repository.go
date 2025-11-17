package repositories

import (
	"context"
	"fmt"
	"strconv"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
	"portfolio-backend/internal/models"
)

type PortfolioRepository interface {
	GetSkills(ctx context.Context) ([]models.CategoriaHabilidade, error)
	GetInterpersonalSkills(ctx context.Context) ([]models.CategoriaHabilidade, error)
	GetExperiences(ctx context.Context) ([]models.ExperienciaProfissional, error)
	GetProjects(ctx context.Context) ([]models.Projeto, error)
	GetAbout(ctx context.Context, language string) (*models.About, error)
	GetEducations(ctx context.Context, language string) ([]models.Education, error)
	GetCertificationCategories(ctx context.Context, language string) ([]models.CertificationCategory, error)
	GetCertificationTracks(ctx context.Context, language string) ([]models.CertificationTrack, error)
	GetContact(ctx context.Context) (*models.Contact, error)
	GetTranslations(ctx context.Context, language string) (map[string]interface{}, error)
}

type portfolioRepository struct {
	db *pgxpool.Pool
}

func NewPortfolioRepository(db *pgxpool.Pool) PortfolioRepository {
	return &portfolioRepository{
		db: db,
	}
}

func (r *portfolioRepository) GetSkills(ctx context.Context) ([]models.CategoriaHabilidade, error) {
	query := `
		SELECT 
			c.nome,
			COALESCE(array_agg(h.nome ORDER BY h.nome) FILTER (WHERE h.nome IS NOT NULL), '{}') as habilidades
		FROM categorias_habilidades c
		LEFT JOIN habilidades h ON h.categoria_id = c.id
		WHERE c.tipo = 'tecnica'
		GROUP BY c.id, c.nome
		ORDER BY c.nome
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar habilidades técnicas: %w", err)
	}
	defer rows.Close()

	var skills []models.CategoriaHabilidade
	for rows.Next() {
		var skill models.CategoriaHabilidade
		if err := rows.Scan(&skill.Nome, &skill.Habilidades); err != nil {
			return nil, fmt.Errorf("erro ao escanear habilidade: %w", err)
		}
		skills = append(skills, skill)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("erro ao iterar habilidades: %w", err)
	}

	return skills, nil
}

func (r *portfolioRepository) GetInterpersonalSkills(ctx context.Context) ([]models.CategoriaHabilidade, error) {
	query := `
		SELECT 
			c.nome,
			COALESCE(array_agg(h.nome ORDER BY h.nome) FILTER (WHERE h.nome IS NOT NULL), '{}') as habilidades
		FROM categorias_habilidades c
		LEFT JOIN habilidades h ON h.categoria_id = c.id
		WHERE c.tipo = 'interpessoal'
		GROUP BY c.id, c.nome
		ORDER BY c.nome
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar habilidades interpessoais: %w", err)
	}
	defer rows.Close()

	var skills []models.CategoriaHabilidade
	for rows.Next() {
		var skill models.CategoriaHabilidade
		if err := rows.Scan(&skill.Nome, &skill.Habilidades); err != nil {
			return nil, fmt.Errorf("erro ao escanear habilidade: %w", err)
		}
		skills = append(skills, skill)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("erro ao iterar habilidades: %w", err)
	}

	return skills, nil
}

func (r *portfolioRepository) GetExperiences(ctx context.Context) ([]models.ExperienciaProfissional, error) {
	query := `
		SELECT 
			e.id,
			e.cargo,
			e.empresa,
			e.localizacao,
			e.periodo,
			e.ordem,
			COALESCE(
				(SELECT array_agg(descricao ORDER BY min_ordem)
				 FROM (SELECT descricao, MIN(ordem) as min_ordem
				       FROM atividades
				       WHERE experiencia_id = e.id
				       GROUP BY descricao) sub),
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

func (r *portfolioRepository) GetProjects(ctx context.Context) ([]models.Projeto, error) {
	query := `
		SELECT 
			p.titulo,
			p.descricao,
			COALESCE(array_agg(t.nome ORDER BY t.nome) FILTER (WHERE t.nome IS NOT NULL), '{}') as tecnologias,
			p.github_url
		FROM projetos p
		LEFT JOIN projeto_tecnologias pt ON pt.projeto_id = p.id
		LEFT JOIN tecnologias t ON t.id = pt.tecnologia_id
		GROUP BY p.id, p.titulo, p.descricao, p.github_url
		ORDER BY p.ordem, p.id
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar projetos: %w", err)
	}
	defer rows.Close()

	var projects []models.Projeto
	for rows.Next() {
		var project models.Projeto
		if err := rows.Scan(&project.Titulo, &project.Descricao, &project.Tecnologias, &project.GithubUrl); err != nil {
			return nil, fmt.Errorf("erro ao escanear projeto: %w", err)
		}
		projects = append(projects, project)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("erro ao iterar projetos: %w", err)
	}

	return projects, nil
}

func (r *portfolioRepository) GetAbout(ctx context.Context, language string) (*models.About, error) {
	// Busca o about (assumindo que só existe um registro)
	var about models.About
	err := r.db.QueryRow(ctx, `
		SELECT title, heading FROM about LIMIT 1
	`).Scan(&about.Title, &about.Heading)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar about: %w", err)
	}

	// Busca parágrafos
	paragraphRows, err := r.db.Query(ctx, `
		SELECT content FROM about_paragraphs 
		WHERE about_id = (SELECT id FROM about LIMIT 1)
		ORDER BY ordem
	`)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar parágrafos: %w", err)
	}
	defer paragraphRows.Close()

	for paragraphRows.Next() {
		var paragraph string
		if err := paragraphRows.Scan(&paragraph); err != nil {
			return nil, fmt.Errorf("erro ao escanear parágrafo: %w", err)
		}
		about.Paragraphs = append(about.Paragraphs, paragraph)
	}

	// Busca features
	featureRows, err := r.db.Query(ctx, `
		SELECT title, description FROM about_features
		WHERE about_id = (SELECT id FROM about LIMIT 1)
		ORDER BY ordem
	`)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar features: %w", err)
	}
	defer featureRows.Close()

	for featureRows.Next() {
		var feature models.Feature
		if err := featureRows.Scan(&feature.Title, &feature.Description); err != nil {
			return nil, fmt.Errorf("erro ao escanear feature: %w", err)
		}
		about.Features = append(about.Features, feature)
	}

	// Se o idioma não for pt-BR, busca traduções
	if language != "pt-BR" {
		// Busca traduções para o idioma especificado
		translationRows, err := r.db.Query(ctx, `
			SELECT key_path, value FROM translations 
			WHERE language = $1 AND key_path LIKE 'about.%'
			ORDER BY key_path
		`, language)
		if err != nil {
			return nil, fmt.Errorf("erro ao buscar traduções: %w", err)
		}
		defer translationRows.Close()

		// Cria mapa de traduções
		translations := make(map[string]string)
		for translationRows.Next() {
			var keyPath, value string
			if err := translationRows.Scan(&keyPath, &value); err != nil {
				return nil, fmt.Errorf("erro ao escanear tradução: %w", err)
			}
			translations[keyPath] = value
		}

		// Aplica traduções
		if title, ok := translations["about.title"]; ok {
			about.Title = title
		}
		if heading, ok := translations["about.heading"]; ok {
			about.Heading = heading
		}

		// Traduz parágrafos (paragraph1, paragraph2, etc)
		for i := range about.Paragraphs {
			paragraphKey := fmt.Sprintf("about.paragraph%d", i+1)
			if translatedParagraph, ok := translations[paragraphKey]; ok {
				about.Paragraphs[i] = translatedParagraph
			}
		}

		// Traduz features
		// Mapeamento: ordem 1 = development, ordem 2 = fullStack, ordem 3 = innovation
		featureKeys := []string{"development", "fullStack", "innovation"}
		for i := range about.Features {
			if i < len(featureKeys) {
				featureKey := featureKeys[i]
				titleKey := fmt.Sprintf("about.features.%s.title", featureKey)
				descriptionKey := fmt.Sprintf("about.features.%s.description", featureKey)

				if translatedTitle, ok := translations[titleKey]; ok {
					about.Features[i].Title = translatedTitle
				}
				if translatedDescription, ok := translations[descriptionKey]; ok {
					about.Features[i].Description = translatedDescription
				}
			}
		}
	}

	return &about, nil
}

func (r *portfolioRepository) GetEducations(ctx context.Context, language string) ([]models.Education, error) {
	// Busca dados base das formações
	query := `
		SELECT 
			e.id,
			e.degree,
			e.institution,
			e.location,
			e.period,
			e.type,
			e.status,
			COALESCE(e.current_phase, '') as current_phase,
			e.description,
			e.ordem,
			COALESCE(array_agg(et.topic ORDER BY et.ordem) FILTER (WHERE et.topic IS NOT NULL), '{}') as topics
		FROM educations e
		LEFT JOIN education_topics et ON et.education_id = e.id
		GROUP BY e.id, e.degree, e.institution, e.location, e.period, e.type, e.status, e.current_phase, e.description, e.ordem
		ORDER BY e.ordem, e.id
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar formações: %w", err)
	}
	defer rows.Close()

	var educations []models.Education
	for rows.Next() {
		var edu models.Education
		var ordem int
		if err := rows.Scan(&edu.ID, &edu.Degree, &edu.Institution, &edu.Location, &edu.Period, &edu.Type, &edu.Status, &edu.CurrentPhase, &edu.Description, &ordem, &edu.Topics); err != nil {
			return nil, fmt.Errorf("erro ao escanear formação: %w", err)
		}
		educations = append(educations, edu)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("erro ao iterar formações: %w", err)
	}

	// Se o idioma não for pt-BR, busca traduções
	if language != "pt-BR" {
		// Busca traduções para o idioma especificado
		translationRows, err := r.db.Query(ctx, `
			SELECT key_path, value FROM translations 
			WHERE language = $1 AND key_path LIKE 'education.degree%'
			ORDER BY key_path
		`, language)
		if err != nil {
			return nil, fmt.Errorf("erro ao buscar traduções: %w", err)
		}
		defer translationRows.Close()

		// Cria mapa de traduções por degree (degree1, degree2, etc)
		translations := make(map[string]map[string]string)
		for translationRows.Next() {
			var keyPath, value string
			if err := translationRows.Scan(&keyPath, &value); err != nil {
				return nil, fmt.Errorf("erro ao escanear tradução: %w", err)
			}

			// Parse key_path: education.degree1.title -> degree1, title
			parts := strings.Split(keyPath, ".")
			if len(parts) >= 3 && parts[0] == "education" {
				degreeKey := parts[1] // degree1, degree2, etc
				fieldKey := strings.Join(parts[2:], ".") // title, description, topics.softwareDevelopment, etc

				if translations[degreeKey] == nil {
					translations[degreeKey] = make(map[string]string)
				}
				translations[degreeKey][fieldKey] = value
			}
		}

		// Aplica traduções baseado na ordem (ordem 1 = degree1, ordem 2 = degree2, etc)
		for i := range educations {
			// Mapeia pela ordem: primeira education (i=0) = degree1, segunda (i=1) = degree2, etc
			degreeKey := fmt.Sprintf("degree%d", i+1)
			if trans, exists := translations[degreeKey]; exists {
				if title, ok := trans["title"]; ok {
					educations[i].Degree = title
				}
				if description, ok := trans["description"]; ok {
					educations[i].Description = description
				}
				if period, ok := trans["period"]; ok {
					educations[i].Period = period
				}
				if eduType, ok := trans["type"]; ok {
					educations[i].Type = eduType
				}
				if currentPhase, ok := trans["currentPhase"]; ok {
					educations[i].CurrentPhase = currentPhase
				}

				// Traduz tópicos
				// Os tópicos no banco estão em português, precisamos mapear para as chaves de tradução
				// As chaves de tradução são como: topics.networkProtocols, topics.cybersecurity, etc
				// Criamos um mapeamento baseado nos tópicos originais
				topicMapping := map[string]string{
					"Protocolos de rede":                                    "topics.networkProtocols",
					"Segurança cibernética":                                 "topics.cybersecurity",
					"Infraestrutura e arquitetura de redes":                 "topics.networkInfrastructure",
					"Manutenção e suporte a redes":                          "topics.networkMaintenance",
					"Configuração de roteadores e switches":                 "topics.routersSwitches",
					"Gerenciamento de firewalls":                            "topics.firewallManagement",
					"Administração de servidores":                           "topics.serverAdministration",
					"Ferramentas de monitoramento e análise de desempenho":  "topics.monitoringTools",
					"Desenvolvimento de software e aplicações":              "topics.softwareDevelopment",
					"Inteligência Artificial e Machine Learning":           "topics.aiMl",
					"Ciência de Dados e Big Data":                           "topics.dataScience",
					"Computação em nuvem":                                   "topics.cloudComputing",
					"Desenvolvimento de jogos digitais":                    "topics.gameDevelopment",
					"Pesquisa acadêmica e inovação tecnológica":             "topics.research",
				}

				var translatedTopics []string
				for _, topic := range educations[i].Topics {
					if translationKey, exists := topicMapping[topic]; exists {
						if translatedTopic, ok := trans[translationKey]; ok {
							translatedTopics = append(translatedTopics, translatedTopic)
						} else {
							translatedTopics = append(translatedTopics, topic)
						}
					} else {
						// Se não encontrar no mapeamento, mantém o original
						translatedTopics = append(translatedTopics, topic)
					}
				}
				if len(translatedTopics) > 0 {
					educations[i].Topics = translatedTopics
				}
			}
		}
	}

	return educations, nil
}

func (r *portfolioRepository) GetCertificationCategories(ctx context.Context, language string) ([]models.CertificationCategory, error) {
	query := `
		SELECT 
			cc.title,
			COALESCE(array_agg(ci.item ORDER BY ci.ordem) FILTER (WHERE ci.item IS NOT NULL), '{}') as items
		FROM certification_categories cc
		LEFT JOIN certification_items ci ON ci.category_id = cc.id
		GROUP BY cc.id, cc.title
		ORDER BY cc.ordem, cc.id
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar categorias de certificações: %w", err)
	}
	defer rows.Close()

	var categories []models.CertificationCategory
	for rows.Next() {
		var cat models.CertificationCategory
		if err := rows.Scan(&cat.Title, &cat.Items); err != nil {
			return nil, fmt.Errorf("erro ao escanear categoria: %w", err)
		}
		categories = append(categories, cat)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("erro ao iterar categorias: %w", err)
	}

	// Se o idioma não for pt-BR, busca traduções
	if language != "pt-BR" {
		// Mapeamento de títulos para chaves de tradução
		categoryKeyMapping := map[string]string{
			"Programação Básica":                                    "basicProgramming",
			"Versionamento e Desenvolvimento Web":                  "versioning",
			"Linguagens de Programação":                           "programmingLanguages",
			"DevOps & Observabilidade":                            "devops",
			"Cloud Computing – AWS":                               "aws",
			"Outros Cursos e Áreas de Conhecimento":                "other",
		}

		// Mapeamento de itens para chaves de tradução (por categoria)
		itemKeyMapping := map[string]map[string]string{
			"basicProgramming": {
				"Primeiros comandos":                    "commands",
				"Estruturas condicionais":                "conditionals",
				"Estruturas de repetição":               "loops",
				"Variáveis compostas":                    "variables",
				"Funções e rotinas":                      "functions",
			},
			"versioning": {
				"Git e GitHub":                          "git",
				"HTML5 e CSS3 (5 módulos – Desenvolvimento Web 2020)": "htmlCss",
				"JavaScript":                            "javascript",
				"Desenvolvimento Web com AngularJS (Unicamp)": "angular",
				"Boas Práticas em Desenvolvimento de Software (Unicamp)": "bestPractices",
			},
			"programmingLanguages": {
				"Python 3 (Curso em Vídeo)":             "python3",
				"Python do Básico ao Avançado, com projetos e Django": "pythonAdvanced",
			},
			"devops": {
				"Introdução ao DevOps":                   "intro",
				"Introdução à Observabilidade":           "observability",
				"Docker":                                "docker",
				"Kubernetes":                            "kubernetes",
				"Jira Software":                         "jira",
				"Confluence":                            "confluence",
				"Bitbucket":                             "bitbucket",
			},
			"aws": {
				"AWS Cloud Practitioner Essentials":     "practitionerEssentials",
				"AWS re/Start Graduate (Certificação AWS Cloud Practitioner)": "reStart",
				"Fundamentos de Arquitetura de Nuvem AWS": "architecture",
				"Introdução ao Machine Learning na AWS": "mlIntro",
				"AWS Partner Accreditation (Technical)":  "partner",
				"AWS Builder Learner Guide":              "learnerGuide",
				"Building Language Models on AWS":       "languageModels",
				"Foundations of Prompt Engineering":      "promptEngineering",
				"Introdução ao Amazon Bedrock":          "bedrock",
				"Aplicações modernas com bancos NoSQL na AWS": "nosql",
			},
			"other": {
				"Inglês – nível intermediário":          "english",
				"Manutenção de servidores e PABX":       "serverMaintenance",
				"Introdução à segurança em telefonia IP": "voipSecurity",
				"Soluções em nuvem para impulsionar negócios": "cloudSolutions",
				"Fundamentos de Voz sobre IP (VoIP)":   "voipFundamentals",
				"Serviços de valor agregado – contratação e gestão": "valueAddedServices",
				"Lei Geral de Proteção de Dados (LGPD) – fundamentos": "lgpd",
				"Atendimento ao cliente com excelência": "customerService",
				"Gestão da qualidade no atendimento":   "qualityManagement",
				"Elaboração de planos de comunicação eficazes": "communicationPlans",
				"Técnicas para encantar e fidelizar clientes": "customerRetention",
			},
		}

		// Busca traduções
		translationRows, err := r.db.Query(ctx, `
			SELECT key_path, value FROM translations 
			WHERE language = $1 AND key_path LIKE 'certifications.categories.%'
			ORDER BY key_path
		`, language)
		if err != nil {
			return nil, fmt.Errorf("erro ao buscar traduções: %w", err)
		}
		defer translationRows.Close()

		translations := make(map[string]string)
		for translationRows.Next() {
			var keyPath, value string
			if err := translationRows.Scan(&keyPath, &value); err != nil {
				return nil, fmt.Errorf("erro ao escanear tradução: %w", err)
			}
			translations[keyPath] = value
		}

		// Aplica traduções
		for i := range categories {
			categoryTitle := categories[i].Title
			if categoryKey, exists := categoryKeyMapping[categoryTitle]; exists {
				// Traduz título
				titleKey := fmt.Sprintf("certifications.categories.%s.title", categoryKey)
				if translatedTitle, ok := translations[titleKey]; ok {
					categories[i].Title = translatedTitle
				}

				// Traduz itens
				if itemMapping, exists := itemKeyMapping[categoryKey]; exists {
					var translatedItems []string
					for _, item := range categories[i].Items {
						if itemKey, exists := itemMapping[item]; exists {
							itemKeyPath := fmt.Sprintf("certifications.categories.%s.items.%s", categoryKey, itemKey)
							if translatedItem, ok := translations[itemKeyPath]; ok {
								translatedItems = append(translatedItems, translatedItem)
							} else {
								translatedItems = append(translatedItems, item)
							}
						} else {
							translatedItems = append(translatedItems, item)
						}
					}
					if len(translatedItems) > 0 {
						categories[i].Items = translatedItems
					}
				}
			}
		}
	}

	return categories, nil
}

func (r *portfolioRepository) GetCertificationTracks(ctx context.Context, language string) ([]models.CertificationTrack, error) {
	query := `
		SELECT 
			ct.id,
			ct.title,
			COALESCE(ct.description, '') as description,
			COALESCE(ct.icon_image, '') as icon_image
		FROM certification_tracks ct
		ORDER BY ct.ordem, ct.id
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar trilhas: %w", err)
	}
	defer rows.Close()

	var tracks []models.CertificationTrack
	for rows.Next() {
		var track models.CertificationTrack
		var trackID int
		if err := rows.Scan(&trackID, &track.Title, &track.Description, &track.IconImage); err != nil {
			return nil, fmt.Errorf("erro ao escanear trilha: %w", err)
		}

		// Busca items (se existirem)
		itemRows, err := r.db.Query(ctx, `
			SELECT item FROM certification_track_items 
			WHERE track_id = $1 
			ORDER BY ordem
		`, trackID)
		if err == nil {
			defer itemRows.Close()
			for itemRows.Next() {
				var item string
				if err := itemRows.Scan(&item); err == nil {
					track.Items = append(track.Items, item)
				}
			}
		}

		// Busca levels (se existirem)
		levelRows, err := r.db.Query(ctx, `
			SELECT level, description FROM certification_track_levels 
			WHERE track_id = $1 
			ORDER BY ordem
		`, trackID)
		if err == nil {
			defer levelRows.Close()
			for levelRows.Next() {
				var level models.TrackLevel
				if err := levelRows.Scan(&level.Level, &level.Description); err == nil {
					track.Levels = append(track.Levels, level)
				}
			}
		}

		tracks = append(tracks, track)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("erro ao iterar trilhas: %w", err)
	}

	// Se o idioma não for pt-BR, busca traduções
	if language != "pt-BR" {
		// Mapeamento de títulos para chaves de tradução
		trackKeyMapping := map[string]string{
			"Lógica de Programação":                    "logic",
			"Desenvolvimento Back-End com Java":        "java",
			"Desenvolvimento Front-End com React":      "react",
		}

		// Busca traduções
		translationRows, err := r.db.Query(ctx, `
			SELECT key_path, value FROM translations 
			WHERE language = $1 AND key_path LIKE 'certifications.aluraTracks.%'
			ORDER BY key_path
		`, language)
		if err != nil {
			return nil, fmt.Errorf("erro ao buscar traduções: %w", err)
		}
		defer translationRows.Close()

		translations := make(map[string]string)
		for translationRows.Next() {
			var keyPath, value string
			if err := translationRows.Scan(&keyPath, &value); err != nil {
				return nil, fmt.Errorf("erro ao escanear tradução: %w", err)
			}
			translations[keyPath] = value
		}

		// Aplica traduções
		for i := range tracks {
			trackTitle := tracks[i].Title
			if trackKey, exists := trackKeyMapping[trackTitle]; exists {
				// Traduz título
				titleKey := fmt.Sprintf("certifications.aluraTracks.%s.title", trackKey)
				if translatedTitle, ok := translations[titleKey]; ok {
					tracks[i].Title = translatedTitle
				}

				// Traduz descrição
				descriptionKey := fmt.Sprintf("certifications.aluraTracks.%s.description", trackKey)
				if translatedDescription, ok := translations[descriptionKey]; ok {
					tracks[i].Description = translatedDescription
				}

				// Traduz items (se existirem)
				if len(tracks[i].Items) > 0 {
					// Para a trilha "logic", os itens são específicos
					if trackKey == "logic" {
						var translatedItems []string
						for j, item := range tracks[i].Items {
							itemKey := fmt.Sprintf("certifications.aluraTracks.%s.items.%s", trackKey, 
								map[int]string{0: "javascript", 1: "fundamentals"}[j])
							if translatedItem, ok := translations[itemKey]; ok {
								translatedItems = append(translatedItems, translatedItem)
							} else {
								translatedItems = append(translatedItems, item)
							}
						}
						if len(translatedItems) > 0 {
							tracks[i].Items = translatedItems
						}
					}
				}

				// Traduz levels (se existirem)
				if len(tracks[i].Levels) > 0 {
					levelKeys := []string{"base", "level1", "level2", "level3"}
					for j := range tracks[i].Levels {
						if j < len(levelKeys) {
							levelKey := levelKeys[j]
							levelTitleKey := fmt.Sprintf("certifications.aluraTracks.%s.levels.%s", trackKey, levelKey)
							levelDescKey := fmt.Sprintf("certifications.aluraTracks.%s.levels.%sDesc", trackKey, levelKey)

							if translatedLevel, ok := translations[levelTitleKey]; ok {
								tracks[i].Levels[j].Level = translatedLevel
							}
							if translatedDesc, ok := translations[levelDescKey]; ok {
								tracks[i].Levels[j].Description = translatedDesc
							}
						}
					}
				}
			}
		}
	}

	return tracks, nil
}

func (r *portfolioRepository) GetContact(ctx context.Context) (*models.Contact, error) {
	var contact models.Contact
	err := r.db.QueryRow(ctx, `
		SELECT email, phone FROM contacts LIMIT 1
	`).Scan(&contact.Email, &contact.Phone)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar contato: %w", err)
	}

	// Busca itens de contato
	rows, err := r.db.Query(ctx, `
		SELECT label, href, color FROM contact_items
		WHERE contact_id = (SELECT id FROM contacts LIMIT 1)
		ORDER BY ordem
	`)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar itens de contato: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var item models.ContactItem
		if err := rows.Scan(&item.Label, &item.Href, &item.Color); err != nil {
			return nil, fmt.Errorf("erro ao escanear item de contato: %w", err)
		}
		contact.Contacts = append(contact.Contacts, item)
	}

	return &contact, nil
}

func (r *portfolioRepository) GetTranslations(ctx context.Context, language string) (map[string]interface{}, error) {
	rows, err := r.db.Query(ctx, `
		SELECT key_path, value FROM translations 
		WHERE language = $1
		ORDER BY key_path
	`, language)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar traduções: %w", err)
	}
	defer rows.Close()

	translations := make(map[string]interface{})
	for rows.Next() {
		var keyPath, value string
		if err := rows.Scan(&keyPath, &value); err != nil {
			return nil, fmt.Errorf("erro ao escanear tradução: %w", err)
		}
		// Converte key_path em estrutura aninhada
		setNestedValue(translations, keyPath, value)
	}

	return translations, nil
}

// setNestedValue converte "nav.home" em {"nav": {"home": value}}
// Também trata arrays: "exp0.atividades.0" cria um array
func setNestedValue(m map[string]interface{}, keyPath string, value interface{}) {
	keys := splitKeyPath(keyPath)
	var current interface{} = m
	
	for i := 0; i < len(keys)-1; i++ {
		key := keys[i]
		nextKey := keys[i+1]
		isNextNumeric := isNumeric(nextKey)
		
		currentMap, ok := current.(map[string]interface{})
		if !ok {
			// Se não for map, não pode continuar
			return
		}
		
		if _, exists := currentMap[key]; !exists {
			if isNextNumeric {
				currentMap[key] = make([]interface{}, 0)
			} else {
				currentMap[key] = make(map[string]interface{})
			}
		}
		
		if isNextNumeric {
			// Próxima chave é numérica, trabalha com array
			arr, ok := currentMap[key].([]interface{})
			if !ok {
				// Converte map para array se necessário
				arr = make([]interface{}, 0)
				currentMap[key] = arr
			}
			
			idx := parseInt(nextKey)
			// Garante que o array tem tamanho suficiente
			for len(arr) <= idx {
				arr = append(arr, nil)
			}
			
			if i == len(keys)-2 {
				// Última chave, define o valor diretamente no array
				arr[idx] = value
				currentMap[key] = arr
				return
			}
			
			// Ainda há mais chaves, prepara o próximo nível
			if arr[idx] == nil {
				if i+2 < len(keys) && isNumeric(keys[i+2]) {
					arr[idx] = make([]interface{}, 0)
				} else {
					arr[idx] = make(map[string]interface{})
				}
			}
			
			// Atualiza o array e move para o próximo nível
			currentMap[key] = arr
			if nextMap, ok := arr[idx].(map[string]interface{}); ok {
				current = nextMap
			} else if nextArr, ok := arr[idx].([]interface{}); ok {
				// Se for array aninhado, processa recursivamente
				if i+2 < len(keys) {
					nextIdx := parseInt(keys[i+2])
					for len(nextArr) <= nextIdx {
						nextArr = append(nextArr, nil)
					}
					if nextArr[nextIdx] == nil {
						if i+3 < len(keys) && isNumeric(keys[i+3]) {
							nextArr[nextIdx] = make([]interface{}, 0)
						} else {
							nextArr[nextIdx] = make(map[string]interface{})
						}
					}
					arr[idx] = nextArr
					if nextMap, ok := nextArr[nextIdx].(map[string]interface{}); ok {
						current = nextMap
					} else {
						// Continua com array
						i++ // Pula a próxima chave já processada
						continue
					}
				}
			}
		} else {
			// Próxima chave não é numérica, trabalha com map
			nextMap, ok := currentMap[key].(map[string]interface{})
			if !ok {
				// Converte array para map se necessário (não deveria acontecer)
				nextMap = make(map[string]interface{})
				currentMap[key] = nextMap
			}
			current = nextMap
		}
	}
	
	// Define o valor final (quando a última chave não é numérica)
	lastKey := keys[len(keys)-1]
	if currentMap, ok := current.(map[string]interface{}); ok {
		currentMap[lastKey] = value
	}
}

// isNumeric verifica se uma string representa um número
func isNumeric(s string) bool {
	_, err := strconv.Atoi(s)
	return err == nil
}

// parseInt converte string para int
func parseInt(s string) int {
	val, _ := strconv.Atoi(s)
	return val
}

func splitKeyPath(keyPath string) []string {
	var result []string
	var current strings.Builder
	for _, char := range keyPath {
		if char == '.' {
			if current.Len() > 0 {
				result = append(result, current.String())
				current.Reset()
			}
		} else {
			current.WriteRune(char)
		}
	}
	if current.Len() > 0 {
		result = append(result, current.String())
	}
	return result
}

