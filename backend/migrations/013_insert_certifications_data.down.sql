-- Remover dados de certificações

-- Remover níveis de trilhas
DELETE FROM certification_track_levels 
WHERE track_id IN (
    SELECT id FROM certification_tracks 
    WHERE title IN ('Lógica de Programação', 'Desenvolvimento Back-End com Java', 'Desenvolvimento Front-End com React')
);

-- Remover itens de trilhas
DELETE FROM certification_track_items 
WHERE track_id IN (
    SELECT id FROM certification_tracks 
    WHERE title IN ('Lógica de Programação', 'Desenvolvimento Back-End com Java', 'Desenvolvimento Front-End com React')
);

-- Remover trilhas
DELETE FROM certification_tracks 
WHERE title IN ('Lógica de Programação', 'Desenvolvimento Back-End com Java', 'Desenvolvimento Front-End com React');

-- Remover itens de categorias
DELETE FROM certification_items 
WHERE category_id IN (
    SELECT id FROM certification_categories 
    WHERE title IN (
        'Programação Básica',
        'Versionamento e Desenvolvimento Web',
        'Linguagens de Programação',
        'DevOps & Observabilidade',
        'Cloud Computing – AWS',
        'Outros Cursos e Áreas de Conhecimento'
    )
);

-- Remover categorias
DELETE FROM certification_categories 
WHERE title IN (
    'Programação Básica',
    'Versionamento e Desenvolvimento Web',
    'Linguagens de Programação',
    'DevOps & Observabilidade',
    'Cloud Computing – AWS',
    'Outros Cursos e Áreas de Conhecimento'
);

