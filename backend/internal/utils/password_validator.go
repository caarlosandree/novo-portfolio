package utils

import (
	"errors"
	"strings"
	"unicode"
)

// PasswordStrength representa a força da senha
type PasswordStrength int

const (
	PasswordWeak PasswordStrength = iota
	PasswordMedium
	PasswordStrong
)

// ValidatePasswordStrength valida a força da senha
// Retorna erro se a senha não atender aos requisitos mínimos
func ValidatePasswordStrength(password string) error {
	if len(password) < 8 {
		return errors.New("a senha deve ter no mínimo 8 caracteres")
	}

	if len(password) > 128 {
		return errors.New("a senha deve ter no máximo 128 caracteres")
	}

	var (
		hasUpper   = false
		hasLower   = false
		hasNumber  = false
		hasSpecial = false
	)

	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsNumber(char):
			hasNumber = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSpecial = true
		}
	}

	var missing []string
	if !hasUpper {
		missing = append(missing, "letra maiúscula")
	}
	if !hasLower {
		missing = append(missing, "letra minúscula")
	}
	if !hasNumber {
		missing = append(missing, "número")
	}
	if !hasSpecial {
		missing = append(missing, "caractere especial")
	}

	if len(missing) > 0 {
		return errors.New("a senha deve conter pelo menos: " + strings.Join(missing, ", "))
	}

	return nil
}

// GetPasswordStrength retorna a força da senha (sem validar requisitos mínimos)
func GetPasswordStrength(password string) PasswordStrength {
	if len(password) < 8 {
		return PasswordWeak
	}

	var (
		hasUpper   = false
		hasLower   = false
		hasNumber  = false
		hasSpecial = false
		score      = 0
	)

	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsNumber(char):
			hasNumber = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSpecial = true
		}
	}

	if hasUpper {
		score++
	}
	if hasLower {
		score++
	}
	if hasNumber {
		score++
	}
	if hasSpecial {
		score++
	}

	// Pontuação baseada no comprimento
	if len(password) >= 12 {
		score++
	}
	if len(password) >= 16 {
		score++
	}

	if score <= 2 {
		return PasswordWeak
	}
	if score <= 4 {
		return PasswordMedium
	}
	return PasswordStrong
}

