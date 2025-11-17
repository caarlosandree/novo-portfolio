-- Remove índices
DROP INDEX IF EXISTS idx_translations_key;
DROP INDEX IF EXISTS idx_translations_language;
DROP INDEX IF EXISTS idx_contact_items_contact;
DROP INDEX IF EXISTS idx_certification_track_levels_track;
DROP INDEX IF EXISTS idx_certification_track_items_track;
DROP INDEX IF EXISTS idx_certification_items_category;
DROP INDEX IF EXISTS idx_education_topics_education;
DROP INDEX IF EXISTS idx_about_features_about;
DROP INDEX IF EXISTS idx_about_paragraphs_about;

-- Remove tabelas
DROP TABLE IF EXISTS translations;
DROP TABLE IF EXISTS contact_items;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS certification_track_levels;
DROP TABLE IF EXISTS certification_track_items;
DROP TABLE IF EXISTS certification_tracks;
DROP TABLE IF EXISTS certification_items;
DROP TABLE IF EXISTS certification_categories;
DROP TABLE IF EXISTS education_topics;
DROP TABLE IF EXISTS educations;
DROP TABLE IF EXISTS about_features;
DROP TABLE IF EXISTS about_paragraphs;
DROP TABLE IF EXISTS about;
