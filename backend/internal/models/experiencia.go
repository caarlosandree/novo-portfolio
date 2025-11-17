package models

// ExperienciaProfissional representa uma experiência profissional
type ExperienciaProfissional struct {
	ID         int      `json:"id,omitempty" db:"id"`
	Cargo      string   `json:"cargo" db:"cargo"`
	Empresa    string   `json:"empresa" db:"empresa"`
	Localizacao string  `json:"localizacao" db:"localizacao"`
	Periodo    string   `json:"periodo" db:"periodo"`
	Ordem      int      `json:"ordem,omitempty" db:"ordem"`
	Atividades []string `json:"atividades"`
}

// CreateExperienciaRequest representa a requisição para criar uma experiência
type CreateExperienciaRequest struct {
	Cargo      string   `json:"cargo"`
	Empresa    string   `json:"empresa"`
	Localizacao string  `json:"localizacao"`
	Periodo    string   `json:"periodo"`
	Ordem      int      `json:"ordem"`
	Atividades []string `json:"atividades"`
}

// UpdateExperienciaRequest representa a requisição para atualizar uma experiência
type UpdateExperienciaRequest struct {
	Cargo      string   `json:"cargo"`
	Empresa    string   `json:"empresa"`
	Localizacao string  `json:"localizacao"`
	Periodo    string   `json:"periodo"`
	Ordem      int      `json:"ordem"`
	Atividades []string `json:"atividades"`
}

