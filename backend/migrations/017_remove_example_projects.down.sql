-- Rollback: Restaura projetos de exemplo
-- Nota: Este rollback recria os projetos de exemplo, mas não restaura as associações de tecnologias
-- pois não temos informações sobre quais tecnologias estavam associadas originalmente

-- Restaura os projetos de exemplo
INSERT INTO projetos (titulo, descricao, ordem)
SELECT * FROM (VALUES
    ('Projeto 1', 'Descrição do projeto destacando tecnologias e resultados alcançados.', 1),
    ('Projeto 2', 'Descrição do projeto destacando tecnologias e resultados alcançados.', 2),
    ('Projeto 3', 'Descrição do projeto destacando tecnologias e resultados alcançados.', 3)
) AS v(titulo, descricao, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM projetos p WHERE p.titulo = v.titulo
);

-- Restaura associações de tecnologias (baseado na migration 003)
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE ((p.titulo = 'Projeto 1' AND t.nome IN ('React', 'TypeScript'))
   OR (p.titulo = 'Projeto 2' AND t.nome IN ('Node.js', 'Python'))
   OR (p.titulo = 'Projeto 3' AND t.nome IN ('React', 'CSS')))
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

