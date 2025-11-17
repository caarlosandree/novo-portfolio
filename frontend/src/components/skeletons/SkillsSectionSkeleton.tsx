import { Box, Container, Skeleton, Paper, useTheme } from '@mui/material'

export const SkillsSectionSkeleton = () => {
  const theme = useTheme()

  return (
    <Box id="habilidades" sx={{ py: 12, position: 'relative' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Skeleton
            variant="text"
            width={400}
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
            width={600} 
            height={28} 
            sx={{ 
              mx: 'auto', 
              mb: 3,
              borderRadius: 1,
            }} 
            animation="wave" 
          />
          <Skeleton
            variant="rounded"
            width={180}
            height={40}
            sx={{ 
              mx: 'auto', 
              borderRadius: 2,
            }}
            animation="wave"
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[1, 2, 3, 4].map((categoryIndex) => (
            <Paper
              key={categoryIndex}
              elevation={0}
              sx={{
                p: 4,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)',
                borderRadius: 4,
                border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3,
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Skeleton 
                    variant="rounded" 
                    width={5} 
                    height={32} 
                    sx={{ borderRadius: 2 }}
                    animation="wave" 
                  />
                  <Skeleton 
                    variant="text" 
                    width={200} 
                    height={36} 
                    sx={{ borderRadius: 1 }}
                    animation="wave" 
                  />
                </Box>
                <Skeleton 
                  variant="rounded" 
                  width={120} 
                  height={28} 
                  sx={{ borderRadius: 2 }} 
                  animation="wave" 
                />
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(5, 1fr)',
                  },
                  gap: 2.5,
                }}
              >
                {[1, 2, 3, 4, 5].map((skillIndex) => (
                  <Box
                    key={skillIndex}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.5,
                      p: 3,
                      minHeight: 140,
                      borderRadius: 3,
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Skeleton 
                      variant="rounded" 
                      width={48} 
                      height={48} 
                      sx={{ borderRadius: 2 }}
                      animation="wave" 
                    />
                    <Skeleton 
                      variant="text" 
                      width={80} 
                      height={20} 
                      sx={{ borderRadius: 1 }}
                      animation="wave" 
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

