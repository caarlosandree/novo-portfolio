package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"portfolio-backend/internal/logger"
	"portfolio-backend/internal/models"
	"portfolio-backend/internal/services"
)

type AuthHandler struct {
	authService services.AuthService
}

func NewAuthHandler(authService services.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

// Login realiza o login do usuário
// @Summary      Login
// @Description  Autentica um usuário e retorna um token JWT
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        credentials  body      models.LoginRequest  true  "Credenciais de login"
// @Success      200         {object}  models.LoginResponse
// @Failure      401         {object}  map[string]string
// @Failure      500         {object}  map[string]string
// @Router       /api/auth/login [post]
func (h *AuthHandler) Login(c echo.Context) error {
	var req models.LoginRequest
	if err := c.Bind(&req); err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao fazer bind da requisição",
			"error", err,
		)
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Dados inválidos",
		})
	}

	if req.Username == "" || req.Password == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Usuário e senha são obrigatórios",
		})
	}

	response, err := h.authService.Login(c.Request().Context(), req.Username, req.Password)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao fazer login",
			"error", err,
			"username", req.Username,
		)
		return c.JSON(http.StatusUnauthorized, map[string]string{
			"error": err.Error(),
		})
	}

	logger.InfoContext(c.Request().Context(), "Login realizado com sucesso",
		"username", req.Username,
	)
	return c.JSON(http.StatusOK, response)
}

// ChangePassword altera a senha do usuário autenticado
// @Summary      Altera senha
// @Description  Altera a senha do usuário autenticado
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        body      body      models.ChangePasswordRequest  true  "Dados para alteração de senha"
// @Success      200       {object}  map[string]string
// @Failure      400       {object}  map[string]string
// @Failure      401       {object}  map[string]string
// @Failure      500       {object}  map[string]string
// @Router       /api/auth/change-password [post]
func (h *AuthHandler) ChangePassword(c echo.Context) error {
	// Obtém o user_id do contexto (definido pelo middleware de autenticação)
	userID, ok := c.Get("user_id").(int)
	if !ok {
		return c.JSON(http.StatusUnauthorized, map[string]string{
			"error": "Usuário não autenticado",
		})
	}

	var req models.ChangePasswordRequest
	if err := c.Bind(&req); err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao fazer bind da requisição",
			"error", err,
		)
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Dados inválidos",
		})
	}

	if req.CurrentPassword == "" || req.NewPassword == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Senha atual e nova senha são obrigatórias",
		})
	}

	err := h.authService.ChangePassword(c.Request().Context(), userID, req.CurrentPassword, req.NewPassword)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao alterar senha",
			"error", err,
			"user_id", userID,
		)
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": err.Error(),
		})
	}

	logger.InfoContext(c.Request().Context(), "Senha alterada com sucesso",
		"user_id", userID,
	)
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Senha alterada com sucesso",
	})
}

