import { useState, useEffect, useRef } from 'react'

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('inicio')
  const rafId = useRef<number | null>(null)
  const lastScrollTop = useRef<number>(0)

  useEffect(() => {
    const sections = [
      'inicio',
      'sobre',
      'formacao',
      'experiencia',
      'habilidades',
      'habilidades-interpessoais',
      'certificacoes',
      'projetos',
      'contato',
    ]

    const findActiveSection = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const viewportHeight = window.innerHeight
      const viewportCenter = scrollTop + viewportHeight / 2

      let closestSection = 'inicio'
      let minDistance = Infinity

      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + scrollTop
        const elementCenter = elementTop + rect.height / 2
        const distance = Math.abs(viewportCenter - elementCenter)

        if (distance < minDistance) {
          minDistance = distance
          closestSection = id
        }
      })

      // Só atualiza se mudou significativamente (throttling implícito)
      const scrollDelta = Math.abs(scrollTop - lastScrollTop.current)
      setActiveSection((prev) => {
        if (scrollDelta > 100 || closestSection !== prev) {
          lastScrollTop.current = scrollTop
          return closestSection
        }
        return prev
      })
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }
        rafId.current = requestAnimationFrame(() => {
          findActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    // Throttle do resize
    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        findActiveSection()
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Calcula inicialmente após um pequeno delay para garantir que as seções estão carregadas
    const initTimeout = setTimeout(() => {
      findActiveSection()
    }, 500)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      clearTimeout(initTimeout)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return activeSection
}

