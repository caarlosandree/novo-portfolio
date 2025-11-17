-- Criação da tabela de usuários para autenticação

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para busca rápida por username
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Inserir usuário padrão (senha: admin123 - deve ser alterada em produção)
-- Hash bcrypt para "admin123"
INSERT INTO users (username, password_hash)
SELECT 'admin', '$2a$10$gtI8SBVZlPbb731Z5e.4E.zI.5e0NIryrkvO.W7iXoF4YOXfyFbEa'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE username = 'admin'
);

