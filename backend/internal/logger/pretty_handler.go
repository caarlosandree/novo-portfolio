package logger

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"runtime"
	"strings"
	"time"
)

// Cores ANSI para terminal
const (
	colorReset  = "\033[0m"
	colorRed    = "\033[31m"
	colorGreen  = "\033[32m"
	colorYellow = "\033[33m"
	colorBlue   = "\033[34m"
	colorPurple = "\033[35m"
	colorCyan   = "\033[36m"
	colorGray   = "\033[90m"
	colorWhite  = "\033[97m"
)

// PrettyHandler é um handler customizado para logs mais bonitos
type PrettyHandler struct {
	w      io.Writer
	opts   *slog.HandlerOptions
	colors bool
}

// NewPrettyHandler cria um novo handler com formatação bonita
func NewPrettyHandler(w io.Writer, opts *slog.HandlerOptions) *PrettyHandler {
	return &PrettyHandler{
		w:      w,
		opts:   opts,
		colors: true, // Sempre usa cores
	}
}

// Enabled verifica se o nível de log está habilitado
func (h *PrettyHandler) Enabled(ctx context.Context, level slog.Level) bool {
	if h.opts == nil || h.opts.Level == nil {
		return true
	}
	return level >= h.opts.Level.Level()
}

// Handle processa o log
func (h *PrettyHandler) Handle(ctx context.Context, r slog.Record) error {
	var b strings.Builder

	// Timestamp
	timestamp := r.Time.Format("15:04:05.000")
	b.WriteString(colorGray)
	b.WriteString("[")
	b.WriteString(timestamp)
	b.WriteString("]")
	b.WriteString(colorReset)
	b.WriteString(" ")

	// Nível com cor
	levelStr := h.formatLevel(r.Level)
	b.WriteString(levelStr)
	b.WriteString(" ")

	// Mensagem
	b.WriteString(colorWhite)
	b.WriteString(r.Message)
	b.WriteString(colorReset)

	// Campos estruturados
	hasAttrs := r.NumAttrs() > 0
	hasSource := h.opts != nil && h.opts.AddSource && r.PC != 0

	if hasAttrs {
		b.WriteString("\n")
		attrs := make([]slog.Attr, 0, r.NumAttrs())
		r.Attrs(func(a slog.Attr) bool {
			attrs = append(attrs, a)
			return true
		})
		for i, a := range attrs {
			// Se tem source e é o último attr, usa └─, senão usa ├─
			isLast := i == len(attrs)-1 && !hasSource
			h.formatAttr(&b, a, isLast)
		}
	}

	// Source (arquivo:linha) se habilitado
	if hasSource {
		fs := runtime.CallersFrames([]uintptr{r.PC})
		f, _ := fs.Next()
		if f.File != "" {
			// Extrai apenas o nome do arquivo
			fileParts := strings.Split(f.File, "/")
			fileName := fileParts[len(fileParts)-1]
			if !hasAttrs {
				b.WriteString("\n")
			}
			b.WriteString(colorGray)
			b.WriteString("  └─ ")
			b.WriteString(fmt.Sprintf("%s:%d", fileName, f.Line))
			b.WriteString(colorReset)
		}
	}

	b.WriteString("\n")

	_, err := h.w.Write([]byte(b.String()))
	return err
}

// formatLevel formata o nível de log com cores
func (h *PrettyHandler) formatLevel(level slog.Level) string {
	var color, symbol, text string

	switch {
	case level >= slog.LevelError:
		color = colorRed
		symbol = "✗"
		text = "ERROR"
	case level >= slog.LevelWarn:
		color = colorYellow
		symbol = "⚠"
		text = "WARN "
	case level >= slog.LevelInfo:
		color = colorCyan
		symbol = "ℹ"
		text = "INFO "
	default:
		color = colorPurple
		symbol = "🔍"
		text = "DEBUG"
	}

	if h.colors {
		return fmt.Sprintf("%s%s %s%s", color, symbol, text, colorReset)
	}
	return fmt.Sprintf("[%s]", text)
}

// formatAttr formata um atributo
func (h *PrettyHandler) formatAttr(b *strings.Builder, a slog.Attr, isLast bool) {
	key := a.Key
	value := a.Value

	b.WriteString(colorGray)
	if isLast {
		b.WriteString("  └─ ")
	} else {
		b.WriteString("  ├─ ")
	}
	b.WriteString(colorReset)
	b.WriteString(colorCyan)
	b.WriteString(key)
	b.WriteString(colorReset)
	b.WriteString(": ")

	switch value.Kind() {
	case slog.KindString:
		b.WriteString(colorGreen)
		// Trunca strings muito longas
		str := value.String()
		if len(str) > 100 {
			str = str[:97] + "..."
		}
		b.WriteString(str)
		b.WriteString(colorReset)
	case slog.KindInt64:
		b.WriteString(colorYellow)
		b.WriteString(fmt.Sprintf("%d", value.Int64()))
		b.WriteString(colorReset)
	case slog.KindUint64:
		b.WriteString(colorYellow)
		b.WriteString(fmt.Sprintf("%d", value.Uint64()))
		b.WriteString(colorReset)
	case slog.KindFloat64:
		b.WriteString(colorYellow)
		b.WriteString(fmt.Sprintf("%.2f", value.Float64()))
		b.WriteString(colorReset)
	case slog.KindBool:
		if value.Bool() {
			b.WriteString(colorGreen)
			b.WriteString("true")
		} else {
			b.WriteString(colorRed)
			b.WriteString("false")
		}
		b.WriteString(colorReset)
	case slog.KindTime:
		b.WriteString(colorBlue)
		b.WriteString(value.Time().Format(time.RFC3339))
		b.WriteString(colorReset)
	case slog.KindDuration:
		b.WriteString(colorPurple)
		b.WriteString(value.Duration().String())
		b.WriteString(colorReset)
	case slog.KindGroup:
		b.WriteString("\n")
		groupAttrs := value.Group()
		for i, attr := range groupAttrs {
			isLastGroup := i == len(groupAttrs)-1
			h.formatAttr(b, attr, isLastGroup)
		}
		return
	case slog.KindAny:
		b.WriteString(colorGreen)
		anyStr := fmt.Sprintf("%v", value.Any())
		if len(anyStr) > 100 {
			anyStr = anyStr[:97] + "..."
		}
		b.WriteString(anyStr)
		b.WriteString(colorReset)
	default:
		b.WriteString(colorGreen)
		str := value.String()
		if len(str) > 100 {
			str = str[:97] + "..."
		}
		b.WriteString(str)
		b.WriteString(colorReset)
	}

	b.WriteString("\n")
}

// WithAttrs retorna um novo handler com atributos adicionais
func (h *PrettyHandler) WithAttrs(attrs []slog.Attr) slog.Handler {
	// Para simplificar, retornamos o mesmo handler
	// Em uma implementação mais completa, poderíamos armazenar os attrs
	return h
}

// WithGroup retorna um novo handler com um grupo
func (h *PrettyHandler) WithGroup(name string) slog.Handler {
	// Para simplificar, retornamos o mesmo handler
	return h
}
