import { Box, Container, Typography, useTheme, Paper, Chip } from '@mui/material'
import type { CategoriaHabilidade } from '@/types'
import { SkillCard } from './SkillCard'
import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { sectionColors } from '@/utils/sectionColors'

interface SkillsSectionProps {
  categorias: CategoriaHabilidade[]
}

export const SkillsSection = ({ categorias }: SkillsSectionProps) => {
  const theme = useTheme()
  const { t } = useLanguage()
  const sectionColor = sectionColors.skills
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Mapeamento de nomes de categorias para chaves de tradução
  const categoriaToKey: Record<string, string> = {
    'Front-end & Frameworks': 'frontend',
    'Back-end': 'backend',
    'Bancos de Dados': 'databases',
    'Data Science & ML': 'dataScience',
    'DevOps & Cloud': 'devops',
    'Ferramentas & Plataformas': 'tools',
    'Metodologias': 'methodologies',
  }

  // Função para obter o nome traduzido da categoria
  const getCategoriaNome = (nome: string) => {
    const key = categoriaToKey[nome]
    return key ? t(`skills.categories.${key}`) : nome
  }

  const totalSkills = useMemo(() => 
    categorias.reduce((acc, cat) => acc + cat.habilidades.length, 0),
    [categorias]
  )

  const handleCategoryEnter = useCallback((categoryName: string) => {
    setSelectedCategory(categoryName)
  }, [])

  const handleCategoryLeave = useCallback(() => {
    setSelectedCategory(null)
  }, [])

  return (
    <Box 
      id="habilidades" 
      sx={{ 
        py: 12, 
        position: 'relative',
        backgroundColor: theme.palette.mode === 'dark' 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${sectionColor.bgDark} 100%)`
          : `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${sectionColor.bgLight} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: 8 }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(135deg, ${sectionColor.main} 0%, ${sectionColor.dark} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('skills.title')}
          </Typography>
          <Typography
            component={motion.p}
            variant="body1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: 800,
              mx: 'auto',
              fontSize: '1.1rem',
              mb: 3,
            }}
          >
            {t('skills.subtitle')}
          </Typography>
          <Chip
            component={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4, type: 'spring' }}
            label={t('skills.technologiesCount', { count: totalSkills })}
            sx={{
              backgroundColor: sectionColor.main,
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.95rem',
              padding: '8px 16px',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {categorias.map((categoria, categoryIndex) => (
            <Paper
              key={categoria.nome}
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              onMouseEnter={() => handleCategoryEnter(categoria.nome)}
              onMouseLeave={handleCategoryLeave}
              elevation={0}
              sx={{
                p: 4,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)',
                borderRadius: 4,
                border: `2px solid ${
                  selectedCategory === categoria.nome
                    ? sectionColor.main
                    : theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.08)'
                }`,
                cursor: 'pointer',
              }}
            >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: sectionColor.main,
                      fontSize: '1.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 5,
                        height: 32,
                        borderRadius: 2,
                        backgroundColor: sectionColor.main,
                        transition: 'all 0.3s ease',
                        transform: selectedCategory === categoria.nome ? 'scaleY(1.2)' : 'scaleY(1)',
                      }}
                    />
                    {getCategoriaNome(categoria.nome)}
                  </Typography>
                  <Chip
                    label={`${categoria.habilidades.length} ${t('skills.technologies')}`}
                    size="small"
                    sx={{
                      backgroundColor: sectionColor.main,
                      color: '#FFFFFF',
                      fontWeight: 500,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(2, 1fr)',
                      sm: 'repeat(3, 1fr)',
                      md: 'repeat(4, 1fr)',
                      lg: 'repeat(5, 1fr)',
                    },
                    gap: 2.5,
                  }}
                >
                  {categoria.habilidades.map((habilidade, skillIndex) => (
                    <Box
                      key={habilidade}
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                    >
                      <SkillCard habilidade={habilidade} />
                    </Box>
                  ))}
                </Box>
              </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
