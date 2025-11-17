package models

// Contact representa informações de contato
type Contact struct {
	Email    string        `json:"email"`
	Phone    string        `json:"phone"`
	Contacts []ContactItem `json:"contacts"`
}

// ContactItem representa um item de contato (LinkedIn, GitHub, etc)
type ContactItem struct {
	Label string `json:"label"`
	Href  string `json:"href"`
	Color string `json:"color"`
}
