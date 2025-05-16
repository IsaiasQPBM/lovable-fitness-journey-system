
import { 
  BodyMeasurementRecord, 
  PhotoRecord, 
  BodyGoal, 
  ProgressReport,
  UserBodyProfile 
} from "@/types/bodyMonitoring";

// Perfil corporal mockado do usuário
export const userBodyProfile: UserBodyProfile = {
  id: "1",
  userId: "user-1",
  height: 178,
  wristCircumference: 17.5,
  ankleCircumference: 22.0,
  bodyType: "mesomorph",
  structure: "medium",
  baseMeasurementUnit: "metric",
  baseBodyFatMethod: "skinfold",
  weightMeasurementFrequency: "daily",
  bodyMeasurementFrequency: "weekly",
  photoFrequency: "biweekly",
  weightConditions: ["em jejum", "pela manhã", "após ir ao banheiro"],
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-04-15")
};

// Histórico de medições corporais
export const bodyMeasurementHistory: BodyMeasurementRecord[] = [
  {
    id: "measurement-1",
    userId: "user-1",
    date: new Date("2024-05-15"),
    weight: 81.3,
    bodyFat: 16.8,
    bodyFatMethod: "skinfold",
    measurements: {
      neck: 39.5,
      shoulders: 120.0,
      chest: 103.5,
      leftBicep: 37.2,
      rightBicep: 37.5,
      leftForearm: 30.0,
      rightForearm: 30.1,
      waist: 82.5,
      abdomen: 85.0,
      hips: 98.5,
      leftThigh: 59.0,
      rightThigh: 59.3,
      leftCalf: 38.2,
      rightCalf: 38.4
    },
    notes: "Me senti bem hoje, menos inchado que na semana passada.",
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15")
  },
  {
    id: "measurement-2",
    userId: "user-1",
    date: new Date("2024-05-08"),
    weight: 82.1,
    bodyFat: 17.2,
    bodyFatMethod: "skinfold",
    measurements: {
      neck: 39.3,
      shoulders: 119.5,
      chest: 103.0,
      leftBicep: 37.0,
      rightBicep: 37.2,
      leftForearm: 29.8,
      rightForearm: 30.0,
      waist: 83.2,
      abdomen: 85.8,
      hips: 98.8,
      leftThigh: 58.7,
      rightThigh: 59.0,
      leftCalf: 38.0,
      rightCalf: 38.2
    },
    notes: "Senti-me um pouco inchado hoje, talvez devido ao alto consumo de sódio ontem.",
    createdAt: new Date("2024-05-08"),
    updatedAt: new Date("2024-05-08")
  },
  {
    id: "measurement-3",
    userId: "user-1",
    date: new Date("2024-05-01"),
    weight: 82.5,
    bodyFat: 17.5,
    bodyFatMethod: "skinfold",
    measurements: {
      neck: 39.1,
      shoulders: 118.8,
      chest: 102.5,
      leftBicep: 36.8,
      rightBicep: 37.0,
      leftForearm: 29.5,
      rightForearm: 29.7,
      waist: 83.8,
      abdomen: 86.2,
      hips: 99.0,
      leftThigh: 58.5,
      rightThigh: 58.7,
      leftCalf: 37.8,
      rightCalf: 38.0
    },
    notes: "Primeira medição completa do mês.",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  }
];

// Registros fotográficos
export const photoRecords: PhotoRecord[] = [
  {
    id: "photo-1",
    userId: "user-1",
    date: new Date("2024-05-15"),
    pose: "front",
    imageUrl: "https://source.unsplash.com/random/300x400/?fitness-male-front",
    visibility: "private",
    tags: ["corte", "progresso", "maio"],
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15")
  },
  {
    id: "photo-2",
    userId: "user-1",
    date: new Date("2024-05-15"),
    pose: "back",
    imageUrl: "https://source.unsplash.com/random/300x400/?fitness-male-back",
    visibility: "private",
    tags: ["corte", "progresso", "maio"],
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15")
  },
  {
    id: "photo-3",
    userId: "user-1",
    date: new Date("2024-05-01"),
    pose: "front",
    imageUrl: "https://source.unsplash.com/random/300x400/?fitness-male-posing",
    visibility: "private",
    tags: ["início", "corte", "maio"],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  },
  {
    id: "photo-4",
    userId: "user-1",
    date: new Date("2024-05-01"),
    pose: "back",
    imageUrl: "https://source.unsplash.com/random/300x400/?muscle-back",
    visibility: "private",
    tags: ["início", "corte", "maio"],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  }
];

