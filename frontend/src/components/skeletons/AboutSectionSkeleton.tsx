import { Box, Container, Skeleton, Card, useTheme } from '@mui/material'

export const AboutSectionSkeleton = () => {
  const theme = useTheme()

  return (
    <Box id="sobre" sx={{ py: 12, backgroundColor: theme.palette.background.default, position: 'relative' }}>
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

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 5, mb: 6 }}>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={50} sx={{ mb: 3, borderRadius: 1 }} animation="wave" />
            <Skeleton variant="text" width="100%" height={24} sx={{ mb: 2, borderRadius: 1 }} animation="wave" />
            <Skeleton variant="text" width="100%" height={24} sx={{ mb: 2, borderRadius: 1 }} animation="wave" />
            <Skeleton variant="text" width="90%" height={24} sx={{ mb: 3, borderRadius: 1 }} animation="wave" />
            <Skeleton variant="text" width="100%" height={24} sx={{ mb: 2, borderRadius: 1 }} animation="wave" />
            <Skeleton variant="text" width="100%" height={24} sx={{ mb: 2, borderRadius: 1 }} animation="wave" />
            <Skeleton variant="text" width="85%" height={24} sx={{ mb: 3, borderRadius: 1 }} animation="wave" />
            <Skeleton variant="text" width="100%" height={24} sx={{ mb: 2, borderRadius: 1 }} animation="wave" />
            <Skeleton variant="text" width="95%" height={24} sx={{ mb: 2, borderRadius: 1 }} animation="wave" />
            <Skeleton variant="text" width="80%" height={24} sx={{ borderRadius: 1 }} animation="wave" />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {[1, 2, 3].map((index) => (
            <Card
              key={index}
              sx={{
                p: 4,
                height: '100%',
                background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Skeleton 
                  variant="rounded" 
                  width={56} 
                  height={56} 
                  sx={{ 
                    mr: 2,
                    borderRadius: 2,
                  }} 
                  animation="wave" 
                />
                <Skeleton 
                  variant="text" 
                  width={150} 
                  height={32} 
                  sx={{ borderRadius: 1 }}
                  animation="wave" 
                />
              </Box>
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1.5, borderRadius: 1 }} animation="wave" />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1.5, borderRadius: 1 }} animation="wave" />
              <Skeleton variant="text" width="85%" height={20} sx={{ borderRadius: 1 }} animation="wave" />
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

