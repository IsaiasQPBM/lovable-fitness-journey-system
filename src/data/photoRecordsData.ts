
import { PhotoRecord } from "@/types/bodyMonitoring";

// Registros fotográficos
export const photoRecords: PhotoRecord[] = [
  {
    id: "photo-1",
    userId: "user-1",
    date: new Date("2024-05-15"),
    pose: "front",
    poseType: "front", // Adicionado para compatibilidade
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
    poseType: "back", // Adicionado para compatibilidade
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
    poseType: "front", // Adicionado para compatibilidade
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
    poseType: "back", // Adicionado para compatibilidade
    imageUrl: "https://source.unsplash.com/random/300x400/?muscle-back",
    visibility: "private",
    tags: ["início", "corte", "maio"],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  }
];
