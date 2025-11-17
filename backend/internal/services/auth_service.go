package services

import (
	"context"
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"portfolio-backend/internal/models"
	"portfolio-backend/internal/repositories"
	"portfolio-backend/internal/utils"
)

type AuthService interface {
	Login(ctx context.Context, username, password string) (*models.LoginResponse, error)
	ValidateToken(tokenString string) (*jwt.Token, error)
	ChangePassword(ctx context.Context, userID int, currentPassword, newPassword string) error
}

type authService struct {
	authRepo repositories.AuthRepository
}

func NewAuthService(authRepo repositories.AuthRepository) AuthService {
	return &authService{
		authRepo: authRepo,
	}
}

func (s *authService) Login(ctx context.Context, username, password string) (*models.LoginResponse, error) {
	user, err := s.authRepo.GetUserByUsername(ctx, username)
	if err != nil {
		return nil, err
	}

	if user == nil {
		return nil, errors.New("usuário ou senha inválidos")
	}

	// Verifica a senha
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return nil, errors.New("usuário ou senha inválidos")
	}

	// Gera o token JWT
	token, err := s.generateToken(user)
	if err != nil {
		return nil, err
	}

	return &models.LoginResponse{
		Token: token,
		User:  *user,
	}, nil
}

func (s *authService) generateToken(user *models.User) (string, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "your-secret-key-change-in-production"
	}

	claims := jwt.MapClaims{
		"user_id":  user.ID,
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // 24 horas
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func (s *authService) ValidateToken(tokenString string) (*jwt.Token, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "your-secret-key-change-in-production"
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("método de assinatura inválido")
		}
		return []byte(secret), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("token inválido")
	}

	return token, nil
}

func (s *authService) ChangePassword(ctx context.Context, userID int, currentPassword, newPassword string) error {
	// Valida a força da nova senha
	if err := utils.ValidatePasswordStrength(newPassword); err != nil {
		return err
	}

	// Busca o usuário
	user, err := s.authRepo.GetUserByID(ctx, userID)
	if err != nil {
		return err
	}

	if user == nil {
		return errors.New("usuário não encontrado")
	}

	// Verifica a senha atual
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(currentPassword))
	if err != nil {
		return errors.New("senha atual incorreta")
	}

	// Verifica se a nova senha é diferente da atual
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(newPassword))
	if err == nil {
		return errors.New("a nova senha deve ser diferente da senha atual")
	}

	// Gera o hash da nova senha
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("erro ao gerar hash da senha")
	}

	// Atualiza a senha
	return s.authRepo.UpdatePassword(ctx, userID, string(hashedPassword))
}

