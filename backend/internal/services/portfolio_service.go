package services

import (
	"context"

	"portfolio-backend/internal/models"
	"portfolio-backend/internal/repositories"
)

type PortfolioService interface {
	GetSkills(ctx context.Context) ([]models.CategoriaHabilidade, error)
	GetInterpersonalSkills(ctx context.Context) ([]models.CategoriaHabilidade, error)
	GetExperiences(ctx context.Context) ([]models.ExperienciaProfissional, error)
	GetProjects(ctx context.Context) ([]models.Projeto, error)
	GetAbout(ctx context.Context, language string) (*models.About, error)
	GetEducations(ctx context.Context, language string) ([]models.Education, error)
	GetCertificationCategories(ctx context.Context, language string) ([]models.CertificationCategory, error)
	GetCertificationTracks(ctx context.Context, language string) ([]models.CertificationTrack, error)
	GetContact(ctx context.Context) (*models.Contact, error)
	GetTranslations(ctx context.Context, language string) (map[string]interface{}, error)
}

type portfolioService struct {
	portfolioRepo repositories.PortfolioRepository
}

func NewPortfolioService(pr repositories.PortfolioRepository) PortfolioService {
	return &portfolioService{
		portfolioRepo: pr,
	}
}

func (s *portfolioService) GetSkills(ctx context.Context) ([]models.CategoriaHabilidade, error) {
	return s.portfolioRepo.GetSkills(ctx)
}

func (s *portfolioService) GetInterpersonalSkills(ctx context.Context) ([]models.CategoriaHabilidade, error) {
	return s.portfolioRepo.GetInterpersonalSkills(ctx)
}

func (s *portfolioService) GetExperiences(ctx context.Context) ([]models.ExperienciaProfissional, error) {
	return s.portfolioRepo.GetExperiences(ctx)
}

func (s *portfolioService) GetProjects(ctx context.Context) ([]models.Projeto, error) {
	return s.portfolioRepo.GetProjects(ctx)
}

func (s *portfolioService) GetAbout(ctx context.Context, language string) (*models.About, error) {
	return s.portfolioRepo.GetAbout(ctx, language)
}

func (s *portfolioService) GetEducations(ctx context.Context, language string) ([]models.Education, error) {
	return s.portfolioRepo.GetEducations(ctx, language)
}

func (s *portfolioService) GetCertificationCategories(ctx context.Context, language string) ([]models.CertificationCategory, error) {
	return s.portfolioRepo.GetCertificationCategories(ctx, language)
}

func (s *portfolioService) GetCertificationTracks(ctx context.Context, language string) ([]models.CertificationTrack, error) {
	return s.portfolioRepo.GetCertificationTracks(ctx, language)
}

func (s *portfolioService) GetContact(ctx context.Context) (*models.Contact, error) {
	return s.portfolioRepo.GetContact(ctx)
}

func (s *portfolioService) GetTranslations(ctx context.Context, language string) (map[string]interface{}, error) {
	return s.portfolioRepo.GetTranslations(ctx, language)
}

