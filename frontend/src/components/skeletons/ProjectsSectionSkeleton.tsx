import { Box, Container, Skeleton, Card, CardContent, useTheme } from '@mui/material'

export const ProjectsSectionSkeleton = () => {
  const theme = useTheme()

  return (
    <Box id="projetos" sx={{ py: 10, backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        <Skeleton
          variant="text"
          width={200}
          height={60}
          sx={{ 
            mx: 'auto', 
            mb: 6,
            borderRadius: 2,
          }}
          animation="wave"
        />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, flexWrap: 'wrap' }}>
          {[1, 2, 3].map((index) => (
            <Box
              key={index}
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 32px)' },
                minWidth: 0,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Skeleton 
                    variant="text" 
                    width="70%" 
                    height={40} 
                    sx={{ 
                      mb: 2,
                      borderRadius: 1,
                    }} 
                    animation="wave" 
                  />
                  <Skeleton 
                    variant="text" 
                    width="100%" 
                    height={20} 
                    sx={{ 
                      mb: 1,
                      borderRadius: 1,
                    }} 
                    animation="wave" 
                  />
                  <Skeleton 
                    variant="text" 
                    width="100%" 
                    height={20} 
                    sx={{ 
                      mb: 1,
                      borderRadius: 1,
                    }} 
                    animation="wave" 
                  />
                  <Skeleton 
                    variant="text" 
                    width="85%" 
                    height={20} 
                    sx={{ 
                      mb: 3,
                      borderRadius: 1,
                    }} 
                    animation="wave" 
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Skeleton 
                      variant="rounded" 
                      width={80} 
                      height={28} 
                      sx={{ borderRadius: 2 }} 
                      animation="wave" 
                    />
                    <Skeleton 
                      variant="rounded" 
                      width={100} 
                      height={28} 
                      sx={{ borderRadius: 2 }} 
                      animation="wave" 
                    />
                    <Skeleton 
                      variant="rounded" 
                      width={70} 
                      height={28} 
                      sx={{ borderRadius: 2 }} 
                      animation="wave" 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

