
import { LearningPath } from "@/types/knowledge";

export const learningPaths: LearningPath[] = [
  {
    id: "path-1",
    title: "Fundamentos da Hipertrofia",
    description: "Aprenda os princípios essenciais da hipertrofia muscular, desde conceitos básicos até aplicações práticas",
    level: "beginner",
    category: "training",
    duration: 8, // 8 hours to complete
    contentItems: ["content-1", "content-2", "content-5", "content-3", "content-8"],
    completionCriteria: "Completar todos os conteúdos e passar no quiz final com pelo menos 80% de acerto",
    createdBy: "Laércio Refundini",
    featured: true
  },
  {
    id: "path-2",
    title: "Nutrição Otimizada para Ganho Muscular",
    description: "Domine estratégias nutricionais avançadas para maximizar seus ganhos musculares",
    level: "intermediate",
    category: "nutrition",
    duration: 6,
    contentItems: ["content-4", "content-7", "content-9"],
    completionCriteria: "Completar todos os conteúdos e criar um plano nutricional personalizado",
    createdBy: "Equipe Nutrição Lafit",
    featured: true
  },
  {
    id: "path-3",
    title: "Recuperação Avançada para Atletas",
    description: "Estratégias de ponta para otimizar sua recuperação e melhorar seu desempenho",
    level: "advanced",
    category: "recovery",
    duration: 5,
    contentItems: ["content-6", "content-9", "content-10"],
    completionCriteria: "Completar todos os conteúdos e implementar um protocolo de recuperação personalizado",
    createdBy: "Laércio Refundini"
  },
  {
    id: "path-4",
    title: "Técnica Perfeita nos Exercícios Básicos",
    description: "Domine a execução técnica dos principais exercícios multiarticulares",
    level: "beginner",
    category: "training",
    duration: 7,
    contentItems: ["content-2", "content-8"],
    completionCriteria: "Completar todos os conteúdos e fazer avaliação de técnica gravada",
    createdBy: "Equipe Lafit"
  },
  {
    id: "path-5",
    title: "Ciência da Hipertrofia",
    description: "Aprofunde-se nos mecanismos científicos do crescimento muscular",
    level: "advanced",
    category: "principles",
    duration: 10,
    contentItems: ["content-1", "content-3", "content-5", "content-8", "content-10"],
    completionCriteria: "Completar todos os conteúdos e passar na avaliação final",
    createdBy: "Equipe Científica Lafit"
  }
];

export const getPathById = (id: string) => {
  return learningPaths.find(path => path.id === id);
};

export const getPathsByCategory = (category: string) => {
  return learningPaths.filter(path => path.category === category);
};

export const getPathsByLevel = (level: string) => {
  return learningPaths.filter(path => path.level === level);
};

export const getFeaturedPaths = () => {
  return learningPaths.filter(path => path.featured);
};

export const getRecommendedPaths = (userId: string) => {
  // In a real implementation, this would use user data to provide personalized recommendations
  // For now, we'll just return featured paths
  return getFeaturedPaths();
};
