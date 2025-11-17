import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  IconButton,
  Card,
  CardContent,
} from '@mui/material'
import { Person, Edit, Add, Delete } from '@mui/icons-material'
import { portfolioApi } from '@/services/api'
import { EditTranslationModal, AddTranslationModal, ExperienceModal } from '@/components/modals/admin'
import type { ExperienciaProfissional, CreateExperienciaRequest, UpdateExperienciaRequest } from '@/types'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export function AdminPage() {
  const { user, logout } = useAuth()
  const [tabValue, setTabValue] = useState(0)
  const [translations, setTranslations] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'pt-BR' | 'en' | 'es'>('pt-BR')
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<{ key: string; value: string } | null>(null)
  
  // Estados para experiências
  const [experiences, setExperiences] = useState<ExperienciaProfissional[]>([])
  const [loadingExperiences, setLoadingExperiences] = useState(false)
  const [openExperienceModal, setOpenExperienceModal] = useState(false)
  const [editingExperience, setEditingExperience] = useState<ExperienciaProfissional | null>(null)

  const loadTranslations = useCallback(async () => {
    setLoading(true)
    try {
      const data = await portfolioApi.getTranslations(selectedLanguage)
      setTranslations(data)
    } catch {
      setMessage({ type: 'error', text: 'Erro ao carregar traduções' })
    } finally {
      setLoading(false)
    }
  }, [selectedLanguage])

  useEffect(() => {
    loadTranslations()
  }, [loadTranslations])

  const loadExperiences = useCallback(async () => {
    setLoadingExperiences(true)
    try {
      const data = await portfolioApi.getAllExperiences()
      setExperiences(data)
    } catch {
      setMessage({ type: 'error', text: 'Erro ao carregar experiências' })
    } finally {
      setLoadingExperiences(false)
    }
  }, [])

  useEffect(() => {
    if (tabValue === 1) {
      loadExperiences()
    }
  }, [tabValue, loadExperiences])

  const handleOpenEditModal = (item: { key: string; value: unknown }) => {
    setEditingItem({ key: item.key, value: String(item.value) })
    setOpenEditModal(true)
  }

  const handleOpenAddModal = () => {
    setOpenAddModal(true)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    setEditingItem(null)
  }

  const handleCloseAddModal = () => {
    setOpenAddModal(false)
  }

  const handleOpenExperienceModal = (exp?: ExperienciaProfissional) => {
    setEditingExperience(exp || null)
    setOpenExperienceModal(true)
  }

  const handleCloseExperienceModal = () => {
    setOpenExperienceModal(false)
    setEditingExperience(null)
  }

  const handleSaveExperience = async (exp: CreateExperienciaRequest | UpdateExperienciaRequest, translations?: Record<string, UpdateExperienciaRequest>) => {
    setMessage(null)
    try {
      if (editingExperience?.id) {
        // Atualiza a experiência
        await portfolioApi.updateExperience(editingExperience.id, exp as UpdateExperienciaRequest)
        // Salva as traduções se fornecidas
        if (translations && Object.keys(translations).length > 0) {
          await portfolioApi.saveExperienceTranslations(editingExperience.id, translations)
        }
        setMessage({ type: 'success', text: 'Experiência atualizada com sucesso!' })
      } else {
        // Cria a experiência
        const result = await portfolioApi.createExperience(exp as CreateExperienciaRequest)
        // Salva as traduções se fornecidas
        if (translations && Object.keys(translations).length > 0) {
          await portfolioApi.saveExperienceTranslations(result.id, translations)
        }
        setMessage({ type: 'success', text: 'Experiência criada com sucesso!' })
      }
      await loadExperiences()
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Erro ao salvar experiência' })
      throw err
    }
  }

  const handleDeleteExperience = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta experiência?')) {
      return
    }

    setMessage(null)
    try {
      await portfolioApi.deleteExperience(id)
      setMessage({ type: 'success', text: 'Experiência deletada com sucesso!' })
      await loadExperiences()
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Erro ao deletar experiência' })
    }
  }

  const handleSaveTranslation = async (key: string, value: string) => {
    setMessage(null)

    try {
      const token = localStorage.getItem('portfolio_auth_token')
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

      const response = await fetch(`${API_BASE_URL}/api/admin/translations/${selectedLanguage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key,
          value,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar tradução')
      }

      setMessage({ type: 'success', text: 'Tradução salva com sucesso!' })
      await loadTranslations()
    } catch {
      setMessage({ type: 'error', text: 'Erro ao salvar tradução' })
      throw new Error('Erro ao salvar tradução')
    }
  }

  const flattenTranslations = (obj: Record<string, unknown>, prefix = ''): Array<{ key: string; value: unknown }> => {
    const result: Array<{ key: string; value: unknown }> = []
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result.push(...flattenTranslations(value as Record<string, unknown>, fullKey))
      } else {
        result.push({ key: fullKey, value })
      }
    }
    return result
  }

  const flatTranslations = translations ? flattenTranslations(translations) : []

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Painel de Administração
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Logado como: {user?.username}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Person />}
            onClick={() => {
              window.location.hash = '#/profile'
            }}
          >
            Perfil
          </Button>
          <Button variant="outlined" onClick={() => {
            logout()
            window.location.hash = '#/'
          }}>
            Sair
          </Button>
        </Box>
      </Box>

      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }} onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Traduções" />
            <Tab label="Experiências" />
            <Tab label="Projetos" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Editar Traduções
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenAddModal}
                color="primary"
              >
                Adicionar Tradução
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                variant={selectedLanguage === 'pt-BR' ? 'contained' : 'outlined'}
                onClick={() => setSelectedLanguage('pt-BR')}
                sx={{
                  fontSize: '1.5rem',
                  minWidth: '60px',
                  height: '48px',
                }}
                title="Português"
              >
                🇧🇷
              </Button>
              <Button
                variant={selectedLanguage === 'en' ? 'contained' : 'outlined'}
                onClick={() => setSelectedLanguage('en')}
                sx={{
                  fontSize: '1.5rem',
                  minWidth: '60px',
                  height: '48px',
                }}
                title="English"
              >
                🇺🇸
              </Button>
              <Button
                variant={selectedLanguage === 'es' ? 'contained' : 'outlined'}
                onClick={() => setSelectedLanguage('es')}
                sx={{
                  fontSize: '1.5rem',
                  minWidth: '60px',
                  height: '48px',
                }}
                title="Español"
              >
                🇪🇸
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ maxHeight: '600px', overflow: 'auto' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Traduções Existentes ({flatTranslations.length})
                </Typography>
                {flatTranslations.map((item, index) => (
                  <Paper
                    key={index}
                    variant="outlined"
                    sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        {item.key}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {String(item.value)}
                      </Typography>
                    </Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditModal(item)}
                      size="small"
                      sx={{ ml: 2 }}
                    >
                      <Edit />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Gerenciar Experiências
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenExperienceModal()}
                color="primary"
              >
                Adicionar Experiência
              </Button>
            </Box>

            {loadingExperiences ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : experiences.length === 0 ? (
              <Alert severity="info">
                Nenhuma experiência cadastrada. Clique em "Adicionar Experiência" para começar.
              </Alert>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {experiences.map((exp) => (
                  <Card key={exp.id} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {exp.cargo}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            {exp.empresa}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {exp.localizacao} • {exp.periodo}
                          </Typography>
                          {exp.atividades && exp.atividades.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" fontWeight="bold" gutterBottom>
                                Atividades:
                              </Typography>
                              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                                {exp.atividades.slice(0, 3).map((atividade, idx) => (
                                  <Typography key={idx} component="li" variant="body2" color="text.secondary">
                                    {atividade}
                                  </Typography>
                                ))}
                                {exp.atividades.length > 3 && (
                                  <Typography component="li" variant="body2" color="text.secondary" fontStyle="italic">
                                    ... e mais {exp.atividades.length - 3} atividade(s)
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenExperienceModal(exp)}
                            size="small"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => exp.id && handleDeleteExperience(exp.id)}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Gerenciar Projetos
          </Typography>
          <Alert severity="info">
            Funcionalidade em desenvolvimento. Em breve você poderá editar projetos aqui.
          </Alert>
        </TabPanel>
      </Paper>

      {editingItem && (
        <EditTranslationModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          translationKey={editingItem.key}
          translationValue={editingItem.value}
          onSave={handleSaveTranslation}
        />
      )}

      <AddTranslationModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        onSave={handleSaveTranslation}
      />

      <ExperienceModal
        open={openExperienceModal}
        onClose={handleCloseExperienceModal}
        onSave={handleSaveExperience}
        experience={editingExperience}
      />
    </Container>
  )
}

