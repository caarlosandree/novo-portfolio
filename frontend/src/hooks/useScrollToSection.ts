import { useCallback } from 'react'

export const useScrollToSection = () => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return scrollToSection
}

