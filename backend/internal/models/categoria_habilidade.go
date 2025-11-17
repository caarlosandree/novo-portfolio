package models

// CategoriaHabilidade representa uma categoria de habilidades com suas habilidades associadas
type CategoriaHabilidade struct {
	Nome        string   `json:"nome" db:"nome"`
	Habilidades []string `json:"habilidades"`
}

