package services

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

type TranslationService interface {
	Translate(ctx context.Context, text, sourceLang, targetLang string) (string, error)
}

type translationService struct {
	httpClient *http.Client
	apiKey     string
}

func NewTranslationService() TranslationService {
	return &translationService{
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
		apiKey: os.Getenv("GOOGLE_TRANSLATE_API_KEY"),
	}
}

// Translate traduz um texto usando Google Translate API
// Se a API key não estiver configurada, retorna o texto original
func (s *translationService) Translate(ctx context.Context, text, sourceLang, targetLang string) (string, error) {
	// Se não houver API key, retorna o texto original
	if s.apiKey == "" {
		return text, nil
	}

	// Se os idiomas forem iguais, retorna o texto original
	if sourceLang == targetLang {
		return text, nil
	}

	// Mapeia os códigos de idioma para o formato do Google Translate
	sourceCode := mapLanguageCode(sourceLang)
	targetCode := mapLanguageCode(targetLang)

	url := fmt.Sprintf("https://translation.googleapis.com/language/translate/v2?key=%s", s.apiKey)
	
	payload := map[string]interface{}{
		"q":      text,
		"source": sourceCode,
		"target": targetCode,
		"format": "text",
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("erro ao serializar payload: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, "POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("erro ao criar requisição: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("erro ao fazer requisição: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("erro na API de tradução: %s - %s", resp.Status, string(body))
	}

	var result struct {
		Data struct {
			Translations []struct {
				TranslatedText string `json:"translatedText"`
			} `json:"translations"`
		} `json:"data"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", fmt.Errorf("erro ao decodificar resposta: %w", err)
	}

	if len(result.Data.Translations) == 0 {
		return "", fmt.Errorf("nenhuma tradução retornada")
	}

	return result.Data.Translations[0].TranslatedText, nil
}

// mapLanguageCode mapeia os códigos de idioma do sistema para o formato do Google Translate
func mapLanguageCode(lang string) string {
	mapping := map[string]string{
		"pt-BR": "pt",
		"en":    "en",
		"es":    "es",
	}
	
	if code, ok := mapping[lang]; ok {
		return code
	}
	return lang
}

