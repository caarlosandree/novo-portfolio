package models

// Translation representa traduções para um idioma
type Translation struct {
	Language string                 `json:"language"`
	Data     map[string]interface{} `json:"data"`
}
