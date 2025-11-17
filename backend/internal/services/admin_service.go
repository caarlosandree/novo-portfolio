package services

import (
	"context"
	"fmt"

	"portfolio-backend/internal/models"
	"portfolio-backend/internal/repositories"
)

type AdminService interface {
	UpdateTranslation(ctx context.Context, language, key, value string) error
	GetAllExperiences(ctx context.Context) ([]models.ExperienciaProfissional, error)
	GetExperienceByID(ctx context.Context, id int) (*models.ExperienciaProfissional, error)
	CreateExperience(ctx context.Context, exp models.CreateExperienciaRequest) (int, error)
	UpdateExperience(ctx context.Context, id int, exp models.UpdateExperienciaRequest) error
	DeleteExperience(ctx context.Context, id int) error
	SaveExperienceTranslations(ctx context.Context, expID int, expIndex int, translations map[string]models.UpdateExperienciaRequest) error
	GetExperienceTranslations(ctx context.Context, expID int) (map[string]models.UpdateExperienciaRequest, error)
}

type adminService struct {
	adminRepo repositories.AdminRepository
}

func NewAdminService(adminRepo repositories.AdminRepository) AdminService {
	return &adminService{
		adminRepo: adminRepo,
	}
}

func (s *adminService) UpdateTranslation(ctx context.Context, language, key, value string) error {
	return s.adminRepo.UpdateTranslation(ctx, language, key, value)
}

func (s *adminService) GetAllExperiences(ctx context.Context) ([]models.ExperienciaProfissional, error) {
	return s.adminRepo.GetAllExperiences(ctx)
}

func (s *adminService) GetExperienceByID(ctx context.Context, id int) (*models.ExperienciaProfissional, error) {
	return s.adminRepo.GetExperienceByID(ctx, id)
}

func (s *adminService) CreateExperience(ctx context.Context, exp models.CreateExperienciaRequest) (int, error) {
	return s.adminRepo.CreateExperience(ctx, exp)
}

func (s *adminService) UpdateExperience(ctx context.Context, id int, exp models.UpdateExperienciaRequest) error {
	return s.adminRepo.UpdateExperience(ctx, id, exp)
}

func (s *adminService) DeleteExperience(ctx context.Context, id int) error {
	return s.adminRepo.DeleteExperience(ctx, id)
}

// SaveExperienceTranslations salva as traduções de uma experiência para os 3 idiomas
func (s *adminService) SaveExperienceTranslations(ctx context.Context, expID int, expIndex int, translations map[string]models.UpdateExperienciaRequest) error {
	expKey := fmt.Sprintf("exp%d", expIndex)
	baseKey := fmt.Sprintf("experience.experiences.%s", expKey)

	// Salva traduções para cada idioma fornecido
	for lang, exp := range translations {
		// Salva os campos principais
		s.adminRepo.UpdateTranslation(ctx, lang, fmt.Sprintf("%s.cargo", baseKey), exp.Cargo)
		s.adminRepo.UpdateTranslation(ctx, lang, fmt.Sprintf("%s.empresa", baseKey), exp.Empresa)
		s.adminRepo.UpdateTranslation(ctx, lang, fmt.Sprintf("%s.localizacao", baseKey), exp.Localizacao)
		s.adminRepo.UpdateTranslation(ctx, lang, fmt.Sprintf("%s.periodo", baseKey), exp.Periodo)

		// Salva as atividades
		for i, atividade := range exp.Atividades {
			s.adminRepo.UpdateTranslation(ctx, lang, fmt.Sprintf("%s.atividades.%d", baseKey, i), atividade)
		}
	}

	return nil
}

// GetExperienceTranslations busca as traduções de uma experiência
func (s *adminService) GetExperienceTranslations(ctx context.Context, expID int) (map[string]models.UpdateExperienciaRequest, error) {
	// Busca todas as experiências para encontrar o índice
	experiences, err := s.adminRepo.GetAllExperiences(ctx)
	if err != nil {
		return nil, err
	}

	// Encontra o índice da experiência atual
	var expIndex int = -1
	for i, e := range experiences {
		if e.ID == expID {
			expIndex = i
			break
		}
	}

	if expIndex == -1 {
		return nil, fmt.Errorf("experiência não encontrada")
	}

	// Busca as traduções
	return s.adminRepo.GetExperienceTranslations(ctx, expIndex, []string{"en", "es"})
}

