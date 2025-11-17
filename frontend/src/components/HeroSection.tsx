import { Box, Container, Typography, Button, Avatar, useTheme } from '@mui/material'
import carlosPhoto from '@/assets/img/carlos.jpg'
import { useState, useEffect, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

// Função auxiliar para converter hex para RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0, 0, 0'
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `${r}, ${g}, ${b}`
}

// Função para escurecer uma cor e garantir contraste adequado em fundo branco
const darkenForContrast = (hex: string, factor: number = 0.6): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '#000000'
  
  let r = parseInt(result[1], 16)
  let g = parseInt(result[2], 16)
  let b = parseInt(result[3], 16)
  
  // Escurece a cor multiplicando por um fator
  r = Math.floor(r * factor)
  g = Math.floor(g * factor)
  b = Math.floor(b * factor)
  
  // Garante que a cor seja escura o suficiente para contraste (mínimo de 30% de luminosidade)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  if (luminance > 0.3) {
    // Se ainda estiver muito claro, escurece mais
    r = Math.floor(r * 0.5)
    g = Math.floor(g * 0.5)
    b = Math.floor(b * 0.5)
  }
  
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')}`
}

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void
}

export const HeroSection = memo(({ onNavigate }: HeroSectionProps) => {
  const theme = useTheme()
  const { t } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rafId: number | null = null
    let lastUpdate = 0
    const throttleMs = 16 // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < throttleMs) {
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            setMousePosition({
              x: (e.clientX / window.innerWidth) * 100,
              y: (e.clientY / window.innerHeight) * 100,
            })
            rafId = null
            lastUpdate = Date.now()
          })
        }
        return
      }

      lastUpdate = now
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const handleNavigateToProjects = useCallback(() => {
    onNavigate('projetos')
  }, [onNavigate])

  const handleNavigateToContact = useCallback(() => {
    onNavigate('contato')
  }, [onNavigate])

  return (
    <Box
      id="inicio"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.dark} 100%)`,
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Efeito de gradiente animado */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${theme.palette.secondary.light}30 0%, transparent 50%)`,
          transition: 'background 0.3s ease-out',
          zIndex: 0,
          willChange: 'background',
        }}
      />

      {/* Partículas de fundo */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${theme.palette.primary.light}15 0%, transparent 25%),
            radial-gradient(circle at 80% 70%, ${theme.palette.secondary.light}15 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, ${theme.palette.primary.main}10 0%, transparent 30%)
          `,
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <Avatar
              src={carlosPhoto}
              imgProps={{
                alt: "Carlos Andree",
                loading: "eager"
              }}
              sx={{
                width: 180,
                height: 180,
                margin: '0 auto 2.5rem',
                border: `4px solid rgba(255, 255, 255, 0.3)`,
                boxShadow: `0 20px 60px -12px ${theme.palette.primary.main}60, 0 0 0 1px rgba(255, 255, 255, 0.1)`,
                willChange: 'transform',
              }}
            />
          </Box>
          <Typography
            component={motion.h1}
            variant="h2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            {t('hero.title')}
          </Typography>
          <Typography
            component={motion.p}
            variant="h5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            sx={{
              mb: 5,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          >
            {t('hero.subtitle')}
          </Typography>
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            sx={{ display: 'flex', gap: 2.5, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Button
              component={motion.button}
              variant="contained"
              size="large"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                backgroundColor: '#FFFFFF',
                color: darkenForContrast(theme.palette.primary.main),
                fontWeight: 700,
                fontSize: '1rem',
                px: 5,
                py: 1.8,
                borderRadius: 3,
                boxShadow: `0 8px 24px rgba(${hexToRgb(theme.palette.primary.main)}, 0.4)`,
                border: '2px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  boxShadow: `0 12px 32px rgba(${hexToRgb(theme.palette.primary.main)}, 0.5)`,
                  backgroundColor: '#FFFFFF',
                  color: darkenForContrast(theme.palette.primary.main, 0.5),
                },
                '&:focus-visible': {
                  outline: '3px solid',
                  outlineColor: '#FFFFFF',
                  outlineOffset: '3px',
                },
              }}
              onClick={handleNavigateToProjects}
              aria-label={t('hero.viewProjects')}
            >
              {t('hero.viewProjects')}
            </Button>
            <Button
              component={motion.button}
              variant="outlined"
              size="large"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 2,
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '1rem',
                px: 5,
                py: 1.8,
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  boxShadow: `0 8px 24px rgba(${hexToRgb(theme.palette.primary.main)}, 0.3)`,
                },
                '&:focus-visible': {
                  outline: '3px solid',
                  outlineColor: '#FFFFFF',
                  outlineOffset: '3px',
                },
              }}
              onClick={handleNavigateToContact}
              aria-label={t('hero.contactMe')}
            >
              {t('hero.contactMe')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
})

HeroSection.displayName = 'HeroSection'
