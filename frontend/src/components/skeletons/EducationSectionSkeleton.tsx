import { Box, Container, Skeleton, Card, useTheme } from '@mui/material'

export const EducationSectionSkeleton = () => {
  const theme = useTheme()

  return (
    <Box id="formacao" sx={{ py: 12, backgroundColor: theme.palette.background.paper, position: 'relative' }}>
      <Container maxWidth="lg">
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
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[1, 2].map((index) => (
            <Card
              key={index}
              sx={{
                p: 4,
                background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
                <Skeleton 
                  variant="rounded" 
                  width={64} 
                  height={64} 
                  sx={{ borderRadius: 2 }}
                  animation="wave" 
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Skeleton variant="text" width={250} height={32} sx={{ borderRadius: 1 }} animation="wave" />
                    <Skeleton variant="rounded" width={100} height={24} sx={{ borderRadius: 2 }} animation="wave" />
                  </Box>
                  <Skeleton variant="text" width={200} height={28} sx={{ mb: 0.5, borderRadius: 1 }} animation="wave" />
                  <Skeleton variant="text" width={150} height={20} sx={{ mb: 1, borderRadius: 1 }} animation="wave" />
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 2 }} animation="wave" />
                    <Skeleton variant="rounded" width={100} height={24} sx={{ borderRadius: 2 }} animation="wave" />
                  </Box>
                </Box>
              </Box>
              <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1, borderRadius: 1 }} animation="wave" />
              <Skeleton variant="text" width="90%" height={24} sx={{ mb: 3, borderRadius: 1 }} animation="wave" />
              <Skeleton variant="text" width={100} height={20} sx={{ mb: 2, borderRadius: 1 }} animation="wave" />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {[1, 2, 3, 4, 5, 6].map((chipIndex) => (
                  <Skeleton
                    key={chipIndex}
                    variant="rounded"
                    width={Math.random() * 80 + 100}
                    height={28}
                    sx={{ borderRadius: 2 }}
                    animation="wave"
                  />
                ))}
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

