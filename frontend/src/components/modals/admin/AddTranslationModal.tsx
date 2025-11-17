import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material'

interface AddTranslationModalProps {
  open: boolean
  onClose: () => void
  onSave: (key: string, value: string) => Promise<void>
}

export function AddTranslationModal({
  open,
  onClose,
  onSave,
}: AddTranslationModalProps) {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setKey('')
      setValue('')
      setError('')
    }
  }, [open])

  const handleSave = async () => {
    if (!key.trim()) {
      setError('A chave é obrigatória')
      return
    }

    if (!value.trim()) {
      setError('O valor é obrigatório')
      return
    }

    setSaving(true)
    setError('')

    try {
      await onSave(key.trim(), value.trim())
      onClose()
    } catch {
      setError('Erro ao adicionar tradução')
    } finally {
      setSaving(false)
    }
  }

  const handleClose = () => {
    if (!saving) {
      setKey('')
      setValue('')
      setError('')
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Nova Tradução</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Chave (ex: nav.home)"
            value={key}
            onChange={(e) => {
              setKey(e.target.value)
              setError('')
            }}
            margin="normal"
            placeholder="nav.home"
            helperText="Use ponto (.) para criar hierarquia, ex: nav.home"
            error={!!error && !key.trim()}
          />
          <TextField
            fullWidth
            label="Valor"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError('')
            }}
            margin="normal"
            multiline
            minRows={3}
            maxRows={15}
            placeholder="Digite o valor da tradução"
            error={!!error && !value.trim()}
            helperText={error || 'Digite o valor da tradução'}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={saving}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving || !key.trim() || !value.trim()}
        >
          {saving ? <CircularProgress size={24} /> : 'Adicionar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

