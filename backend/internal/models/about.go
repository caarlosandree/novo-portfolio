package models

// About representa a seção "Sobre Mim"
type About struct {
	Title       string   `json:"title"`
	Heading     string   `json:"heading"`
	Paragraphs []string  `json:"paragraphs"`
	Features    []Feature `json:"features"`
}

// Feature representa uma feature da seção About
type Feature struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}
