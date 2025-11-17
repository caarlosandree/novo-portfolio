package handlers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"portfolio-backend/internal/logger"
	"portfolio-backend/internal/services"
)

type PortfolioHandler struct {
	portfolioService services.PortfolioService
}

func NewPortfolioHandler(ps services.PortfolioService) *PortfolioHandler {
	return &PortfolioHandler{
		portfolioService: ps,
	}
}

// GetSkills obtém todas as habilidades técnicas
// @Summary      Lista habilidades técnicas
// @Description  Retorna todas as categorias de habilidades técnicas
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Success      200  {array}   models.CategoriaHabilidade
// @Failure      500  {object}  map[string]string
// @Router       /api/portfolio/skills [get]
func (h *PortfolioHandler) GetSkills(c echo.Context) error {
	skills, err := h.portfolioService.GetSkills(c.Request().Context())
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar habilidades técnicas",
			"error", err,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao buscar habilidades técnicas",
		})
	}
	logger.DebugContext(c.Request().Context(), "Habilidades técnicas retornadas",
		"count", len(skills),
	)
	return c.JSON(http.StatusOK, skills)
}

// GetInterpersonalSkills obtém todas as habilidades interpessoais
// @Summary      Lista habilidades interpessoais
// @Description  Retorna todas as categorias de habilidades interpessoais
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Success      200  {array}   models.CategoriaHabilidade
// @Failure      500  {object}  map[string]string
// @Router       /api/portfolio/interpersonal-skills [get]
func (h *PortfolioHandler) GetInterpersonalSkills(c echo.Context) error {
	skills, err := h.portfolioService.GetInterpersonalSkills(c.Request().Context())
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar habilidades interpessoais",
			"error", err,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao buscar habilidades interpessoais",
		})
	}
	logger.DebugContext(c.Request().Context(), "Habilidades interpessoais retornadas",
		"count", len(skills),
	)
	return c.JSON(http.StatusOK, skills)
}

// GetExperiences obtém todas as experiências profissionais
// @Summary      Lista experiências profissionais
// @Description  Retorna todas as experiências profissionais
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Success      200  {array}   models.ExperienciaProfissional
// @Failure      500  {object}  map[string]string
// @Router       /api/portfolio/experiences [get]
func (h *PortfolioHandler) GetExperiences(c echo.Context) error {
	experiences, err := h.portfolioService.GetExperiences(c.Request().Context())
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar experiências",
			"error", err,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao buscar experiências",
		})
	}
	logger.DebugContext(c.Request().Context(), "Experiências retornadas",
		"count", len(experiences),
	)
	return c.JSON(http.StatusOK, experiences)
}

// GetProjects obtém todos os projetos
// @Summary      Lista projetos
// @Description  Retorna todos os projetos do portfólio
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Success      200  {array}   models.Projeto
// @Failure      500  {object}  map[string]string
// @Router       /api/portfolio/projects [get]
func (h *PortfolioHandler) GetProjects(c echo.Context) error {
	projects, err := h.portfolioService.GetProjects(c.Request().Context())
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar projetos",
			"error", err,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao buscar projetos",
		})
	}
	logger.DebugContext(c.Request().Context(), "Projetos retornados",
		"count", len(projects),
	)
	return c.JSON(http.StatusOK, projects)
}

// GetAbout obtém a seção "Sobre Mim"
// @Summary      Obtém seção About
// @Description  Retorna os dados da seção "Sobre Mim" traduzidos para o idioma especificado
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Param        language  query     string  false  "Código do idioma (pt-BR, en, es). Padrão: pt-BR"
// @Success      200      {object}  models.About
// @Failure      500      {object}  map[string]string
// @Router       /api/portfolio/about [get]
func (h *PortfolioHandler) GetAbout(c echo.Context) error {
	// Obtém idioma do query parameter ou header Accept-Language, padrão pt-BR
	language := c.QueryParam("language")
	if language == "" {
		language = c.Request().Header.Get("Accept-Language")
		if language == "" {
			language = "pt-BR"
		}
	}

	about, err := h.portfolioService.GetAbout(c.Request().Context(), language)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar seção About",
			"error", err,
			"language", language,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": fmt.Sprintf("Erro ao buscar seção About: %v", err),
		})
	}
	logger.DebugContext(c.Request().Context(), "Seção About retornada",
		"language", language,
	)
	return c.JSON(http.StatusOK, about)
}

