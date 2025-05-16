
import { BodyMeasurementRecord } from "@/types/bodyMonitoring";

// Histórico de medições corporais
export const bodyMeasurementHistory: BodyMeasurementRecord[] = [
  {
    id: "measurement-1",
    userId: "user-1",
    date: new Date("2024-05-15"),
    weight: 81.3,
    bodyFat: 16.8,
    bodyFatMethod: "skinfold",
    height: 178, // Adicionando a propriedade height
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
    height: 178,
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
    height: 178,
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
