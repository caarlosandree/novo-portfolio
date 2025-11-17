-- Inserção de dados iniciais baseados no portfolioData.ts

-- Categorias de habilidades técnicas
INSERT INTO categorias_habilidades (nome, tipo, ordem) VALUES
('Front-end & Frameworks', 'tecnica', 1),
('Back-end', 'tecnica', 2),
('Bancos de Dados', 'tecnica', 3),
('Data Science & ML', 'tecnica', 4),
('DevOps & Cloud', 'tecnica', 5),
('Ferramentas & Plataformas', 'tecnica', 6),
('Metodologias', 'tecnica', 7)
ON CONFLICT (nome, tipo) DO NOTHING;

-- Habilidades técnicas
INSERT INTO habilidades (nome, categoria_id)
SELECT 'HTML5', id FROM categorias_habilidades WHERE nome = 'Front-end & Frameworks' AND tipo = 'tecnica'
UNION ALL SELECT 'CSS3', id FROM categorias_habilidades WHERE nome = 'Front-end & Frameworks' AND tipo = 'tecnica'
UNION ALL SELECT 'JavaScript', id FROM categorias_habilidades WHERE nome = 'Front-end & Frameworks' AND tipo = 'tecnica'
UNION ALL SELECT 'TypeScript', id FROM categorias_habilidades WHERE nome = 'Front-end & Frameworks' AND tipo = 'tecnica'
UNION ALL SELECT 'React', id FROM categorias_habilidades WHERE nome = 'Front-end & Frameworks' AND tipo = 'tecnica'
UNION ALL SELECT 'Next.js', id FROM categorias_habilidades WHERE nome = 'Front-end & Frameworks' AND tipo = 'tecnica'
UNION ALL SELECT 'Vite', id FROM categorias_habilidades WHERE nome = 'Front-end & Frameworks' AND tipo = 'tecnica'
UNION ALL SELECT 'Material-UI', id FROM categorias_habilidades WHERE nome = 'Front-end & Frameworks' AND tipo = 'tecnica'
ON CONFLICT (nome, categoria_id) DO NOTHING;

INSERT INTO habilidades (nome, categoria_id)
SELECT 'Node.js', id FROM categorias_habilidades WHERE nome = 'Back-end' AND tipo = 'tecnica'
UNION ALL SELECT 'Express', id FROM categorias_habilidades WHERE nome = 'Back-end' AND tipo = 'tecnica'
UNION ALL SELECT 'NestJS', id FROM categorias_habilidades WHERE nome = 'Back-end' AND tipo = 'tecnica'
UNION ALL SELECT 'Java', id FROM categorias_habilidades WHERE nome = 'Back-end' AND tipo = 'tecnica'
UNION ALL SELECT 'Spring Boot', id FROM categorias_habilidades WHERE nome = 'Back-end' AND tipo = 'tecnica'
UNION ALL SELECT 'Go', id FROM categorias_habilidades WHERE nome = 'Back-end' AND tipo = 'tecnica'
UNION ALL SELECT 'Gradle', id FROM categorias_habilidades WHERE nome = 'Back-end' AND tipo = 'tecnica'
UNION ALL SELECT 'API REST', id FROM categorias_habilidades WHERE nome = 'Back-end' AND tipo = 'tecnica'
ON CONFLICT (nome, categoria_id) DO NOTHING;

INSERT INTO habilidades (nome, categoria_id)
SELECT 'PostgreSQL', id FROM categorias_habilidades WHERE nome = 'Bancos de Dados' AND tipo = 'tecnica'
UNION ALL SELECT 'SQL Server', id FROM categorias_habilidades WHERE nome = 'Bancos de Dados' AND tipo = 'tecnica'
UNION ALL SELECT 'DB2', id FROM categorias_habilidades WHERE nome = 'Bancos de Dados' AND tipo = 'tecnica'
UNION ALL SELECT 'MongoDB', id FROM categorias_habilidades WHERE nome = 'Bancos de Dados' AND tipo = 'tecnica'
ON CONFLICT (nome, categoria_id) DO NOTHING;

