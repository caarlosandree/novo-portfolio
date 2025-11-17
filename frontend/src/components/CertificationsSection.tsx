import { Box, Container, Typography, Chip, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material'
import { School, ExpandMore, CheckCircle } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { sectionColors } from '@/utils/sectionColors'
import type { CertificationCategory, CertificationTrack, TrackLevel } from '@/types'

interface CertificationsSectionProps {
  categories: CertificationCategory[]
  tracks: CertificationTrack[]
}

export const CertificationsSection = ({ categories, tracks }: CertificationsSectionProps) => {
  const theme = useTheme()
  const { t } = useLanguage()
  const sectionColor = sectionColors.certifications

  // Mapeia categorias para o formato esperado
  const mappedCategories = categories.map((cat) => ({
    title: cat.title,
    icon: <School />,
    items: cat.items,
  }))

  // Mapeia tracks para o formato esperado
  const mappedTracks = tracks.map((track) => ({
    title: track.title,
    description: track.description,
    icon: track.iconImage ? undefined : <School />,
    iconImage: track.iconImage,
    items: track.items,
    levels: track.levels,
  }))

  const allSections = [...mappedCategories, ...mappedTracks]

  // Type guard para verificar se a seção tem iconImage
  const hasIconImage = (section: typeof allSections[number]): section is typeof allSections[number] & { iconImage: string } => {
    return 'iconImage' in section && section.iconImage !== undefined
  }

  // Type guard para verificar se a seção tem description
  const hasDescription = (section: typeof allSections[number]): section is typeof allSections[number] & { description: string } => {
    return 'description' in section && section.description !== undefined
  }

  // Type guard para verificar se a seção tem levels
  const hasLevels = (section: typeof allSections[number]): section is typeof allSections[number] & { levels: TrackLevel[] } => {
    return 'levels' in section && section.levels !== undefined && Array.isArray(section.levels)
  }

  return (
    <Box 
      id="certificacoes" 
      sx={{ 
        py: 12, 
        backgroundColor: theme.palette.mode === 'dark' 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(126, 87, 194, 0.03) 100%)`
          : `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(126, 87, 194, 0.05) 100%)`,
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
            {t('certifications.title')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {allSections.map((section, index) => (
            <Accordion
              key={section.title}
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={{
                background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                borderRadius: 2,
                '&:before': {
                  display: 'none',
                },
                boxShadow: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: sectionColor.main, fontSize: 32 }} />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 2.5,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      backgroundColor: hasIconImage(section) ? 'transparent' : `${sectionColor.main}15`,
                      color: sectionColor.main,
                      mr: 2.5,
                      overflow: 'hidden',
                    }}
                  >
                    {hasIconImage(section) ? (
                      <Box
                        component="img"
                        src={section.iconImage}
                        alt={section.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      section.icon
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 600, 
                        color: theme.palette.text.primary, 
                        mb: 0.5,
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                      }}
                    >
                      {section.title}
                    </Typography>
                    {hasDescription(section) && (
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          fontSize: { xs: '0.95rem', md: '1rem' },
                        }}
                      >
                        {section.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {section.items ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, pt: 1 }}>
                    {section.items.map((item, itemIndex) => (
                      <Chip
                        key={itemIndex}
                        icon={<CheckCircle sx={{ fontSize: 20 }} />}
                        label={item}
                        size="medium"
                        sx={{
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                          color: theme.palette.text.primary,
                          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                          fontSize: { xs: '0.9rem', md: '1rem' },
                          height: { xs: 36, md: 40 },
                          '& .MuiChip-icon': {
                            color: theme.palette.success.main,
                          },
                          '& .MuiChip-label': {
                            padding: { xs: '0 12px', md: '0 14px' },
                          },
                        }}
                      />
                    ))}
                  </Box>
                ) : hasLevels(section) ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    {section.levels.map((level: TrackLevel, levelIndex: number) => (
                      <Box
                        key={levelIndex}
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600, 
                            color: sectionColor.main, 
                            mb: 1,
                            fontSize: { xs: '1rem', md: '1.1rem' },
                          }}
                        >
                          {level.level}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: theme.palette.text.secondary,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            lineHeight: 1.6,
                          }}
                        >
                          {level.description}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : null}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
