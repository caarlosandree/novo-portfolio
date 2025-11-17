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

interface EditTranslationModalProps {
  open: boolean
  onClose: () => void
  translationKey: string
  translationValue: string
  onSave: (key: string, value: string) => Promise<void>
}

export function EditTranslationModal({
  open,
  onClose,
  translationKey,
  translationValue,
  onSave,
}: EditTranslationModalProps) {
  const [value, setValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setValue(translationValue)
      setError('')
    }
  }, [open, translationValue])

  const handleSave = async () => {
    if (!value.trim()) {
      setError('O valor é obrigatório')
      return
    }

    setSaving(true)
    setError('')

    try {
      await onSave(translationKey, value)
      onClose()
    } catch {
      setError('Erro ao salvar tradução')
    } finally {
      setSaving(false)
    }
  }

  const handleClose = () => {
    if (!saving) {
      setValue('')
      setError('')
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Tradução</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Chave"
            value={translationKey}
            margin="normal"
            disabled
            helperText="A chave não pode ser alterada"
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
            error={!!error}
            helperText={error}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={saving}>
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving || !value.trim()}>
          {saving ? <CircularProgress size={24} /> : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

