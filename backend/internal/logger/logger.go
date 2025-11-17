package logger

import (
	"context"
	"log/slog"
	"os"
)

var defaultLogger *slog.Logger

// Init inicializa o logger baseado no ambiente
func Init(env string) {
	var handler slog.Handler

	opts := &slog.HandlerOptions{
		Level:     getLogLevel(env),
		AddSource: env == "development",
	}

	if env == "production" {
		// Em produção, usa JSON para facilitar parsing por ferramentas de log
		handler = slog.NewJSONHandler(os.Stdout, opts)
	} else {
		// Em desenvolvimento, usa handler customizado bonito
		handler = NewPrettyHandler(os.Stdout, opts)
	}

	defaultLogger = slog.New(handler)
	slog.SetDefault(defaultLogger)
}

// getLogLevel retorna o nível de log baseado no ambiente
func getLogLevel(env string) slog.Level {
	switch env {
	case "production":
		return slog.LevelInfo
	case "development":
		return slog.LevelDebug
	default:
		return slog.LevelInfo
	}
}

// Logger retorna o logger padrão
func Logger() *slog.Logger {
	if defaultLogger == nil {
		// Fallback caso o logger não tenha sido inicializado
		defaultLogger = slog.Default()
	}
	return defaultLogger
}

// WithContext adiciona campos ao logger a partir do contexto
func WithContext(ctx context.Context) *slog.Logger {
	return Logger().With(
		"request_id", getRequestID(ctx),
	)
}

// getRequestID extrai o request ID do contexto (se existir)
func getRequestID(ctx context.Context) string {
	if id, ok := ctx.Value("request_id").(string); ok {
		return id
	}
	return "unknown"
}

// Helper functions para facilitar o uso

// Info loga uma mensagem de informação
func Info(msg string, args ...any) {
	Logger().Info(msg, args...)
}

// Error loga uma mensagem de erro
func Error(msg string, args ...any) {
	Logger().Error(msg, args...)
}

// Warn loga uma mensagem de aviso
func Warn(msg string, args ...any) {
	Logger().Warn(msg, args...)
}

// Debug loga uma mensagem de debug
func Debug(msg string, args ...any) {
	Logger().Debug(msg, args...)
}

// InfoContext loga uma mensagem de informação com contexto
func InfoContext(ctx context.Context, msg string, args ...any) {
	WithContext(ctx).Info(msg, args...)
}

// ErrorContext loga uma mensagem de erro com contexto
func ErrorContext(ctx context.Context, msg string, args ...any) {
	WithContext(ctx).Error(msg, args...)
}

// WarnContext loga uma mensagem de aviso com contexto
func WarnContext(ctx context.Context, msg string, args ...any) {
	WithContext(ctx).Warn(msg, args...)
}

// DebugContext loga uma mensagem de debug com contexto
func DebugContext(ctx context.Context, msg string, args ...any) {
	WithContext(ctx).Debug(msg, args...)
}
