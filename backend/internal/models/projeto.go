package models

// Projeto representa um projeto do portfólio
type Projeto struct {
	Titulo      string   `json:"titulo" db:"titulo"`
	Descricao   string   `json:"descricao" db:"descricao"`
	Tecnologias []string `json:"tecnologias"`
	GithubUrl   *string  `json:"github_url,omitempty" db:"github_url"`
}

