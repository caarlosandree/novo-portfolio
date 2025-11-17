#!/usr/bin/env python3
"""
Script para gerar migrações SQL com todas as traduções dos arquivos JSON.
"""
import json
import sys
from pathlib import Path

def flatten_json(json_obj, parent_key='', sep='.'):
    """
    Flattena um objeto JSON em um dicionário plano com paths como chaves.
    Trata arrays como chaves numéricas.
    """
    items = []
    
    if isinstance(json_obj, dict):
        for key, value in json_obj.items():
            new_key = f"{parent_key}{sep}{key}" if parent_key else key
            
            if isinstance(value, (dict, list)):
                items.extend(flatten_json(value, new_key, sep=sep))
            else:
                items.append((new_key, value))
                
    elif isinstance(json_obj, list):
        for index, value in enumerate(json_obj):
            new_key = f"{parent_key}{sep}{index}" if parent_key else str(index)
            
            if isinstance(value, (dict, list)):
                items.extend(flatten_json(value, new_key, sep=sep))
            else:
                items.append((new_key, value))
    else:
        items.append((parent_key, json_obj))
    
    return items

def escape_sql_string(value):
    """Escapa caracteres especiais para SQL."""
    if value is None:
        return 'NULL'
    
    # Converte para string se necessário
    str_value = str(value)
    
    # Escapa aspas simples duplicando-as
    escaped = str_value.replace("'", "''")
    
    return f"'{escaped}'"

def generate_migration(json_file_path, language, output_file):
    """Gera arquivo SQL de migração para um idioma."""
    with open(json_file_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)
    
    flattened = flatten_json(translations)
    
    # Agrupa inserts para melhor performance
    inserts = []
    for key_path, value in flattened:
        # Ignora valores None
        if value is None:
            continue
            
        # Converte valor para string se necessário
        if not isinstance(value, str):
            value = json.dumps(value, ensure_ascii=False)
        
        escaped_value = escape_sql_string(value)
        inserts.append(f"('{language}', '{key_path}', {escaped_value})")
    
    # Escreve arquivo SQL
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"-- Inserção de todas as traduções para {language}\n")
        f.write(f"-- Gerado automaticamente a partir de {json_file_path.name}\n\n")
        
        # Agrupa em lotes de 100 para melhor performance
        batch_size = 100
        for i in range(0, len(inserts), batch_size):
            batch = inserts[i:i+batch_size]
            f.write("INSERT INTO translations (language, key_path, value) VALUES\n")
            f.write(",\n".join(batch))
            f.write(";\n\n")

def main():
    # Caminhos dos arquivos
    base_dir = Path(__file__).parent.parent.parent
    frontend_i18n = base_dir / 'frontend' / 'src' / 'i18n' / 'locales'
    migrations_dir = base_dir / 'backend' / 'migrations'
    
    languages = {
        'pt-BR': '009_insert_all_translations_pt_br',
        'en': '010_insert_all_translations_en',
        'es': '011_insert_all_translations_es'
    }
    
    for lang, migration_name in languages.items():
        json_file = frontend_i18n / f"{lang}.json"
        up_file = migrations_dir / f"{migration_name}.up.sql"
        down_file = migrations_dir / f"{migration_name}.down.sql"
        
        if not json_file.exists():
            print(f"Arquivo não encontrado: {json_file}")
            continue
        
        print(f"Gerando migração para {lang}...")
        generate_migration(json_file, lang, up_file)
        
        # Cria arquivo down
        with open(down_file, 'w', encoding='utf-8') as f:
            f.write(f"-- Remove todas as traduções de {lang}\n")
            f.write(f"DELETE FROM translations WHERE language = '{lang}';\n")
        
        print(f"✓ {up_file.name} criado")
        print(f"✓ {down_file.name} criado")
    
    print("\n✅ Migrações geradas com sucesso!")

if __name__ == '__main__':
    main()

