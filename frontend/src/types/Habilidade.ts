export interface Habilidade {
  nome: string
  categoria: string
}

export interface CategoriaHabilidade {
  nome: string
  habilidades: string[]
  icone?: string
}

