package models

// Education representa uma formação acadêmica
type Education struct {
	ID           int      `json:"id"`
	Degree       string   `json:"degree"`
	Institution  string   `json:"institution"`
	Location     string   `json:"location"`
	Period       string   `json:"period"`
	Type         string   `json:"type"`
	Status       string   `json:"status"` // "completed" ou "inProgress"
	CurrentPhase string   `json:"currentPhase,omitempty"`
	Description  string   `json:"description"`
	Topics       []string `json:"topics"`
}
