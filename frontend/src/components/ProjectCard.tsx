import { Box, Card, CardContent, Typography, Chip, Button, useTheme } from '@mui/material'
import { GitHub } from '@mui/icons-material'
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
      sx={{ 
        flexShrink: 0,
        width: { xs: '280px', sm: '320px', md: '360px' },
        minWidth: 0 
      }}
    >
      <Card
        component={motion.div}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        role="article"
        aria-label={`${t('a11y.viewProject')}: ${projeto.titulo}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 3,
          willChange: 'transform',
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: '2px',
          },
        }}
      >
        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
            {projeto.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 60, flexGrow: 1 }}>
            {projeto.descricao}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
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
          {projeto.github_url && projeto.github_url.trim() !== '' && (
            <Button
              component={motion.a}
              href={projeto.github_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<GitHub />}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                mt: 'auto',
                alignSelf: 'flex-start',
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              }}
              aria-label={`${t('a11y.viewProjectOnGitHub')}: ${projeto.titulo}`}
            >
              Ver no GitHub
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  )
})

ProjectCard.displayName = 'ProjectCard'

