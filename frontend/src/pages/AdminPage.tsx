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
} from '@mui/material'
import { Person, Edit, Add } from '@mui/icons-material'
import { portfolioApi } from '@/services/api'
import { EditTranslationModal, AddTranslationModal } from '@/components/modals/admin'

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
          <Button variant="outlined" onClick={logout}>
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
              >
                Português
              </Button>
              <Button
                variant={selectedLanguage === 'en' ? 'contained' : 'outlined'}
                onClick={() => setSelectedLanguage('en')}
              >
                English
              </Button>
              <Button
                variant={selectedLanguage === 'es' ? 'contained' : 'outlined'}
                onClick={() => setSelectedLanguage('es')}
              >
                Español
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
          <Typography variant="h6" gutterBottom>
            Gerenciar Experiências
          </Typography>
          <Alert severity="info">
            Funcionalidade em desenvolvimento. Em breve você poderá editar experiências profissionais aqui.
          </Alert>
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
    </Container>
  )
}

