import { Box, Typography, useTheme } from '@mui/material'
import { getTechIcon, getTechColor } from '@/utils/techIcons'
import { useState, memo, useMemo } from 'react'

interface SkillCardProps {
  habilidade: string
}

export const SkillCard = memo(({ habilidade }: SkillCardProps) => {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const techColor = useMemo(() => getTechColor(habilidade, theme.palette.primary.main), [habilidade, theme.palette.primary.main])
  const icon = useMemo(() => getTechIcon(habilidade), [habilidade])

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        p: 3,
        minHeight: 140,
        borderRadius: 3,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        border: `2px solid ${isHovered ? techColor : 'transparent'}`,
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? `0 12px 24px -8px ${techColor}40, 0 4px 12px ${techColor}20`
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        willChange: 'transform, box-shadow, border-color',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isHovered
            ? `linear-gradient(135deg, ${techColor}15 0%, ${techColor}05 100%)`
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
          fontSize: 48,
          color: isHovered ? techColor : theme.palette.text.secondary,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)',
          filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none',
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          fontSize: '0.9rem',
          color: isHovered ? techColor : theme.palette.text.primary,
          textAlign: 'center',
          transition: 'all 0.4s ease',
          textTransform: 'none',
        }}
      >
        {habilidade}
      </Typography>
    </Box>
  )
})

SkillCard.displayName = 'SkillCard'

