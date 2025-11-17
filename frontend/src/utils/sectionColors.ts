import { themePalettes, type ThemeName } from '@/styles/themes'

// Função auxiliar para converter hex para RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0, 0, 0'
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `${r}, ${g}, ${b}`
}

// Função para obter cores dinâmicas baseadas no tema
export const getSectionColors = (themeName: ThemeName = 'blue') => {
  const palette = themePalettes[themeName]
  const colors = palette.colors

  return {
    hero: {
      main: colors.sections.hero.main,
      light: colors.sections.hero.light,
      dark: colors.sections.hero.dark,
      bgLight: `rgba(${hexToRgb(colors.sections.hero.main)}, 0.05)`,
      bgDark: `rgba(${hexToRgb(colors.sections.hero.main)}, 0.03)`,
    },
    about: {
      main: colors.sections.about.main,
      light: colors.sections.about.light,
      dark: colors.sections.about.dark,
      bgLight: `rgba(${hexToRgb(colors.sections.about.main)}, 0.05)`,
      bgDark: `rgba(${hexToRgb(colors.sections.about.main)}, 0.03)`,
    },
    education: {
      main: colors.sections.education.main,
      light: colors.sections.education.light,
      dark: colors.sections.education.dark,
      bgLight: `rgba(${hexToRgb(colors.sections.education.main)}, 0.05)`,
      bgDark: `rgba(${hexToRgb(colors.sections.education.main)}, 0.03)`,
    },
    experience: {
      main: colors.sections.experience.main,
      light: colors.sections.experience.light,
      dark: colors.sections.experience.dark,
      bgLight: `rgba(${hexToRgb(colors.sections.experience.main)}, 0.05)`,
      bgDark: `rgba(${hexToRgb(colors.sections.experience.main)}, 0.03)`,
    },
    skills: {
      main: colors.sections.skills.main,
      light: colors.sections.skills.light,
      dark: colors.sections.skills.dark,
      bgLight: `rgba(${hexToRgb(colors.sections.skills.main)}, 0.05)`,
      bgDark: `rgba(${hexToRgb(colors.sections.skills.main)}, 0.03)`,
    },
    interpersonalSkills: {
      main: colors.sections.interpersonalSkills.main,
      light: colors.sections.interpersonalSkills.light,
      dark: colors.sections.interpersonalSkills.dark,
      bgLight: `rgba(${hexToRgb(colors.sections.interpersonalSkills.main)}, 0.05)`,
      bgDark: `rgba(${hexToRgb(colors.sections.interpersonalSkills.main)}, 0.03)`,
    },
    certifications: {
      main: colors.sections.certifications.main,
      light: colors.sections.certifications.light,
      dark: colors.sections.certifications.dark,
      bgLight: `rgba(${hexToRgb(colors.sections.certifications.main)}, 0.05)`,
      bgDark: `rgba(${hexToRgb(colors.sections.certifications.main)}, 0.03)`,
    },
    projects: {
      main: colors.sections.projects.main,
      light: colors.sections.projects.light,
      dark: colors.sections.projects.dark,
      bgLight: `rgba(${hexToRgb(colors.sections.projects.main)}, 0.05)`,
      bgDark: `rgba(${hexToRgb(colors.sections.projects.main)}, 0.03)`,
    },
    contact: {
      main: colors.sections.contact.main,
      light: colors.sections.contact.light,
      dark: colors.sections.contact.dark,
      bgLight: `rgba(${hexToRgb(colors.sections.contact.main)}, 0.05)`,
      bgDark: `rgba(${hexToRgb(colors.sections.contact.main)}, 0.03)`,
    },
  } as const
}

// Mantém compatibilidade com código antigo (usa tema azul por padrão)
export const sectionColors = getSectionColors('blue')

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

