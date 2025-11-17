import { createTheme } from '@mui/material/styles'
import type { ThemeOptions } from '@mui/material/styles'

// Paleta de cores baseada em #E1F5FE (azul claro/ciano)
const colors = {
  // Cores principais - baseadas em #E1F5FE
  primary: {
    main: '#4FC3F7', // Azul médio vibrante
    light: '#81D4FA', // Azul claro
    dark: '#29B6F6', // Azul mais escuro
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#26C6DA', // Ciano médio
    light: '#4DD0E1', // Ciano claro
    dark: '#00ACC1', // Ciano escuro
    contrastText: '#FFFFFF',
  },
  // Cores de suporte
  accent: {
    cyan: '#00BCD4',
    teal: '#0097A7',
    lightBlue: '#03A9F4',
  },
  // Cores por seção - paleta harmoniosa baseada em azul/ciano
  sections: {
    hero: {
      main: '#4FC3F7', // Azul primário (mantém o existente)
      light: '#81D4FA',
      dark: '#29B6F6',
    },
    about: {
      main: '#00BCD4', // Ciano vibrante
      light: '#4DD0E1',
      dark: '#0097A7',
    },
    education: {
      main: '#5C6BC0', // Índigo
      light: '#7986CB',
      dark: '#3F51B5',
    },
    experience: {
      main: '#42A5F5', // Azul médio
      light: '#64B5F6',
      dark: '#1E88E5',
    },
    skills: {
      main: '#26A69A', // Verde-azulado
      light: '#4DB6AC',
      dark: '#00897B',
    },
    interpersonalSkills: {
      main: '#4DB6AC', // Verde-azulado claro
      light: '#80CBC4',
      dark: '#26A69A',
    },
    certifications: {
      main: '#7E57C2', // Roxo-azulado
      light: '#9575CD',
      dark: '#5E35B1',
    },
    projects: {
      main: '#FF7043', // Laranja-azulado
      light: '#FF8A65',
      dark: '#F4511E',
    },
    contact: {
      main: '#1565C0', // Azul profundo
      light: '#1976D2',
      dark: '#0D47A1',
    },
  },
  // Backgrounds baseados na paleta
  background: {
    light: '#E1F5FE', // Cor base fornecida
    lightSecondary: '#F5FCFF',
    dark: '#0A1929', // Azul muito escuro
    darkSecondary: '#132F4C',
  },
  // Textos
  text: {
    light: '#01579B', // Azul escuro para contraste
    lightSecondary: '#0277BD',
    dark: '#E1F5FE',
    darkSecondary: '#B3E5FC',
  },
}

// Tema claro
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    background: {
      default: colors.background.light,
      paper: colors.background.lightSecondary,
    },
    text: {
      primary: colors.text.light,
      secondary: colors.text.lightSecondary,
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
          backgroundColor: 'rgba(225, 245, 254, 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(79, 195, 247, 0.2)',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
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
            boxShadow: '0 4px 12px rgba(79, 195, 247, 0.4)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.secondary.dark} 100%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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
} as ThemeOptions)

// Tema escuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary.light,
      light: '#B3E5FC',
      dark: colors.primary.main,
      contrastText: '#01579B',
    },
    secondary: {
      main: colors.secondary.light,
      light: '#80DEEA',
      dark: colors.secondary.main,
      contrastText: '#006064',
    },
    background: {
      default: colors.background.dark,
      paper: colors.background.darkSecondary,
    },
    text: {
      primary: colors.text.dark,
      secondary: colors.text.darkSecondary,
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
          backgroundColor: 'rgba(10, 25, 41, 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(79, 195, 247, 0.2)',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
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
            boxShadow: '0 4px 12px rgba(179, 229, 252, 0.4)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${colors.primary.light} 0%, ${colors.secondary.light} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
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
} as ThemeOptions)
