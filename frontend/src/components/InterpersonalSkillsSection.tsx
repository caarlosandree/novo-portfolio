import { Box, Container, Typography, useTheme, Paper, Chip } from '@mui/material'
import type { CategoriaHabilidade } from '@/types'
import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { sectionColors } from '@/utils/sectionColors'
import {
  People,
  BusinessCenter,
  Psychology,
  Lightbulb,
  CheckCircle,
  Group,
  Leaderboard,
  Schedule,
  Forum,
  Description,
  School,
  Analytics,
  Build,
  Visibility,
  RocketLaunch,
  AutoAwesome,
  Speed,
} from '@mui/icons-material'

interface InterpersonalSkillsSectionProps {
  categorias: CategoriaHabilidade[]
}

const skillIcons: Record<string, typeof Forum> = {
  'Comunicação eficaz e escuta ativa': Forum,
  'Empatia e habilidade de relacionamento': People,
  'Negociação e atendimento ao cliente': BusinessCenter,
  'Colaboração e trabalho em equipe': Group,
  'Liderança e visão estratégica': Leaderboard,
  'Gestão do tempo e organização': Schedule,
  'Condução de reuniões estratégicas': Forum,
  'Elaboração de planos de ação personalizados para clientes': Description,
  'Capacitação contínua da equipe': School,
  'Pensamento analítico e crítico': Analytics,
  'Resolução de problemas com foco em resultados': Build,
  'Criatividade e inovação': Lightbulb,
  'Atenção aos detalhes': Visibility,
  'Proatividade e flexibilidade': RocketLaunch,
  'Capacidade de aprendizado contínuo': AutoAwesome,
  'Adaptabilidade e aprendizado ágil': Speed,
}

const getSkillIcon = (habilidade: string) => {
  return skillIcons[habilidade] || Psychology
}

export const InterpersonalSkillsSection = ({ categorias }: InterpersonalSkillsSectionProps) => {
  const theme = useTheme()
  const { t } = useLanguage()
  const sectionColor = sectionColors.interpersonalSkills
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Mapeamento de nomes de categorias para chaves de tradução
  const categoriaToKey: Record<string, string> = {
    'Comunicação e Relacionamento': 'communication',
    'Gestão e Liderança': 'management',
    'Pensamento Crítico e Solução de Problemas': 'criticalThinking',
    'Adaptabilidade e Desenvolvimento Pessoal': 'adaptability',
  }

  // Mapeamento de habilidades para chaves de tradução
  const habilidadeToKey: Record<string, string> = {
    'Comunicação eficaz e escuta ativa': 'effectiveCommunication',
    'Empatia e habilidade de relacionamento': 'empathy',
    'Negociação e atendimento ao cliente': 'negotiation',
    'Colaboração e trabalho em equipe': 'collaboration',
    'Liderança e visão estratégica': 'leadership',
    'Gestão do tempo e organização': 'timeManagement',
    'Condução de reuniões estratégicas': 'strategicMeetings',
    'Elaboração de planos de ação personalizados para clientes': 'actionPlans',
    'Capacitação contínua da equipe': 'teamTraining',
    'Pensamento analítico e crítico': 'analyticalThinking',
    'Resolução de problemas com foco em resultados': 'problemSolving',
    'Criatividade e inovação': 'creativity',
    'Atenção aos detalhes': 'attentionToDetail',
    'Proatividade e flexibilidade': 'proactivity',
    'Capacidade de aprendizado contínuo': 'continuousLearning',
    'Adaptabilidade e aprendizado ágil': 'adaptabilityLearning',
  }

  // Função para obter o nome traduzido da categoria
  const getCategoriaNome = (nome: string) => {
    const key = categoriaToKey[nome]
    return key ? t(`interpersonalSkills.categories.${key}`) : nome
  }

  // Função para obter o nome traduzido da habilidade
  const getHabilidadeNome = (nome: string) => {
    const key = habilidadeToKey[nome]
    return key ? t(`interpersonalSkills.skillItems.${key}`) : nome
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
      id="habilidades-interpessoais" 
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
            {t('interpersonalSkills.title')}
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
            {t('interpersonalSkills.subtitle')}
          </Typography>
          <Chip
            component={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4, type: 'spring' }}
            label={t('interpersonalSkills.skillsCount', { count: totalSkills })}
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
                  label={`${categoria.habilidades.length} ${t('interpersonalSkills.skills')}`}
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
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: 2.5,
                }}
              >
                {categoria.habilidades.map((habilidade, skillIndex) => {
                  const IconComponent = getSkillIcon(habilidade)
                  return (
                    <Box
                      key={habilidade}
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                    >
                      <Box
                        onMouseEnter={() => {}}
                        sx={{
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: 1.5,
                          p: 3,
                          minHeight: 120,
                          borderRadius: 3,
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                          border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            borderColor: sectionColor.main,
                            transform: 'translateY(-4px)',
                            boxShadow: `0 8px 16px -4px ${sectionColor.main}40`,
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            width: '100%',
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: 32,
                              color: sectionColor.main,
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <IconComponent fontSize="inherit" />
                          </Box>
                          <CheckCircle
                            sx={{
                              fontSize: 20,
                              color: theme.palette.success.main,
                              ml: 'auto',
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            color: theme.palette.text.primary,
                            lineHeight: 1.5,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {getHabilidadeNome(habilidade)}
                        </Typography>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

