
import { 
  UserBodyProfile, 
  BodyMeasurementRecord, 
  PhotoRecord, 
  BodyCompositionAnalysis,
  BodyGoal,
  ProgressReport
} from "@/types/bodyMonitoring";

// Perfil corporal do usuário
export const userBodyProfile: UserBodyProfile = {
  id: "1",
  userId: "1",
  height: 178,                    // 1.78m
  wristCircumference: 17.2,       // 17.2cm
  ankleCircumference: 22.5,       // 22.5cm
  bodyType: "mesomorph",
  structure: "medium",
  baseMeasurementUnit: "metric",
  baseBodyFatMethod: "skinfold",
  weightMeasurementFrequency: "daily",
  bodyMeasurementFrequency: "weekly",
  photoFrequency: "biweekly",
  weightConditions: ["em jejum", "pela manhã", "após ir ao banheiro"],
  createdAt: new Date("2023-12-01"),
  updatedAt: new Date("2023-12-01")
};

// Histórico de medidas corporais (últimos 4 registros)
export const bodyMeasurementHistory: BodyMeasurementRecord[] = [
  {
    id: "1",
    userId: "1",
    date: new Date("2024-05-01"),
    weight: 82.5,
    bodyFat: 17.8,
    bodyFatMethod: "skinfold",
    measurements: {
      neck: 39.5,
      chest: 103.2,
      leftBicep: 36.5,
      rightBicep: 36.8,
      waist: 84.3,
      hips: 98.7,
      leftThigh: 59.4,
      rightThigh: 59.6,
      leftCalf: 38.2,
      rightCalf: 38.4
    },
    notes: "Medições após 1 mês de dieta de manutenção.",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  },
  {
    id: "2",
    userId: "1",
    date: new Date("2024-05-08"),
    weight: 81.9,
    bodyFat: 17.5,
    bodyFatMethod: "skinfold",
    measurements: {
      neck: 39.6,
      chest: 103.5,
      leftBicep: 36.7,
      rightBicep: 36.9,
      waist: 83.8,
      hips: 98.5,
      leftThigh: 59.6,
      rightThigh: 59.7,
      leftCalf: 38.3,
      rightCalf: 38.4
    },
    notes: "Primeira semana de cutting, perda de 0.6kg.",
    createdAt: new Date("2024-05-08"),
    updatedAt: new Date("2024-05-08")
  },
  {
    id: "3",
    userId: "1",
    date: new Date("2024-05-15"),
    weight: 81.3,
    bodyFat: 17.0,
    bodyFatMethod: "skinfold",
    measurements: {
      neck: 39.7,
      chest: 103.7,
      leftBicep: 36.8,
      rightBicep: 37.0,
      waist: 83.0,
      hips: 98.2,
      leftThigh: 59.5,
      rightThigh: 59.6,
      leftCalf: 38.3,
      rightCalf: 38.4
    },
    notes: "Segunda semana de cutting, cintura começando a reduzir mais visivelmente.",
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15")
  },
  {
    id: "4",
    userId: "1",
    date: new Date("2024-05-16"),
    weight: 81.1,
    bodyFat: null,
    bodyFatMethod: null,
    measurements: {},
    notes: "Apenas registro de peso diário.",
    createdAt: new Date("2024-05-16"),
    updatedAt: new Date("2024-05-16")
  }
];

