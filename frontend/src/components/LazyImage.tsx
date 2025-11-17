import { useState, useEffect, useRef, type ImgHTMLAttributes } from 'react'
import { Box, Skeleton } from '@mui/material'

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  placeholder?: string
  threshold?: number
  rootMargin?: string
}

/**
 * Componente de imagem com lazy loading usando Intersection Observer
 * Melhora o desempenho carregando imagens apenas quando estão visíveis
 */
export const LazyImage = ({
  src,
  alt,
  placeholder,
  threshold = 0.1,
  rootMargin = '50px',
  style,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    const currentRef = imgRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(false)
  }

  return (
    <Box
      ref={imgRef}
      component="span"
      sx={{
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {!isLoaded && !hasError && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: isLoaded ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          loading="lazy"
          {...props}
        />
      )}
      {hasError && placeholder && (
        <img
          src={placeholder}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </Box>
  )
}

