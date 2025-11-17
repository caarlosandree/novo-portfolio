-- Rollback: Remove experiências, atividades e projetos

DELETE FROM projeto_tecnologias;
DELETE FROM atividades;
DELETE FROM experiencias;
DELETE FROM projetos;

