-- Remove traduções de experiências profissionais em Português (pt-BR)
DELETE FROM translations 
WHERE language = 'pt-BR' 
AND key_path LIKE 'experience.experiences.%';