// Registros de fotos
export const photoRecords: PhotoRecord[] = [
  {
    id: "1",
    userId: "1",
    date: new Date("2024-05-01"),
    pose: "front",
    imageUrl: "https://source.unsplash.com/random/500x800/?fitness-male-front",
    visibility: "private",
    tags: ["início", "cutting", "maio"],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  },
  {
    id: "2",
    userId: "1",
    date: new Date("2024-05-01"),
    pose: "back",
    imageUrl: "https://source.unsplash.com/random/500x800/?fitness-male-back",
    visibility: "private",
    tags: ["início", "cutting", "maio"],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  },
  {
    id: "3",
    userId: "1",
    date: new Date("2024-05-15"),
    pose: "front",
    imageUrl: "https://source.unsplash.com/random/500x800/?fitness-male-progress",
    visibility: "private",
    tags: ["progresso", "cutting", "maio"],
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15")
  },
  {
    id: "4",
    userId: "1",
    date: new Date("2024-05-15"),
    pose: "back",
    imageUrl: "https://source.unsplash.com/random/500x800/?fitness-male-progress-back",
    visibility: "private",
    tags: ["progresso", "cutting", "maio"],
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15")
  }
];

// Análises de composição corporal
export const bodyCompositionHistory: BodyCompositionAnalysis[] = [
  {
    id: "1",
    userId: "1",
    date: new Date("2024-05-01"),
    weight: 82.5,
    bodyFat: 17.8,
    leanMass: 67.8,
    bodyFatMass: 14.7,
    bodyWater: 49.5,
    boneMass: 3.7,
    ffmi: 21.4,
    fmi: 4.6,
    bmi: 26.0,
    fatDistribution: "mixed",
    basalMetabolicRate: 1880,
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  },
  {
    id: "2",
    userId: "1",
    date: new Date("2024-05-15"),
    weight: 81.3,
    bodyFat: 17.0,
    leanMass: 67.5,
    bodyFatMass: 13.8,
    bodyWater: 49.3,
    boneMass: 3.7,
    ffmi: 21.3,
    fmi: 4.4,
    bmi: 25.6,
    fatDistribution: "mixed",
    basalMetabolicRate: 1875,
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15")
  }
];

// Metas corporais
export const bodyGoals: BodyGoal[] = [
  {
    id: "1",
    userId: "1",
    type: "weightLoss",
    title: "Cutting para o verão",
    description: "Reduzir percentual de gordura preservando massa muscular",
    startDate: new Date("2024-05-01"),
    targetDate: new Date("2024-08-01"),
    startValue: 82.5,
    targetValue: 76.0,
    unit: "kg",
    measurementType: "weight",
    weeklyTarget: 0.5, // Perda de 0.5kg por semana
    status: "active",
    progress: 21.5, // (82.5 - 81.1) / (82.5 - 76.0) * 100
    checkpoints: [
      {
        date: new Date("2024-05-15"),
        expectedValue: 81.5,
        actualValue: 81.3,
        notes: "Ligeiramente à frente do cronograma"
      },
      {
        date: new Date("2024-06-01"),
        expectedValue: 80.0,
        actualValue: null
      },
      {
        date: new Date("2024-07-01"),
        expectedValue: 78.0,
        actualValue: null
      }
    ],
    notes: "Manter déficit calórico de 400-500kcal com ajuste de carboidratos nos dias de treino.",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-16")
  },
  {
    id: "2",
    userId: "1",
    type: "proportionImprovement",
    title: "Melhorar proporção ombro/cintura",
    description: "Aumentar a circunferência dos ombros enquanto reduz a cintura",
    startDate: new Date("2024-05-01"),
    targetDate: new Date("2024-08-15"),
    startValue: 1.22, // 103.2 / 84.3
    targetValue: 1.35,
    unit: "ratio",
    measurementType: "proportion",
    proportionGoal: {
      part1: "shoulders",
      part2: "waist",
      targetRatio: 1.35
    },
    status: "active",
    progress: 15.4, // ((103.7 / 83.0) - 1.22) / (1.35 - 1.22) * 100
    checkpoints: [
      {
        date: new Date("2024-05-15"),
        expectedValue: 1.24,
        actualValue: 1.25, // 103.7 / 83.0
        notes: "Bom progresso inicial"
      },
      {
        date: new Date("2024-06-15"),
        expectedValue: 1.28,
        actualValue: null
      },
      {
        date: new Date("2024-07-15"),
        expectedValue: 1.32,
        actualValue: null
      }
    ],
    notes: "Foco em treino de ombros 2x por semana e controle de dieta para redução de gordura abdominal.",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-16")
  },
  {
    id: "3",
    userId: "1",
    type: "bodyFat",
    title: "Redução de gordura corporal",
    description: "Alcançar 12% de gordura corporal",
    startDate: new Date("2024-05-01"),
    targetDate: new Date("2024-08-01"),
    startValue: 17.8,
    targetValue: 12.0,
    unit: "%",
    measurementType: "bodyFat",
    status: "active",
    progress: 13.8, // (17.8 - 17.0) / (17.8 - 12.0) * 100
    checkpoints: [
      {
        date: new Date("2024-05-15"),
        expectedValue: 17.0,
        actualValue: 17.0,
        notes: "Exatamente conforme planejado"
      },
      {
        date: new Date("2024-06-15"),
        expectedValue: 15.5,
        actualValue: null
      },
      {
        date: new Date("2024-07-15"),
        expectedValue: 13.5,
        actualValue: null
      }
    ],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-16")
  }
];

