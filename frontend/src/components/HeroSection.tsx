import { Box, Container, Typography, Button, Avatar, useTheme } from '@mui/material'
import carlosPhoto from '@/assets/img/carlos.jpg'
import { useState, useEffect, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

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
              alt="Carlos Andree"
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
                color: '#01579B',
                fontWeight: 700,
                fontSize: '1rem',
                px: 5,
                py: 1.8,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
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
