-- Inserção de Experiências Profissionais e Projetos

-- Experiências Profissionais (ordem: mais recente primeiro)
-- Inserir apenas se não existir (baseado em cargo + empresa + periodo)
INSERT INTO experiencias (cargo, empresa, localizacao, periodo, ordem)
SELECT * FROM (VALUES
    ('Desenvolvedor FullStack | Tech Lead | Sócio/Fundador', 'DocSend', 'Florianópolis', '2025 – atual', 1),
    ('Analista de Sustentação Pleno', 'Nina Tecnologia', 'Palhoça', '2025 – atual', 2),
    ('Analista de Operações e Suporte Pleno', 'Intelbras', 'São José', '2020 – 2025', 3),
    ('Analista de Service Desk', 'Dígitro Tecnologia', 'Florianópolis', '2018 – 2020', 4),
    ('Analista de Service Desk', 'Flex Contact Center', 'Florianópolis', '2015 – 2018', 5),
    ('Suporte Técnico', '', '', '', 6),
    ('Suporte Técnico', 'Tríplice Consultoria', 'Florianópolis', '2014 – 2015', 7),
    ('Estagiário de Suporte Técnico', 'Dígitro Tecnologia', 'Florianópolis', '2012 – 2014', 8),
    ('Operador de Suporte Técnico', 'RM Telecomunicações', 'São José', '2011 – 2012', 9)
) AS v(cargo, empresa, localizacao, periodo, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM experiencias e 
    WHERE e.cargo = v.cargo 
    AND e.empresa = v.empresa 
    AND e.periodo = v.periodo
);

-- Atividades da experiência 1: DocSend
INSERT INTO atividades (experiencia_id, descricao, ordem)
SELECT e.id, 'Atuação como único desenvolvedor da empresa, responsável de ponta a ponta pelo ciclo de vida do produto (conceito, arquitetura, desenvolvimento, deploy, monitoramento e sustentação).', 1
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Liderança técnica como Tech Lead, definindo arquitetura, padrões de código, stack tecnológica e boas práticas de desenvolvimento para a plataforma.', 2
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Desenvolvimento de uma plataforma multitenant de gestão contábil, atendendo múltiplos escritórios/empresas dentro de uma mesma infraestrutura, com isolamento lógico de dados e configurações.', 3
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Construção de interfaces modernas e responsivas utilizando React + Vite e Material UI, com foco em usabilidade para rotinas contábeis (lançamentos, documentos, relatórios, integrações).', 4
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Implementação de APIs e serviços backend em Node.js e Java, seguindo boas práticas de arquitetura (REST, camadas, autenticação/autorização) e mantendo a segurança dos dados fiscais e contábeis.', 5
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Modelagem e manutenção do banco de dados PostgreSQL 18, incluindo estrutura de dados multitenant, otimização de consultas e criação de índices para garantir performance em volume crescente de informações.', 6
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Uso de Google Cloud (Cloud Run, Firebase, Cloud SQL) para deploy, escalabilidade e observabilidade do sistema, configurando ambientes, variáveis de ambiente, logs e monitoramento.', 7
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Definição e manutenção de pipelines de CI/CD, automatizando build, testes e deploy das aplicações, reduzindo erros manuais e acelerando a entrega de novas funcionalidades.', 8
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Implementação de mecanismos de autenticação, controle de acesso e segurança de dados sensíveis, considerando requisitos de compliance e sigilo de informações contábeis.', 9
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Criação de integrações com serviços externos (por exemplo, sistemas fiscais, emissão de documentos, providers de autenticação), incluindo consumo e disponibilização de APIs.', 10
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Definição e acompanhamento de métricas de uso da plataforma (engajamento, tempo de resposta, erros, custos de infraestrutura), apoiando a tomada de decisão sobre roadmap e otimização.', 11
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Criação de documentação técnica (arquitetura, endpoints, processos de deploy e operação) e material de apoio para clientes e equipe de negócio.', 12
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend'
UNION ALL
SELECT e.id, 'Participação ativa nas decisões estratégicas da empresa como sócio/fundador, contribuindo na definição de modelo de negócio, priorização de funcionalidades e visão de produto.', 13
FROM experiencias e WHERE e.cargo = 'Desenvolvedor FullStack | Tech Lead | Sócio/Fundador' AND e.empresa = 'DocSend';