// Metas corporais
export const bodyGoals: BodyGoal[] = [
  {
    id: "goal-1",
    userId: "user-1",
    type: "weightLoss",
    title: "Perda de Gordura - Fase Cutting",
    description: "Reduzir percentual de gordura mantendo massa magra",
    startDate: new Date("2024-05-01"),
    targetDate: new Date("2024-07-31"),
    startValue: 82.5,
    targetValue: 76.0,
    unit: "kg",
    measurementType: "weight",
    weeklyTarget: 0.5, // 0.5kg por semana
    status: "active",
    progress: 24, // 24% completo
    checkpoints: [
      {
        date: new Date("2024-05-31"),
        expectedValue: 80.5,
        notes: "Primeiro mês - meta de -2kg"
      },
      {
        date: new Date("2024-06-30"),
        expectedValue: 78.0,
        notes: "Segundo mês - meta de -2.5kg"
      },
      {
        date: new Date("2024-07-31"),
        expectedValue: 76.0,
        notes: "Meta final - redução total de 6.5kg"
      }
    ],
    notes: "Seguir plano de déficit calórico moderado com manutenção de proteína alta.",
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2024-05-15")
  },
  {
    id: "goal-2",
    userId: "user-1",
    type: "weightLoss",
    title: "Redução de Gordura Corporal",
    description: "Diminuir o percentual de gordura para faixa atlética",
    startDate: new Date("2024-05-01"),
    targetDate: new Date("2024-08-31"),
    startValue: 17.5,
    targetValue: 13.0,
    unit: "%",
    measurementType: "bodyFat",
    bodyPart: "weight",
    weeklyTarget: 0.3, // 0.3% por semana
    status: "active",
    progress: 16, // 16% completo
    checkpoints: [
      {
        date: new Date("2024-05-31"),
        expectedValue: 16.3,
        notes: "Primeiro mês - meta de -1.2%"
      },
      {
        date: new Date("2024-06-30"),
        expectedValue: 15.1,
        notes: "Segundo mês - meta de -1.2%"
      },
      {
        date: new Date("2024-07-31"),
        expectedValue: 14.0,
        notes: "Terceiro mês - meta de -1.1%"
      },
      {
        date: new Date("2024-08-31"),
        expectedValue: 13.0,
        notes: "Meta final - redução total de 4.5%"
      }
    ],
    notes: "Foco em treinos HIIT e manutenção de proteína alta para preservar massa muscular.",
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2024-05-15")
  },
  {
    id: "goal-3",
    userId: "user-1",
    type: "muscleGain",
    title: "Desenvolvimento de Bíceps",
    description: "Aumentar a circunferência dos braços",
    startDate: new Date("2024-05-01"),
    targetDate: new Date("2024-10-31"),
    startValue: 37.0,
    targetValue: 40.0,
    unit: "cm",
    measurementType: "measurement",
    bodyPart: "leftBicep",
    weeklyTarget: 0.13, // ~0.5cm por mês
    status: "active",
    progress: 8, // 8% completo
    checkpoints: [
      {
        date: new Date("2024-06-30"),
        expectedValue: 38.0,
        notes: "Dois meses - meta de +1cm"
      },
      {
        date: new Date("2024-08-31"),
        expectedValue: 39.0,
        notes: "Quatro meses - meta de +2cm"
      },
      {
        date: new Date("2024-10-31"),
        expectedValue: 40.0,
        notes: "Meta final - aumento total de 3cm"
      }
    ],
    notes: "Incluir treinamento específico para bíceps 2x por semana com foco em volume progressivo.",
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2024-05-15")
  },
  {
    id: "goal-4",
    userId: "user-1",
    type: "proportionImprovement",
    title: "Melhoria de Proporção Ombros/Cintura",
    description: "Aumentar a razão entre ombros e cintura para estética em V",
    startDate: new Date("2024-05-01"),
    targetDate: new Date("2024-12-31"),
    startValue: 1.43, // 119.5/83.5
    targetValue: 1.55, // Meta de proporção
    unit: "ratio",
    measurementType: "proportion",
    proportionGoal: {
      part1: "shoulders",
      part2: "waist",
      targetRatio: 1.55
    },
    status: "active",
    progress: 5, // 5% completo
    checkpoints: [
      {
        date: new Date("2024-07-31"),
        expectedValue: 1.47,
        notes: "Três meses - meta intermediária"
      },
      {
        date: new Date("2024-10-31"),
        expectedValue: 1.51,
        notes: "Seis meses - segunda meta intermediária"
      },
      {
        date: new Date("2024-12-31"),
        expectedValue: 1.55,
        notes: "Meta final - proporção ideal"
      }
    ],
    notes: "Combinar desenvolvimento de deltoides com redução gradual da circunferência da cintura.",
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2024-05-15")
  }
];

// Relatórios de progresso
export const progressReports: ProgressReport[] = [
  {
    id: "report-1",
    userId: "user-1",
    title: "Relatório Mensal - Abril 2024",
    dateRange: {
      startDate: new Date("2024-04-01"),
      endDate: new Date("2024-04-30")
    },
    metrics: {
      startWeight: 83.7,
      endWeight: 82.5,
      weightChange: -1.2,
      startBodyFat: 18.1,
      endBodyFat: 17.5,
      bodyFatChange: -0.6,
      measurementChanges: {
        waist: {
          start: 84.5,
          end: 83.8,
          change: -0.7
        },
        chest: {
          start: 102.0,
          end: 102.5,
          change: 0.5
        },
        leftBicep: {
          start: 36.5,
          end: 36.8,
          change: 0.3
        }
        // Outras medidas omitidas para brevidade
      }
    },
    goals: [
      {
        goalId: "goal-1",
        progress: 18,
        achieved: false
      },
      {
        goalId: "goal-2",
        progress: 13,
        achieved: false
      }
    ],
    analysis: {
      plateauDetected: false,
      changeRate: 0.3, // -0.3kg por semana
      efficiency: 85, // 85% da meta idealizada
      suggestions: [
        "Aumentar ligeiramente o déficit calórico para otimizar a perda de gordura",
        "Manter ou aumentar a ingestão de proteína para preservar massa magra",
        "Considerar adição de cardio de baixa intensidade (ex: caminhada matinal)"
      ],
      trends: [
        "Boa preservação de massa muscular durante o déficit",
        "Perda de gordura consistente na região abdominal",
        "Ligeiro aumento de medidas musculares nos braços"
      ]
    },
    notes: "Mês inicial de cutting com bom progresso. Energia mantida estável e força nos treinos preservada.",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  }
];
