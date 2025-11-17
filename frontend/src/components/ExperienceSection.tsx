import { Box, Container, Typography, Card, Chip, useTheme, Link } from '@mui/material'
import { Work, LocationOn, CalendarToday } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useMemo, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme as useThemeContext } from '@/contexts/ThemeContext'
import type { ExperienciaProfissional } from '@/types'
import { getSectionColors } from '@/utils/sectionColors'
import logoNina from '@/assets/img/logo-nina.png'
import logoIntelbras from '@/assets/img/logo-intelbras.png'

interface ExperienceSectionProps {
  experiencias: ExperienciaProfissional[]
}

export const ExperienceSection = ({ experiencias }: ExperienceSectionProps) => {
  const theme = useTheme()
  const { themeName } = useThemeContext()
  const { t, translations, language, loading: translationsLoading } = useLanguage()
  const sectionColors = useMemo(() => getSectionColors(themeName), [themeName])
  const sectionColor = sectionColors.experience
  
  // Filtrar experiências que têm empresa e período (não mostrar a genérica)
  const experienciasCompletas = useMemo(
    () => experiencias.filter(exp => exp.empresa && exp.periodo),
    [experiencias]
  )

  // Helper para buscar valor aninhado
  const getNestedValue = useCallback((obj: Record<string, unknown> | null | undefined, path: string): unknown => {
    if (!obj) return undefined
    return path.split('.').reduce((current: unknown, key: string) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as Record<string, unknown>)[key]
      }
      return undefined
    }, obj)
  }, [])

  // Mapear experiências para usar traduções da API baseado na empresa
  const experienciasTraduzidas = useMemo(() => {
    // Se o idioma é pt-BR, retorna experiências originais (já vem como padrão do endpoint /experiences)
    if (language === 'pt-BR') {
      return experienciasCompletas
    }

    // Se ainda está carregando traduções ou não há traduções, retorna experiências originais temporariamente
    if (translationsLoading || !translations) {
      return experienciasCompletas
    }

    const empresaToExpKey: Record<string, string> = {
      'DocSend': 'exp0',
      'Nina Tecnologia': 'exp1',
      'Intelbras': 'exp2',
      'Dígitro Tecnologia': 'exp3',
      'Flex Contact Center': 'exp4',
      'Tríplice Consultoria': 'exp5',
      'RM Telecomunicações': 'exp7',
    }

    return experienciasCompletas.map((exp) => {
      const expKey = empresaToExpKey[exp.empresa]
      
      if (expKey) {
        const expPath = `experience.experiences.${expKey}`
        const translatedExp = getNestedValue(translations, expPath)
        
        if (translatedExp && typeof translatedExp === 'object' && !Array.isArray(translatedExp)) {
          const translatedExpObj = translatedExp as Record<string, unknown>
          
          // Processa atividades: verifica se é array e filtra valores nulos/vazios
          let atividadesTraduzidas: string[] = exp.atividades
          
          // Tenta acessar atividades da tradução
          const atividadesFromTranslation = translatedExpObj.atividades
          
          if (atividadesFromTranslation !== null && atividadesFromTranslation !== undefined) {
            if (Array.isArray(atividadesFromTranslation)) {
              // Se for array, filtra valores nulos, undefined e strings vazias
              const atividadesFiltradas = atividadesFromTranslation
                .filter((atividade: unknown) => 
                  atividade != null && 
                  atividade !== undefined && 
                  typeof atividade === 'string' && 
                  atividade.trim() !== ''
                )
                .map((atividade: unknown) => String(atividade).trim())
              
              // Só usa as traduções se encontrou pelo menos uma atividade válida
              if (atividadesFiltradas.length > 0) {
                atividadesTraduzidas = atividadesFiltradas
              }
            } else if (atividadesFromTranslation && typeof atividadesFromTranslation === 'object') {
              // Se for um objeto (caso raro), tenta converter para array ordenando pelas chaves numéricas
              const valores = Object.entries(atividadesFromTranslation)
                .filter(([, valor]: [string, unknown]) => 
                  valor != null && 
                  valor !== undefined && 
                  typeof valor === 'string' && 
                  valor.trim() !== ''
                )
                .sort(([a], [b]) => {
                  const numA = parseInt(a) || 0
                  const numB = parseInt(b) || 0
                  return numA - numB
                })
                .map(([, valor]: [string, unknown]) => String(valor).trim())
              
              if (valores.length > 0) {
                atividadesTraduzidas = valores
              }
            }
          }
          
          return {
            ...exp,
            cargo: (typeof translatedExpObj.cargo === 'string' ? translatedExpObj.cargo : null) || exp.cargo,
            empresa: (typeof translatedExpObj.empresa === 'string' ? translatedExpObj.empresa : null) || exp.empresa,
            localizacao: (typeof translatedExpObj.localizacao === 'string' ? translatedExpObj.localizacao : null) || exp.localizacao,
            periodo: (typeof translatedExpObj.periodo === 'string' ? translatedExpObj.periodo : null) || exp.periodo,
            atividades: atividadesTraduzidas,
          }
        }
      }
      return exp
    })
  }, [experienciasCompletas, translations, language, translationsLoading, getNestedValue])

  return (
    <Box 
      id="experiencia" 
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
            {t('experience.title')}
          </Typography>
          <Typography
            variant="body1"
            component={motion.p}
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
            }}
          >
            {t('experience.subtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            position: 'relative',
            pl: { xs: 0, md: 3 },
          }}
        >
          {/* Timeline vertical */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 20, md: 8 },
              top: 0,
              bottom: 0,
              width: 3,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              display: { xs: 'none', md: 'block' },
              zIndex: 0,
            }}
          />

          {experienciasTraduzidas.map((experiencia, index) => (
            <Card
              key={`${experiencia.empresa}-${index}`}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              sx={{
                p: 4,
                background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                borderRadius: 3,
                position: 'relative',
                overflow: 'visible',
                ml: { xs: 0, md: 0 },
              }}
            >
              {/* Data do lado esquerdo da timeline */}
              {experiencia.periodo && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: -120, md: -15 },
                    top: 38,
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    zIndex: 1,
                    transform: 'translateX(-100%) translateY(-50%)',
                    paddingRight: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: sectionColor.main,
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    }}
                  >
                    {experiencia.periodo}
                  </Typography>
                </Box>
              )}

              {/* Ponto na timeline */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: -28, md: 4 },
                  top: 32,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: sectionColor.main,
                  border: `4px solid ${theme.palette.background.default}`,
                  display: { xs: 'none', md: 'block' },
                  zIndex: 1,
                  boxShadow: `0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}
              />

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    minWidth: 64,
                    maxWidth: 64,
                    height: 64,
                    minHeight: 64,
                    maxHeight: 64,
                    borderRadius: 2,
                    backgroundColor: `${sectionColor.main}15`,
                    color: sectionColor.main,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {experiencia.empresa === 'Nina Tecnologia' ? (
                    <Box
                      component="img"
                      src={logoNina}
                      alt="NINA Tecnologia"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                      sx={{
                        p: 1,
                      }}
                    />
                  ) : experiencia.empresa === 'Intelbras' ? (
                    <Box
                      component="img"
                      src={logoIntelbras}
                      alt="Intelbras"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                      sx={{
                        p: 1,
                      }}
                    />
                  ) : (
                    <Work sx={{ fontSize: 32 }} />
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', mb: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      {experiencia.cargo}
                    </Typography>
                  </Box>
                  {experiencia.empresa === 'Nina Tecnologia' ? (
                    <Link
                      href="https://ninatecnologia.com.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ color: sectionColor.main, mb: 1, fontWeight: 600 }}>
                        {experiencia.empresa}
                      </Typography>
                    </Link>
                  ) : experiencia.empresa === 'Intelbras' ? (
                    <Link
                      href="https://www.intelbras.com/pt-br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ color: sectionColor.main, mb: 1, fontWeight: 600 }}>
                        {experiencia.empresa}
                      </Typography>
                    </Link>
                  ) : (
                    <Typography variant="h6" sx={{ color: sectionColor.main, mb: 1, fontWeight: 600 }}>
                      {experiencia.empresa}
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1.5 }}>
                    {experiencia.localizacao && (
                      <Chip
                        icon={<LocationOn sx={{ fontSize: 18 }} />}
                        label={experiencia.localizacao}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: sectionColor.main,
                          color: sectionColor.main,
                          '&:hover': {
                            borderColor: sectionColor.dark,
                            backgroundColor: `${sectionColor.main}15`,
                          },
                        }}
                      />
                    )}
                    {experiencia.periodo && (
                      <Chip
                        icon={<CalendarToday sx={{ fontSize: 18 }} />}
                        label={experiencia.periodo}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: sectionColor.main,
                          color: sectionColor.main,
                          '&:hover': {
                            borderColor: sectionColor.dark,
                            backgroundColor: `${sectionColor.main}15`,
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>

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
                  {t('experience.activities')}
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    m: 0,
                    pl: 3,
                    listStyle: 'none',
                    '& li': {
                      position: 'relative',
                      mb: 2,
                      pl: 2,
                      color: theme.palette.text.secondary,
                      lineHeight: 1.8,
                      fontSize: '0.95rem',
                      '&::before': {
                        content: '"•"',
                        position: 'absolute',
                        left: 0,
                        color: sectionColor.main,
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                      },
                    },
                  }}
                >
                  {experiencia.atividades.map((atividade, atividadeIndex) => (
                    <Box component="li" key={atividadeIndex}>
                      {atividade}
                    </Box>
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

