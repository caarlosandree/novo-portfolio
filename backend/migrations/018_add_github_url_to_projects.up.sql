-- Adiciona campo github_url na tabela projetos
ALTER TABLE projetos 
ADD COLUMN IF NOT EXISTS github_url VARCHAR(500);

