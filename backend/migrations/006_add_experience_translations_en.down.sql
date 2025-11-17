-- Remove traduções de experiências profissionais em Inglês (en)
DELETE FROM translations 
WHERE language = 'en' 
AND key_path LIKE 'experience.experiences.%';

