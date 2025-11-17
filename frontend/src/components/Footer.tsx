import { Box, Container, Typography, useTheme } from '@mui/material'
import { useLanguage } from '@/contexts/LanguageContext'

export const Footer = () => {
  const theme = useTheme()
  const { t } = useLanguage()

  // Teste de deploy automático via GitHub Actions

  return (
    <Box
      sx={{
        py: 5,
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
          : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
        color: theme.palette.mode === 'dark' ? theme.palette.text.primary : '#FFFFFF',
        textAlign: 'center',
        borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
      }}
    >
      <Container>
        <Typography variant="body1" sx={{ fontWeight: 500, opacity: 0.9 }}>
          © {new Date().getFullYear()} Carlos André Sabino. {t('footer.rights')}.
        </Typography>
      </Container>
    </Box>
  )
}