-- Atividades da experiência 2: Nina Tecnologia
INSERT INTO atividades (experiencia_id, descricao, ordem)
SELECT e.id, 'Criação e manutenção de fluxos conversacionais e chatbots na plataforma NINA, utilizando React Flow, scripts em JavaScript e elaboração de prompts para integrações de chatbot com IA (modelos de linguagem e serviços cognitivos).', 1
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Análise de dados e criação de relatórios utilizando Metabase e SQL, gerando insights para áreas de negócio, acompanhamento de performance dos bots e identificação de oportunidades de melhoria.', 2
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Análise e resolução de bugs e incidentes críticos em ambiente de produção, garantindo a estabilidade, disponibilidade e desempenho da plataforma.', 3
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Monitoramento proativo de indicadores de saúde do ambiente (logs, alarmes, métricas de performance e uso dos fluxos de chatbot) para antecipar falhas e minimizar impactos ao cliente.', 4
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Condução de reuniões técnicas e estratégicas com clientes, levantamento de necessidades, definição de escopo e elaboração de planos de ação personalizados para evolução das jornadas conversacionais.', 5
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Criação e atualização de documentação técnica, manuais internos, base de conhecimento e procedimentos de troubleshooting, reduzindo o tempo médio de resolução e facilitando o repasse de conhecimento entre times.', 6
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Atuação conjunta com a equipe de Customer Success, produto e desenvolvimento para apoiar implantações, acompanhar indicadores de satisfação e priorizar melhorias e novas funcionalidades da plataforma NINA.', 7
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Gestão e sustentação da plataforma NINA no pós-implantação, com foco em melhoria contínua da experiência do usuário final e dos clientes corporativos.', 8
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Suporte técnico especializado para equipes técnicas dos clientes, apoiando na construção de novos projetos, integrações e implementação de novas features e facilidades.', 9
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Análise de integrações com serviços de terceiros, incluindo estudo e testes de APIs, validação de requisitos técnicos e apoio na definição de escopo de desenvolvimento.', 10
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Participação na análise de causa raiz (RCA) de incidentes, definição e acompanhamento de ações preventivas e corretivas, visando redução de recorrências.', 11
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Contribuição em projetos de melhoria de processos internos baseados em boas práticas (como ITIL), com foco em padronização de atendimentos, melhoria de fluxo entre times e ganho de eficiência operacional.', 12
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia'
UNION ALL
SELECT e.id, 'Colaboração na evolução de padrões de monitoração, observabilidade e logging da plataforma para facilitar diagnóstico e tomada de decisão em produção.', 13
FROM experiencias e WHERE e.cargo = 'Analista de Sustentação Pleno' AND e.empresa = 'Nina Tecnologia';

