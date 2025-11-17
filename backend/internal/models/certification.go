package models

// CertificationCategory representa uma categoria de certificação
type CertificationCategory struct {
	Title string   `json:"title"`
	Items []string `json:"items"`
}

// CertificationTrack representa uma trilha de certificação (ex: Alura)
type CertificationTrack struct {
	Title       string      `json:"title"`
	Description string      `json:"description,omitempty"`
	IconImage   string      `json:"iconImage,omitempty"`
	Items       []string    `json:"items,omitempty"`
	Levels      []TrackLevel `json:"levels,omitempty"`
}

// TrackLevel representa um nível de uma trilha
type TrackLevel struct {
	Level       string `json:"level"`
	Description string `json:"description"`
}
