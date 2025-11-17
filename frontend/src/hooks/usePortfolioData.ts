import { useState, useEffect } from 'react'
import { portfolioApi } from '@/services/api'
import { useLanguage } from '@/contexts/LanguageContext'
import type { 
  CategoriaHabilidade, 
  ExperienciaProfissional, 
  Projeto,
  About,
  Education,
  CertificationCategory,
  CertificationTrack,
  Contact
} from '@/types'

interface PortfolioData {
  skills: CategoriaHabilidade[]
  interpersonalSkills: CategoriaHabilidade[]
  experiences: ExperienciaProfissional[]
  projects: Projeto[]
  about: About | null
  educations: Education[]
  certificationCategories: CertificationCategory[]
  certificationTracks: CertificationTrack[]
  contact: Contact | null
}

interface UsePortfolioDataReturn {
  data: PortfolioData | null
  loading: boolean
  error: string | null
}

/**
 * Hook para buscar dados do portfólio da API
 * Sempre usa a API, sem fallback
 */
export function usePortfolioData(): UsePortfolioDataReturn {
  const { language } = useLanguage()
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        // Busca todos os dados em paralelo
        const [
          skills,
          interpersonalSkills,
          experiences,
          projectsData,
          about,
          educations,
          certificationCategories,
          certificationTracks,
          contact,
        ] = await Promise.all([
          portfolioApi.getSkills(),
          portfolioApi.getInterpersonalSkills(),
          portfolioApi.getExperiences(),
          portfolioApi.getProjects(),
          portfolioApi.getAbout(language),
          portfolioApi.getEducations(language),
          portfolioApi.getCertificationCategories(language),
          portfolioApi.getCertificationTracks(language),
          portfolioApi.getContact(),
        ])

        if (!cancelled) {
          setData({
            skills,
            interpersonalSkills,
            experiences,
            projects: projectsData,
            about,
            educations,
            certificationCategories,
            certificationTracks,
            contact,
          })
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido')
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [language])

  return { data, loading, error }
}

