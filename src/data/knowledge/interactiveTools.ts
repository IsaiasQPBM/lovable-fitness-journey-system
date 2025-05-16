
import { InteractiveTool } from "@/types/knowledge";

export const interactiveTools: InteractiveTool[] = [
  {
    id: "tool-1",
    title: "Calculadora de Necessidades Calóricas",
    description: "Calcule suas necessidades calóricas precisas baseadas em seu perfil e objetivos",
    type: "calculator",
    category: "nutrition",
    thumbnail: "/placeholder.svg",
    url: "/tools/calorie-calculator",
    complexity: "beginner",
    helpContent: "content-4"
  },
  {
    id: "tool-2",
    title: "Simulador de Periodização",
    description: "Simule diferentes modelos de periodização e veja como afetariam seu progresso",
    type: "simulator",
    category: "training",
    thumbnail: "/placeholder.svg",
    url: "/tools/periodization-simulator",
    complexity: "advanced",
    helpContent: "content-3"
  },
  {
    id: "tool-3",
    title: "Modelo Anatômico Interativo",
    description: "Explore a anatomia muscular e entenda quais músculos são ativados em cada exercício",
    type: "anatomical-model",
    category: "training",
    thumbnail: "/placeholder.svg",
    url: "/tools/anatomical-model",
    complexity: "intermediate",
    helpContent: "content-8"
  },
  {
    id: "tool-4",
    title: "Avaliador de Técnica de Exercícios",
    description: "Faça upload de um vídeo e receba feedback sobre sua técnica de execução",
    type: "assessment",
    category: "training",
    thumbnail: "/placeholder.svg",
    url: "/tools/technique-assessment",
    complexity: "beginner",
    helpContent: "content-2"
  },
  {
    id: "tool-5",
    title: "Calculadora de Macronutrientes",
    description: "Determine a distribuição ideal de macronutrientes para seu objetivo específico",
    type: "calculator",
    category: "nutrition",
    thumbnail: "/placeholder.svg",
    url: "/tools/macro-calculator",
    complexity: "beginner",
    helpContent: "content-4"
  },
  {
    id: "tool-6",
    title: "Avaliador de Potencial Genético",
    description: "Analise suas características físicas para estimar seu potencial de desenvolvimento muscular",
    type: "assessment",
    category: "monitoring",
    thumbnail: "/placeholder.svg",
    url: "/tools/genetic-potential",
    complexity: "intermediate",
    helpContent: "content-10"
  },
  {
    id: "tool-7",
    title: "Simulador de Composição Corporal",
    description: "Visualize como diferentes níveis de massa muscular e gordura afetariam sua aparência",
    type: "simulator",
    category: "monitoring",
    thumbnail: "/placeholder.svg",
    url: "/tools/body-composition-simulator",
    complexity: "intermediate"
  },
  {
    id: "tool-8",
    title: "Calculadora de Recuperação",
    description: "Determine seu nível de recuperação baseado em vários fatores fisiológicos",
    type: "calculator",
    category: "recovery",
    thumbnail: "/placeholder.svg",
    url: "/tools/recovery-calculator",
    complexity: "beginner",
    helpContent: "content-6"
  }
];

export const getToolsByCategory = (category: string) => {
  return interactiveTools.filter(tool => tool.category === category);
};

export const getToolsByType = (type: string) => {
  return interactiveTools.filter(tool => tool.type === type);
};

export const getToolsByComplexity = (complexity: string) => {
  return interactiveTools.filter(tool => tool.complexity === complexity);
};

export const getPopularTools = () => {
  // In a real implementation, this would be based on usage metrics
  // For now, we'll just return a subset of tools
  return interactiveTools.slice(0, 4);
};
