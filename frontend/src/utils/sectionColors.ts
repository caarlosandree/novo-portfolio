// Cores por seção - paleta harmoniosa baseada em azul/ciano
export const sectionColors = {
  hero: {
    main: '#4FC3F7', // Azul primário
    light: '#81D4FA',
    dark: '#29B6F6',
    bgLight: 'rgba(79, 195, 247, 0.05)',
    bgDark: 'rgba(79, 195, 247, 0.03)',
  },
  about: {
    main: '#00BCD4', // Ciano vibrante
    light: '#4DD0E1',
    dark: '#0097A7',
    bgLight: 'rgba(0, 188, 212, 0.05)',
    bgDark: 'rgba(0, 188, 212, 0.03)',
  },
  education: {
    main: '#5C6BC0', // Índigo
    light: '#7986CB',
    dark: '#3F51B5',
    bgLight: 'rgba(92, 107, 192, 0.05)',
    bgDark: 'rgba(92, 107, 192, 0.03)',
  },
  experience: {
    main: '#42A5F5', // Azul médio
    light: '#64B5F6',
    dark: '#1E88E5',
    bgLight: 'rgba(66, 165, 245, 0.05)',
    bgDark: 'rgba(66, 165, 245, 0.03)',
  },
  skills: {
    main: '#42A5F5', // Azul médio
    light: '#64B5F6',
    dark: '#1E88E5',
    bgLight: 'rgba(66, 165, 245, 0.05)',
    bgDark: 'rgba(66, 165, 245, 0.03)',
  },
  interpersonalSkills: {
    main: '#5C9BD1', // Azul claro
    light: '#7BB3E3',
    dark: '#3F7CB8',
    bgLight: 'rgba(92, 155, 209, 0.05)',
    bgDark: 'rgba(92, 155, 209, 0.03)',
  },
  certifications: {
    main: '#7E57C2', // Roxo-azulado
    light: '#9575CD',
    dark: '#5E35B1',
    bgLight: 'rgba(126, 87, 194, 0.05)',
    bgDark: 'rgba(126, 87, 194, 0.03)',
  },
  projects: {
    main: '#4FC3F7', // Azul primário
    light: '#81D4FA',
    dark: '#29B6F6',
    bgLight: 'rgba(79, 195, 247, 0.05)',
    bgDark: 'rgba(79, 195, 247, 0.03)',
  },
  contact: {
    main: '#1565C0', // Azul profundo
    light: '#1976D2',
    dark: '#0D47A1',
    bgLight: 'rgba(21, 101, 192, 0.05)',
    bgDark: 'rgba(21, 101, 192, 0.03)',
  },
} as const

// Mapeamento de IDs de seção para chaves de cores
export const sectionIdToColorKey: Record<string, keyof typeof sectionColors> = {
  'inicio': 'hero',
  'sobre': 'about',
  'formacao': 'education',
  'experiencia': 'experience',
  'habilidades': 'skills',
  'habilidades-interpessoais': 'interpersonalSkills',
  'certificacoes': 'certifications',
  'projetos': 'projects',
  'contato': 'contact',
}