// Relatório de progresso
export const progressReports: ProgressReport[] = [
  {
    id: "1",
    userId: "1",
    title: "Relatório Quinzenal - Início de Maio",
    dateRange: {
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-05-15")
    },
    metrics: {
      startWeight: 82.5,
      endWeight: 81.3,
      weightChange: -1.2,
      startBodyFat: 17.8,
      endBodyFat: 17.0,
      bodyFatChange: -0.8,
      measurementChanges: {
        neck: {
          start: 39.5,
          end: 39.7,
          change: 0.2
        },
        chest: {
          start: 103.2,
          end: 103.7,
          change: 0.5
        },
        waist: {
          start: 84.3,
          end: 83.0,
          change: -1.3
        },
        hips: {
          start: 98.7,
          end: 98.2,
          change: -0.5
        }
      }
    },
    goals: [
      {
        goalId: "1", // Meta de peso
        progress: 21.5,
        achieved: false
      },
      {
        goalId: "2", // Meta de proporção
        progress: 15.4,
        achieved: false
      },
      {
        goalId: "3", // Meta de gordura corporal
        progress: 13.8,
        achieved: false
      }
    ],
    analysis: {
      plateauDetected: false,
      changeRate: 0.6, // 0.6kg por semana
      efficiency: 95, // 95% de eficiência
      suggestions: [
        "Continue com o déficit calórico atual, está dentro do ideal",
        "Considere aumentar ligeiramente a ingestão de proteína para garantir preservação muscular",
        "Mantenha o volume de treino para a parte superior do corpo"
      ],
      trends: [
        "Redução consistente de medidas na região abdominal",
        "Ligeiro aumento nas medidas do tórax indicando possível ganho/manutenção muscular",
        "Perda de peso com taxa saudável e sustentável"
      ]
    },
    notes: "Progresso excelente nas primeiras duas semanas de cutting. A redução de gordura está ocorrendo principalmente na região abdominal, o que é positivo para a estética e saúde. Manutenção de massa muscular parece estar efetiva.",
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15")
  }
];

// Funções utilitárias para cálculos de composição corporal

// Função para calcular o Índice de Massa Corporal (IMC/BMI)
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightMeters = heightCm / 100;
  return Number((weightKg / (heightMeters * heightMeters)).toFixed(1));
}

// Função para calcular o FFMI (Fat-Free Mass Index)
export function calculateFFMI(weightKg: number, heightCm: number, bodyFatPercentage: number): number {
  const heightMeters = heightCm / 100;
  const leanMass = weightKg * (1 - bodyFatPercentage / 100);
  
  // FFMI = LBM/height² * (altura normalizada)
  const ffmi = (leanMass / (heightMeters * heightMeters)) * (1.8 / heightMeters); // Normalizado para altura de 1.8m
  
  return Number(ffmi.toFixed(1));
}

