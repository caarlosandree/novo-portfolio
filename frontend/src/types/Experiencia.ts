export interface ExperienciaProfissional {
  id?: number
  cargo: string
  empresa: string
  localizacao: string
  periodo: string
  ordem?: number
  atividades: string[]
}

export interface CreateExperienciaRequest {
  cargo: string
  empresa: string
  localizacao: string
  periodo: string
  ordem: number
  atividades: string[]
}

export interface UpdateExperienciaRequest {
  cargo: string
  empresa: string
  localizacao: string
  periodo: string
  ordem: number
  atividades: string[]
}