-- Atividades da experiência 3: Intelbras
INSERT INTO atividades (experiencia_id, descricao, ordem)
SELECT e.id, 'Análise e resolução de bugs e incidentes críticos em ambiente de produção, garantindo a estabilidade, disponibilidade e desempenho do produto.', 1
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Monitoramento proativo de indicadores de saúde do ambiente (logs, alarmes, métricas de performance) para antecipar falhas e minimizar impactos ao cliente.', 2
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Condução de reuniões estratégicas com clientes, entendimento de necessidades de negócio e elaboração de planos de ação personalizados.', 3
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Criação e atualização de documentação técnica, manuais internos, base de conhecimento (KCS) e procedimentos de troubleshooting para otimizar o fluxo de atendimento e reduzir tempo médio de resolução (MTTR).', 4
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Atuação conjunta com a equipe de Customer Success e demais áreas de negócio para apoiar implantações, acompanhar indicadores de satisfação (NPS/CSAT) e contribuir com a priorização de melhorias e novas funcionalidades.', 5
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Gestão do produto WideVoice (PABX Cloud) no pós-venda, com foco em melhoria contínua da experiência do cliente, redução de churn e aumento de adoção das funcionalidades.', 6
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Treinamento e capacitação contínua das equipes internas (N1, N2, Comercial, Implantação), assegurando alinhamento com melhores práticas de atendimento e operação.', 7
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Atendimento presencial a clientes estratégicos e críticos, garantindo rapidez, qualidade no suporte e manutenção de relacionamentos de longo prazo.', 8
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Suporte técnico especializado para equipes de Nível 1 e 2, atuando como ponto de escalonamento em incidentes complexos e problemas recorrentes.', 9
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Interface com times de desenvolvimento, QA, infraestrutura e fornecedores externos para acompanhamento de deploys, validação de melhorias, correções de bugs e novas implementações em produção.', 10
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Participação na análise de causa raiz (RCA) de incidentes e na definição de ações preventivas e corretivas.', 11
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras'
UNION ALL
SELECT e.id, 'Contribuição em projetos de melhoria de processos internos (ITIL/boas práticas), visando padronização de atendimentos, redução de retrabalho e ganho de eficiência operacional.', 12
FROM experiencias e WHERE e.cargo = 'Analista de Operações e Suporte Pleno' AND e.empresa = 'Intelbras';

-- Atividades da experiência 4: Dígitro Tecnologia (2018-2020)
INSERT INTO atividades (experiencia_id, descricao, ordem)
SELECT e.id, 'Suporte técnico e atendimento ao cliente para soluções de telecomunicação, garantindo alto nível de satisfação e cumprimento de SLAs.', 1
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Dígitro Tecnologia' AND e.periodo = '2018 – 2020'
UNION ALL
SELECT e.id, 'Atendimento de chamados de Nível 1 e 2, diagnóstico e solução de incidentes e requisições em ambiente de telefonia PABX/VoIP.', 2
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Dígitro Tecnologia' AND e.periodo = '2018 – 2020'
UNION ALL
SELECT e.id, 'Manutenção e troubleshooting em sistemas de telefonia, incluindo análise de logs, monitoração de serviços e validação de integrações com outros sistemas.', 3
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Dígitro Tecnologia' AND e.periodo = '2018 – 2020'
UNION ALL
SELECT e.id, 'Administração e suporte de bancos de dados SQL Server e aplicações integradas, incluindo execução de queries para consultas, ajustes e análises de dados.', 4
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Dígitro Tecnologia' AND e.periodo = '2018 – 2020'
UNION ALL
SELECT e.id, 'Apoio em atividades de atualização de versão, testes pós-implantação e validação de correções junto ao cliente.', 5
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Dígitro Tecnologia' AND e.periodo = '2018 – 2020'
UNION ALL
SELECT e.id, 'Registro detalhado de incidentes, problemas e soluções na ferramenta de ITSM, alimentando a base de conhecimento interna.', 6
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Dígitro Tecnologia' AND e.periodo = '2018 – 2020'
UNION ALL
SELECT e.id, 'Escalonamento de chamados para times de desenvolvimento e infraestrutura quando necessário, acompanhando o ciclo de vida até a resolução final.', 7
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Dígitro Tecnologia' AND e.periodo = '2018 – 2020'
UNION ALL
SELECT e.id, 'Apoio na elaboração de procedimentos operacionais padrão (POP) para o Service Desk.', 8
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Dígitro Tecnologia' AND e.periodo = '2018 – 2020';

