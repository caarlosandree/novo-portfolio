package middleware

import (
	"time"

	"github.com/labstack/echo/v4"
	"portfolio-backend/internal/logger"
)

// StructuredLogger é um middleware de logging estruturado usando SLOG
func StructuredLogger() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			start := time.Now()

			// Processa a requisição
			err := next(c)

			// Calcula a duração
			duration := time.Since(start)

			// Prepara campos estruturados
			fields := []interface{}{
				"method", c.Request().Method,
				"path", c.Request().URL.Path,
				"status", c.Response().Status,
				"duration_ms", duration.Milliseconds(),
				"ip", c.RealIP(),
				"user_agent", c.Request().UserAgent(),
			}

			// Adiciona request_id se disponível
			if requestID := c.Request().Context().Value("request_id"); requestID != nil {
				fields = append(fields, "request_id", requestID)
			}

			// Adiciona query parameters se existirem
			if len(c.QueryParams()) > 0 {
				fields = append(fields, "query_params", c.QueryParams().Encode())
			}

			// Log baseado no status code
			if err != nil {
				fields = append(fields, "error", err.Error())
				logger.ErrorContext(c.Request().Context(), "Request failed", fields...)
			} else if c.Response().Status >= 500 {
				logger.ErrorContext(c.Request().Context(), "Internal server error", fields...)
			} else if c.Response().Status >= 400 {
				logger.WarnContext(c.Request().Context(), "Client error", fields...)
			} else {
				logger.InfoContext(c.Request().Context(), "Request completed", fields...)
			}

			return err
		}
	}
}

