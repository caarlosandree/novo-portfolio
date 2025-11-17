import { Box, Container, Typography, Card, useTheme } from '@mui/material'
import { Code, Work, TrendingUp } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useTheme as useThemeContext } from '@/contexts/ThemeContext'
import { getSectionColors } from '@/utils/sectionColors'
import type { About } from '@/types'

interface AboutSectionProps {
  about: About | null
}

export const AboutSection = ({ about }: AboutSectionProps) => {
  const theme = useTheme()
  const { themeName } = useThemeContext()
  const sectionColors = useMemo(() => getSectionColors(themeName), [themeName])
  const sectionColor = sectionColors.about

  if (!about) return null

  const icons = [<Code />, <Work />, <TrendingUp />]
  const colors = [sectionColor.main, sectionColor.light, sectionColor.dark]

  const features = about.features.map((feature, index) => ({
    icon: icons[index] || <Code />,
    title: feature.title,
    description: feature.description,
    color: colors[index] || sectionColor.main,
  }))

  return (
    <Box 
      id="sobre" 
      sx={{ 
        py: 12, 
        backgroundColor: theme.palette.mode === 'dark' 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${sectionColor.bgDark} 100%)`
          : `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${sectionColor.bgLight} 100%)`,
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
              {about.title}
            </Typography>
        </Box>

        <Box 
          component={motion.div}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 5, mb: 6 }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography 
              component={motion.h4}
              variant="h4" 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              sx={{ mb: 3, fontWeight: 700, color: theme.palette.text.primary }}
            >
              {about.heading}
            </Typography>
            {about.paragraphs.map((text, index) => (
              <Typography
                key={index}
                component={motion.p}
                variant="body1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                sx={{ 
                  mb: 3, 
                  fontSize: '1.1rem', 
                  lineHeight: 1.9, 
                  color: theme.palette.text.secondary,
                  ...(index === 4 && { mb: 0 })
                }}
              >
                {text}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              sx={{
                p: 4,
                height: '100%',
                background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                cursor: 'pointer',
              }}
            >
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: `${feature.color}15`,
                  width: 'fit-content',
                }}
              >
                <Box 
                  component={motion.div}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  sx={{ fontSize: 36, color: feature.color, mr: 2 }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  {feature.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
