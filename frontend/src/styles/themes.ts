import { createTheme } from '@mui/material/styles'
import type { ThemeOptions } from '@mui/material/styles'

export type ThemeName = 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal' | 'indigo' | 'amber'

export interface ThemePalette {
  name: ThemeName
  displayName: {
    'pt-BR': string
    'en': string
    'es': string
  }
  colors: {
    primary: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
    secondary: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
    accent: {
      cyan: string
      teal: string
      lightBlue: string
    }
    sections: {
      hero: { main: string; light: string; dark: string }
      about: { main: string; light: string; dark: string }
      education: { main: string; light: string; dark: string }
      experience: { main: string; light: string; dark: string }
      skills: { main: string; light: string; dark: string }
      interpersonalSkills: { main: string; light: string; dark: string }
      certifications: { main: string; light: string; dark: string }
      projects: { main: string; light: string; dark: string }
      contact: { main: string; light: string; dark: string }
    }
    background: {
      light: string
      lightSecondary: string
      dark: string
      darkSecondary: string
    }
    text: {
      light: string
      lightSecondary: string
      dark: string
      darkSecondary: string
    }
  }
}

// Tema Azul (padrão)
const blueTheme: ThemePalette = {
  name: 'blue',
  displayName: {
    'pt-BR': 'Azul',
    'en': 'Blue',
    'es': 'Azul',
  },
  colors: {
    primary: {
      main: '#4FC3F7',
      light: '#81D4FA',
      dark: '#29B6F6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#26C6DA',
      light: '#4DD0E1',
      dark: '#00ACC1',
      contrastText: '#FFFFFF',
    },
    accent: {
      cyan: '#00BCD4',
      teal: '#0097A7',
      lightBlue: '#03A9F4',
    },
    sections: {
      hero: { main: '#4FC3F7', light: '#81D4FA', dark: '#29B6F6' },
      about: { main: '#00BCD4', light: '#4DD0E1', dark: '#0097A7' },
      education: { main: '#5C6BC0', light: '#7986CB', dark: '#3F51B5' },
      experience: { main: '#42A5F5', light: '#64B5F6', dark: '#1E88E5' },
      skills: { main: '#26A69A', light: '#4DB6AC', dark: '#00897B' },
      interpersonalSkills: { main: '#4DB6AC', light: '#80CBC4', dark: '#26A69A' },
      certifications: { main: '#7E57C2', light: '#9575CD', dark: '#5E35B1' },
      projects: { main: '#FF7043', light: '#FF8A65', dark: '#F4511E' },
      contact: { main: '#1565C0', light: '#1976D2', dark: '#0D47A1' },
    },
    background: {
      light: '#E1F5FE',
      lightSecondary: '#F5FCFF',
      dark: '#0A1929',
      darkSecondary: '#132F4C',
    },
    text: {
      light: '#01579B',
      lightSecondary: '#0277BD',
      dark: '#E1F5FE',
      darkSecondary: '#B3E5FC',
    },
  },
}

// Tema Verde
const greenTheme: ThemePalette = {
  name: 'green',
  displayName: {
    'pt-BR': 'Verde',
    'en': 'Green',
    'es': 'Verde',
  },
  colors: {
    primary: {
      main: '#66BB6A',
      light: '#81C784',
      dark: '#4CAF50',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#26A69A',
      light: '#4DB6AC',
      dark: '#00897B',
      contrastText: '#FFFFFF',
    },
    accent: {
      cyan: '#00BCD4',
      teal: '#0097A7',
      lightBlue: '#03A9F4',
    },
    sections: {
      hero: { main: '#66BB6A', light: '#81C784', dark: '#4CAF50' },
      about: { main: '#26A69A', light: '#4DB6AC', dark: '#00897B' },
      education: { main: '#5C6BC0', light: '#7986CB', dark: '#3F51B5' },
      experience: { main: '#42A5F5', light: '#64B5F6', dark: '#1E88E5' },
      skills: { main: '#7CB342', light: '#8BC34A', dark: '#689F38' },
      interpersonalSkills: { main: '#9CCC65', light: '#AED581', dark: '#7CB342' },
      certifications: { main: '#558B2F', light: '#689F38', dark: '#33691E' },
      projects: { main: '#FF7043', light: '#FF8A65', dark: '#F4511E' },
      contact: { main: '#2E7D32', light: '#388E3C', dark: '#1B5E20' },
    },
    background: {
      light: '#E8F5E9',
      lightSecondary: '#F1F8E9',
      dark: '#1B5E20',
      darkSecondary: '#2E7D32',
    },
    text: {
      light: '#1B5E20',
      lightSecondary: '#2E7D32',
      dark: '#C8E6C9',
      darkSecondary: '#A5D6A7',
    },
  },
}

