-- Remove traduções do themeSelector

DELETE FROM translations 
WHERE key_path IN ('themeSelector.title', 'themeSelector.subtitle', 'themeSelector.close')
AND language IN ('pt-BR', 'en', 'es');

