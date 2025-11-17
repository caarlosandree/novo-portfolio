package services

import (
	"context"

	"portfolio-backend/internal/repositories"
)

type AdminService interface {
	UpdateTranslation(ctx context.Context, language, key, value string) error
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