-- Atividades da experiência 5: Flex Contact Center
INSERT INTO atividades (experiencia_id, descricao, ordem)
SELECT e.id, 'Suporte e manutenção de sistemas de telecomunicação e VoIP para operação de Contact Center, garantindo disponibilidade das plataformas de atendimento.', 1
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Flex Contact Center'
UNION ALL
SELECT e.id, 'Administração de equipamentos Avaya (configurações, monitoração, ajustes de ramais/URAs/filas), assegurando o correto funcionamento dos serviços de voz.', 2
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Flex Contact Center'
UNION ALL
SELECT e.id, 'Diagnóstico e resolução de falhas em rede (LAN/WAN, VLAN, QoS para voz), em conjunto com a equipe de infraestrutura quando necessário.', 3
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Flex Contact Center'
UNION ALL
SELECT e.id, 'Consulta, ajustes e manutenção em bancos de dados SQL Server e PostgreSQL para suporte às aplicações internas e relatórios operacionais.', 4
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Flex Contact Center'
UNION ALL
SELECT e.id, 'Monitoramento de filas de atendimento, canais de voz e indicadores de operação, atuando rapidamente em casos de indisponibilidade ou degradação de serviço.', 5
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Flex Contact Center'
UNION ALL
SELECT e.id, 'Apoio em atividades de implantação de novos clientes, configurações iniciais de telefonia e testes de homologação.', 6
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Flex Contact Center'
UNION ALL
SELECT e.id, 'Criação e atualização de documentação técnica, scripts de atendimento e procedimentos internos para padronizar o suporte.', 7
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Flex Contact Center'
UNION ALL
SELECT e.id, 'Atuação em regime de plantão em situações críticas, garantindo a continuidade do negócio.', 8
FROM experiencias e WHERE e.cargo = 'Analista de Service Desk' AND e.empresa = 'Flex Contact Center';

-- Atividades da experiência 6: Suporte Técnico (sem empresa)
INSERT INTO atividades (experiencia_id, descricao, ordem)
SELECT e.id, 'Manutenção e supervisão de redes de dados, incluindo identificação de falhas, substituição de equipamentos e suporte a conectividade.', 1
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND (e.empresa = '' OR e.empresa IS NULL)
UNION ALL
SELECT e.id, 'Suporte a usuários finais (on-site e remoto), incluindo instalação, configuração e atualização de softwares, sistemas operacionais e serviços corporativos.', 2
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND (e.empresa = '' OR e.empresa IS NULL)
UNION ALL
SELECT e.id, 'Instalação e configuração de serviços de rede (impressoras, compartilhamentos, e-mail, VPN, entre outros).', 3
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND (e.empresa = '' OR e.empresa IS NULL)
UNION ALL
SELECT e.id, 'Documentação de procedimentos, inventário de ativos e registro de chamados em ferramenta de atendimento.', 4
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND (e.empresa = '' OR e.empresa IS NULL)
UNION ALL
SELECT e.id, 'Apoio na melhoria da infraestrutura de TI, sugerindo ajustes e adequações para melhorar desempenho e segurança.', 5
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND (e.empresa = '' OR e.empresa IS NULL);

-- Atividades da experiência 7: Tríplice Consultoria
INSERT INTO atividades (experiencia_id, descricao, ordem)
SELECT e.id, 'Atendimento de suporte técnico a clientes internos e externos, por telefone, remoto e presencial.', 1
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND e.empresa = 'Tríplice Consultoria'
UNION ALL
SELECT e.id, 'Manutenção preventiva e corretiva de estações de trabalho, periféricos e equipamentos de rede.', 2
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND e.empresa = 'Tríplice Consultoria'
UNION ALL
SELECT e.id, 'Apoio em implantação e configuração de sistemas corporativos utilizados pelos clientes.', 3
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND e.empresa = 'Tríplice Consultoria'
UNION ALL
SELECT e.id, 'Registro, acompanhamento e encerramento de chamados em ferramenta de Service Desk, respeitando prazos e prioridades.', 4
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND e.empresa = 'Tríplice Consultoria'
UNION ALL
SELECT e.id, 'Elaboração de pequenos guias e tutoriais para usuários finais, visando reduzir recorrência de dúvidas.', 5
FROM experiencias e WHERE e.cargo = 'Suporte Técnico' AND e.empresa = 'Tríplice Consultoria';

