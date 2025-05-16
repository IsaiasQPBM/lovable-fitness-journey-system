
import { ProgressReport } from "@/types/bodyMonitoring";

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
