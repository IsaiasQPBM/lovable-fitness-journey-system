
import { Exercise } from "@/types/training";

// Exercise library data - focused on compound movements according to Laércio Refundini principles
export const exerciseLibrary: Exercise[] = [
  {
    id: "ex-001",
    name: "Agachamento Livre",
    primaryMuscleGroups: ["quadriceps", "glutes"],
    secondaryMuscleGroups: ["hamstrings", "calves", "lowerBack", "abs"],
    equipment: ["barbell"],
    difficulty: "intermediate",
    description: "Um dos exercícios mais eficientes para desenvolvimento de força e massa muscular nos membros inferiores. Trabalha múltiplos grupos musculares simultaneamente.",
    instructions: [
      "Posicione a barra sobre os trápézios (não sobre o pescoço)",
      "Pés ligeiramente mais largos que a largura dos ombros",
      "Dedos dos pés ligeiramente voltados para fora",
      "Mantenha o peito erguido durante todo o movimento",
      "Desça até que suas coxas estejam pelo menos paralelas ao chão",
      "Suba empurrando pelos calcanhares, mantendo os joelhos alinhados com os dedos dos pés"
    ],
    imageUrls: ["https://source.unsplash.com/random/300x300/?squat"],
    videoUrl: "https://example.com/video-squat",
    variations: ["ex-002", "ex-003"],
    rpeChart: [
      {
        rpe: 10,
        repsInReserve: 0,
        percentageOfMax: 1.0,
        description: "Máximo absoluto, impossível fazer outra repetição"
      },
      {
        rpe: 9,
        repsInReserve: 1,
        percentageOfMax: 0.95,
        description: "Poderia fazer mais uma repetição com grande esforço"
      },
      {
        rpe: 8,
        repsInReserve: 2,
        percentageOfMax: 0.90,
        description: "Poderia fazer mais duas repetições"
      }
    ],
    tips: [
      "Foco na técnica antes de aumentar a carga",
      "Respiração adequada: inspire na descida, expire na subida",
      "Mantenha a coluna neutra durante todo o movimento",
      "Cuidado com o alinhamento dos joelhos, evitando que colapsem para dentro"
    ],
    cautions: [
      "Evite se tiver lesões nos joelhos sem supervisão apropriada",
      "Aprenda a técnica correta com um profissional"
    ],
    isCompound: true,
    isUnilateral: false,
    targetRPE: 8,
    category: "strength",
    tags: ["lower-body", "compound", "fundamental", "laercio-approved"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "ex-002",
    name: "Levantamento Terra",
    primaryMuscleGroups: ["hamstrings", "glutes", "lowerBack"],
    secondaryMuscleGroups: ["quadriceps", "traps", "forearms", "abs"],
    equipment: ["barbell"],
    difficulty: "intermediate",
    description: "Um dos exercícios mais completos para desenvolvimento de força posterior da cadeia. Excelente para construção de força global e massa muscular.",
    instructions: [
      "Posicione os pés à largura dos ombros",
      "Segure a barra com as mãos ligeiramente mais largas que os pés",
      "Mantenha as costas retas e o peito erguido",
      "Impulsione o movimento com as pernas, mantendo a barra próxima ao corpo",
      "Estenda completamente quadril e joelhos no topo do movimento",
      "Desça controlando o movimento, mantendo a tensão nos posteriores"
    ],
    imageUrls: ["https://source.unsplash.com/random/300x300/?deadlift"],
    videoUrl: "https://example.com/video-deadlift",
    variations: ["ex-004", "ex-005"],
    rpeChart: [
      {
        rpe: 10,
        repsInReserve: 0,
        percentageOfMax: 1.0,
        description: "Máximo absoluto, impossível fazer outra repetição"
      },
      {
        rpe: 9,
        repsInReserve: 1,
        percentageOfMax: 0.95,
        description: "Poderia fazer mais uma repetição com grande esforço"
      },
      {
        rpe: 8,
        repsInReserve: 2,
        percentageOfMax: 0.90,
        description: "Poderia fazer mais duas repetições"
      }
    ],
    tips: [
      "Mantenha o core engajado o tempo todo",
      "Use luvas ou magnésio para melhorar a pegada",
      "Foco na técnica antes de aumentar a carga",
      "Respire adequadamente: inspire antes de levantar, expire ao completar o movimento"
    ],
    cautions: [
      "Contraindidado para quem tem histórico de lesões lombares sem supervisão",
      "Aprenda a técnica correta com um profissional"
    ],
    isCompound: true,
    isUnilateral: false,
    targetRPE: 8,
    category: "strength",
    tags: ["posterior-chain", "compound", "fundamental", "laercio-approved"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "ex-003",
    name: "Supino Reto",
    primaryMuscleGroups: ["chest"],
    secondaryMuscleGroups: ["shoulders", "triceps"],
    equipment: ["barbell", "dumbbell"],
    difficulty: "intermediate",
    description: "Exercício clássico para desenvolvimento de força e massa muscular no peitoral. Envolvimento secundário de ombros e tríceps.",
    instructions: [
      "Deite no banco com os pés apoiados firmemente no chão",
      "Segure a barra com as mãos ligeiramente mais largas que os ombros",
      "Desça a barra controladamente até tocar levemente o peito",
      "Empurre a barra para cima, estendendo completamente os braços",
      "Mantenha os cotovelos a aproximadamente 45-75° em relação ao corpo",
      "Concentre-se na contração do peitoral durante o movimento"
    ],
    imageUrls: ["https://source.unsplash.com/random/300x300/?bench-press"],
    videoUrl: "https://example.com/video-bench-press",
    variations: ["ex-006", "ex-007"],
    rpeChart: [
      {
        rpe: 10,
        repsInReserve: 0,
        percentageOfMax: 1.0,
        description: "Máximo absoluto, impossível fazer outra repetição"
      },
      {
        rpe: 9,
        repsInReserve: 1,
        percentageOfMax: 0.95,
        description: "Poderia fazer mais uma repetição com grande esforço"
      },
      {
        rpe: 8,
        repsInReserve: 2,
        percentageOfMax: 0.90,
        description: "Poderia fazer mais duas repetições"
      }
    ],
    tips: [
      "Mantenha as escápulas retraídas (para trás e para baixo)",
      "Não deixe os cotovelos abrirem muito (90°) para reduzir o estresse nos ombros",
      "Respire adequadamente: inspire na descida, expire na subida",
      "Foco na amplitude de movimento completa para máximo desenvolvimento"
    ],
    cautions: [
      "Evite arquear excessivamente as costas",
      "Sempre tenha um apoio (spotter) para cargas pesadas"
    ],
    isCompound: true,
    isUnilateral: false,
    targetRPE: 8,
    category: "strength",
    tags: ["upper-body", "push", "compound", "fundamental", "laercio-approved"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "ex-004",
    name: "Barra Fixa (Pull-up)",
    primaryMuscleGroups: ["back"],
    secondaryMuscleGroups: ["biceps", "shoulders", "forearms"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    description: "Exercício fundamental para desenvolvimento das costas, com grande ativação do grande dorsal (latissimus dorsi). Excelente para ganho de força e condicionamento da parte superior do corpo.",
    instructions: [
      "Segure a barra com as mãos afastadas além da largura dos ombros",
      "Inicie na posição estendida, com braços esticados",
      "Puxe o corpo para cima até que o queixo ultrapasse a barra",
      "Desça controladamente até a posição inicial",
      "Mantenha os cotovelos apontando para trás e para baixo durante o movimento",
      "Concentre-se em puxar usando os músculos das costas, não somente os braços"
    ],
    imageUrls: ["https://source.unsplash.com/random/300x300/?pull-up"],
    videoUrl: "https://example.com/video-pull-up",
    variations: ["ex-008", "ex-009"],
    tips: [
      "Inicie com variações assistidas se não conseguir executar o movimento completo",
      "Contraia as escápulas antes de iniciar a puxada para maior ativação das costas",
      "Evite usar impulso (kipping) a menos que esteja treinando especificamente essa variação",
      "Respire adequadamente: expire na subida, inspire na descida"
    ],
    cautions: [
      "Se sentir dor no ombro, consulte um profissional",
      "Progrida gradualmente para evitar lesões nos cotovelos e ombros"
    ],
    isCompound: true,
    isUnilateral: false,
    targetRPE: 8,
    category: "strength",
    tags: ["upper-body", "pull", "compound", "bodyweight", "fundamental", "laercio-approved"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "ex-005",
    name: "Desenvolvimento com Halteres",
    primaryMuscleGroups: ["shoulders"],
    secondaryMuscleGroups: ["triceps", "traps"],
    equipment: ["dumbbell"],
    difficulty: "intermediate",
    description: "Exercício completo para desenvolvimento dos ombros, com foco nos deltoides. Os halteres permitem maior amplitude de movimento e trabalho independente de cada lado.",
    instructions: [
      "Segure os halteres ao nível dos ombros, palmas voltadas para frente",
      "Mantenha o core engajado e a postura ereta",
      "Pressione os halteres para cima até que os braços estejam completamente estendidos",
      "Mantenha um leve afastamento dos cotovelos em relação ao corpo",
      "Desça de forma controlada até a posição inicial",
      "Evite arquear as costas durante o movimento"
    ],
    imageUrls: ["https://source.unsplash.com/random/300x300/?shoulder-press"],
    videoUrl: "https://example.com/video-dumbbell-press",
    variations: ["ex-010", "ex-011"],
    tips: [
      "Inicie com pesos leves para dominar a técnica",
      "Mantenha o alinhamento dos punhos e cotovelos durante o movimento",
      "Não bloqueie completamente os cotovelos no topo para manter a tensão muscular",
      "Respire adequadamente: expire na subida, inspire na descida"
    ],
    cautions: [
      "Evite este exercício se tiver problemas nos ombros sem orientação profissional",
      "Não use impulso do corpo para levantar os pesos"
    ],
    isCompound: true,
    isUnilateral: false,
    targetRPE: 7,
    category: "strength",
    tags: ["upper-body", "push", "shoulders", "compound", "laercio-approved"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  }
];
