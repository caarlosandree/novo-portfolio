-- Inserção de Projetos do GitHub
-- Adiciona os principais projetos do portfólio do GitHub

-- Projetos (inserir apenas se não existir)
INSERT INTO projetos (titulo, descricao, ordem)
SELECT * FROM (VALUES
    ('Novo Portfolio', 'Portfolio moderno desenvolvido com React, TypeScript e Go. Interface responsiva com suporte a múltiplos idiomas e tema claro/escuro. Backend em Go com PostgreSQL e API REST completa.', 1),
    ('Base de Conhecimento com IA', 'Sistema de base de conhecimento integrado com inteligência artificial. Permite busca inteligente e organização eficiente de informações com suporte a múltiplos idiomas.', 2),
    ('Controle de Estoque', 'Sistema completo de controle de estoque desenvolvido com Go no backend e React no frontend. Interface moderna e intuitiva para gerenciamento de produtos e inventário.', 3),
    ('VAMPETASE 2.0', 'Versão moderna e atualizada do famoso VAMPETASE. Aplicação web desenvolvida com tecnologias modernas para melhor performance e experiência do usuário.', 4),
    ('Portal de Chamados', 'Sistema de gerenciamento de chamados desenvolvido com TypeScript e React. Interface completa para criação, acompanhamento e resolução de tickets de suporte.', 5),
    ('Super Trunfo - Cidades Brasileiras', 'Implementação do clássico jogo de cartas Super Trunfo focado em cidades brasileiras. Desenvolvido com Python, Pygame para interface gráfica e PostgreSQL para gerenciamento de dados das cartas.', 6)
) AS v(titulo, descricao, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM projetos p WHERE p.titulo = v.titulo
);

-- Tecnologias dos projetos (criar tecnologias se não existirem)
INSERT INTO tecnologias (nome) VALUES
('React'),
('TypeScript'),
('Go'),
('PostgreSQL'),
('Python'),
('Pygame'),
('Material-UI'),
('Vite'),
('Echo'),
('Docker')
ON CONFLICT (nome) DO NOTHING;

-- Associar tecnologias aos projetos
-- Novo Portfolio
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Novo Portfolio' 
  AND t.nome IN ('React', 'TypeScript', 'Go', 'PostgreSQL', 'Material-UI', 'Vite', 'Echo', 'Docker')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Base de Conhecimento com IA
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Base de Conhecimento com IA' 
  AND t.nome IN ('React', 'TypeScript', 'Material-UI')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Controle de Estoque
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Controle de Estoque' 
  AND t.nome IN ('Go', 'React', 'TypeScript', 'PostgreSQL')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- VAMPETASE 2.0
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'VAMPETASE 2.0' 
  AND t.nome IN ('React', 'TypeScript', 'Material-UI')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Portal de Chamados
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Portal de Chamados' 
  AND t.nome IN ('React', 'TypeScript', 'Material-UI')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Super Trunfo - Cidades Brasileiras
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Super Trunfo - Cidades Brasileiras' 
  AND t.nome IN ('Python', 'Pygame', 'PostgreSQL')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

