package middleware

import (
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"portfolio-backend/internal/logger"
	"portfolio-backend/internal/services"
)

func AuthMiddleware(authService services.AuthService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				logger.DebugContext(c.Request().Context(), "Requisição sem token de autenticação")
				return c.JSON(http.StatusUnauthorized, map[string]string{
					"error": "Token de autenticação não fornecido",
				})
			}

			// Remove o prefixo "Bearer "
			tokenString := strings.TrimPrefix(authHeader, "Bearer ")
			if tokenString == authHeader {
				return c.JSON(http.StatusUnauthorized, map[string]string{
					"error": "Formato de token inválido. Use: Bearer <token>",
				})
			}

			token, err := authService.ValidateToken(tokenString)
			if err != nil {
				logger.DebugContext(c.Request().Context(), "Token inválido",
					"error", err,
				)
				return c.JSON(http.StatusUnauthorized, map[string]string{
					"error": "Token inválido ou expirado",
				})
			}

			// Adiciona informações do token ao contexto
			if claims, ok := token.Claims.(jwt.MapClaims); ok {
				if userID, ok := claims["user_id"].(float64); ok {
					c.Set("user_id", int(userID))
				}
				if username, ok := claims["username"].(string); ok {
					c.Set("username", username)
				}
			}

			return next(c)
		}
	}
}

