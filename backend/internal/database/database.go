package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"portfolio-backend/internal/logger"
)

// NewPool cria um novo pool de conexões com o PostgreSQL
func NewPool(databaseURL string) (*pgxpool.Pool, error) {
	logger.Debug("Iniciando conexão com banco de dados")
	
	config, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		logger.Error("Erro ao parsear DATABASE_URL", "error", err)
		return nil, fmt.Errorf("erro ao parsear DATABASE_URL: %w", err)
	}

	pool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		logger.Error("Erro ao criar pool de conexões", "error", err)
		return nil, fmt.Errorf("erro ao criar pool de conexões: %w", err)
	}

	// Testa a conexão
	logger.Debug("Testando conexão com banco de dados")
	if err := pool.Ping(context.Background()); err != nil {
		logger.Error("Erro ao conectar ao banco de dados", "error", err)
		return nil, fmt.Errorf("erro ao conectar ao banco de dados: %w", err)
	}

	logger.Info("Pool de conexões criado com sucesso",
		"max_conns", config.MaxConns,
		"min_conns", config.MinConns,
	)

	return pool, nil
}