-- Atividades da experiência 8: Dígitro Tecnologia (Estagiário)
INSERT INTO atividades (experiencia_id, descricao, ordem)
SELECT e.id, 'Apoio à equipe de suporte na triagem, registro e acompanhamento de chamados de clientes.', 1
FROM experiencias e WHERE e.cargo = 'Estagiário de Suporte Técnico' AND e.empresa = 'Dígitro Tecnologia'
UNION ALL
SELECT e.id, 'Execução de procedimentos básicos de diagnóstico e troubleshooting em sistemas de telecomunicação e infraestrutura associada.', 2
FROM experiencias e WHERE e.cargo = 'Estagiário de Suporte Técnico' AND e.empresa = 'Dígitro Tecnologia'
UNION ALL
SELECT e.id, 'Instalação e configuração inicial de softwares, clientes de telefonia e ferramentas de monitoramento.', 3
FROM experiencias e WHERE e.cargo = 'Estagiário de Suporte Técnico' AND e.empresa = 'Dígitro Tecnologia'
UNION ALL
SELECT e.id, 'Atualização de documentação, bases de conhecimento e inventário de equipamentos.', 4
FROM experiencias e WHERE e.cargo = 'Estagiário de Suporte Técnico' AND e.empresa = 'Dígitro Tecnologia'
UNION ALL
SELECT e.id, 'Suporte aos analistas em testes de novas versões e validação de correções em ambiente de homologação.', 5
FROM experiencias e WHERE e.cargo = 'Estagiário de Suporte Técnico' AND e.empresa = 'Dígitro Tecnologia';

-- Atividades da experiência 9: RM Telecomunicações
INSERT INTO atividades (experiencia_id, descricao, ordem)
SELECT e.id, 'Monitoramento de links, serviços e equipamentos de telecomunicações, atuando na identificação rápida de incidentes.', 1
FROM experiencias e WHERE e.cargo = 'Operador de Suporte Técnico' AND e.empresa = 'RM Telecomunicações'
UNION ALL
SELECT e.id, 'Abertura e acompanhamento de chamados internos e com operadoras/parceiros, garantindo comunicação clara sobre status e prazos.', 2
FROM experiencias e WHERE e.cargo = 'Operador de Suporte Técnico' AND e.empresa = 'RM Telecomunicações'
UNION ALL
SELECT e.id, 'Atendimento de primeiro nível a clientes, coleta de informações, execução de procedimentos iniciais de correção e escalonamento quando necessário.', 3
FROM experiencias e WHERE e.cargo = 'Operador de Suporte Técnico' AND e.empresa = 'RM Telecomunicações'
UNION ALL
SELECT e.id, 'Registro de eventos, falhas e ações tomadas, contribuindo para a melhoria dos processos e da base de conhecimento.', 4
FROM experiencias e WHERE e.cargo = 'Operador de Suporte Técnico' AND e.empresa = 'RM Telecomunicações';

-- Projetos (inserir apenas se não existir)
INSERT INTO projetos (titulo, descricao, ordem)
SELECT * FROM (VALUES
    ('Projeto 1', 'Descrição do projeto destacando tecnologias e resultados alcançados.', 1),
    ('Projeto 2', 'Descrição do projeto destacando tecnologias e resultados alcançados.', 2),
    ('Projeto 3', 'Descrição do projeto destacando tecnologias e resultados alcançados.', 3)
) AS v(titulo, descricao, ordem)
WHERE NOT EXISTS (
    SELECT 1 FROM projetos p WHERE p.titulo = v.titulo
);

-- Tecnologias dos projetos (criar tecnologias se não existirem e associar)
INSERT INTO tecnologias (nome) VALUES
('React'), ('TypeScript'), ('Node.js'), ('Python'), ('CSS')
ON CONFLICT (nome) DO NOTHING;

-- Associar tecnologias aos projetos (evitar duplicatas)
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

