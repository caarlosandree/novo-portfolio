package handlers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"portfolio-backend/internal/logger"
	"portfolio-backend/internal/models"
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

// GetAllExperiences obtém todas as experiências
// @Summary      Lista experiências
// @Description  Retorna todas as experiências profissionais
// @Tags         admin
// @Produce      json
// @Success      200  {array}   models.ExperienciaProfissional
// @Failure      500  {object}  map[string]string
// @Router       /api/admin/experiences [get]
func (h *AdminHandler) GetAllExperiences(c echo.Context) error {
	experiences, err := h.adminService.GetAllExperiences(c.Request().Context())
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar experiências",
			"error", err,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao buscar experiências",
		})
	}

	return c.JSON(http.StatusOK, experiences)
}

// GetExperience obtém uma experiência por ID
// @Summary      Obtém experiência
// @Description  Retorna uma experiência profissional por ID
// @Tags         admin
// @Produce      json
// @Param        id   path      int  true  "ID da experiência"
// @Success      200  {object}  models.ExperienciaProfissional
// @Failure      404  {object}  map[string]string
// @Failure      500  {object}  map[string]string
// @Router       /api/admin/experiences/{id} [get]
func (h *AdminHandler) GetExperience(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "ID inválido",
		})
	}

	exp, err := h.adminService.GetExperienceByID(c.Request().Context(), id)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar experiência",
			"error", err,
			"id", id,
		)
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "Experiência não encontrada",
		})
	}

	return c.JSON(http.StatusOK, exp)
}

// CreateExperience cria uma nova experiência
// @Summary      Cria experiência
// @Description  Cria uma nova experiência profissional
// @Tags         admin
// @Accept       json
// @Produce      json
// @Param        body  body      models.CreateExperienciaRequest  true  "Dados da experiência"
// @Success      201   {object}  map[string]interface{}
// @Failure      400   {object}  map[string]string
// @Failure      500   {object}  map[string]string
// @Router       /api/admin/experiences [post]
func (h *AdminHandler) CreateExperience(c echo.Context) error {
	var req models.CreateExperienciaRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Dados inválidos",
		})
	}

	expID, err := h.adminService.CreateExperience(c.Request().Context(), req)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao criar experiência",
			"error", err,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao criar experiência",
		})
	}

	logger.InfoContext(c.Request().Context(), "Experiência criada com sucesso",
		"id", expID,
	)
	return c.JSON(http.StatusCreated, map[string]interface{}{
		"id":      expID,
		"message": "Experiência criada com sucesso",
	})
}

// UpdateExperience atualiza uma experiência profissional
// @Summary      Atualiza experiência
// @Description  Atualiza uma experiência profissional existente
// @Tags         admin
// @Accept       json
// @Produce      json
// @Param        id    path      int  true  "ID da experiência"
// @Param        body  body      models.UpdateExperienciaRequest  true  "Dados da experiência"
// @Success      200   {object}  map[string]string
// @Failure      400   {object}  map[string]string
// @Failure      500   {object}  map[string]string
// @Router       /api/admin/experiences/{id} [put]
func (h *AdminHandler) UpdateExperience(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "ID inválido",
		})
	}

	var req models.UpdateExperienciaRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Dados inválidos",
		})
	}

	err = h.adminService.UpdateExperience(c.Request().Context(), id, req)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao atualizar experiência",
			"error", err,
			"id", id,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao atualizar experiência",
		})
	}

	logger.InfoContext(c.Request().Context(), "Experiência atualizada com sucesso",
		"id", id,
	)
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Experiência atualizada com sucesso",
	})
}

// GetExperienceTranslations obtém as traduções de uma experiência
// @Summary      Obtém traduções
// @Description  Retorna as traduções de uma experiência para os idiomas en e es
// @Tags         admin
// @Produce      json
// @Param        id   path      int  true  "ID da experiência"
// @Success      200  {object}  map[string]models.UpdateExperienciaRequest
// @Failure      404  {object}  map[string]string
// @Failure      500  {object}  map[string]string
// @Router       /api/admin/experiences/{id}/translations [get]
func (h *AdminHandler) GetExperienceTranslations(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "ID inválido",
		})
	}

	translations, err := h.adminService.GetExperienceTranslations(c.Request().Context(), id)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar traduções",
			"error", err,
			"id", id,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao buscar traduções",
		})
	}

	return c.JSON(http.StatusOK, translations)
}

// SaveExperienceTranslations salva as traduções de uma experiência
// @Summary      Salva traduções
// @Description  Salva as traduções de uma experiência para os 3 idiomas
// @Tags         admin
// @Accept       json
// @Produce      json
// @Param        id    path      int  true  "ID da experiência"
// @Param        body  body      map[string]models.UpdateExperienciaRequest  true  "Traduções por idioma (pt-BR, en, es)"
// @Success      200   {object}  map[string]string
// @Failure      400   {object}  map[string]string
// @Failure      500   {object}  map[string]string
// @Router       /api/admin/experiences/{id}/translations [post]
func (h *AdminHandler) SaveExperienceTranslations(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "ID inválido",
		})
	}

	var translations map[string]models.UpdateExperienciaRequest
	if err := c.Bind(&translations); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Dados inválidos",
		})
	}

	// Busca todas as experiências para encontrar o índice
	experiences, err := h.adminService.GetAllExperiences(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao buscar experiências",
		})
	}

	// Encontra o índice da experiência atual
	var expIndex int = -1
	for i, e := range experiences {
		if e.ID == id {
			expIndex = i
			break
		}
	}

	if expIndex == -1 {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "Experiência não encontrada",
		})
	}

	err = h.adminService.SaveExperienceTranslations(c.Request().Context(), id, expIndex, translations)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao salvar traduções",
			"error", err,
			"id", id,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao salvar traduções",
		})
	}

	logger.InfoContext(c.Request().Context(), "Traduções salvas com sucesso",
		"id", id,
	)
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Traduções salvas com sucesso",
	})
}

// DeleteExperience deleta uma experiência profissional
// @Summary      Deleta experiência
// @Description  Deleta uma experiência profissional
// @Tags         admin
// @Produce      json
// @Param        id   path      int  true  "ID da experiência"
// @Success      200  {object}  map[string]string
// @Failure      400  {object}  map[string]string
// @Failure      500  {object}  map[string]string
// @Router       /api/admin/experiences/{id} [delete]
func (h *AdminHandler) DeleteExperience(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "ID inválido",
		})
	}

	err = h.adminService.DeleteExperience(c.Request().Context(), id)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao deletar experiência",
			"error", err,
			"id", id,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao deletar experiência",
		})
	}

	logger.InfoContext(c.Request().Context(), "Experiência deletada com sucesso",
		"id", id,
	)
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Experiência deletada com sucesso",
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

