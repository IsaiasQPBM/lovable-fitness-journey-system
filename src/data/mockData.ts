
import { CompletedTrainingSession } from "@/types/training";

// Mock para sessões de treino concluídas
export const mockCompletedWorkouts: CompletedTrainingSession[] = [
  {
    id: "1",
    trainingSessionId: "1",
    date: new Date("2024-05-14"),
    exercises: [],
    duration: 65, // Em minutos
    notes: "Treino bastante intenso, foco nos exercícios compostos. Boa progressão nos pesos.",
    rating: 4,
    effort: 8,
    muscleGroups: {
      chest: 15,
      triceps: 10,
      shoulders: 5,
      back: 0,
      biceps: 0,
      legs: 0,
      glutes: 0,
      abs: 0,
      calves: 0,
      forearms: 0,
      neck: 0,
      core: 5
    }
  },
  {
    id: "2",
    trainingSessionId: "2",
    date: new Date("2024-05-12"),
    exercises: [],
    duration: 60, // Em minutos
    notes: "Foco em costas e bíceps. Bom bombeamento, mas um pouco de fadiga do treino anterior.",
    rating: 3,
    effort: 7,
    muscleGroups: {
      back: 15,
      biceps: 10,
      forearms: 5,
      chest: 0,
      triceps: 0,
      shoulders: 3,
      legs: 0,
      glutes: 0,
      abs: 0,
      calves: 0,
      neck: 0,
      core: 3
    }
  },
  {
    id: "3",
    trainingSessionId: "3",
    date: new Date("2024-05-10"),
    exercises: [],
    duration: 70, // Em minutos
    notes: "Treino de pernas completo. Muito cansativo, mas produtivo. Progredi nos principais exercícios.",
    rating: 5,
    effort: 9,
    muscleGroups: {
      legs: 20,
      glutes: 15,
      calves: 8,
      core: 5,
      chest: 0,
      back: 0,
      shoulders: 0,
      triceps: 0,
      biceps: 0,
      forearms: 0,
      abs: 3,
      neck: 0
    }
  }
];
