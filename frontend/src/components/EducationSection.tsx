import { Box, Container, Typography, Card, Chip, useTheme } from '@mui/material'
import { School, CheckCircle } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme as useThemeContext } from '@/contexts/ThemeContext'
import { getSectionColors } from '@/utils/sectionColors'
import type { Education } from '@/types'

interface EducationSectionProps {
  educations: Education[]
}

export const EducationSection = ({ educations }: EducationSectionProps) => {
  const theme = useTheme()
  const { themeName } = useThemeContext()
  const { t } = useLanguage()
  const sectionColors = useMemo(() => getSectionColors(themeName), [themeName])
  const sectionColor = sectionColors.education

  return (
    <Box 
      id="formacao" 
      sx={{ 
        py: 12, 
        backgroundColor: theme.palette.mode === 'dark' 
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${sectionColor.bgDark} 100%)`
          : `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${sectionColor.bgLight} 100%)`,
        position: 'relative',
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
            {t('education.title')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {educations.map((education, index) => (
            <Card
              key={education.id || education.degree}
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              sx={{
                p: 4,
                background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                borderRadius: 3,
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 64,
                    height: 64,
                    borderRadius: 2,
                    backgroundColor: `${sectionColor.main}15`,
                    color: sectionColor.main,
                  }}
                >
                  <School sx={{ fontSize: 32 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', mb: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      {education.degree}
                    </Typography>
                    {education.status === 'completed' && (
                      <Chip
                        icon={<CheckCircle />}
                        label={t('education.completed')}
                        size="small"
                        sx={{
                          backgroundColor: `${theme.palette.success.main}20`,
                          color: theme.palette.success.main,
                          fontWeight: 600,
                        }}
                      />
                    )}
                    {education.status === 'inProgress' && (
                      <Chip
                        label={t('education.inProgress')}
                        size="small"
                        sx={{
                          backgroundColor: `${theme.palette.info.main}20`,
                          color: theme.palette.info.main,
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ color: sectionColor.main, mb: 0.5, fontWeight: 600 }}>
                    {education.institution}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    {education.location}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    <Chip
                      label={education.period}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        color: theme.palette.text.secondary,
                      }}
                    />
                    <Chip
                      label={education.type}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        color: theme.palette.text.secondary,
                      }}
                    />
                    {education.currentPhase && (
                      <Chip
                        label={education.currentPhase}
                        size="small"
                        sx={{
                          backgroundColor: `${theme.palette.warning.main}20`,
                          color: theme.palette.warning.main,
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                  fontSize: '1rem',
                }}
              >
                {education.description}
              </Typography>

              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontSize: '0.85rem',
                  }}
                >
                  {t('education.topics')}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                  }}
                >
                  {education.topics.map((topic, topicIndex) => (
                    <Chip
                      key={topicIndex}
                      label={topic}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                        color: theme.palette.text.primary,
                        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
