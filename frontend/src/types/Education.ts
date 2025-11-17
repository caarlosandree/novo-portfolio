export interface Education {
  id: number
  degree: string
  institution: string
  location: string
  period: string
  type: string
  status: 'completed' | 'inProgress'
  currentPhase?: string
  description: string
  topics: string[]
}

