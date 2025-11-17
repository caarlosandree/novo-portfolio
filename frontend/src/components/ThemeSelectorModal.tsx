import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  useTheme as useMuiTheme,
  IconButton,
} from '@mui/material'
import { Close, CheckCircle } from '@mui/icons-material'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { themePalettes, type ThemeName } from '@/styles/themes'
import { motion } from 'framer-motion'

interface ThemeSelectorModalProps {
  open: boolean
  onClose: () => void
}

export const ThemeSelectorModal = ({ open, onClose }: ThemeSelectorModalProps) => {
  const { themeName, changeTheme } = useTheme()
  const { language, t } = useLanguage()
  const theme = useMuiTheme()

  const handleThemeSelect = (selectedTheme: ThemeName) => {
    changeTheme(selectedTheme)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={700}>
          {t('themeSelector.title')}
        </Typography>
        <IconButton
          onClick={onClose}
          aria-label={t('a11y.closeMenu')}
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.06)',
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('themeSelector.subtitle')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 2,
          }}
        >
          {(Object.keys(themePalettes) as ThemeName[]).map((themeKey) => {
            const palette = themePalettes[themeKey]
            const isSelected = themeName === themeKey
            const displayName = palette.displayName[language] || palette.displayName['pt-BR']

            return (
              <Box key={themeKey}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeSelect(themeKey)}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: `2px solid ${isSelected ? theme.palette.primary.main : 'transparent'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 8px 16px rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, 0.1)`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      aspectRatio: '1',
                      background: `linear-gradient(135deg, ${palette.colors.primary.main} 0%, ${palette.colors.secondary.main} 100%)`,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && (
                      <Box
                        component={motion.div}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 2px 8px rgba(${theme.palette.mode === 'dark' ? '0, 0, 0' : '0, 0, 0'}, 0.2)`,
                        }}
                      >
                        <CheckCircle
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 20,
                          }}
                        />
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 0.5,
                        p: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: palette.colors.primary.main,
                          boxShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`,
                        }}
                      />
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: palette.colors.secondary.main,
                          boxShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`,
                        }}
                      />
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: palette.colors.accent.cyan,
                          boxShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: 1.5,
                      backgroundColor: theme.palette.background.paper,
                      textAlign: 'center',
                      minHeight: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={isSelected ? 700 : 500}
                      color={isSelected ? theme.palette.primary.main : theme.palette.text.primary}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                      }}
                    >
                      {displayName}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            minWidth: 120,
          }}
        >
          {t('themeSelector.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

