import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  LinearProgress,
  Grid,
} from '@mui/material'
import { Lock, CheckCircle, Cancel } from '@mui/icons-material'

interface PasswordStrength {
  score: number
  label: string
  color: 'error' | 'warning' | 'success'
}

const validatePasswordStrength = (password: string): PasswordStrength => {
  if (password.length === 0) {
    return { score: 0, label: '', color: 'error' }
  }

  let score = 0
  const checks = {
    length: password.length >= 8,
    longLength: password.length >= 12,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  if (checks.length) score++
  if (checks.longLength) score++
  if (checks.hasUpper) score++
  if (checks.hasLower) score++
  if (checks.hasNumber) score++
  if (checks.hasSpecial) score++

  if (score <= 2) {
    return { score, label: 'Fraca', color: 'error' }
  }
  if (score <= 4) {
    return { score, label: 'Média', color: 'warning' }
  }
  return { score, label: 'Forte', color: 'success' }
}

const getPasswordRequirements = (password: string) => {
  return {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }
}

export function ProfilePage() {
  const { user, logout } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const passwordStrength = validatePasswordStrength(newPassword)
  const requirements = getPasswordRequirements(newPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validações
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Todos os campos são obrigatórios')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (newPassword.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres')
      return
    }

    if (!requirements.hasUpper || !requirements.hasLower || !requirements.hasNumber || !requirements.hasSpecial) {
      setError('A senha deve conter pelo menos: letra maiúscula, letra minúscula, número e caractere especial')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('portfolio_auth_token')
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

      const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao alterar senha')
      }

      setSuccess('Senha alterada com sucesso!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar senha')
    } finally {
      setLoading(false)
    }
  }

  const RequirementItem = ({ met, label }: { met: boolean; label: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
      {met ? (
        <CheckCircle sx={{ color: 'success.main', fontSize: 18 }} />
      ) : (
        <Cancel sx={{ color: 'error.main', fontSize: 18 }} />
      )}
      <Typography variant="body2" color={met ? 'success.main' : 'text.secondary'}>
        {label}
      </Typography>
    </Box>
  )

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Perfil
          </Typography>
          <Button variant="outlined" onClick={logout}>
            Sair
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Informações do Usuário
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Usuário:</strong> {user?.username}
          </Typography>
        </Box>

        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Alterar Senha
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha Atual"
                  type="password"
                  variant="outlined"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nova Senha"
                  type="password"
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  helperText={
                    newPassword && (
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Lock sx={{ fontSize: 16 }} />
                          <Typography variant="caption" color={passwordStrength.color}>
                            Força: {passwordStrength.label}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(passwordStrength.score / 6) * 100}
                          color={passwordStrength.color}
                          sx={{ height: 6, borderRadius: 3, mb: 1 }}
                        />
                      </Box>
                    )
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmar Nova Senha"
                  type="password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  error={confirmPassword !== '' && newPassword !== confirmPassword}
                  helperText={
                    confirmPassword !== '' && newPassword !== confirmPassword
                      ? 'As senhas não coincidem'
                      : ''
                  }
                />
              </Grid>

              {newPassword && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Requisitos da senha:
                    </Typography>
                    <RequirementItem met={requirements.length} label="Mínimo de 8 caracteres" />
                    <RequirementItem met={requirements.hasUpper} label="Pelo menos uma letra maiúscula" />
                    <RequirementItem met={requirements.hasLower} label="Pelo menos uma letra minúscula" />
                    <RequirementItem met={requirements.hasNumber} label="Pelo menos um número" />
                    <RequirementItem met={requirements.hasSpecial} label="Pelo menos um caractere especial" />
                  </Paper>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading || passwordStrength.score < 3}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Alterando...' : 'Alterar Senha'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

