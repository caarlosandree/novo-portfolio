import { Box, Toolbar, Button } from '@mui/material'
import { lazy, Suspense, useCallback, useMemo } from 'react'
import { NavigationBar } from '@/components/NavigationBar'
import { HeroSection } from '@/components/HeroSection'
import { useScrollToSection } from '@/hooks/useScrollToSection'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  AboutSectionSkeleton,
  SkillsSectionSkeleton,
  EducationSectionSkeleton,
  CertificationsSectionSkeleton,
  ProjectsSectionSkeleton,
  ContactSectionSkeleton,
} from '@/components/skeletons'

// Lazy loading de componentes pesados
const AboutSection = lazy(() => import('@/components/AboutSection').then(module => ({ default: module.AboutSection })))
const SkillsSection = lazy(() => import('@/components/SkillsSection').then(module => ({ default: module.SkillsSection })))
const InterpersonalSkillsSection = lazy(() => import('@/components/InterpersonalSkillsSection').then(module => ({ default: module.InterpersonalSkillsSection })))
const EducationSection = lazy(() => import('@/components/EducationSection').then(module => ({ default: module.EducationSection })))
const ExperienceSection = lazy(() => import('@/components/ExperienceSection').then(module => ({ default: module.ExperienceSection })))
const CertificationsSection = lazy(() => import('@/components/CertificationsSection').then(module => ({ default: module.CertificationsSection })))
const ProjectsSection = lazy(() => import('@/components/ProjectsSection').then(module => ({ default: module.ProjectsSection })))
const ContactSection = lazy(() => import('@/components/ContactSection').then(module => ({ default: module.ContactSection })))
const Footer = lazy(() => import('@/components/Footer').then(module => ({ default: module.Footer })))
const ScrollToTop = lazy(() => import('@/components/ScrollToTop').then(module => ({ default: module.ScrollToTop })))

export const HomePage = () => {
  const scrollToSection = useScrollToSection()
  const { t } = useLanguage()
  const { data } = usePortfolioData()

  const handleNavigate = useCallback((sectionId: string) => {
    scrollToSection(sectionId)
  }, [scrollToSection])

  const handleMenuClick = useCallback(() => {
    // Menu click handler se necessário
  }, [])

  const handleSkipToContent = useCallback(() => {
    const mainContent = document.getElementById('inicio')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Memoizar dados para evitar recriação desnecessária
  const memoizedExperiencias = useMemo(
    () => data?.experiences || [],
    [data?.experiences],
  )
  const memoizedProjetos = useMemo(() => data?.projects || [], [data?.projects])
  const memoizedCategoriasHabilidades = useMemo(
    () => data?.skills || [],
    [data?.skills],
  )
  const memoizedHabilidadesInterpessoais = useMemo(
    () => data?.interpersonalSkills || [],
    [data?.interpersonalSkills],
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        onClick={handleSkipToContent}
        sx={{
          position: 'absolute',
          top: '-40px',
          left: 0,
          zIndex: 10000,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:focus': {
            top: 0,
          },
        }}
      >
        {t('a11y.skipToContent')}
      </Button>
      <NavigationBar onMenuClick={handleMenuClick} onNavigate={handleNavigate} />
      <Toolbar />
      <HeroSection onNavigate={handleNavigate} />
      <Suspense fallback={<AboutSectionSkeleton />}>
        <AboutSection about={data?.about || null} />
      </Suspense>
      <Suspense fallback={<EducationSectionSkeleton />}>
        <EducationSection educations={data?.educations || []} />
      </Suspense>
      <Suspense fallback={<EducationSectionSkeleton />}>
        <ExperienceSection experiencias={memoizedExperiencias} />
      </Suspense>
      <Suspense fallback={<SkillsSectionSkeleton />}>
        <SkillsSection categorias={memoizedCategoriasHabilidades} />
      </Suspense>
      <Suspense fallback={<SkillsSectionSkeleton />}>
        <InterpersonalSkillsSection categorias={memoizedHabilidadesInterpessoais} />
      </Suspense>
      <Suspense fallback={<CertificationsSectionSkeleton />}>
        <CertificationsSection 
          categories={data?.certificationCategories || []}
          tracks={data?.certificationTracks || []}
        />
      </Suspense>
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection projetos={memoizedProjetos} />
      </Suspense>
      <Suspense fallback={<ContactSectionSkeleton />}>
        <ContactSection contact={data?.contact || null} />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </Box>
  )
}

