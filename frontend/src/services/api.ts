import type { 
  CategoriaHabilidade, 
  ExperienciaProfissional,
  CreateExperienciaRequest,
  UpdateExperienciaRequest,
  Projeto,
  About,
  Education,
  CertificationCategory,
  CertificationTrack,
  Contact
} from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new ApiError(
        `Erro ao buscar dados: ${response.statusText}`,
        response.status,
        response,
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Erro de rede ou outros erros
    throw new ApiError(
      `Erro de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
    )
  }
}

export const portfolioApi = {
  /**
   * Busca todas as habilidades técnicas
   */
  async getSkills(): Promise<CategoriaHabilidade[]> {
    return fetchApi<CategoriaHabilidade[]>('/api/portfolio/skills')
  },

  /**
   * Busca todas as habilidades interpessoais
   */
  async getInterpersonalSkills(): Promise<CategoriaHabilidade[]> {
    return fetchApi<CategoriaHabilidade[]>('/api/portfolio/interpersonal-skills')
  },

  /**
   * Busca todas as experiências profissionais
   */
  async getExperiences(): Promise<ExperienciaProfissional[]> {
    return fetchApi<ExperienciaProfissional[]>('/api/portfolio/experiences')
  },

  /**
   * Busca todos os projetos
   */
  async getProjects(): Promise<Projeto[]> {
    return fetchApi<Projeto[]>('/api/portfolio/projects')
  },

  /**
   * Busca a seção "Sobre Mim"
   * @param language - Idioma para tradução (pt-BR, en, es). Padrão: pt-BR
   */
  async getAbout(language: string = 'pt-BR'): Promise<About> {
    return fetchApi<About>(`/api/portfolio/about?language=${language}`)
  },

  /**
   * Busca todas as formações acadêmicas
   * @param language - Idioma para tradução (pt-BR, en, es). Padrão: pt-BR
   */
  async getEducations(language: string = 'pt-BR'): Promise<Education[]> {
    return fetchApi<Education[]>(`/api/portfolio/educations?language=${language}`)
  },

  /**
   * Busca todas as categorias de certificações
   * @param language - Idioma para tradução (pt-BR, en, es). Padrão: pt-BR
   */
  async getCertificationCategories(language: string = 'pt-BR'): Promise<CertificationCategory[]> {
    return fetchApi<CertificationCategory[]>(`/api/portfolio/certification-categories?language=${language}`)
  },

  /**
   * Busca todas as trilhas de certificações
   * @param language - Idioma para tradução (pt-BR, en, es). Padrão: pt-BR
   */
  async getCertificationTracks(language: string = 'pt-BR'): Promise<CertificationTrack[]> {
    return fetchApi<CertificationTrack[]>(`/api/portfolio/certification-tracks?language=${language}`)
  },

  /**
   * Busca informações de contato
   */
  async getContact(): Promise<Contact> {
    return fetchApi<Contact>('/api/portfolio/contact')
  },

  /**
   * Busca traduções para um idioma
   */
  async getTranslations(language: string): Promise<Record<string, unknown>> {
    const endpoint = `/api/portfolio/translations/${language}`
    return fetchApi<Record<string, unknown>>(endpoint)
  },

  /**
   * Verifica se a API está disponível
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
      })
      return response.ok
    } catch {
      return false
    }
  },

  /**
   * Métodos de administração (requerem autenticação)
   */
  async fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('portfolio_auth_token')
    if (!token) {
      throw new ApiError('Token de autenticação não encontrado')
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }))
      throw new ApiError(error.error || 'Erro na requisição', response.status, response)
    }

    return await response.json()
  },

  /**
   * Busca todas as experiências (admin)
   */
  async getAllExperiences(): Promise<ExperienciaProfissional[]> {
    return this.fetchWithAuth<ExperienciaProfissional[]>('/api/admin/experiences')
  },

  /**
   * Busca uma experiência por ID (admin)
   */
  async getExperience(id: number): Promise<ExperienciaProfissional> {
    return this.fetchWithAuth<ExperienciaProfissional>(`/api/admin/experiences/${id}`)
  },

  /**
   * Cria uma nova experiência (admin)
   */
  async createExperience(exp: CreateExperienciaRequest): Promise<{ id: number; message: string }> {
    return this.fetchWithAuth<{ id: number; message: string }>('/api/admin/experiences', {
      method: 'POST',
      body: JSON.stringify(exp),
    })
  },

  /**
   * Atualiza uma experiência (admin)
   */
  async updateExperience(id: number, exp: UpdateExperienciaRequest): Promise<{ message: string }> {
    return this.fetchWithAuth<{ message: string }>(`/api/admin/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(exp),
    })
  },

  /**
   * Deleta uma experiência (admin)
   */
  async deleteExperience(id: number): Promise<{ message: string }> {
    return this.fetchWithAuth<{ message: string }>(`/api/admin/experiences/${id}`, {
      method: 'DELETE',
    })
  },

  /**
   * Busca traduções de uma experiência (admin)
   */
  async getExperienceTranslations(id: number): Promise<Record<string, UpdateExperienciaRequest>> {
    return this.fetchWithAuth<Record<string, UpdateExperienciaRequest>>(`/api/admin/experiences/${id}/translations`)
  },

  /**
   * Salva traduções de uma experiência (admin)
   */
  async saveExperienceTranslations(id: number, translations: Record<string, UpdateExperienciaRequest>): Promise<{ message: string }> {
    return this.fetchWithAuth<{ message: string }>(`/api/admin/experiences/${id}/translations`, {
      method: 'POST',
      body: JSON.stringify(translations),
    })
  },
}

export { ApiError }

