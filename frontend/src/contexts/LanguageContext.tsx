import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { portfolioApi } from '@/services/api'

type Language = 'pt-BR' | 'en' | 'es'

interface LanguageContextType {
  language: Language
  changeLanguage: (lang: Language) => void
  t: (key: string, options?: Record<string, unknown>) => string
  translations: Record<string, unknown> | null
  loading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

// Helper para buscar valor aninhado em objeto
function getNestedValue(obj: Record<string, unknown> | null | undefined, path: string): unknown {
  if (!obj) return undefined
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language
    return savedLang || 'pt-BR'
  })
  const [translations, setTranslations] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)

  // Carrega traduções da API
  useEffect(() => {
    console.log(`[LanguageContext] useEffect disparado para idioma: ${language}`)
    let cancelled = false
    const currentLanguage = language

    async function loadTranslations() {
      console.log(`[LanguageContext] loadTranslations iniciado para idioma: ${currentLanguage}`)
      setLoading(true)
      try {
        // Sempre chama a API, mesmo para pt-BR (para garantir que as traduções estejam disponíveis)
        console.log(`[LanguageContext] Chamando portfolioApi.getTranslations('${currentLanguage}')`)
        const data = await portfolioApi.getTranslations(currentLanguage)
        console.log(`[LanguageContext] Resposta recebida do getTranslations para ${currentLanguage}:`, data)
        
        // Só atualiza se ainda estamos no mesmo idioma (não foi cancelado ou mudou)
        // Verifica se ainda estamos no idioma correto (pode ter mudado durante a requisição)
        if (!cancelled && currentLanguage === language) {
          console.log(`[LanguageContext] Configurando traduções no estado para ${currentLanguage}`)
          setTranslations(data)
          setLoading(false)
          console.log(`[LanguageContext] Traduções configuradas com sucesso para ${currentLanguage}`)
        } else {
          console.log(`[LanguageContext] Requisição foi cancelada ou idioma mudou - requisição: ${currentLanguage}, atual: ${language}`)
          // Ainda atualiza o loading mesmo se cancelado para evitar estado de loading infinito
          if (currentLanguage === language) {
            setLoading(false)
          }
        }
      } catch (error) {
        console.error(`[LanguageContext] Erro ao carregar traduções para ${currentLanguage}:`, error)
        // Só atualiza loading se ainda estamos no mesmo idioma
        if (!cancelled && currentLanguage === language) {
          setLoading(false)
        }
      }
    }

    loadTranslations()
    localStorage.setItem('language', language)

    return () => {
      console.log(`[LanguageContext] Cleanup do useEffect para idioma: ${language}`)
      cancelled = true
    }
  }, [language])

  const changeLanguage = useCallback((lang: Language) => {
    console.log(`[LanguageContext] changeLanguage chamado: ${language} -> ${lang}`)
    setLanguage(lang)
    // Salva no localStorage imediatamente
    localStorage.setItem('language', lang)
    console.log(`[LanguageContext] Estado language atualizado para: ${lang}`)
  }, [language])

  const t = useCallback((key: string, options?: Record<string, unknown>): string => {
    // Busca nas traduções do backend
    if (!translations) {
      if (import.meta.env.DEV) {
        console.warn(`[LanguageContext] t('${key}') - traduções não disponíveis`)
      }
      return key
    }
    
    let value = getNestedValue(translations, key)
    
    // Se não encontrou, retorna a chave
    if (value === undefined || value === null) {
      if (import.meta.env.DEV) {
        console.warn(`[LanguageContext] t('${key}') - chave não encontrada nas traduções. Chaves disponíveis:`, Object.keys(translations))
        // Mostra estrutura para debug
        const firstKey = key.split('.')[0]
        if (firstKey && firstKey in translations) {
          console.warn(`[LanguageContext] Primeira parte da chave ('${firstKey}') existe:`, translations[firstKey])
        } else {
          console.warn(`[LanguageContext] Primeira parte da chave ('${firstKey}') NÃO existe`)
        }
      }
      return key
    }
    
    // Se o valor não é string, tenta converter
    if (typeof value !== 'string') {
      if (import.meta.env.DEV) {
        console.warn(`[LanguageContext] t('${key}') - valor encontrado mas não é string:`, typeof value, value)
      }
      return key
    }
    
    // Substitui placeholders como {{count}}
    if (options) {
      Object.entries(options).forEach(([k, v]) => {
        value = (value as string).replace(new RegExp(`{{${k}}}`, 'g'), String(v))
      })
    }
    
    return value as string
  }, [translations])

  // Garantir que o contexto sempre tenha um valor válido
  const contextValue: LanguageContextType = {
    language,
    changeLanguage,
    t,
    translations,
    loading,
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Retorna valores padrão em vez de lançar erro
    // Isso previne erros durante o lazy loading de componentes
    const defaultValue: LanguageContextType = {
      language: 'pt-BR' as Language,
      changeLanguage: () => {},
      t: (key: string) => key,
      translations: null,
      loading: true,
    }
    return defaultValue
  }
  return context
}

