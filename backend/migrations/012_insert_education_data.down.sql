-- Remover dados de formações acadêmicas

-- Remover tópicos
DELETE FROM education_topics 
WHERE education_id IN (
    SELECT id FROM educations 
    WHERE degree IN ('Redes de Computadores', 'Ciências da Computação')
    AND institution = 'Centro Universitário Estácio'
);

-- Remover formações
DELETE FROM educations 
WHERE degree IN ('Redes de Computadores', 'Ciências da Computação')
AND institution = 'Centro Universitário Estácio';

