import { useState, useCallback } from 'react'

export const useMobileMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleMenuClick = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return {
    mobileOpen,
    handleMenuClick,
    closeMenu,
  }
}

