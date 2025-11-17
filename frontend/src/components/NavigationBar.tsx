import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useTheme as useMuiTheme } from '@mui/material'
import { Menu as MenuIcon, LightMode, DarkMode, Language } from '@mui/icons-material'
import { HideOnScroll } from './HideOnScroll'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { motion } from 'framer-motion'

interface NavigationBarProps {
  onMenuClick: () => void
  onNavigate: (sectionId: string) => void
}

export const NavigationBar = memo(({ onMenuClick, onNavigate }: NavigationBarProps) => {
  const { mode, toggleTheme } = useTheme()
  const { language, changeLanguage, t } = useLanguage()
  const theme = useMuiTheme()
  const [activeSection, setActiveSection] = useState<string>('inicio')
  const [displayedText, setDisplayedText] = useState('')
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null)

  const fullText = t('nav.fullName')
  const mobileText = t('nav.shortName')

  useEffect(() => {
    // Animação de digitação com velocidade variável para efeito mais natural
    let currentIndex = 0
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const isMobile = window.innerWidth < 960
    const textToDisplay = isMobile ? mobileText : fullText

    const typeNextChar = () => {
      if (currentIndex < textToDisplay.length) {
        setDisplayedText(textToDisplay.slice(0, currentIndex + 1))
        currentIndex++
        
        // Velocidade variável: mais rápido para letras, mais lento para espaços e hífens
        const char = textToDisplay[currentIndex - 1]
        const delay = char === ' ' || char === '-' ? 120 : char === '&' ? 150 : 60 + Math.random() * 20
        
        timeoutId = setTimeout(typeNextChar, delay)
      }
      // Cursor continua piscando indefinidamente após a digitação (controlado pelo Framer Motion)
    }

    // Inicia a animação após um pequeno delay
    timeoutId = setTimeout(typeNextChar, 300)
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [fullText, mobileText])

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    onNavigate(sectionId)
  }, [onNavigate])

  const handleLanguageMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget)
  }, [])

  const handleLanguageMenuClose = useCallback(() => {
    setLanguageAnchorEl(null)
  }, [])

  const handleLanguageChange = useCallback((lang: 'pt-BR' | 'en' | 'es') => {
    console.log(`[NavigationBar] handleLanguageChange chamado: ${language} -> ${lang}`)
    changeLanguage(lang)
    handleLanguageMenuClose()
    // Reinicia a animação de digitação quando o idioma muda
    setDisplayedText('')
    console.log(`[NavigationBar] handleLanguageChange concluído para: ${lang}`)
  }, [changeLanguage, handleLanguageMenuClose, language])

  const navItems = useMemo(() => [
    { id: 'inicio', label: t('nav.home') },
    { id: 'sobre', label: t('nav.about') },
    { id: 'formacao', label: t('nav.education') },
    { id: 'experiencia', label: t('nav.experience') },
    { id: 'habilidades', label: t('nav.skills') },
    { id: 'certificacoes', label: t('nav.certifications') },
    { id: 'projetos', label: t('nav.projects') },
    { id: 'contato', label: t('nav.contact') },
  ], [t])

  return (
    <HideOnScroll>
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ py: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: theme.palette.text.primary,
              display: 'flex',
              alignItems: 'center',
              minHeight: '1.5rem',
              position: 'relative',
            }}
          >
            <Box
              component={motion.span}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {displayedText.split('').map((char, index) => {
                const isSpace = char === ' '
                const isSpecial = char === '-' || char === '&'
                
                return (
                  <Box
                    key={`${char}-${index}`}
                    component={motion.span}
                    initial={{ 
                      opacity: 0, 
                      y: 20, 
                      scale: 0.8,
                      rotateX: 90,
                      filter: 'blur(4px)',
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      rotateX: 0,
                      filter: 'blur(0px)',
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.03,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    sx={{
                      display: 'inline-block',
                      color: isSpecial ? theme.palette.secondary.main : 'inherit',
                      fontWeight: isSpecial ? 900 : 800,
                      cursor: 'default',
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    {isSpace ? '\u00A0' : char}
                  </Box>
                )
              })}
              {displayedText.length > 0 && (
                <Box
                  component={motion.span}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ 
                    opacity: [1, 0.2, 1],
                    scaleY: [1, 0.3, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.5, 1],
                  }}
                  sx={{
                    display: 'inline-block',
                    width: 4,
                    height: '1.3em',
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? theme.palette.primary.light 
                      : theme.palette.primary.dark,
                    borderRadius: 2,
                    ml: 0.8,
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 0 12px ${theme.palette.primary.light}, 0 0 24px ${theme.palette.primary.light}40`
                      : `0 0 12px ${theme.palette.primary.dark}, 0 0 24px ${theme.palette.primary.dark}40`,
                  }}
                />
              )}
            </Box>
          </Typography>
          <Box 
            component="nav"
            aria-label={t('nav.home')}
            sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}
          >
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                sx={{
                  color: activeSection === item.id ? theme.palette.primary.main : theme.palette.text.primary,
                  fontWeight: activeSection === item.id ? 700 : 500,
                  fontSize: '0.95rem',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    transform: activeSection === item.id ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                    width: '60%',
                    height: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    '&::after': {
                      transform: 'translateX(-50%) scaleX(1)',
                    },
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: '2px',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <IconButton
              onClick={handleLanguageMenuOpen}
              aria-label={t('a11y.changeLanguage')}
              aria-expanded={Boolean(languageAnchorEl)}
              aria-haspopup="true"
              aria-controls={languageAnchorEl ? 'language-menu' : undefined}
              sx={{
                ml: 1,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Language />
            </IconButton>
            <IconButton
              onClick={toggleTheme}
              aria-label={t('a11y.toggleTheme')}
              aria-pressed={mode === 'dark'}
              sx={{
                ml: 1,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                  transform: 'rotate(180deg)',
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, alignItems: 'center' }}>
            <IconButton
              onClick={handleLanguageMenuOpen}
              aria-label={t('a11y.changeLanguage')}
              aria-expanded={Boolean(languageAnchorEl)}
              aria-haspopup="true"
              aria-controls={languageAnchorEl ? 'language-menu' : undefined}
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Language />
            </IconButton>
            <IconButton
              onClick={toggleTheme}
              aria-label={t('a11y.toggleTheme')}
              aria-pressed={mode === 'dark'}
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                  transform: 'rotate(180deg)',
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
            <IconButton
              color="inherit"
              aria-label={t('a11y.openMenu')}
              aria-expanded={false}
              onClick={onMenuClick}
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Menu
            id="language-menu"
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            role="menu"
            aria-label={t('a11y.changeLanguage')}
          >
            <MenuItem
              onClick={() => handleLanguageChange('pt-BR')}
              selected={language === 'pt-BR'}
              sx={{
                fontWeight: language === 'pt-BR' ? 700 : 400,
              }}
            >
              🇧🇷 Português
            </MenuItem>
            <MenuItem
              onClick={() => handleLanguageChange('en')}
              selected={language === 'en'}
              sx={{
                fontWeight: language === 'en' ? 700 : 400,
              }}
            >
              🇺🇸 English
            </MenuItem>
            <MenuItem
              onClick={() => handleLanguageChange('es')}
              selected={language === 'es'}
              sx={{
                fontWeight: language === 'es' ? 700 : 400,
              }}
            >
              🇪🇸 Español
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
})

NavigationBar.displayName = 'NavigationBar'
