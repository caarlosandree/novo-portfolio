import type { ReactNode } from 'react'
import { Slide, useScrollTrigger, Box } from '@mui/material'

interface HideOnScrollProps {
  children: ReactNode
}

export const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Box component="div">
        {children}
      </Box>
    </Slide>
  )
}

