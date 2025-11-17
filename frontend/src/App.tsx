import { HomePage } from '@/pages/HomePage'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'
import './App.css'

function App() {
  const { language } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return <HomePage />
}

export default App
