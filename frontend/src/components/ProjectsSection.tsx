import { Box, Container, Typography, IconButton, useTheme } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { ProjectCard } from './ProjectCard'
import type { Projeto } from '@/types'
import { useMemo, useState, useRef, useCallback, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { sectionColors } from '@/utils/sectionColors'
import { motion } from 'framer-motion'

interface ProjectsSectionProps {
  projetos: Projeto[]
}

export const ProjectsSection = ({ projetos }: ProjectsSectionProps) => {
  const theme = useTheme()
  const { t } = useLanguage()
  const sectionColor = sectionColors.projects
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Duplica os projetos para criar efeito infinito
  const duplicatedProjects = useMemo(() => [...projetos, ...projetos], [projetos])

  const projectCards = useMemo(() => 
    duplicatedProjects.map((projeto, index) => (
      <ProjectCard 
        key={`${projeto.titulo}-${index}`} 
        projeto={projeto} 
        index={index} 
      />
    )),
    [duplicatedProjects]
  )

  const checkScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const maxScroll = container.scrollWidth / 2
    const currentScroll = container.scrollLeft
    const clientWidth = container.clientWidth

    setCanScrollLeft(currentScroll > 10)
    setCanScrollRight(currentScroll < maxScroll - clientWidth - 10)
  }, [])

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = 360 + 16 // largura do card + gap
    const scrollAmount = cardWidth * 2 // scrolla 2 cards por vez
    
    const currentScroll = container.scrollLeft
    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth
    const maxScroll = scrollWidth / 2

    let newScroll: number

    if (direction === 'right') {
      newScroll = currentScroll + scrollAmount
      // Se passou do meio, reseta para o início
      if (newScroll >= maxScroll) {
        newScroll = 0
      }
    } else {
      newScroll = currentScroll - scrollAmount
      // Se está no início, vai para o final da primeira cópia
      if (newScroll <= 0) {
        newScroll = maxScroll - clientWidth
      }
    }

    container.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    })

    // Atualiza os botões após um delay para aguardar o scroll completar
    setTimeout(checkScrollButtons, 300)
  }, [checkScrollButtons])

  const handleScroll = useCallback(() => {
    checkScrollButtons()
  }, [checkScrollButtons])

  // Inicializa os botões quando o componente monta ou quando os projetos mudam
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollButtons()
    }, 100)
    return () => clearTimeout(timer)
  }, [projetos.length, checkScrollButtons])

  if (projetos.length === 0) {
    return null
  }

  return (
    <Box 
      id="projetos" 
      sx={{ 
        py: 10, 
        backgroundColor: theme.palette.mode === 'dark' 
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${sectionColor.bgDark} 100%)`
          : `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${sectionColor.bgLight} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 6, 
            fontWeight: 700,
            background: `linear-gradient(135deg, ${sectionColor.main} 0%, ${sectionColor.dark} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('projects.title')}
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
          }}
        >
          {/* Botão esquerdo */}
          <IconButton
            component={motion.button}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label={t('a11y.scrollLeft')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              position: 'absolute',
              left: { xs: -10, md: -20 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.primary.main,
              boxShadow: 3,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              '&:disabled': {
                opacity: 0.3,
              },
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>

          {/* Container de scroll */}
          <Box
            ref={scrollContainerRef}
            onScroll={handleScroll}
            sx={{
              display: 'flex',
              gap: 4,
              overflowX: 'auto',
              overflowY: 'hidden',
              width: '100%',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              // Esconde scrollbar mas mantém funcionalidade
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              cursor: 'grab',
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                gap: 4,
                flexShrink: 0,
                px: { xs: 2, md: 0 },
                minWidth: 'max-content',
              }}
            >
              {projectCards}
            </Box>
          </Box>

          {/* Botão direito */}
          <IconButton
            component={motion.button}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label={t('a11y.scrollRight')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              position: 'absolute',
              right: { xs: -10, md: -20 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.primary.main,
              boxShadow: 3,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              '&:disabled': {
                opacity: 0.3,
              },
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  )
}

