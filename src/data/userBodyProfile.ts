
import { UserBodyProfile } from "@/types/bodyMonitoring";

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
