-- Remove campo github_url da tabela projetos
ALTER TABLE projetos 
DROP COLUMN IF EXISTS github_url;

