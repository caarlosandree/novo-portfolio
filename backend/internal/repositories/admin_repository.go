package repositories

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

type AdminRepository interface {
	UpdateTranslation(ctx context.Context, language, key, value string) error
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

