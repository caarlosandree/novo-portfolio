-- Inserção de Categorias e Trilhas de Certificações

-- Categorias de Certificações
INSERT INTO certification_categories (title, ordem)
SELECT * FROM (VALUES
    ('Programação Básica', 1),
    ('Versionamento e Desenvolvimento Web', 2),
    ('Linguagens de Programação', 3),
    ('DevOps & Observabilidade', 4),
    ('Cloud Computing – AWS', 5),
    ('Outros Cursos e Áreas de Conhecimento', 6)
) AS v(title, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM certification_categories cc WHERE cc.title = v.title
);

-- Itens da categoria 1: Programação Básica
INSERT INTO certification_items (category_id, item, ordem)
SELECT cc.id, 'Primeiros comandos', 1
FROM certification_categories cc WHERE cc.title = 'Programação Básica'
UNION ALL
SELECT cc.id, 'Estruturas condicionais', 2
FROM certification_categories cc WHERE cc.title = 'Programação Básica'
UNION ALL
SELECT cc.id, 'Estruturas de repetição', 3
FROM certification_categories cc WHERE cc.title = 'Programação Básica'
UNION ALL
SELECT cc.id, 'Variáveis compostas', 4
FROM certification_categories cc WHERE cc.title = 'Programação Básica'
UNION ALL
SELECT cc.id, 'Funções e rotinas', 5
FROM certification_categories cc WHERE cc.title = 'Programação Básica';

-- Itens da categoria 2: Versionamento e Desenvolvimento Web
INSERT INTO certification_items (category_id, item, ordem)
SELECT cc.id, 'Git e GitHub', 1
FROM certification_categories cc WHERE cc.title = 'Versionamento e Desenvolvimento Web'
UNION ALL
SELECT cc.id, 'HTML5 e CSS3 (5 módulos – Desenvolvimento Web 2020)', 2
FROM certification_categories cc WHERE cc.title = 'Versionamento e Desenvolvimento Web'
UNION ALL
SELECT cc.id, 'JavaScript', 3
FROM certification_categories cc WHERE cc.title = 'Versionamento e Desenvolvimento Web'
UNION ALL
SELECT cc.id, 'Desenvolvimento Web com AngularJS (Unicamp)', 4
FROM certification_categories cc WHERE cc.title = 'Versionamento e Desenvolvimento Web'
UNION ALL
SELECT cc.id, 'Boas Práticas em Desenvolvimento de Software (Unicamp)', 5
FROM certification_categories cc WHERE cc.title = 'Versionamento e Desenvolvimento Web';

-- Itens da categoria 3: Linguagens de Programação
INSERT INTO certification_items (category_id, item, ordem)
SELECT cc.id, 'Python 3 (Curso em Vídeo)', 1
FROM certification_categories cc WHERE cc.title = 'Linguagens de Programação'
UNION ALL
SELECT cc.id, 'Python do Básico ao Avançado, com projetos e Django', 2
FROM certification_categories cc WHERE cc.title = 'Linguagens de Programação';

-- Itens da categoria 4: DevOps & Observabilidade
INSERT INTO certification_items (category_id, item, ordem)
SELECT cc.id, 'Introdução ao DevOps', 1
FROM certification_categories cc WHERE cc.title = 'DevOps & Observabilidade'
UNION ALL
SELECT cc.id, 'Introdução à Observabilidade', 2
FROM certification_categories cc WHERE cc.title = 'DevOps & Observabilidade'
UNION ALL
SELECT cc.id, 'Docker', 3
FROM certification_categories cc WHERE cc.title = 'DevOps & Observabilidade'
UNION ALL
SELECT cc.id, 'Kubernetes', 4
FROM certification_categories cc WHERE cc.title = 'DevOps & Observabilidade'
UNION ALL
SELECT cc.id, 'Jira Software', 5
FROM certification_categories cc WHERE cc.title = 'DevOps & Observabilidade'
UNION ALL
SELECT cc.id, 'Confluence', 6
FROM certification_categories cc WHERE cc.title = 'DevOps & Observabilidade'
UNION ALL
SELECT cc.id, 'Bitbucket', 7
FROM certification_categories cc WHERE cc.title = 'DevOps & Observabilidade';

-- Itens da categoria 5: Cloud Computing – AWS
INSERT INTO certification_items (category_id, item, ordem)
SELECT cc.id, 'AWS Cloud Practitioner Essentials', 1
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS'
UNION ALL
SELECT cc.id, 'AWS re/Start Graduate (Certificação AWS Cloud Practitioner)', 2
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS'
UNION ALL
SELECT cc.id, 'Fundamentos de Arquitetura de Nuvem AWS', 3
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS'
UNION ALL
SELECT cc.id, 'Introdução ao Machine Learning na AWS', 4
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS'
UNION ALL
SELECT cc.id, 'AWS Partner Accreditation (Technical)', 5
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS'
UNION ALL
SELECT cc.id, 'AWS Builder Learner Guide', 6
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS'
UNION ALL
SELECT cc.id, 'Building Language Models on AWS', 7
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS'
UNION ALL
SELECT cc.id, 'Foundations of Prompt Engineering', 8
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS'
UNION ALL
SELECT cc.id, 'Introdução ao Amazon Bedrock', 9
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS'
UNION ALL
SELECT cc.id, 'Aplicações modernas com bancos NoSQL na AWS', 10
FROM certification_categories cc WHERE cc.title = 'Cloud Computing – AWS';