// GetEducations obtém todas as formações acadêmicas
// @Summary      Lista formações acadêmicas
// @Description  Retorna todas as formações acadêmicas traduzidas para o idioma especificado
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Param        language  query     string  false  "Código do idioma (pt-BR, en, es). Padrão: pt-BR"
// @Success      200      {array}   models.Education
// @Failure      500      {object}  map[string]string
// @Router       /api/portfolio/educations [get]
func (h *PortfolioHandler) GetEducations(c echo.Context) error {
	// Obtém idioma do query parameter ou header Accept-Language, padrão pt-BR
	language := c.QueryParam("language")
	if language == "" {
		language = c.Request().Header.Get("Accept-Language")
		if language == "" {
			language = "pt-BR"
		}
	}

	educations, err := h.portfolioService.GetEducations(c.Request().Context(), language)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar formações",
			"error", err,
			"language", language,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": fmt.Sprintf("Erro ao buscar formações: %v", err),
		})
	}
	logger.DebugContext(c.Request().Context(), "Formações retornadas",
		"count", len(educations),
		"language", language,
	)
	return c.JSON(http.StatusOK, educations)
}

// GetCertificationCategories obtém todas as categorias de certificações
// @Summary      Lista categorias de certificações
// @Description  Retorna todas as categorias de certificações traduzidas para o idioma especificado
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Param        language  query     string  false  "Código do idioma (pt-BR, en, es). Padrão: pt-BR"
// @Success      200      {array}   models.CertificationCategory
// @Failure      500      {object}  map[string]string
// @Router       /api/portfolio/certification-categories [get]
func (h *PortfolioHandler) GetCertificationCategories(c echo.Context) error {
	// Obtém idioma do query parameter ou header Accept-Language, padrão pt-BR
	language := c.QueryParam("language")
	if language == "" {
		language = c.Request().Header.Get("Accept-Language")
		if language == "" {
			language = "pt-BR"
		}
	}

	categories, err := h.portfolioService.GetCertificationCategories(c.Request().Context(), language)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar categorias de certificações",
			"error", err,
			"language", language,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": fmt.Sprintf("Erro ao buscar categorias de certificações: %v", err),
		})
	}
	logger.DebugContext(c.Request().Context(), "Categorias de certificações retornadas",
		"count", len(categories),
		"language", language,
	)
	return c.JSON(http.StatusOK, categories)
}

// GetCertificationTracks obtém todas as trilhas de certificações
// @Summary      Lista trilhas de certificações
// @Description  Retorna todas as trilhas de certificações traduzidas para o idioma especificado
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Param        language  query     string  false  "Código do idioma (pt-BR, en, es). Padrão: pt-BR"
// @Success      200      {array}   models.CertificationTrack
// @Failure      500      {object}  map[string]string
// @Router       /api/portfolio/certification-tracks [get]
func (h *PortfolioHandler) GetCertificationTracks(c echo.Context) error {
	// Obtém idioma do query parameter ou header Accept-Language, padrão pt-BR
	language := c.QueryParam("language")
	if language == "" {
		language = c.Request().Header.Get("Accept-Language")
		if language == "" {
			language = "pt-BR"
		}
	}

	tracks, err := h.portfolioService.GetCertificationTracks(c.Request().Context(), language)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar trilhas de certificações",
			"error", err,
			"language", language,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": fmt.Sprintf("Erro ao buscar trilhas de certificações: %v", err),
		})
	}
	logger.DebugContext(c.Request().Context(), "Trilhas de certificações retornadas",
		"count", len(tracks),
		"language", language,
	)
	return c.JSON(http.StatusOK, tracks)
}

// GetContact obtém informações de contato
// @Summary      Obtém informações de contato
// @Description  Retorna as informações de contato
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Success      200  {object}  models.Contact
// @Failure      500  {object}  map[string]string
// @Router       /api/portfolio/contact [get]
func (h *PortfolioHandler) GetContact(c echo.Context) error {
	contact, err := h.portfolioService.GetContact(c.Request().Context())
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar contato",
			"error", err,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao buscar contato",
		})
	}
	logger.DebugContext(c.Request().Context(), "Informações de contato retornadas")
	return c.JSON(http.StatusOK, contact)
}

// GetTranslations obtém traduções para um idioma
// @Summary      Obtém traduções
// @Description  Retorna as traduções para o idioma especificado
// @Tags         portfolio
// @Accept       json
// @Produce      json
// @Param        language  path      string  true  "Código do idioma (pt-BR, en, es)"
// @Success      200       {object}  map[string]interface{}
// @Failure      500       {object}  map[string]string
// @Router       /api/portfolio/translations/{language} [get]
func (h *PortfolioHandler) GetTranslations(c echo.Context) error {
	language := c.Param("language")
	if language == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Idioma não especificado",
		})
	}

	translations, err := h.portfolioService.GetTranslations(c.Request().Context(), language)
	if err != nil {
		logger.ErrorContext(c.Request().Context(), "Erro ao buscar traduções",
			"error", err,
			"language", language,
		)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Erro ao buscar traduções",
		})
	}
	logger.DebugContext(c.Request().Context(), "Traduções retornadas",
		"language", language,
	)
	return c.JSON(http.StatusOK, translations)
}

