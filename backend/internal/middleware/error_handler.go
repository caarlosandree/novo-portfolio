package middleware

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"portfolio-backend/internal/logger"
)

// ErrorHandler é um middleware para tratamento centralizado de erros
func ErrorHandler(err error, c echo.Context) {
	code := http.StatusInternalServerError
	message := "Erro interno do servidor"

	if he, ok := err.(*echo.HTTPError); ok {
		code = he.Code
		if msg, ok := he.Message.(string); ok {
			message = msg
		} else {
			message = "Erro desconhecido"
		}
	}

	// Log estruturado do erro
	logger.ErrorContext(c.Request().Context(), "HTTP error",
		"status", code,
		"message", message,
		"path", c.Request().URL.Path,
		"method", c.Request().Method,
		"error", err.Error(),
	)

	if !c.Response().Committed {
		c.JSON(code, map[string]string{
			"error": message,
		})
	}
}