// Tema Roxo
const purpleTheme: ThemePalette = {
  name: 'purple',
  displayName: {
    'pt-BR': 'Roxo',
    'en': 'Purple',
    'es': 'Morado',
  },
  colors: {
    primary: {
      main: '#AB47BC',
      light: '#BA68C8',
      dark: '#8E24AA',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7E57C2',
      light: '#9575CD',
      dark: '#5E35B1',
      contrastText: '#FFFFFF',
    },
    accent: {
      cyan: '#00BCD4',
      teal: '#0097A7',
      lightBlue: '#03A9F4',
    },
    sections: {
      hero: { main: '#AB47BC', light: '#BA68C8', dark: '#8E24AA' },
      about: { main: '#7E57C2', light: '#9575CD', dark: '#5E35B1' },
      education: { main: '#5C6BC0', light: '#7986CB', dark: '#3F51B5' },
      experience: { main: '#9C27B0', light: '#BA68C8', dark: '#7B1FA2' },
      skills: { main: '#8E24AA', light: '#AB47BC', dark: '#6A1B9A' },
      interpersonalSkills: { main: '#BA68C8', light: '#CE93D8', dark: '#AB47BC' },
      certifications: { main: '#673AB7', light: '#9575CD', dark: '#512DA8' },
      projects: { main: '#FF7043', light: '#FF8A65', dark: '#F4511E' },
      contact: { main: '#4A148C', light: '#6A1B9A', dark: '#38006B' },
    },
    background: {
      light: '#F3E5F5',
      lightSecondary: '#FCE4EC',
      dark: '#4A148C',
      darkSecondary: '#6A1B9A',
    },
    text: {
      light: '#4A148C',
      lightSecondary: '#6A1B9A',
      dark: '#E1BEE7',
      darkSecondary: '#CE93D8',
    },
  },
}

// Tema Laranja
const orangeTheme: ThemePalette = {
  name: 'orange',
  displayName: {
    'pt-BR': 'Laranja',
    'en': 'Orange',
    'es': 'Naranja',
  },
  colors: {
    primary: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF7043',
      light: '#FF8A65',
      dark: '#F4511E',
      contrastText: '#FFFFFF',
    },
    accent: {
      cyan: '#00BCD4',
      teal: '#0097A7',
      lightBlue: '#03A9F4',
    },
    sections: {
      hero: { main: '#FF9800', light: '#FFB74D', dark: '#F57C00' },
      about: { main: '#FF7043', light: '#FF8A65', dark: '#F4511E' },
      education: { main: '#FF6F00', light: '#FF8F00', dark: '#E65100' },
      experience: { main: '#FFA726', light: '#FFB74D', dark: '#F57C00' },
      skills: { main: '#FB8C00', light: '#FFA726', dark: '#E65100' },
      interpersonalSkills: { main: '#FFB74D', light: '#FFCC80', dark: '#FFA726' },
      certifications: { main: '#E64A19', light: '#FF5722', dark: '#BF360C' },
      projects: { main: '#FF7043', light: '#FF8A65', dark: '#F4511E' },
      contact: { main: '#E65100', light: '#FF6F00', dark: '#BF360C' },
    },
    background: {
      light: '#FFF3E0',
      lightSecondary: '#FFE0B2',
      dark: '#E65100',
      darkSecondary: '#F57C00',
    },
    text: {
      light: '#E65100',
      lightSecondary: '#F57C00',
      dark: '#FFE0B2',
      darkSecondary: '#FFCC80',
    },
  },
}

