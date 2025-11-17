import { Box, Typography, useTheme } from '@mui/material'
import type { ReactElement } from 'react'
import { useState } from 'react'

interface ContactCardProps {
  icon: ReactElement
  title: string
  value: string
  href: string
  color?: string
  external?: boolean
}

export const ContactCard = ({ icon, title, value, href, color, external = false }: ContactCardProps) => {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const cardColor = color || theme.palette.primary.main

  return (
    <Box
      component="a"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 4,
        minHeight: 200,
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        border: `2px solid ${isHovered ? cardColor : 'transparent'}`,
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? `0 16px 32px -8px ${cardColor}40, 0 8px 16px ${cardColor}20`
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isHovered
            ? `linear-gradient(135deg, ${cardColor}15 0%, ${cardColor}05 100%)`
            : 'transparent',
          transition: 'all 0.4s ease',
          zIndex: 0,
        },
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          fontSize: 56,
          color: isHovered ? cardColor : theme.palette.text.secondary,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'rotate(5deg) scale(1.15)' : 'rotate(0) scale(1)',
          filter: isHovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'none',
        }}
      >
        {icon}
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: isHovered ? cardColor : theme.palette.text.primary,
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '0.95rem',
            wordBreak: 'break-word',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

