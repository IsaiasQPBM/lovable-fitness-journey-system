
import { BodyGoal } from "@/types/bodyMonitoring";

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
