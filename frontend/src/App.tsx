import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { AdminPage } from '@/pages/AdminPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import './App.css'

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
    return <LoginPage />
  }

  if (currentRoute === '#/admin') {
    if (!isAuthenticated) {
      window.location.hash = '#/login'
      return <LoginPage />
    }
    return <AdminPage />
  }

  if (currentRoute === '#/profile') {
    if (!isAuthenticated) {
      window.location.hash = '#/login'
      return <LoginPage />
    }
    return <ProfilePage />
  }

  return <HomePage />
}

export default App
