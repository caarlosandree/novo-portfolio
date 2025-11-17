import { Box, Container, Typography, useTheme, Tooltip } from '@mui/material'
import { Email, Phone, LinkedIn, GitHub, WhatsApp } from '@mui/icons-material'
import { SiInstagram } from 'react-icons/si'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { sectionColors } from '@/utils/sectionColors'
import type { Contact } from '@/types'

interface ContactIconProps {
  icon: React.ReactElement
  label: string
  href: string
  color: string
  external?: boolean
  delay?: number
}

const ContactIcon = ({ icon, label, href, color, external = false, delay = 0 }: ContactIconProps) => {
  const theme = useTheme()
  const { t } = useLanguage()

  return (
    <Tooltip title={label} arrow placement="top">
      <Box
        component={motion.a}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={t('a11y.contactVia', { method: label })}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ 
          duration: 0.5, 
          delay: delay / 1000,
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ 
          scale: 1.15, 
          y: -8,
          backgroundColor: color,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
          color: theme.palette.text.secondary,
          cursor: 'pointer',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          '&:focus-visible': {
            outline: `3px solid ${color}`,
            outlineOffset: '3px',
          },
          '& > *': {
            position: 'relative',
            zIndex: 2,
            fontSize: 32,
          },
        }}
      >
        <Box
          component={motion.div}
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </Box>
      </Box>
    </Tooltip>
  )
}

interface ContactSectionProps {
  contact: Contact | null
}

const iconMap: Record<string, React.ReactElement> = {
  email: <Email />,
  phone: <Phone />,
  linkedin: <LinkedIn />,
  github: <GitHub />,
  instagram: <SiInstagram />,
  whatsapp: <WhatsApp />,
}

export const ContactSection = ({ contact }: ContactSectionProps) => {
  const theme = useTheme()
  const { t } = useLanguage()
  const sectionColor = sectionColors.contact

  if (!contact) return null

  const contacts = contact.contacts.map((item) => {
    const labelLower = item.label.toLowerCase()
    const iconKey = labelLower.includes('email') ? 'email' :
                    labelLower.includes('phone') ? 'phone' :
                    labelLower.includes('linkedin') ? 'linkedin' :
                    labelLower.includes('github') ? 'github' :
                    labelLower.includes('instagram') ? 'instagram' :
                    labelLower.includes('whatsapp') ? 'whatsapp' : 'email'
    
    return {
      icon: iconMap[iconKey] || <Email />,
      label: item.label,
      href: item.href,
      color: item.color,
      external: !item.href.startsWith('mailto:') && !item.href.startsWith('tel:'),
    }
  })

  return (
    <Box 
      id="contato" 
      sx={{ 
        py: 12, 
        position: 'relative',
        backgroundColor: theme.palette.mode === 'dark' 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(21, 101, 192, 0.03) 100%)`
          : `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(21, 101, 192, 0.05) 100%)`,
      }}
    >
      <Container maxWidth="md">
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
            {t('contact.title')}
          </Typography>
          <Typography
            component={motion.p}
            variant="h6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.8,
            }}
          >
            {t('contact.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.palette.primary.main}08 0%, transparent 70%)`,
              zIndex: 0,
            },
          }}
        >
          {contacts.map((contact, index) => (
            <ContactIcon
              key={contact.label}
              icon={contact.icon}
              label={contact.label}
              href={contact.href}
              color={contact.color}
              external={contact.external}
              delay={index * 100}
            />
          ))}
        </Box>

        {/* Informações de contato em texto */}
        <Box
          sx={{
            mt: 6,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="body1"
            component="a"
            href={`mailto:${contact.email}`}
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: sectionColor.main,
                transform: 'translateY(-2px)',
              },
            }}
          >
            ✉️ {contact.email}
          </Typography>
          <Typography
            variant="body1"
            component="a"
            href={`tel:${contact.phone.replace(/\D/g, '')}`}
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: sectionColor.main,
                transform: 'translateY(-2px)',
              },
            }}
          >
            📱 {contact.phone}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
