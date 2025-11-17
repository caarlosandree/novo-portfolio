import { Box, Container, Skeleton, useTheme } from '@mui/material'

export const ContactSectionSkeleton = () => {
  const theme = useTheme()

  return (
    <Box id="contato" sx={{ py: 12, position: 'relative' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Skeleton
            variant="text"
            width={300}
            height={60}
            sx={{ 
              mx: 'auto', 
              mb: 2,
              borderRadius: 2,
            }}
            animation="wave"
          />
          <Skeleton 
            variant="text" 
            width="90%" 
            height={28} 
            sx={{ 
              mx: 'auto', 
              mb: 1,
              borderRadius: 1,
            }} 
            animation="wave" 
          />
          <Skeleton 
            variant="text" 
            width="70%" 
            height={28} 
            sx={{ 
              mx: 'auto',
              borderRadius: 1,
            }} 
            animation="wave" 
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.palette.primary.main}08 0%, transparent 70%)`,
              zIndex: 0,
            },
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Skeleton
              key={index}
              variant="circular"
              width={80}
              height={80}
              animation="wave"
              sx={{ 
                position: 'relative', 
                zIndex: 1,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            mt: 6,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Skeleton 
            variant="text" 
            width={250} 
            height={28} 
            sx={{ borderRadius: 1 }}
            animation="wave" 
          />
          <Skeleton 
            variant="text" 
            width={180} 
            height={28} 
            sx={{ borderRadius: 1 }}
            animation="wave" 
          />
        </Box>
      </Container>
    </Box>
  )
}

