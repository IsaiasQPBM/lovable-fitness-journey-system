
import { ContentItem, ContentCategory, ContentSubcategory, ContentFormat, ContentLevel } from "@/types/knowledge";

export const contentLibrary: ContentItem[] = [
  {
    id: "content-1",
    title: "Fundamentos de Hipertrofia: O Guia Completo",
    description: "Aprenda os princípios científicos por trás do crescimento muscular e como aplicá-los em seus treinos",
    format: "article",
    level: "beginner",
    category: "training",
    subcategory: "hypertrophy",
    thumbnail: "/placeholder.svg",
    content: "/articles/fundamentos-hipertrofia.html",
    duration: 15,
    author: "Laércio Refundini",
    datePublished: "2023-06-15",
    dateUpdated: "2023-12-10",
    tags: ["hipertrofia", "crescimento muscular", "treino", "fundamentos"],
    views: 5420,
    likes: 843,
    featured: true
  },
  {
    id: "content-2",
    title: "Técnica Perfeita: Agachamento",
    description: "Guia passo a passo para executar o agachamento com técnica perfeita e maximizar resultados",
    format: "video",
    level: "beginner",
    category: "training",
    subcategory: "technique",
    thumbnail: "/placeholder.svg",
    content: "https://www.youtube.com/embed/example",
    duration: 12,
    author: "Equipe Lafit",
    datePublished: "2023-08-05",
    dateUpdated: "2023-08-05",
    tags: ["técnica", "agachamento", "exercícios", "pernas"],
    relatedContent: ["content-5", "content-8"],
    views: 8765,
    likes: 1243
  },
  {
    id: "content-3",
    title: "Periodização Inteligente para Resultados Consistentes",
    description: "Como estruturar seus ciclos de treino para garantir progresso contínuo e evitar platôs",
    format: "article",
    level: "intermediate",
    category: "training",
    subcategory: "periodization",
    thumbnail: "/placeholder.svg",
    content: "/articles/periodizacao-inteligente.html",
    duration: 20,
    author: "Laércio Refundini",
    datePublished: "2023-05-22",
    dateUpdated: "2023-11-15",
    tags: ["periodização", "progresso", "ciclos", "planejamento"],
    views: 3210,
    likes: 567,
    featured: true
  },
  {
    id: "content-4",
    title: "Nutrição Estratégica para Hipertrofia",
    description: "Estratégias nutricionais baseadas em evidências para maximizar o crescimento muscular",
    format: "podcast",
    level: "intermediate",
    category: "nutrition",
    subcategory: "macros",
    thumbnail: "/placeholder.svg",
    content: "/podcasts/nutricao-hipertrofia.mp3",
    duration: 45,
    author: "Laércio Refundini",
    datePublished: "2023-09-10",
    dateUpdated: "2023-09-10",
    tags: ["nutrição", "macronutrientes", "proteína", "hipertrofia"],
    views: 2150,
    likes: 430
  },
  {
    id: "content-5",
    title: "Mecanismos Fisiológicos da Hipertrofia",
    description: "Entenda os processos celulares e moleculares que levam ao crescimento muscular",
    format: "article",
    level: "advanced",
    category: "training",
    subcategory: "hypertrophy",
    thumbnail: "/placeholder.svg",
    content: "/articles/mecanismos-hipertrofia.html",
    duration: 25,
    author: "Equipe Científica Lafit",
    datePublished: "2023-04-18",
    dateUpdated: "2023-10-25",
    tags: ["fisiologia", "ciência", "hipertrofia", "moleculares"],
    views: 1850,
    likes: 390
  },
  {
    id: "content-6",
    title: "O Papel do Sono na Recuperação Muscular",
    description: "Como o sono afeta seus ganhos e estratégias para otimizar a qualidade do sono",
    format: "video",
    level: "beginner",
    category: "recovery",
    subcategory: "sleep",
    thumbnail: "/placeholder.svg",
    content: "https://www.youtube.com/embed/example2",
    duration: 18,
    author: "Laércio Refundini",
    datePublished: "2023-07-20",
    dateUpdated: "2023-07-20",
    tags: ["sono", "recuperação", "hormônios", "descanso"],
    views: 4120,
    likes: 876,
    featured: true
  },
  {
    id: "content-7",
    title: "Suplementos que Realmente Funcionam",
    description: "Análise baseada em evidências dos suplementos mais eficazes para hipertrofia",
    format: "infographic",
    level: "beginner",
    category: "nutrition",
    subcategory: "supplements",
    thumbnail: "/placeholder.svg",
    content: "/infographics/suplementos-eficazes.png",
    duration: 5,
    author: "Equipe Nutrição Lafit",
    datePublished: "2023-10-05",
    dateUpdated: "2023-10-05",
    tags: ["suplementos", "creatina", "whey", "evidências"],
    views: 6540,
    likes: 1210
  },
  {
    id: "content-8",
    title: "Biomecânica dos Exercícios Multiarticulares",
    description: "Entendendo a mecânica dos principais exercícios compostos e como otimizá-los",
    format: "tutorial",
    level: "advanced",
    category: "training",
    subcategory: "technique",
    thumbnail: "/placeholder.svg",
    content: "/tutorials/biomecanica-multiarticulares.html",
    duration: 35,
    author: "Laércio Refundini",
    datePublished: "2023-03-15",
    dateUpdated: "2023-09-30",
    tags: ["biomecânica", "técnica", "exercícios compostos", "movimentos"],
    views: 2850,
    likes: 605
  },
  {
    id: "content-9",
    title: "Mitos e Fatos: Frequência de Treino",
    description: "Desmistificando concepções errôneas sobre a frequência ideal de treino para cada grupo muscular",
    format: "article",
    level: "intermediate",
    category: "principles",
    subcategory: "myths-facts",
    thumbnail: "/placeholder.svg",
    content: "/articles/mitos-frequencia-treino.html",
    duration: 12,
    author: "Equipe Científica Lafit",
    datePublished: "2023-11-08",
    dateUpdated: "2023-11-08",
    tags: ["mitos", "frequência", "treino", "grupos musculares"],
    views: 4950,
    likes: 820
  },
  {
    id: "content-10",
    title: "Avaliando seu Potencial Genético para Hipertrofia",
    description: "Como identificar seus pontos fortes genéticos e estabelecer expectativas realistas",
    format: "quiz",
    level: "intermediate",
    category: "monitoring",
    subcategory: "body-composition",
    thumbnail: "/placeholder.svg",
    content: "/quizzes/potencial-genetico.html",
    duration: 10,
    author: "Laércio Refundini",
    datePublished: "2023-08-28",
    dateUpdated: "2023-08-28",
    tags: ["genética", "potencial", "expectativas", "avaliação"],
    views: 5630,
    likes: 945
  }
];

// Helper functions to filter content
export const getContentByCategory = (category: ContentCategory) => {
  return contentLibrary.filter(item => item.category === category);
};

export const getContentByLevel = (level: ContentLevel) => {
  return contentLibrary.filter(item => item.level === level);
};

export const getFeaturedContent = () => {
  return contentLibrary.filter(item => item.featured);
};

export const getContentByFormat = (format: ContentFormat) => {
  return contentLibrary.filter(item => item.format === format);
};

export const getRelatedContent = (contentId: string) => {
  const content = contentLibrary.find(item => item.id === contentId);
  if (!content || !content.relatedContent) return [];
  
  return contentLibrary.filter(item => content.relatedContent?.includes(item.id));
};

export const searchContent = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return contentLibrary.filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) || 
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
