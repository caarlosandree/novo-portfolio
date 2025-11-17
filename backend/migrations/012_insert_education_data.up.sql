-- Inserção de Formações Acadêmicas

-- Formação 1: Redes de Computadores
INSERT INTO educations (degree, institution, location, period, type, status, description, ordem)
SELECT * FROM (VALUES
    ('Redes de Computadores', 'Centro Universitário Estácio', 'São José', 'jul/2011 – dez/2013', 'Presencial', 'completed', 'Formação focada em infraestrutura e administração de redes corporativas, com conhecimentos práticos e teóricos em:', 1)
) AS v(degree, institution, location, period, type, status, description, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM educations e 
    WHERE e.degree = v.degree 
    AND e.institution = v.institution 
    AND e.period = v.period
);

-- Tópicos da Formação 1: Redes de Computadores
INSERT INTO education_topics (education_id, topic, ordem)
SELECT e.id, 'Protocolos de rede', 1
FROM educations e WHERE e.degree = 'Redes de Computadores' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Segurança cibernética', 2
FROM educations e WHERE e.degree = 'Redes de Computadores' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Infraestrutura e arquitetura de redes', 3
FROM educations e WHERE e.degree = 'Redes de Computadores' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Manutenção e suporte a redes', 4
FROM educations e WHERE e.degree = 'Redes de Computadores' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Configuração de roteadores e switches', 5
FROM educations e WHERE e.degree = 'Redes de Computadores' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Gerenciamento de firewalls', 6
FROM educations e WHERE e.degree = 'Redes de Computadores' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Administração de servidores', 7
FROM educations e WHERE e.degree = 'Redes de Computadores' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Ferramentas de monitoramento e análise de desempenho', 8
FROM educations e WHERE e.degree = 'Redes de Computadores' AND e.institution = 'Centro Universitário Estácio';

-- Formação 2: Ciências da Computação
INSERT INTO educations (degree, institution, location, period, type, status, current_phase, description, ordem)
SELECT * FROM (VALUES
    ('Ciências da Computação', 'Centro Universitário Estácio', 'São José', 'jan/2025 – atual', 'Em andamento', 'inProgress', 'Atualmente na 2ª fase do curso', 'Curso voltado para o desenvolvimento de tecnologias e soluções computacionais, com foco em lógica, inovação e resolução de problemas complexos. Conteúdos estudados:', 2)
) AS v(degree, institution, location, period, type, status, current_phase, description, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM educations e 
    WHERE e.degree = v.degree 
    AND e.institution = v.institution 
    AND e.period = v.period
);

-- Tópicos da Formação 2: Ciências da Computação
INSERT INTO education_topics (education_id, topic, ordem)
SELECT e.id, 'Desenvolvimento de software e aplicações', 1
FROM educations e WHERE e.degree = 'Ciências da Computação' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Inteligência Artificial e Machine Learning', 2
FROM educations e WHERE e.degree = 'Ciências da Computação' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Ciência de Dados e Big Data', 3
FROM educations e WHERE e.degree = 'Ciências da Computação' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Segurança cibernética', 4
FROM educations e WHERE e.degree = 'Ciências da Computação' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Computação em nuvem', 5
FROM educations e WHERE e.degree = 'Ciências da Computação' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Desenvolvimento de jogos digitais', 6
FROM educations e WHERE e.degree = 'Ciências da Computação' AND e.institution = 'Centro Universitário Estácio'
UNION ALL
SELECT e.id, 'Pesquisa acadêmica e inovação tecnológica', 7
FROM educations e WHERE e.degree = 'Ciências da Computação' AND e.institution = 'Centro Universitário Estácio';

