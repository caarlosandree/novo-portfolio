import { useState, useEffect } from 'react'
import { Fab, useScrollTrigger } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export const ScrollToTop = () => {
  const [show, setShow] = useState(false)
  const { t } = useLanguage()
  const trigger = useScrollTrigger({
    threshold: 100,
  })

  useEffect(() => {
    setShow(trigger)
  }, [trigger])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Fab
            component={motion.button}
            color="primary"
            size="small"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label={t('a11y.scrollToTop')}
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 1000,
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