// Tema Rosa
const pinkTheme: ThemePalette = {
  name: 'pink',
  displayName: {
    'pt-BR': 'Rosa',
    'en': 'Pink',
    'es': 'Rosa',
  },
  colors: {
    primary: {
      main: '#EC407A',
      light: '#F48FB1',
      dark: '#C2185B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E91E63',
      light: '#F06292',
      dark: '#AD1457',
      contrastText: '#FFFFFF',
    },
    accent: {
      cyan: '#00BCD4',
      teal: '#0097A7',
      lightBlue: '#03A9F4',
    },
    sections: {
      hero: { main: '#EC407A', light: '#F48FB1', dark: '#C2185B' },
      about: { main: '#E91E63', light: '#F06292', dark: '#AD1457' },
      education: { main: '#C2185B', light: '#E91E63', dark: '#880E4F' },
      experience: { main: '#F06292', light: '#F48FB1', dark: '#EC407A' },
      skills: { main: '#AD1457', light: '#C2185B', dark: '#880E4F' },
      interpersonalSkills: { main: '#F48FB1', light: '#F8BBD0', dark: '#F06292' },
      certifications: { main: '#880E4F', light: '#AD1457', dark: '#4A0E27' },
      projects: { main: '#FF7043', light: '#FF8A65', dark: '#F4511E' },
      contact: { main: '#4A0E27', light: '#880E4F', dark: '#1A0612' },
    },
    background: {
      light: '#FCE4EC',
      lightSecondary: '#F8BBD0',
      dark: '#4A0E27',
      darkSecondary: '#880E4F',
    },
    text: {
      light: '#4A0E27',
      lightSecondary: '#880E4F',
      dark: '#F8BBD0',
      darkSecondary: '#F48FB1',
    },
  },
}

// Tema Teal
const tealTheme: ThemePalette = {
  name: 'teal',
  displayName: {
    'pt-BR': 'Verde-azulado',
    'en': 'Teal',
    'es': 'Verde azulado',
  },
  colors: {
    primary: {
      main: '#26A69A',
      light: '#4DB6AC',
      dark: '#00897B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00897B',
      light: '#26A69A',
      dark: '#00695C',
      contrastText: '#FFFFFF',
    },
    accent: {
      cyan: '#00BCD4',
      teal: '#0097A7',
      lightBlue: '#03A9F4',
    },
    sections: {
      hero: { main: '#26A69A', light: '#4DB6AC', dark: '#00897B' },
      about: { main: '#00897B', light: '#26A69A', dark: '#00695C' },
      education: { main: '#00695C', light: '#00897B', dark: '#004D40' },
      experience: { main: '#4DB6AC', light: '#80CBC4', dark: '#26A69A' },
      skills: { main: '#00796B', light: '#00897B', dark: '#00695C' },
      interpersonalSkills: { main: '#80CBC4', light: '#B2DFDB', dark: '#4DB6AC' },
      certifications: { main: '#004D40', light: '#00695C', dark: '#00251A' },
      projects: { main: '#FF7043', light: '#FF8A65', dark: '#F4511E' },
      contact: { main: '#00251A', light: '#004D40', dark: '#000000' },
    },
    background: {
      light: '#E0F2F1',
      lightSecondary: '#B2DFDB',
      dark: '#004D40',
      darkSecondary: '#00695C',
    },
    text: {
      light: '#004D40',
      lightSecondary: '#00695C',
      dark: '#B2DFDB',
      darkSecondary: '#80CBC4',
    },
  },
}

// Tema Índigo
const indigoTheme: ThemePalette = {
  name: 'indigo',
  displayName: {
    'pt-BR': 'Índigo',
    'en': 'Indigo',
    'es': 'Índigo',
  },
  colors: {
    primary: {
      main: '#5C6BC0',
      light: '#7986CB',
      dark: '#3F51B5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3F51B5',
      light: '#5C6BC0',
      dark: '#283593',
      contrastText: '#FFFFFF',
    },
    accent: {
      cyan: '#00BCD4',
      teal: '#0097A7',
      lightBlue: '#03A9F4',
    },
    sections: {
      hero: { main: '#5C6BC0', light: '#7986CB', dark: '#3F51B5' },
      about: { main: '#3F51B5', light: '#5C6BC0', dark: '#283593' },
      education: { main: '#283593', light: '#3F51B5', dark: '#1A237E' },
      experience: { main: '#7986CB', light: '#9FA8DA', dark: '#5C6BC0' },
      skills: { main: '#3949AB', light: '#5C6BC0', dark: '#283593' },
      interpersonalSkills: { main: '#9FA8DA', light: '#C5CAE9', dark: '#7986CB' },
      certifications: { main: '#1A237E', light: '#283593', dark: '#0D0F4A' },
      projects: { main: '#FF7043', light: '#FF8A65', dark: '#F4511E' },
      contact: { main: '#0D0F4A', light: '#1A237E', dark: '#000000' },
    },
    background: {
      light: '#E8EAF6',
      lightSecondary: '#C5CAE9',
      dark: '#1A237E',
      darkSecondary: '#283593',
    },
    text: {
      light: '#1A237E',
      lightSecondary: '#283593',
      dark: '#C5CAE9',
      darkSecondary: '#9FA8DA',
    },
  },
}

