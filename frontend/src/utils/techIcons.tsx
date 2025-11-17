import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGo,
  SiPostgresql,
  SiMongodb,
  SiPython,
  SiDocker,
  SiGooglecloud,
  SiFirebase,
  SiVercel,
  SiLinux,
  SiGit,
  SiJira,
  SiSalesforce,
  SiSpring,
  SiGradle,
  SiPostman,
  SiN8N,
} from 'react-icons/si'
import { FaDatabase, FaJava, FaMicrosoft, FaProjectDiagram, FaCode } from 'react-icons/fa'
import type { ReactElement } from 'react'

// Mapeamento de ícones para tecnologias
export const techIcons: Record<string, ReactElement> = {
  HTML5: <SiHtml5 />,
  'CSS3': <SiCss3 />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  React: <SiReact />,
  'Next.js': <SiNextdotjs />,
  Vite: <SiVite />,
  'Material-UI': <SiReact />, // MUI usa React
  'Node.js': <SiNodedotjs />,
  Express: <SiExpress />,
  NestJS: <SiNestjs />,
  Java: <FaJava />,
  'Spring Boot': <SiSpring />,
  Go: <SiGo />,
  Gradle: <SiGradle />,
  PostgreSQL: <SiPostgresql />,
  'SQL Server': <FaMicrosoft />,
  DB2: <FaDatabase />,
  MongoDB: <SiMongodb />,
  NumPy: <SiPython />,
  Pandas: <SiPython />,
  'Scikit-learn': <SiPython />,
  TensorFlow: <SiPython />,
  PyTorch: <SiPython />,
  Git: <SiGit />,
  Docker: <SiDocker />,
  'Google Cloud': <SiGooglecloud />,
  'Cloud Run': <SiGooglecloud />,
  'Cloud SQL': <SiGooglecloud />,
  Firebase: <SiFirebase />,
  Supabase: <SiPostgresql />, // Similar ao PostgreSQL
  Vercel: <SiVercel />,
  Linux: <SiLinux />,
  JIRA: <SiJira />,
  Tiflux: <SiJira />, // Similar ao JIRA
  Salesforce: <SiSalesforce />,
  Metabase: <FaDatabase />,
  POSTMAN: <SiPostman />,
  'API REST': <FaCode />,
  n8n: <SiN8N />,
  Scrum: <FaProjectDiagram />,
  Kanban: <FaProjectDiagram />, // Similar ao Scrum
}

// Cores personalizadas para cada tecnologia
export const techColors: Record<string, string> = {
  HTML5: '#E34F26',
  'CSS3': '#1572B6',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  React: '#61DAFB',
  'Next.js': '#000000',
  Vite: '#646CFF',
  'Material-UI': '#007FFF',
  'Node.js': '#339933',
  Express: '#000000',
  NestJS: '#E0234E',
  Java: '#ED8B00',
  'Spring Boot': '#6DB33F',
  Go: '#00ADD8',
  Gradle: '#02303A',
  PostgreSQL: '#336791',
  'SQL Server': '#CC2927',
  DB2: '#002C5F',
  MongoDB: '#47A248',
  NumPy: '#013243',
  Pandas: '#150458',
  'Scikit-learn': '#F7931E',
  TensorFlow: '#FF6F00',
  PyTorch: '#EE4C2C',
  Git: '#F05032',
  Docker: '#2496ED',
  'Google Cloud': '#4285F4',
  'Cloud Run': '#4285F4',
  'Cloud SQL': '#4285F4',
  Firebase: '#FFCA28',
  Supabase: '#3ECF8E',
  Vercel: '#000000',
  Linux: '#FCC624',
  JIRA: '#0052CC',
  Tiflux: '#0052CC',
  Salesforce: '#00A1E0',
  Metabase: '#509EE3',
  POSTMAN: '#FF6C37',
  'API REST': '#FF5733',
  n8n: '#52B0E7',
  Scrum: '#009639',
  Kanban: '#009639',
}

// Função para obter ícone ou fallback
export const getTechIcon = (techName: string): ReactElement => {
  return techIcons[techName] || <FaDatabase />
}

// Função para obter cor ou cor padrão do tema
export const getTechColor = (techName: string, defaultColor: string): string => {
  return techColors[techName] || defaultColor
}

