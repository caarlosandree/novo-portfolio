package middleware

import (
	"context"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

// RequestIDMiddleware adiciona um request ID único a cada requisição
func RequestIDMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Gera um novo UUID para a requisição
			requestID := uuid.New().String()
			
			// Adiciona ao contexto
			ctx := context.WithValue(c.Request().Context(), "request_id", requestID)
			c.SetRequest(c.Request().WithContext(ctx))
			
			// Adiciona ao header de resposta para facilitar debugging
			c.Response().Header().Set("X-Request-ID", requestID)
			
			return next(c)
		}
	}
}

