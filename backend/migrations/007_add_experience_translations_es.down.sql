-- Remove traduções de experiências profissionais em Espanhol (es)
DELETE FROM translations 
WHERE language = 'es' 
AND key_path LIKE 'experience.experiences.%';

