-- Tabela para seção About (Sobre Mim)
CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    heading VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de parágrafos do About
CREATE TABLE IF NOT EXISTS about_paragraphs (
    id SERIAL PRIMARY KEY,
    about_id INTEGER NOT NULL REFERENCES about(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de features do About
CREATE TABLE IF NOT EXISTS about_features (
    id SERIAL PRIMARY KEY,
    about_id INTEGER NOT NULL REFERENCES about(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de formações acadêmicas
CREATE TABLE IF NOT EXISTS educations (
    id SERIAL PRIMARY KEY,
    degree VARCHAR(200) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    location VARCHAR(100),
    period VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('completed', 'inProgress')),
    current_phase VARCHAR(200),
    description TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tópicos das formações
CREATE TABLE IF NOT EXISTS education_topics (
    id SERIAL PRIMARY KEY,
    education_id INTEGER NOT NULL REFERENCES educations(id) ON DELETE CASCADE,
    topic VARCHAR(200) NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias de certificações
CREATE TABLE IF NOT EXISTS certification_categories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens de certificações
CREATE TABLE IF NOT EXISTS certification_items (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES certification_categories(id) ON DELETE CASCADE,
    item VARCHAR(300) NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de trilhas de certificações
CREATE TABLE IF NOT EXISTS certification_tracks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon_image VARCHAR(500),
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens de trilhas (quando não tem levels)
CREATE TABLE IF NOT EXISTS certification_track_items (
    id SERIAL PRIMARY KEY,
    track_id INTEGER NOT NULL REFERENCES certification_tracks(id) ON DELETE CASCADE,
    item VARCHAR(300) NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de níveis de trilhas
CREATE TABLE IF NOT EXISTS certification_track_levels (
    id SERIAL PRIMARY KEY,
    track_id INTEGER NOT NULL REFERENCES certification_tracks(id) ON DELETE CASCADE,
    level VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de contatos
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens de contato (LinkedIn, GitHub, etc)
CREATE TABLE IF NOT EXISTS contact_items (
    id SERIAL PRIMARY KEY,
    contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    href VARCHAR(500) NOT NULL,
    color VARCHAR(20) NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de traduções
CREATE TABLE IF NOT EXISTS translations (
    id SERIAL PRIMARY KEY,
    language VARCHAR(10) NOT NULL,
    key_path VARCHAR(500) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(language, key_path)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_about_paragraphs_about ON about_paragraphs(about_id);
CREATE INDEX IF NOT EXISTS idx_about_features_about ON about_features(about_id);
CREATE INDEX IF NOT EXISTS idx_education_topics_education ON education_topics(education_id);
CREATE INDEX IF NOT EXISTS idx_certification_items_category ON certification_items(category_id);
CREATE INDEX IF NOT EXISTS idx_certification_track_items_track ON certification_track_items(track_id);
CREATE INDEX IF NOT EXISTS idx_certification_track_levels_track ON certification_track_levels(track_id);
CREATE INDEX IF NOT EXISTS idx_contact_items_contact ON contact_items(contact_id);
CREATE INDEX IF NOT EXISTS idx_translations_language ON translations(language);
CREATE INDEX IF NOT EXISTS idx_translations_key ON translations(key_path);
