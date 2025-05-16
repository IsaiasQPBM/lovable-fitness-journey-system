
import { CorrelationAnalysis } from "@/types/dataAnalysis";

// Mock correlation analyses
export const correlationAnalyses: CorrelationAnalysis[] = [
  {
    id: "corr-1",
    userId: "user-1",
    variables: {
      x: {
        source: "recovery",
        metric: "sleepQuality",
        label: "Qualidade do Sono"
      },
      y: {
        source: "training",
        metric: "performanceRating",
        label: "Desempenho no Treino"
      }
    },
    correlationCoefficient: 0.78,
    pValue: 0.002,
    sampleSize: 28,
    timeRange: {
      start: new Date(new Date().setDate(new Date().getDate() - 30)),
      end: new Date()
    },
    interpretation: "Forte correlação positiva entre qualidade do sono e desempenho nos treinos subsequentes.",
    isSignificant: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "corr-2",
    userId: "user-1",
    variables: {
      x: {
        source: "nutrition",
        metric: "proteinIntake",
        label: "Consumo de Proteína"
      },
      y: {
        source: "bodyMonitoring",
        metric: "muscleGain",
        label: "Ganho de Massa Muscular"
      }
    },
    correlationCoefficient: 0.65,
    pValue: 0.01,
    sampleSize: 60,
    timeRange: {
      start: new Date(new Date().setDate(new Date().getDate() - 90)),
      end: new Date()
    },
    interpretation: "Correlação moderada a forte entre consumo de proteína e ganho de massa muscular.",
    isSignificant: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "corr-3",
    userId: "user-1",
    variables: {
      x: {
        source: "recovery",
        metric: "stressLevel",
        label: "Nível de Estresse"
      },
      y: {
        source: "nutrition",
        metric: "calorieCompliance",
        label: "Aderência Calórica"
      }
    },
    correlationCoefficient: -0.58,
    pValue: 0.03,
    sampleSize: 21,
    timeRange: {
      start: new Date(new Date().setDate(new Date().getDate() - 30)),
      end: new Date()
    },
    interpretation: "Correlação negativa entre níveis de estresse e aderência ao plano calórico.",
    isSignificant: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "corr-4",
    userId: "user-1",
    variables: {
      x: {
        source: "training",
        metric: "volumePerSession",
        label: "Volume por Sessão"
      },
      y: {
        source: "recovery",
        metric: "perceivedRecovery",
        label: "Recuperação Percebida"
      }
    },
    correlationCoefficient: -0.42,
    pValue: 0.08,
    sampleSize: 15,
    timeRange: {
      start: new Date(new Date().setDate(new Date().getDate() - 45)),
      end: new Date()
    },
    interpretation: "Correlação negativa fraca a moderada entre volume de treino e recuperação percebida.",
    isSignificant: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
