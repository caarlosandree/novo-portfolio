import { Box, Container, Skeleton, Accordion, AccordionSummary, useTheme } from '@mui/material'

export const CertificationsSectionSkeleton = () => {
  const theme = useTheme()

  return (
    <Box id="certificacoes" sx={{ py: 12, backgroundColor: theme.palette.background.default, position: 'relative' }}>
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <Accordion
              key={index}
              sx={{
                background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                borderRadius: 2,
                '&:before': {
                  display: 'none',
                },
                boxShadow: 'none',
              }}
            >
              <AccordionSummary>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Skeleton variant="rounded" width={56} height={56} sx={{ mr: 2.5, borderRadius: 2 }} animation="wave" />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width={250} height={32} sx={{ mb: 0.5, borderRadius: 1 }} animation="wave" />
                    <Skeleton variant="text" width="80%" height={24} sx={{ borderRadius: 1 }} animation="wave" />
                  </Box>
                </Box>
              </AccordionSummary>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
