-- Remove projetos de exemplo (Projeto 1, 2 e 3)
-- Esses projetos foram criados apenas como exemplo na migration 003

-- Remove associações de tecnologias dos projetos de exemplo
DELETE FROM projeto_tecnologias
WHERE projeto_id IN (
    SELECT id FROM projetos 
    WHERE titulo IN ('Projeto 1', 'Projeto 2', 'Projeto 3')
);

-- Remove os projetos de exemplo
DELETE FROM projetos
WHERE titulo IN ('Projeto 1', 'Projeto 2', 'Projeto 3');

