-- Criação das tabelas principais

-- Tabela de categorias de habilidades
CREATE TABLE IF NOT EXISTS categorias_habilidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('tecnica', 'interpessoal')),
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(nome, tipo)
);

-- Tabela de habilidades
CREATE TABLE IF NOT EXISTS habilidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categorias_habilidades(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(nome, categoria_id)
);

-- Tabela de experiências profissionais
CREATE TABLE IF NOT EXISTS experiencias (
    id SERIAL PRIMARY KEY,
    cargo VARCHAR(200) NOT NULL,
    empresa VARCHAR(200) NOT NULL,
    localizacao VARCHAR(100),
    periodo VARCHAR(50) NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de atividades das experiências
CREATE TABLE IF NOT EXISTS atividades (
    id SERIAL PRIMARY KEY,
    experiencia_id INTEGER NOT NULL REFERENCES experiencias(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de projetos
CREATE TABLE IF NOT EXISTS projetos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tecnologias
CREATE TABLE IF NOT EXISTS tecnologias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de relacionamento projeto-tecnologia
CREATE TABLE IF NOT EXISTS projeto_tecnologias (
    projeto_id INTEGER NOT NULL REFERENCES projetos(id) ON DELETE CASCADE,
    tecnologia_id INTEGER NOT NULL REFERENCES tecnologias(id) ON DELETE CASCADE,
    PRIMARY KEY (projeto_id, tecnologia_id)
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_habilidades_categoria ON habilidades(categoria_id);
CREATE INDEX IF NOT EXISTS idx_atividades_experiencia ON atividades(experiencia_id);
CREATE INDEX IF NOT EXISTS idx_projeto_tecnologias_projeto ON projeto_tecnologias(projeto_id);
CREATE INDEX IF NOT EXISTS idx_projeto_tecnologias_tecnologia ON projeto_tecnologias(tecnologia_id);
CREATE INDEX IF NOT EXISTS idx_categorias_tipo ON categorias_habilidades(tipo);