INSERT INTO habilidades (nome, categoria_id)
SELECT 'NumPy', id FROM categorias_habilidades WHERE nome = 'Data Science & ML' AND tipo = 'tecnica'
UNION ALL SELECT 'Pandas', id FROM categorias_habilidades WHERE nome = 'Data Science & ML' AND tipo = 'tecnica'
UNION ALL SELECT 'Scikit-learn', id FROM categorias_habilidades WHERE nome = 'Data Science & ML' AND tipo = 'tecnica'
UNION ALL SELECT 'TensorFlow', id FROM categorias_habilidades WHERE nome = 'Data Science & ML' AND tipo = 'tecnica'
UNION ALL SELECT 'PyTorch', id FROM categorias_habilidades WHERE nome = 'Data Science & ML' AND tipo = 'tecnica'
ON CONFLICT (nome, categoria_id) DO NOTHING;

INSERT INTO habilidades (nome, categoria_id)
SELECT 'Git', id FROM categorias_habilidades WHERE nome = 'DevOps & Cloud' AND tipo = 'tecnica'
UNION ALL SELECT 'Docker', id FROM categorias_habilidades WHERE nome = 'DevOps & Cloud' AND tipo = 'tecnica'
UNION ALL SELECT 'Google Cloud', id FROM categorias_habilidades WHERE nome = 'DevOps & Cloud' AND tipo = 'tecnica'
UNION ALL SELECT 'Cloud Run', id FROM categorias_habilidades WHERE nome = 'DevOps & Cloud' AND tipo = 'tecnica'
UNION ALL SELECT 'Cloud SQL', id FROM categorias_habilidades WHERE nome = 'DevOps & Cloud' AND tipo = 'tecnica'
UNION ALL SELECT 'Firebase', id FROM categorias_habilidades WHERE nome = 'DevOps & Cloud' AND tipo = 'tecnica'
UNION ALL SELECT 'Supabase', id FROM categorias_habilidades WHERE nome = 'DevOps & Cloud' AND tipo = 'tecnica'
UNION ALL SELECT 'Vercel', id FROM categorias_habilidades WHERE nome = 'DevOps & Cloud' AND tipo = 'tecnica'
UNION ALL SELECT 'Linux', id FROM categorias_habilidades WHERE nome = 'DevOps & Cloud' AND tipo = 'tecnica'
ON CONFLICT (nome, categoria_id) DO NOTHING;

INSERT INTO habilidades (nome, categoria_id)
SELECT 'JIRA', id FROM categorias_habilidades WHERE nome = 'Ferramentas & Plataformas' AND tipo = 'tecnica'
UNION ALL SELECT 'Tiflux', id FROM categorias_habilidades WHERE nome = 'Ferramentas & Plataformas' AND tipo = 'tecnica'
UNION ALL SELECT 'Salesforce', id FROM categorias_habilidades WHERE nome = 'Ferramentas & Plataformas' AND tipo = 'tecnica'
UNION ALL SELECT 'Metabase', id FROM categorias_habilidades WHERE nome = 'Ferramentas & Plataformas' AND tipo = 'tecnica'
UNION ALL SELECT 'POSTMAN', id FROM categorias_habilidades WHERE nome = 'Ferramentas & Plataformas' AND tipo = 'tecnica'
UNION ALL SELECT 'n8n', id FROM categorias_habilidades WHERE nome = 'Ferramentas & Plataformas' AND tipo = 'tecnica'
ON CONFLICT (nome, categoria_id) DO NOTHING;

INSERT INTO habilidades (nome, categoria_id)
SELECT 'Scrum', id FROM categorias_habilidades WHERE nome = 'Metodologias' AND tipo = 'tecnica'
UNION ALL SELECT 'Kanban', id FROM categorias_habilidades WHERE nome = 'Metodologias' AND tipo = 'tecnica'
ON CONFLICT (nome, categoria_id) DO NOTHING;

