-- Inserção de dados iniciais para About e Contact

-- Seção About (insere apenas se não existir)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM about LIMIT 1) THEN
        INSERT INTO about (title, heading) VALUES
        ('Sobre Mim', 'Desenvolvedor Full Stack apaixonado por tecnologia');
    END IF;
END $$;

-- Parágrafos do About
DO $$
DECLARE
    about_id_var INTEGER;
BEGIN
    SELECT id INTO about_id_var FROM about WHERE title = 'Sobre Mim' LIMIT 1;
    
    IF about_id_var IS NOT NULL THEN
        INSERT INTO about_paragraphs (about_id, content, ordem)
        SELECT about_id_var, 'Sou um desenvolvedor full stack com experiência na criação de aplicações web modernas, escaláveis e de alta performance. Tenho paixão por escrever código limpo, eficiente e por transformar problemas complexos em soluções simples, inovadoras e robustas.', 1
        WHERE NOT EXISTS (SELECT 1 FROM about_paragraphs WHERE ordem = 1);
        
        INSERT INTO about_paragraphs (about_id, content, ordem)
        SELECT about_id_var, 'Minha jornada na programação começou por curiosidade e evoluiu para uma carreira focada em construir soluções digitais que realmente fazem diferença. Atuo com tecnologias de ponta no desenvolvimento front-end e back-end, utilizando bancos de dados relacionais e NoSQL, além de possuir experiência em Data Science e Machine Learning.', 2
        WHERE NOT EXISTS (SELECT 1 FROM about_paragraphs WHERE ordem = 2);
        
        INSERT INTO about_paragraphs (about_id, content, ordem)
        SELECT about_id_var, 'Trabalho com metodologias ágeis (Scrum e Kanban) e utilizo ferramentas de gestão de projetos para garantir entregas consistentes, organizadas e alinhadas às necessidades do negócio. Estou sempre me atualizando com novas tecnologias e boas práticas para entregar soluções de alto impacto e qualidade.', 3
        WHERE NOT EXISTS (SELECT 1 FROM about_paragraphs WHERE ordem = 3);
        
        INSERT INTO about_paragraphs (about_id, content, ordem)
        SELECT about_id_var, 'Além disso, tenho 14 anos de experiência em suporte, sustentação e análise de sistemas, o que me proporciona uma visão ampla de arquitetura, operações e comportamento de sistemas em produção. Também possuo 1 ano de experiência como desenvolvedor React e Node.js, fortalecendo minha atuação full stack.', 4
        WHERE NOT EXISTS (SELECT 1 FROM about_paragraphs WHERE ordem = 4);
        
        INSERT INTO about_paragraphs (about_id, content, ordem)
        SELECT about_id_var, 'Atualmente, trabalho como Analista de Sistemas na NINA Tecnologia e também atuo como microempreendedor, sendo sócio, desenvolvedor full stack e tech lead na empresa de tecnologia DocSend.', 5
        WHERE NOT EXISTS (SELECT 1 FROM about_paragraphs WHERE ordem = 5);
        
        -- Features do About
        INSERT INTO about_features (about_id, title, description, ordem)
        SELECT about_id_var, 'Desenvolvimento', 'Criação de aplicações web responsivas, performáticas e escaláveis utilizando as melhores práticas do mercado', 1
        WHERE NOT EXISTS (SELECT 1 FROM about_features WHERE ordem = 1);
        
        INSERT INTO about_features (about_id, title, description, ordem)
        SELECT about_id_var, 'Stack Completo', 'Experiência em desenvolvimento full stack, desde front-end moderno até back-end robusto, passando por bancos de dados, DevOps e cloud computing', 2
        WHERE NOT EXISTS (SELECT 1 FROM about_features WHERE ordem = 2);
        
        INSERT INTO about_features (about_id, title, description, ordem)
        SELECT about_id_var, 'Inovação', 'Sempre aprendendo novas tecnologias e melhores práticas para entregar soluções de qualidade que agreguem valor aos negócios', 3
        WHERE NOT EXISTS (SELECT 1 FROM about_features WHERE ordem = 3);
    END IF;
END $$;

-- Contato (insere apenas se não existir)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM contacts LIMIT 1) THEN
        INSERT INTO contacts (email, phone) VALUES
        ('caarlosandree@gmail.com', '(48) 99924-4627');
    END IF;
END $$;

-- Itens de contato
DO $$
DECLARE
    contact_id_var INTEGER;
BEGIN
    SELECT id INTO contact_id_var FROM contacts WHERE email = 'caarlosandree@gmail.com' LIMIT 1;
    
    IF contact_id_var IS NOT NULL THEN
        INSERT INTO contact_items (contact_id, label, href, color, ordem)
        SELECT contact_id_var, 'caarlosandree@gmail.com', 'mailto:caarlosandree@gmail.com', '#D32F2F', 1
        WHERE NOT EXISTS (SELECT 1 FROM contact_items WHERE ordem = 1);
        
        INSERT INTO contact_items (contact_id, label, href, color, ordem)
        SELECT contact_id_var, '(48) 99924-4627', 'tel:+5548999244627', '#1976D2', 2
        WHERE NOT EXISTS (SELECT 1 FROM contact_items WHERE ordem = 2);
        
        INSERT INTO contact_items (contact_id, label, href, color, ordem)
        SELECT contact_id_var, 'LinkedIn - /in/caarlosandree', 'https://www.linkedin.com/in/caarlosandree/', '#0A66C2', 3
        WHERE NOT EXISTS (SELECT 1 FROM contact_items WHERE ordem = 3);
        
        INSERT INTO contact_items (contact_id, label, href, color, ordem)
        SELECT contact_id_var, 'GitHub - /caarlosandree', 'https://github.com/caarlosandree', '#24292E', 4
        WHERE NOT EXISTS (SELECT 1 FROM contact_items WHERE ordem = 4);
        
        INSERT INTO contact_items (contact_id, label, href, color, ordem)
        SELECT contact_id_var, 'Instagram - @carlosasab', 'https://www.instagram.com/carlosasab/', '#E4405F', 5
        WHERE NOT EXISTS (SELECT 1 FROM contact_items WHERE ordem = 5);
        
        INSERT INTO contact_items (contact_id, label, href, color, ordem)
        SELECT contact_id_var, 'WhatsApp - (48) 99924-4627', 'https://api.whatsapp.com/send/?phone=5548999244627&text&type=phone_number&app_absent=0', '#25D366', 6
        WHERE NOT EXISTS (SELECT 1 FROM contact_items WHERE ordem = 6);
    END IF;
END $$;
