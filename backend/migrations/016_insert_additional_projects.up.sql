-- Inserção de Projetos Adicionais do GitHub
-- Adiciona projetos adicionais incluindo privados

-- Projetos (inserir apenas se não existir)
INSERT INTO projetos (titulo, descricao, ordem)
SELECT * FROM (VALUES
    ('WideChat Extension', 'Extensão de navegador desenvolvida em JavaScript para deslogar automaticamente o agente do WideChat quando a aba ou navegador é fechado. Melhora a segurança e gestão de sessões.', 7),
    ('Grav Downloader', 'Aplicativo desenvolvido em JavaScript para download de gravações. Interface simples e eficiente para gerenciamento de arquivos de áudio.', 8),
    ('Plano A Portal', 'Portal completo desenvolvido com TypeScript e React para o sistema Plano A Contabilidade. Interface moderna e responsiva para gestão contábil.', 9),
    ('Monitor de Campanha', 'Sistema de monitoramento de campanhas desenvolvido em Python. Ferramenta para análise e acompanhamento de performance de campanhas de marketing.', 10),
    ('WideChat Extension 2.0', 'Nova versão modularizada da extensão WideChat. Arquitetura melhorada com código mais organizado e manutenível para gerenciamento de sessões de agentes.', 11),
    ('WideVoice Grav Download', 'Aplicativo Python para download de gravações em massa do WideVoice. Automação de processos para download e organização de arquivos de gravação.', 12),
    ('Portfolio React', 'Portfolio pessoal desenvolvido com React e JavaScript. Versão anterior do portfolio com design moderno e responsivo.', 13),
    ('Plano A - Checklist Interativo', 'Sistema de checklist interativo desenvolvido com TypeScript e React para Plano A Contabilidade. Ferramenta para organização e acompanhamento de tarefas contábeis.', 14),
    ('Plano A Mobile', 'Aplicativo mobile desenvolvido com React Native para iOS e Android. Acesso completo ao portal Plano A através de dispositivos móveis com interface nativa.', 15),
    ('Helpdesk Plano A', 'Sistema de helpdesk desenvolvido para Plano A Contabilidade. Plataforma completa para gerenciamento de suporte e atendimento ao cliente.', 16),
    ('Plano A V2', 'Sistema de controle de contabilidade versão 2.0. Plataforma completa e moderna para gestão contábil com recursos avançados e interface aprimorada.', 17),
    ('Snake Game', 'Implementação do clássico jogo da cobrinha desenvolvido com TypeScript e React. Jogo interativo com controles suaves e design moderno.', 18),
    ('Dashboard Demo', 'Demonstração de dashboards desenvolvida com Material-UI e TypeScript. Exemplos de visualizações de dados e gráficos interativos para análise de informações.', 19),
    ('React Flow', 'Projeto de demonstração e estudos com React Flow. Implementação de fluxos interativos e diagramas usando a biblioteca React Flow para visualização de processos.', 20)
) AS v(titulo, descricao, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM projetos p WHERE p.titulo = v.titulo
);

-- Tecnologias adicionais dos projetos (criar tecnologias se não existirem)
INSERT INTO tecnologias (nome) VALUES
('JavaScript'),
('React Native'),
('Chrome Extension'),
('Node.js'),
('Express'),
('HTML5'),
('CSS3')
ON CONFLICT (nome) DO NOTHING;

-- Associar tecnologias aos projetos
-- WideChat Extension
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'WideChat Extension' 
  AND t.nome IN ('JavaScript', 'Chrome Extension', 'HTML5', 'CSS3')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Grav Downloader
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Grav Downloader' 
  AND t.nome IN ('JavaScript', 'Node.js', 'Express')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Plano A Portal
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Plano A Portal' 
  AND t.nome IN ('React', 'TypeScript', 'Material-UI')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Monitor de Campanha
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Monitor de Campanha' 
  AND t.nome IN ('Python')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- WideChat Extension 2.0
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'WideChat Extension 2.0' 
  AND t.nome IN ('JavaScript', 'Chrome Extension', 'HTML5', 'CSS3')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- WideVoice Grav Download
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'WideVoice Grav Download' 
  AND t.nome IN ('Python')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Portfolio React
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Portfolio React' 
  AND t.nome IN ('React', 'JavaScript', 'HTML5', 'CSS3')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Plano A - Checklist Interativo
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Plano A - Checklist Interativo' 
  AND t.nome IN ('React', 'TypeScript', 'Material-UI')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Plano A Mobile
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Plano A Mobile' 
  AND t.nome IN ('React Native', 'TypeScript')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Helpdesk Plano A
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Helpdesk Plano A' 
  AND t.nome IN ('React', 'TypeScript', 'Material-UI')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Plano A V2
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Plano A V2' 
  AND t.nome IN ('React', 'TypeScript', 'Material-UI')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Snake Game
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Snake Game' 
  AND t.nome IN ('React', 'TypeScript', 'HTML5', 'CSS3')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- Dashboard Demo
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'Dashboard Demo' 
  AND t.nome IN ('React', 'TypeScript', 'Material-UI')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

-- React Flow
INSERT INTO projeto_tecnologias (projeto_id, tecnologia_id)
SELECT DISTINCT p.id, t.id
FROM projetos p
CROSS JOIN tecnologias t
WHERE p.titulo = 'React Flow' 
  AND t.nome IN ('React', 'TypeScript')
AND NOT EXISTS (
    SELECT 1 FROM projeto_tecnologias pt 
    WHERE pt.projeto_id = p.id AND pt.tecnologia_id = t.id
);

