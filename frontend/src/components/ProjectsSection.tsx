import { Box, Container, Typography, useTheme } from '@mui/material'
import { ProjectCard } from './ProjectCard'
import type { Projeto } from '@/types'
import { useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { sectionColors } from '@/utils/sectionColors'

interface ProjectsSectionProps {
  projetos: Projeto[]
}

export const ProjectsSection = ({ projetos }: ProjectsSectionProps) => {
  const theme = useTheme()
  const { t } = useLanguage()
  const sectionColor = sectionColors.projects

  const projectCards = useMemo(() => 
    projetos.map((projeto, index) => (
      <ProjectCard key={projeto.titulo} projeto={projeto} index={index} />
    )),
    [projetos]
  )

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
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, flexWrap: 'wrap' }}>
          {projectCards}
        </Box>
      </Container>
    </Box>
  )
}

