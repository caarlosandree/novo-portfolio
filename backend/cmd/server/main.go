package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"portfolio-backend/internal/config"
	"portfolio-backend/internal/database"
	"portfolio-backend/internal/handlers"
	emiddleware "portfolio-backend/internal/middleware"
	"portfolio-backend/internal/logger"
	"portfolio-backend/internal/repositories"
	"portfolio-backend/internal/services"
)

func main() {
	// Teste de deploy automático via GitHub Actions
	// Carrega configurações
	cfg, err := config.LoadConfig()
	if err != nil {
		// Usa log padrão antes de inicializar o logger estruturado
		fmt.Fprintf(os.Stderr, "Erro ao carregar configurações: %v\n", err)
		os.Exit(1)
	}

	// Inicializa logger estruturado
	logger.Init(cfg.Env)
	logger.Info("Inicializando servidor",
		"env", cfg.Env,
		"port", cfg.Port,
	)

	// Conecta ao banco de dados
	db, err := database.NewPool(cfg.DatabaseURL)
	if err != nil {
		logger.Error("Erro ao conectar ao banco de dados", "error", err)
		os.Exit(1)
	}
	defer db.Close()
	logger.Info("Conexão com banco de dados estabelecida")

	// Inicializa Echo
	e := echo.New()
	e.HideBanner = true

	// Middlewares globais
	e.Use(emiddleware.RequestIDMiddleware())
	e.Use(emiddleware.StructuredLogger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"}, // Em produção, especifique os domínios permitidos
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))
	e.Use(middleware.Secure())

	// Handler de erros customizado
	e.HTTPErrorHandler = emiddleware.ErrorHandler

	// Inicializa dependências
	portfolioRepo := repositories.NewPortfolioRepository(db)
	portfolioService := services.NewPortfolioService(portfolioRepo)
	portfolioHandler := handlers.NewPortfolioHandler(portfolioService)
	healthHandler := handlers.NewHealthHandler()

	authRepo := repositories.NewAuthRepository(db)
	authService := services.NewAuthService(authRepo)
	authHandler := handlers.NewAuthHandler(authService)

	adminRepo := repositories.NewAdminRepository(db)
	adminService := services.NewAdminService(adminRepo)
	adminHandler := handlers.NewAdminHandler(adminService)

	// Rotas
	setupRoutes(e, portfolioHandler, healthHandler, authHandler, authService, adminHandler)

	// Inicia servidor em goroutine
	go func() {
		addr := fmt.Sprintf(":%s", cfg.Port)
		logger.Info("Servidor iniciado", "address", addr)
		if err := e.Start(addr); err != nil && err != http.ErrServerClosed {
			logger.Error("Erro ao iniciar servidor", "error", err)
		}
	}()

	// Aguarda sinal de interrupção
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit

	logger.Info("Recebido sinal de interrupção, iniciando graceful shutdown")

	// Graceful shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		logger.Error("Erro durante shutdown", "error", err)
		os.Exit(1)
	}

	logger.Info("Servidor encerrado com sucesso")
}

func setupRoutes(e *echo.Echo, portfolioHandler *handlers.PortfolioHandler, healthHandler *handlers.HealthHandler, authHandler *handlers.AuthHandler, authService services.AuthService, adminHandler *handlers.AdminHandler) {
	// Health check
	e.GET("/health", healthHandler.HealthCheck)

	// API routes
	api := e.Group("/api")
	
	// Rotas públicas de autenticação
	auth := api.Group("/auth")
	auth.POST("/login", authHandler.Login)
	
	// Rotas protegidas de autenticação
	protectedAuth := api.Group("/auth", emiddleware.AuthMiddleware(authService))
	protectedAuth.POST("/change-password", authHandler.ChangePassword)

	// Rotas públicas do portfólio
	portfolio := api.Group("/portfolio")
	portfolio.GET("/skills", portfolioHandler.GetSkills)
	portfolio.GET("/interpersonal-skills", portfolioHandler.GetInterpersonalSkills)
	portfolio.GET("/experiences", portfolioHandler.GetExperiences)
	portfolio.GET("/projects", portfolioHandler.GetProjects)
	portfolio.GET("/about", portfolioHandler.GetAbout)
	portfolio.GET("/educations", portfolioHandler.GetEducations)
	portfolio.GET("/certification-categories", portfolioHandler.GetCertificationCategories)
	portfolio.GET("/certification-tracks", portfolioHandler.GetCertificationTracks)
	portfolio.GET("/contact", portfolioHandler.GetContact)
	portfolio.GET("/translations/:language", portfolioHandler.GetTranslations)

	// Rotas protegidas (admin)
	admin := api.Group("/admin", emiddleware.AuthMiddleware(authService))
	
	// Rotas de administração de traduções
	admin.PUT("/translations/:language", adminHandler.UpdateTranslation)
	
	// Rotas de administração de outras entidades
	admin.PUT("/experiences/:id", adminHandler.UpdateExperience)
	admin.PUT("/projects/:id", adminHandler.UpdateProject)
}

