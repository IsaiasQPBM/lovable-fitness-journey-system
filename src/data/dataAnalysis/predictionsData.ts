
import { Prediction } from "@/types/dataAnalysis";

// Mock predictions data
export const predictions: Prediction[] = [
  {
    id: "pred-1",
    userId: "user-1",
    targetMetric: {
      source: "bodyMonitoring",
      metric: "weight",
      label: "Peso Corporal"
    },
    currentValue: 81.3,
    predictedValue: 79.8,
    confidence: 0.85,
    timeframe: "30 dias",
    factors: [
      {
        source: "nutrition",
        factor: "calorieDeficit",
        impact: 0.7,
        confidence: 0.9
      },
      {
        source: "training",
        factor: "trainingConsistency",
        impact: 0.5,
        confidence: 0.8
      },
      {
        source: "recovery",
        factor: "sleepQuality",
        impact: 0.3,
        confidence: 0.7
      }
    ],
    scenario: "default",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "pred-2",
    userId: "user-1",
    targetMetric: {
      source: "training",
      metric: "squatOneRepMax",
      label: "1RM no Agachamento"
    },
    currentValue: 140,
    predictedValue: 145,
    confidence: 0.75,
    timeframe: "60 dias",
    factors: [
      {
        source: "training",
        factor: "volumeProgression",
        impact: 0.8,
        confidence: 0.85
      },
      {
        source: "nutrition",
        factor: "proteinIntake",
        impact: 0.6,
        confidence: 0.8
      },
      {
        source: "recovery",
        factor: "recoveryQuality",
        impact: 0.5,
        confidence: 0.7
      }
    ],
    scenario: "optimistic",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "pred-3",
    userId: "user-1",
    targetMetric: {
      source: "bodyMonitoring",
      metric: "bodyFatPercentage",
      label: "Percentual de Gordura Corporal"
    },
    currentValue: 16.8,
    predictedValue: 15.3,
    confidence: 0.8,
    timeframe: "45 dias",
    factors: [
      {
        source: "nutrition",
        factor: "calorieDeficit",
        impact: 0.8,
        confidence: 0.85
      },
      {
        source: "training",
        factor: "cardioFrequency",
        impact: 0.4,
        confidence: 0.7
      },
      {
        source: "nutrition",
        factor: "proteinIntake",
        impact: 0.6,
        confidence: 0.8
      }
    ],
    scenario: "default",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
