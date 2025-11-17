import type { ReactElement } from 'react'
import { Slide, useScrollTrigger } from '@mui/material'

interface HideOnScrollProps {
  children: ReactElement
}

export const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

