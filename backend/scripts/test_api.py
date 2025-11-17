#!/usr/bin/env python3
"""
Script para testar os endpoints da API do portfolio backend
Uso: python3 scripts/test_api.py [base_url]
"""

import sys
import requests
import json

BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080"

def test_endpoint(method: str, endpoint: str, description: str) -> bool:
    """Testa um endpoint e exibe o resultado"""
    url = f"{BASE_URL}{endpoint}"
    print(f"\n{'='*60}")
    print(f"Testando: {description}")
    print(f"{method} {url}")
    print(f"{'='*60}")
    
    try:
        if method == "GET":
            response = requests.get(url, timeout=5)
        else:
            print(f"Método {method} não implementado")
            return False
        
        print(f"Status: {response.status_code}")
        
        if response.status_code >= 200 and response.status_code < 300:
            try:
                data = response.json()
                print(f"Resposta (formatada):")
                print(json.dumps(data, indent=2, ensure_ascii=False))
                return True
            except json.JSONDecodeError:
                print(f"Resposta (texto):")
                print(response.text[:500])
                return True
        else:
            print(f"Erro: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Erro: Não foi possível conectar ao servidor")
        print("   Certifique-se de que o servidor está rodando")
        return False
    except requests.exceptions.Timeout:
        print("❌ Erro: Timeout ao conectar ao servidor")
        return False
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        return False

def main():
    print(f"Testando endpoints em: {BASE_URL}")
    print("Certifique-se de que o servidor está rodando!")
    
    results = []
    
    # Testa cada endpoint
    results.append(("Health Check", test_endpoint("GET", "/health", "Health Check")))
    results.append(("Skills", test_endpoint("GET", "/api/portfolio/skills", "Habilidades Técnicas")))
    results.append(("Interpersonal Skills", test_endpoint("GET", "/api/portfolio/interpersonal-skills", "Habilidades Interpessoais")))
    results.append(("Experiences", test_endpoint("GET", "/api/portfolio/experiences", "Experiências Profissionais")))
    results.append(("Projects", test_endpoint("GET", "/api/portfolio/projects", "Projetos")))
    results.append(("About", test_endpoint("GET", "/api/portfolio/about", "Seção About")))
    results.append(("Educations", test_endpoint("GET", "/api/portfolio/educations", "Formações Acadêmicas")))
    results.append(("Certification Categories", test_endpoint("GET", "/api/portfolio/certification-categories", "Categorias de Certificações")))
    results.append(("Certification Tracks", test_endpoint("GET", "/api/portfolio/certification-tracks", "Trilhas de Certificações")))
    results.append(("Contact", test_endpoint("GET", "/api/portfolio/contact", "Informações de Contato")))
    results.append(("Translations pt-BR", test_endpoint("GET", "/api/portfolio/translations/pt-BR", "Traduções Português (pt-BR)")))
    results.append(("Translations en", test_endpoint("GET", "/api/portfolio/translations/en", "Traduções Inglês (en)")))
    results.append(("Translations es", test_endpoint("GET", "/api/portfolio/translations/es", "Traduções Espanhol (es)")))
    
    # Resumo
    print(f"\n{'='*60}")
    print("RESUMO DOS TESTES")
    print(f"{'='*60}")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASSOU" if result else "❌ FALHOU"
        print(f"{name}: {status}")
    
    print(f"\nTotal: {passed}/{total} testes passaram")
    
    if passed == total:
        print("\n🎉 Todos os testes passaram!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} teste(s) falharam")
        return 1

if __name__ == "__main__":
    sys.exit(main())

