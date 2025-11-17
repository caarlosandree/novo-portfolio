import { HomePage } from '@/pages/HomePage'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState, lazy, Suspense } from 'react'
import { Box, CircularProgress } from '@mui/material'
import './App.css'

// Lazy loading de páginas não críticas para melhorar o tempo de carregamento inicial
const LoginPage = lazy(() => import('@/pages/LoginPage').then(module => ({ default: module.LoginPage })))
const AdminPage = lazy(() => import('@/pages/AdminPage').then(module => ({ default: module.AdminPage })))
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then(module => ({ default: module.ProfilePage })))

// Componente de loading para páginas lazy
const PageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
)

function App() {
  const { language } = useLanguage()
  const { isAuthenticated } = useAuth()
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/')

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  // Roteamento simples baseado em hash
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/')
    }
    window.addEventListener('hashchange', handleHashChange)
    // Atualiza a rota inicial
    setCurrentRoute(window.location.hash || '#/')
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentRoute === '#/login') {
    return (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    )
  }

  if (currentRoute === '#/admin') {
    if (!isAuthenticated) {
      window.location.hash = '#/login'
      return (
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      )
    }
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminPage />
      </Suspense>
    )
  }

  if (currentRoute === '#/profile') {
    if (!isAuthenticated) {
      window.location.hash = '#/login'
      return (
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      )
    }
    return (
      <Suspense fallback={<PageLoader />}>
        <ProfilePage />
      </Suspense>
    )
  }

  return <HomePage />
}

export default App
