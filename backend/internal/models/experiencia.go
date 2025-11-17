package models

// ExperienciaProfissional representa uma experiência profissional
type ExperienciaProfissional struct {
	Cargo      string   `json:"cargo" db:"cargo"`
	Empresa    string   `json:"empresa" db:"empresa"`
	Localizacao string  `json:"localizacao" db:"localizacao"`
	Periodo    string   `json:"periodo" db:"periodo"`
	Atividades []string `json:"atividades"`
}

