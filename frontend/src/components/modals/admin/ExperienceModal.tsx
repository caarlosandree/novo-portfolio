import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Alert,
  Tabs,
  Tab,
} from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import type { ExperienciaProfissional, CreateExperienciaRequest, UpdateExperienciaRequest } from '@/types'

interface ExperienceModalProps {
  open: boolean
  onClose: () => void
  onSave: (exp: CreateExperienciaRequest | UpdateExperienciaRequest, translations?: Record<string, UpdateExperienciaRequest>) => Promise<void>
  experience?: ExperienciaProfissional | null
}

type Language = 'pt-BR' | 'en' | 'es'

interface ExperienceFormData {
  cargo: string
  empresa: string
  localizacao: string
  periodo: string
  atividades: string[]
}

export function ExperienceModal({ open, onClose, onSave, experience }: ExperienceModalProps) {
  const [activeTab, setActiveTab] = useState<Language>('pt-BR')
  const [ordem, setOrdem] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Dados para cada idioma
  const [ptBR, setPtBR] = useState<ExperienceFormData>({
    cargo: '',
    empresa: '',
    localizacao: '',
    periodo: '',
    atividades: [''],
  })
  const [en, setEn] = useState<ExperienceFormData>({
    cargo: '',
    empresa: '',
    localizacao: '',
    periodo: '',
    atividades: [''],
  })
  const [es, setEs] = useState<ExperienceFormData>({
    cargo: '',
    empresa: '',
    localizacao: '',
    periodo: '',
    atividades: [''],
  })

  useEffect(() => {
    const loadData = async () => {
      if (experience && experience.id) {
        setOrdem(experience.ordem || 0)
        // Inicializa com os dados da experiência (pt-BR)
        setPtBR({
          cargo: experience.cargo || '',
          empresa: experience.empresa || '',
          localizacao: experience.localizacao || '',
          periodo: experience.periodo || '',
          atividades: experience.atividades && experience.atividades.length > 0 ? experience.atividades : [''],
        })
        
        // Busca as traduções existentes
        try {
          const { portfolioApi } = await import('@/services/api')
          const translations = await portfolioApi.getExperienceTranslations(experience.id)
          
          if (translations['en']) {
            setEn({
              cargo: translations['en'].cargo || '',
              empresa: translations['en'].empresa || '',
              localizacao: translations['en'].localizacao || '',
              periodo: translations['en'].periodo || '',
              atividades: translations['en'].atividades && translations['en'].atividades.length > 0 ? translations['en'].atividades : [''],
            })
          } else {
            setEn({ cargo: '', empresa: '', localizacao: '', periodo: '', atividades: [''] })
          }
          
          if (translations['es']) {
            setEs({
              cargo: translations['es'].cargo || '',
              empresa: translations['es'].empresa || '',
              localizacao: translations['es'].localizacao || '',
              periodo: translations['es'].periodo || '',
              atividades: translations['es'].atividades && translations['es'].atividades.length > 0 ? translations['es'].atividades : [''],
            })
          } else {
            setEs({ cargo: '', empresa: '', localizacao: '', periodo: '', atividades: [''] })
          }
        } catch {
          // Se não conseguir buscar traduções, deixa vazio
          setEn({ cargo: '', empresa: '', localizacao: '', periodo: '', atividades: [''] })
          setEs({ cargo: '', empresa: '', localizacao: '', periodo: '', atividades: [''] })
        }
      } else {
        // Reset para novo
        setOrdem(0)
        setPtBR({ cargo: '', empresa: '', localizacao: '', periodo: '', atividades: [''] })
        setEn({ cargo: '', empresa: '', localizacao: '', periodo: '', atividades: [''] })
        setEs({ cargo: '', empresa: '', localizacao: '', periodo: '', atividades: [''] })
      }
      setError(null)
      setActiveTab('pt-BR')
    }
    
    if (open) {
      loadData()
    }
  }, [experience, open])

  const getCurrentData = (): ExperienceFormData => {
    switch (activeTab) {
      case 'en':
        return en
      case 'es':
        return es
      default:
        return ptBR
    }
  }

  const setCurrentData = (data: ExperienceFormData) => {
    switch (activeTab) {
      case 'en':
        setEn(data)
        break
      case 'es':
        setEs(data)
        break
      default:
        setPtBR(data)
    }
  }

  const handleAddAtividade = () => {
    const current = getCurrentData()
    setCurrentData({
      ...current,
      atividades: [...current.atividades, ''],
    })
  }

  const handleRemoveAtividade = (index: number) => {
    const current = getCurrentData()
    if (current.atividades.length > 1) {
      setCurrentData({
        ...current,
        atividades: current.atividades.filter((_, i) => i !== index),
      })
    }
  }

  const handleAtividadeChange = (index: number, value: string) => {
    const current = getCurrentData()
    const newAtividades = [...current.atividades]
    newAtividades[index] = value
    setCurrentData({
      ...current,
      atividades: newAtividades,
    })
  }

  const handleFieldChange = (field: keyof ExperienceFormData, value: string) => {
    const current = getCurrentData()
    setCurrentData({
      ...current,
      [field]: value,
    })
  }

  const handleSave = async () => {
    setError(null)

    // Validação pt-BR (obrigatório)
    if (!ptBR.cargo.trim() || !ptBR.empresa.trim() || !ptBR.periodo.trim()) {
      setError('Cargo, empresa e período são obrigatórios para Português (pt-BR)')
      setActiveTab('pt-BR')
      return
    }

    const atividadesPtBR = ptBR.atividades.filter(a => a.trim() !== '')
    if (atividadesPtBR.length === 0) {
      setError('Adicione pelo menos uma atividade em Português (pt-BR)')
      setActiveTab('pt-BR')
      return
    }

    setLoading(true)
    try {
      // Dados principais (pt-BR)
      const expData: CreateExperienciaRequest | UpdateExperienciaRequest = {
        cargo: ptBR.cargo.trim(),
        empresa: ptBR.empresa.trim(),
        localizacao: ptBR.localizacao.trim(),
        periodo: ptBR.periodo.trim(),
        ordem,
        atividades: atividadesPtBR,
      }

      // Traduções para outros idiomas
      const translations: Record<string, UpdateExperienciaRequest> = {}
      
      const atividadesEn = en.atividades.filter(a => a.trim() !== '')
      if (en.cargo.trim() || en.empresa.trim() || atividadesEn.length > 0) {
        translations['en'] = {
          cargo: en.cargo.trim() || ptBR.cargo.trim(),
          empresa: en.empresa.trim() || ptBR.empresa.trim(),
          localizacao: en.localizacao.trim() || ptBR.localizacao.trim(),
          periodo: en.periodo.trim() || ptBR.periodo.trim(),
          ordem,
          atividades: atividadesEn.length > 0 ? atividadesEn : atividadesPtBR,
        }
      }

      const atividadesEs = es.atividades.filter(a => a.trim() !== '')
      if (es.cargo.trim() || es.empresa.trim() || atividadesEs.length > 0) {
        translations['es'] = {
          cargo: es.cargo.trim() || ptBR.cargo.trim(),
          empresa: es.empresa.trim() || ptBR.empresa.trim(),
          localizacao: es.localizacao.trim() || ptBR.localizacao.trim(),
          periodo: es.periodo.trim() || ptBR.periodo.trim(),
          ordem,
          atividades: atividadesEs.length > 0 ? atividadesEs : atividadesPtBR,
        }
      }

      await onSave(expData, Object.keys(translations).length > 0 ? translations : undefined)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar experiência')
    } finally {
      setLoading(false)
    }
  }

  const renderForm = (data: ExperienceFormData) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Cargo"
        value={data.cargo}
        onChange={(e) => handleFieldChange('cargo', e.target.value)}
        fullWidth
        required={activeTab === 'pt-BR'}
        disabled={loading}
      />

      <TextField
        label="Empresa"
        value={data.empresa}
        onChange={(e) => handleFieldChange('empresa', e.target.value)}
        fullWidth
        required={activeTab === 'pt-BR'}
        disabled={loading}
      />

      <TextField
        label="Localização"
        value={data.localizacao}
        onChange={(e) => handleFieldChange('localizacao', e.target.value)}
        fullWidth
        disabled={loading}
      />

      <TextField
        label="Período"
        value={data.periodo}
        onChange={(e) => handleFieldChange('periodo', e.target.value)}
        fullWidth
        required={activeTab === 'pt-BR'}
        placeholder="Ex: 2020 – 2025"
        disabled={loading}
      />

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2">Atividades</Typography>
          <Button
            startIcon={<Add />}
            onClick={handleAddAtividade}
            size="small"
            disabled={loading}
          >
            Adicionar
          </Button>
        </Box>

        {data.atividades.map((atividade, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start' }}>
            <TextField
              value={atividade}
              onChange={(e) => handleAtividadeChange(index, e.target.value)}
              fullWidth
              multiline
              rows={2}
              placeholder={`Atividade ${index + 1}`}
              disabled={loading}
            />
            <IconButton
              onClick={() => handleRemoveAtividade(index)}
              disabled={loading || data.atividades.length === 1}
              color="error"
              size="small"
            >
              <Delete />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  )

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {experience ? 'Editar Experiência' : 'Nova Experiência'}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box sx={{ pt: 1 }}>
          <TextField
            label="Ordem"
            type="number"
            value={ordem}
            onChange={(e) => setOrdem(parseInt(e.target.value) || 0)}
            fullWidth
            disabled={loading}
            sx={{ mb: 2 }}
            helperText="Ordem de exibição (menor número aparece primeiro)"
          />

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
              <Tab label="🇧🇷 Português" value="pt-BR" />
              <Tab label="🇺🇸 English" value="en" />
              <Tab label="🇪🇸 Español" value="es" />
            </Tabs>
          </Box>

          {activeTab === 'pt-BR' && renderForm(ptBR)}
          {activeTab === 'en' && renderForm(en)}
          {activeTab === 'es' && renderForm(es)}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