// Tema Âmbar
const amberTheme: ThemePalette = {
  name: 'amber',
  displayName: {
    'pt-BR': 'Âmbar',
    'en': 'Amber',
    'es': 'Ámbar',
  },
  colors: {
    primary: {
      main: '#FFC107',
      light: '#FFD54F',
      dark: '#FFA000',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    accent: {
      cyan: '#00BCD4',
      teal: '#0097A7',
      lightBlue: '#03A9F4',
    },
    sections: {
      hero: { main: '#FFC107', light: '#FFD54F', dark: '#FFA000' },
      about: { main: '#FF9800', light: '#FFB74D', dark: '#F57C00' },
      education: { main: '#FF8F00', light: '#FFB300', dark: '#E65100' },
      experience: { main: '#FFD54F', light: '#FFE082', dark: '#FFC107' },
      skills: { main: '#FFB300', light: '#FFC107', dark: '#FF8F00' },
      interpersonalSkills: { main: '#FFE082', light: '#FFECB3', dark: '#FFD54F' },
      certifications: { main: '#F57C00', light: '#FF9800', dark: '#E65100' },
      projects: { main: '#FF7043', light: '#FF8A65', dark: '#F4511E' },
      contact: { main: '#E65100', light: '#F57C00', dark: '#BF360C' },
    },
    background: {
      light: '#FFF8E1',
      lightSecondary: '#FFECB3',
      dark: '#FF6F00',
      darkSecondary: '#FF8F00',
    },
    text: {
      light: '#E65100',
      lightSecondary: '#F57C00',
      dark: '#FFECB3',
      darkSecondary: '#FFE082',
    },
  },
}

export const themePalettes: Record<ThemeName, ThemePalette> = {
  blue: blueTheme,
  green: greenTheme,
  purple: purpleTheme,
  orange: orangeTheme,
  pink: pinkTheme,
  teal: tealTheme,
  indigo: indigoTheme,
  amber: amberTheme,
}

// Função auxiliar para converter hex para RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0, 0, 0'
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `${r}, ${g}, ${b}`
}

const createThemeFromPalette = (palette: ThemePalette, mode: 'light' | 'dark'): ThemeOptions => {
  const colors = palette.colors

  return {
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      background: {
        default: mode === 'light' ? colors.background.light : colors.background.dark,
        paper: mode === 'light' ? colors.background.lightSecondary : colors.background.darkSecondary,
      },
      text: {
        primary: mode === 'light' ? colors.text.light : colors.text.dark,
        secondary: mode === 'light' ? colors.text.lightSecondary : colors.text.darkSecondary,
      },
      success: {
        main: '#4CAF50',
      },
      warning: {
        main: '#FF9800',
      },
      info: {
        main: colors.accent.cyan,
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontWeight: 600,
        lineHeight: 1.5,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light'
              ? `rgba(${hexToRgb(colors.background.light)}, 0.8)`
              : `rgba(${hexToRgb(colors.background.dark)}, 0.8)`,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: `1px solid rgba(${hexToRgb(colors.primary.main)}, 0.2)`,
            boxShadow: mode === 'light'
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
              : '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 24px',
            fontSize: '0.95rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: `0 4px 12px rgba(${hexToRgb(colors.primary.main)}, 0.4)`,
            },
          },
          contained: {
            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
            color: colors.primary.contrastText,
            '&:hover': {
              background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.secondary.dark} 100%)`,
              boxShadow: `0 4px 12px rgba(${hexToRgb(colors.primary.main)}, 0.4)`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light'
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-4px)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  }
}

export const getTheme = (themeName: ThemeName, mode: 'light' | 'dark') => {
  const palette = themePalettes[themeName]
  return createTheme(createThemeFromPalette(palette, mode))
}

