import type { ReactElement } from 'react'
import { Slide, useScrollTrigger, Box } from '@mui/material'

interface HideOnScrollProps {
  children: ReactElement
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