// Função para calcular o FMI (Fat Mass Index)
export function calculateFMI(weightKg: number, heightCm: number, bodyFatPercentage: number): number {
  const heightMeters = heightCm / 100;
  const fatMass = weightKg * (bodyFatPercentage / 100);
  
  // FMI = Fat Mass/height²
  const fmi = fatMass / (heightMeters * heightMeters);
  
  return Number(fmi.toFixed(1));
}

// Função para calcular a taxa metabólica basal usando a fórmula de Katch-McArdle
export function calculateBMR(weightKg: number, bodyFatPercentage: number): number {
  const leanMass = weightKg * (1 - bodyFatPercentage / 100);
  const bmr = 370 + (21.6 * leanMass);
  
  return Math.round(bmr);
}

// Função para calcular a proporção cintura-quadril (WHR)
export function calculateWaistHipRatio(waistCm: number, hipsCm: number): number {
  return Number((waistCm / hipsCm).toFixed(2));
}

// Função para determinar o padrão de distribuição de gordura
export function determineFatDistribution(waistCm: number, hipsCm: number): "android" | "gynoid" | "mixed" {
  const whr = calculateWaistHipRatio(waistCm, hipsCm);
  
  if (whr >= 0.9) {
    return "android"; // Padrão tipo maçã (abdominal)
  } else if (whr <= 0.8) {
    return "gynoid"; // Padrão tipo pêra (quadril/coxas)
  } else {
    return "mixed"; // Padrão misto
  }
}

// Função para calcular a taxa ideal de perda de peso baseada no percentual de gordura
export function calculateIdealWeightLossRate(bodyFatPercentage: number): number {
  if (bodyFatPercentage > 25) {
    return 0.8; // 0.8kg por semana para pessoas com gordura elevada
  } else if (bodyFatPercentage > 15) {
    return 0.5; // 0.5kg por semana para pessoas com gordura moderada
  } else if (bodyFatPercentage > 10) {
    return 0.3; // 0.3kg por semana para pessoas com baixa gordura
  } else {
    return 0.2; // 0.2kg por semana para pessoas muito magras
  }
}

// Função para estimar o déficit calórico diário ideal baseado na taxa de perda desejada
export function calculateIdealCalorieDeficit(weightLossRateKgPerWeek: number): number {
  // 1kg de gordura = aproximadamente 7700 kcal
  // Déficit semanal = taxa de perda * 7700 kcal
  // Déficit diário = déficit semanal / 7
  
  const weeklyDeficit = weightLossRateKgPerWeek * 7700;
  const dailyDeficit = Math.round(weeklyDeficit / 7);
  
  // Limitar o déficit máximo para evitar perda muscular excessiva
  return Math.min(dailyDeficit, 1000);
}

// Função para calcular o potencial muscular baseado na estrutura óssea
export function calculateMuscularPotential(heightCm: number, wristCm: number, ankleCm: number): "low" | "medium" | "high" {
  // Cálculo simplificado de estrutura baseado em proporções ósseas
  const frameIndex = (wristCm + ankleCm) / heightCm * 100;
  
  if (frameIndex < 11) {
    return "low"; // Estrutura pequena
  } else if (frameIndex < 13) {
    return "medium"; // Estrutura média
  } else {
    return "high"; // Estrutura grande
  }
}

// Função para verificar se houve um platô no progresso
export function detectPlateau(weightHistory: number[], threshold: number = 0.5): boolean {
  if (weightHistory.length < 3) return false; // Precisa de pelo menos 3 pontos de dados
  
  // Verificar se a variação está dentro do limiar de platô
  const recentWeights = weightHistory.slice(-3); // Últimos 3 registros
  const maxVariation = Math.max(...recentWeights) - Math.min(...recentWeights);
  
  return maxVariation < threshold;
}
