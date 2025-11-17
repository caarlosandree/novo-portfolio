-- Rollback: Remove projetos do GitHub

-- Remove associações de tecnologias
DELETE FROM projeto_tecnologias
WHERE projeto_id IN (
    SELECT id FROM projetos 
    WHERE titulo IN (
        'Novo Portfolio',
        'Base de Conhecimento com IA',
        'Controle de Estoque',
        'VAMPETASE 2.0',
        'Portal de Chamados',
        'Super Trunfo - Cidades Brasileiras'
    )
);

-- Remove os projetos
DELETE FROM projetos
WHERE titulo IN (
    'Novo Portfolio',
    'Base de Conhecimento com IA',
    'Controle de Estoque',
    'VAMPETASE 2.0',
    'Portal de Chamados',
    'Super Trunfo - Cidades Brasileiras'
);