-- Itens da categoria 6: Outros Cursos e Áreas de Conhecimento
INSERT INTO certification_items (category_id, item, ordem)
SELECT cc.id, 'Inglês – nível intermediário', 1
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Manutenção de servidores e PABX', 2
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Introdução à segurança em telefonia IP', 3
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Soluções em nuvem para impulsionar negócios', 4
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Fundamentos de Voz sobre IP (VoIP)', 5
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Serviços de valor agregado – contratação e gestão', 6
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Lei Geral de Proteção de Dados (LGPD) – fundamentos', 7
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Atendimento ao cliente com excelência', 8
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Gestão da qualidade no atendimento', 9
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Elaboração de planos de comunicação eficazes', 10
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento'
UNION ALL
SELECT cc.id, 'Técnicas para encantar e fidelizar clientes', 11
FROM certification_categories cc WHERE cc.title = 'Outros Cursos e Áreas de Conhecimento';

-- Trilhas de Certificações (Alura)
-- Trilha 1: Lógica de Programação
INSERT INTO certification_tracks (title, description, icon_image, ordem)
SELECT * FROM (VALUES
    ('Lógica de Programação', 'Fundamentos essenciais para iniciantes', NULL, 1)
) AS v(title, description, icon_image, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM certification_tracks ct WHERE ct.title = v.title
);

-- Itens da trilha Lógica de Programação
INSERT INTO certification_track_items (track_id, item, ordem)
SELECT ct.id, 'Lógica de programação com JavaScript', 1
FROM certification_tracks ct WHERE ct.title = 'Lógica de Programação'
UNION ALL
SELECT ct.id, 'Fundamentos essenciais para iniciantes', 2
FROM certification_tracks ct WHERE ct.title = 'Lógica de Programação';

-- Trilha 2: Desenvolvimento Back-End com Java
INSERT INTO certification_tracks (title, description, icon_image, ordem)
SELECT * FROM (VALUES
    ('Desenvolvimento Back-End com Java', 'Carreira completa: dos fundamentos à arquitetura moderna, com Spring, testes e boas práticas.', NULL, 2)
) AS v(title, description, icon_image, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM certification_tracks ct WHERE ct.title = v.title
);

-- Níveis da trilha Java
INSERT INTO certification_track_levels (track_id, level, description, ordem)
SELECT ct.id, 'Base: Fundamentos da programação', 'Fundamentos da programação', 1
FROM certification_tracks ct WHERE ct.title = 'Desenvolvimento Back-End com Java'
UNION ALL
SELECT ct.id, 'Nível 1: Aplicações Web com Java + Spring (POO)', 'Aplicações Web com Java + Spring (POO)', 2
FROM certification_tracks ct WHERE ct.title = 'Desenvolvimento Back-End com Java'
UNION ALL
SELECT ct.id, 'Nível 2: APIs seguras, microsserviços e CI/CD', 'APIs seguras, microsserviços e CI/CD', 3
FROM certification_tracks ct WHERE ct.title = 'Desenvolvimento Back-End com Java'
UNION ALL
SELECT ct.id, 'Nível 3: Sistemas reativos, observabilidade e arquitetura avançada', 'Sistemas reativos, observabilidade e arquitetura avançada', 4
FROM certification_tracks ct WHERE ct.title = 'Desenvolvimento Back-End com Java';

-- Trilha 3: Desenvolvimento Front-End com React
INSERT INTO certification_tracks (title, description, icon_image, ordem)
SELECT * FROM (VALUES
    ('Desenvolvimento Front-End com React', 'Formação completa para criar aplicações modernas, escaláveis e de alta performance.', NULL, 3)
) AS v(title, description, icon_image, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM certification_tracks ct WHERE ct.title = v.title
);

-- Níveis da trilha React
INSERT INTO certification_track_levels (track_id, level, description, ordem)
SELECT ct.id, 'Base: Fundamentos do front-end', 'Fundamentos do front-end', 1
FROM certification_tracks ct WHERE ct.title = 'Desenvolvimento Front-End com React'
UNION ALL
SELECT ct.id, 'Nível 1: React e JSX', 'React e JSX', 2
FROM certification_tracks ct WHERE ct.title = 'Desenvolvimento Front-End com React'
UNION ALL
SELECT ct.id, 'Nível 2: TypeScript, arquitetura e testes avançados', 'TypeScript, arquitetura e testes avançados', 3
FROM certification_tracks ct WHERE ct.title = 'Desenvolvimento Front-End com React'
UNION ALL
SELECT ct.id, 'Nível 3: Performance, escalabilidade e liderança técnica', 'Performance, escalabilidade e liderança técnica', 4
FROM certification_tracks ct WHERE ct.title = 'Desenvolvimento Front-End com React';

