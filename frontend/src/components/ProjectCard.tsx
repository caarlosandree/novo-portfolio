import { Box, Card, CardContent, Typography, Chip, useTheme } from '@mui/material'
import type { Projeto } from '@/types'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ProjectCardProps {
  projeto: Projeto
  index?: number
}

export const ProjectCard = memo(({ projeto, index = 0 }: ProjectCardProps) => {
  const theme = useTheme()
  const { t } = useLanguage()

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 32px)' }, minWidth: 0 }}
    >
      <Card
        component={motion.div}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        role="article"
        aria-label={`${t('a11y.viewProject')}: ${projeto.titulo}`}
        sx={{
          height: '100%',
          boxShadow: 3,
          cursor: 'pointer',
          willChange: 'transform',
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: '2px',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
            {projeto.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 60 }}>
            {projeto.descricao}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {projeto.tecnologias.map((tech: string, techIndex: number) => (
              <Chip
                key={tech}
                component={motion.div}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: techIndex * 0.05 }}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
})

ProjectCard.displayName = 'ProjectCard'

