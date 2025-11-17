-- Rollback das tabelas (ordem inversa devido às foreign keys)

DROP TABLE IF EXISTS projeto_tecnologias;
DROP TABLE IF EXISTS tecnologias;
DROP TABLE IF EXISTS projetos;
DROP TABLE IF EXISTS atividades;
DROP TABLE IF EXISTS experiencias;
DROP TABLE IF EXISTS habilidades;
DROP TABLE IF EXISTS categorias_habilidades;

