package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"portfolio-backend/internal/logger"
	"portfolio-backend/internal/services"
)

type AdminHandler struct {
	adminService services.AdminService
}

func NewAdminHandler(adminService services.AdminService) *AdminHandler {
	return &AdminHandler{
		adminService: adminService,
	}
}

// UpdateTranslation atualiza uma tradução específica
// @Summary      Atualiza tradução
// @Description  Atualiza o valor de uma chave de tradução para um idioma específico
// @Tags         admin
// @Accept       json
// @Produce      json
// @Param        language  path      string  true  "Código do idioma (pt-BR, en, es)"
// @Param        body      body      map[string]string  true  "Chave e valor da tradução (key, value)"
// @Success      200       {object}  map[string]string
// @Failure      400       {object}  map[string]string
// @Failure      500       {object}  map[string]string
// @Router       /api/admin/translations/{language} [put]
func (h *AdminHandler) UpdateTranslation(c echo.Context) error {
	language := c.Param("language")

	if language == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Idioma é obrigatório",
		})
	}

	var body map[string]string
	if err := c.Bind(&body); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Dados inválidos",
		})
	}

	key, ok := body["key"]
	if !ok || key == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Campo 'key' é obrigatório",
		})
	}

	value, ok := body["value"]
	if !ok || value == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Campo 'value' é obrigatório",
		})
	}

	err := h.adminService.UpdateTranslation(c.Request().Context(), language, key, value)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao atualizar tradução",
			"error", err,
			"language", language,
			"key", key,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao atualizar tradução",
		})
	}

	logger.InfoContext(c.Request().Context(), "Tradução atualizada com sucesso",
		"language", language,
		"key", key,
	)
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Tradução atualizada com sucesso",
	})
}

// UpdateExperience atualiza uma experiência profissional
// @Summary      Atualiza experiência
// @Description  Atualiza uma experiência profissional existente
// @Tags         admin
// @Accept       json
// @Produce      json
// @Param        id    path      int  true  "ID da experiência"
// @Param        body  body      models.ExperienciaProfissional  true  "Dados da experiência"
// @Success      200   {object}  map[string]string
// @Failure      400   {object}  map[string]string
// @Failure      500   {object}  map[string]string
// @Router       /api/admin/experiences/{id} [put]
func (h *AdminHandler) UpdateExperience(c echo.Context) error {
	// Implementação será adicionada quando criarmos o serviço
	return c.JSON(http.StatusNotImplemented, map[string]string{
		"error": "Endpoint em desenvolvimento",
	})
}

// UpdateProject atualiza um projeto
// @Summary      Atualiza projeto
// @Description  Atualiza um projeto existente
// @Tags         admin
// @Accept       json
// @Produce      json
// @Param        id    path      int  true  "ID do projeto"
// @Param        body  body      models.Projeto  true  "Dados do projeto"
// @Success      200   {object}  map[string]string
// @Failure      400   {object}  map[string]string
// @Failure      500   {object}  map[string]string
// @Router       /api/admin/projects/{id} [put]
func (h *AdminHandler) UpdateProject(c echo.Context) error {
	// Implementação será adicionada quando criarmos o serviço
	return c.JSON(http.StatusNotImplemented, map[string]string{
		"error": "Endpoint em desenvolvimento",
	})
}

