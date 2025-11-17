import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { getTheme, themePalettes, type ThemeName } from '@/styles/themes'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  themeName: ThemeName
  toggleTheme: () => void
  changeTheme: (themeName: ThemeName) => void
  availableThemes: ThemeName[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode
    return savedMode || 'light'
  })

  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const savedTheme = localStorage.getItem('themeName') as ThemeName
    return savedTheme || 'blue'
  })

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('themeMode', newMode)
      return newMode
    })
  }, [])

  const changeTheme = useCallback((newThemeName: ThemeName) => {
    setThemeName(newThemeName)
    localStorage.setItem('themeName', newThemeName)
  }, [])

  const theme = useMemo(() => getTheme(themeName, mode), [themeName, mode])

  const availableThemes = useMemo(() => Object.keys(themePalettes) as ThemeName[], [])

  return (
    <ThemeContext.Provider value={{ mode, themeName, toggleTheme, changeTheme, availableThemes }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