-- Categorias de habilidades interpessoais
INSERT INTO categorias_habilidades (nome, tipo, ordem) VALUES
('Comunicação e Relacionamento', 'interpessoal', 1),
('Gestão e Liderança', 'interpessoal', 2),
('Pensamento Crítico e Solução de Problemas', 'interpessoal', 3),
('Adaptabilidade e Desenvolvimento Pessoal', 'interpessoal', 4)
ON CONFLICT (nome, tipo) DO NOTHING;

-- Habilidades interpessoais
INSERT INTO habilidades (nome, categoria_id)
SELECT 'Comunicação eficaz e escuta ativa', id FROM categorias_habilidades WHERE nome = 'Comunicação e Relacionamento' AND tipo = 'interpessoal'
UNION ALL SELECT 'Empatia e habilidade de relacionamento', id FROM categorias_habilidades WHERE nome = 'Comunicação e Relacionamento' AND tipo = 'interpessoal'
UNION ALL SELECT 'Negociação e atendimento ao cliente', id FROM categorias_habilidades WHERE nome = 'Comunicação e Relacionamento' AND tipo = 'interpessoal'
UNION ALL SELECT 'Colaboração e trabalho em equipe', id FROM categorias_habilidades WHERE nome = 'Comunicação e Relacionamento' AND tipo = 'interpessoal'
ON CONFLICT (nome, categoria_id) DO NOTHING;

INSERT INTO habilidades (nome, categoria_id)
SELECT 'Liderança e visão estratégica', id FROM categorias_habilidades WHERE nome = 'Gestão e Liderança' AND tipo = 'interpessoal'
UNION ALL SELECT 'Gestão do tempo e organização', id FROM categorias_habilidades WHERE nome = 'Gestão e Liderança' AND tipo = 'interpessoal'
UNION ALL SELECT 'Condução de reuniões estratégicas', id FROM categorias_habilidades WHERE nome = 'Gestão e Liderança' AND tipo = 'interpessoal'
UNION ALL SELECT 'Elaboração de planos de ação personalizados para clientes', id FROM categorias_habilidades WHERE nome = 'Gestão e Liderança' AND tipo = 'interpessoal'
UNION ALL SELECT 'Capacitação contínua da equipe', id FROM categorias_habilidades WHERE nome = 'Gestão e Liderança' AND tipo = 'interpessoal'
ON CONFLICT (nome, categoria_id) DO NOTHING;

INSERT INTO habilidades (nome, categoria_id)
SELECT 'Pensamento analítico e crítico', id FROM categorias_habilidades WHERE nome = 'Pensamento Crítico e Solução de Problemas' AND tipo = 'interpessoal'
UNION ALL SELECT 'Resolução de problemas com foco em resultados', id FROM categorias_habilidades WHERE nome = 'Pensamento Crítico e Solução de Problemas' AND tipo = 'interpessoal'
UNION ALL SELECT 'Criatividade e inovação', id FROM categorias_habilidades WHERE nome = 'Pensamento Crítico e Solução de Problemas' AND tipo = 'interpessoal'
UNION ALL SELECT 'Atenção aos detalhes', id FROM categorias_habilidades WHERE nome = 'Pensamento Crítico e Solução de Problemas' AND tipo = 'interpessoal'
ON CONFLICT (nome, categoria_id) DO NOTHING;

INSERT INTO habilidades (nome, categoria_id)
SELECT 'Proatividade e flexibilidade', id FROM categorias_habilidades WHERE nome = 'Adaptabilidade e Desenvolvimento Pessoal' AND tipo = 'interpessoal'
UNION ALL SELECT 'Capacidade de aprendizado contínuo', id FROM categorias_habilidades WHERE nome = 'Adaptabilidade e Desenvolvimento Pessoal' AND tipo = 'interpessoal'
UNION ALL SELECT 'Adaptabilidade e aprendizado ágil', id FROM categorias_habilidades WHERE nome = 'Adaptabilidade e Desenvolvimento Pessoal' AND tipo = 'interpessoal'
ON CONFLICT (nome, categoria_id) DO NOTHING;

