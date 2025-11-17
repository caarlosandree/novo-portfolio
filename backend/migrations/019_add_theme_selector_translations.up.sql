-- Adiciona traduções do themeSelector para os 3 idiomas
-- Usa ON CONFLICT para atualizar traduções existentes

INSERT INTO translations (language, key_path, value) VALUES
('pt-BR', 'themeSelector.title', 'Selecionar Tema'),
('pt-BR', 'themeSelector.subtitle', 'Escolha uma paleta de cores para personalizar sua experiência'),
('pt-BR', 'themeSelector.close', 'Fechar'),
('en', 'themeSelector.title', 'Select Theme'),
('en', 'themeSelector.subtitle', 'Choose a color palette to customize your experience'),
('en', 'themeSelector.close', 'Close'),
('es', 'themeSelector.title', 'Seleccionar Tema'),
('es', 'themeSelector.subtitle', 'Elige una paleta de colores para personalizar tu experiencia'),
('es', 'themeSelector.close', 'Cerrar')
ON CONFLICT (language, key_path) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP;

