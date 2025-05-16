
import { DiscussionTopic } from "@/types/knowledge";

export const discussionTopics: DiscussionTopic[] = [
  {
    id: "topic-1",
    title: "Qual a frequência ideal para treinar cada grupo muscular?",
    description: "Estou com dúvidas sobre quantas vezes por semana devo treinar cada grupo muscular para maximizar a hipertrofia.",
    category: "training",
    subcategory: "periodization",
    author: "João Silva",
    dateCreated: "2023-12-15T14:30:00",
    comments: 34,
    views: 246,
    tags: ["frequência", "treino", "hipertrofia", "periodização"],
    isPinned: true,
    isAnswered: true,
    lastActivity: "2023-12-18T10:15:00"
  },
  {
    id: "topic-2",
    title: "Estratégias para lidar com platôs de força",
    description: "Estou estagnado nos mesmos pesos há 3 semanas. Quais técnicas vocês recomendam para superar este platô?",
    category: "training",
    subcategory: "strength",
    author: "Maria Oliveira",
    dateCreated: "2023-12-10T09:45:00",
    comments: 28,
    views: 189,
    tags: ["platô", "força", "progressão", "estagnação"],
    isAnswered: true,
    lastActivity: "2023-12-17T16:20:00"
  },
  {
    id: "topic-3",
    title: "Suplementação de creatina - timing ideal?",
    description: "Existe um momento ideal para tomar creatina ou realmente não faz diferença enquanto mantenha a dose diária?",
    category: "nutrition",
    subcategory: "supplements",
    author: "Carlos Mendes",
    dateCreated: "2023-12-12T18:20:00",
    comments: 42,
    views: 315,
    tags: ["creatina", "suplementação", "timing", "nutrição"],
    isPinned: false,
    isAnswered: true,
    lastActivity: "2023-12-18T08:30:00"
  },
  {
    id: "topic-4",
    title: "Técnicas para melhorar qualidade do sono",
    description: "Tenho dificuldade para dormir bem, especialmente após treinos intensos. Quais estratégias vocês usam para melhorar o sono?",
    category: "recovery",
    subcategory: "sleep",
    author: "Ana Costa",
    dateCreated: "2023-12-14T21:10:00",
    comments: 19,
    views: 142,
    tags: ["sono", "recuperação", "descanso", "insônia"],
    isPinned: false,
    isAnswered: false,
    lastActivity: "2023-12-17T22:05:00"
  },
  {
    id: "topic-5",
    title: "Como interpretar a ciência por trás da hipertrofia?",
    description: "Existem muitos estudos científicos sobre hipertrofia com conclusões aparentemente contraditórias. Como filtrar o que é relevante?",
    category: "principles",
    subcategory: "scientific-basis",
    author: "Pedro Almeida",
    dateCreated: "2023-12-08T11:40:00",
    comments: 56,
    views: 287,
    tags: ["ciência", "estudos", "pesquisa", "evidências"],
    isPinned: true,
    isAnswered: true,
    lastActivity: "2023-12-18T12:45:00"
  },
  {
    id: "topic-6",
    title: "Volume vs. Intensidade - O que priorizar?",
    description: "Para maximizar a hipertrofia, é melhor focar em mais séries (volume) ou em pesos mais pesados (intensidade)?",
    category: "training",
    subcategory: "hypertrophy",
    author: "Luiz Ferreira",
    dateCreated: "2023-12-13T16:50:00",
    comments: 47,
    views: 252,
    tags: ["volume", "intensidade", "hipertrofia", "treino"],
    isPinned: false,
    isAnswered: true,
    lastActivity: "2023-12-18T09:10:00"
  },
  {
    id: "topic-7",
    title: "Nutrição em período de cutting - Estratégias para preservar massa",
    description: "Quais as melhores abordagens para perder gordura enquanto preserva ao máximo a massa muscular?",
    category: "nutrition",
    subcategory: "diet-strategies",
    author: "Mariana Santos",
    dateCreated: "2023-12-11T13:25:00",
    comments: 38,
    views: 224,
    tags: ["cutting", "déficit", "preservação muscular", "dieta"],
    isPinned: false,
    isAnswered: false,
    lastActivity: "2023-12-17T19:30:00"
  },
  {
    id: "topic-8",
    title: "Interpretando sinais de overtraining",
    description: "Quais são os sinais definitivos de overtraining e como diferenciá-los de fadiga normal?",
    category: "recovery",
    subcategory: "stress",
    author: "Roberto Gomes",
    dateCreated: "2023-12-16T10:05:00",
    comments: 23,
    views: 168,
    tags: ["overtraining", "fadiga", "recuperação", "sinais"],
    isPinned: false,
    isAnswered: true,
    lastActivity: "2023-12-18T11:20:00"
  }
];

export const getTopicsByCategory = (category: string) => {
  return discussionTopics.filter(topic => topic.category === category);
};

export const getPinnedTopics = () => {
  return discussionTopics.filter(topic => topic.isPinned);
};

export const getRecentTopics = () => {
  return [...discussionTopics].sort((a, b) => 
    new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );
};

export const getMostActiveTopics = () => {
  return [...discussionTopics].sort((a, b) => 
    new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
  );
};

export const searchTopics = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return discussionTopics.filter(topic => 
    topic.title.toLowerCase().includes(lowercaseQuery) || 
    topic.description.toLowerCase().includes(lowercaseQuery) ||
    topic.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
