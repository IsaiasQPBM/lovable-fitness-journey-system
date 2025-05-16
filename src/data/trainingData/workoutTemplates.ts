
import { Workout, WorkoutExercise, WorkoutSet } from "@/types/training";

// Sample workout templates according to Laércio Refundini methodology
export const workoutTemplates: Workout[] = [
  {
    id: "workout-001",
    userId: "user-1",
    name: "Treino A - Superior (Push)",
    description: "Treino focado nos músculos do peito, ombros e tríceps, com ênfase em movimentos compostos.",
    exercises: [
      {
        id: "wrk-ex-001",
        exerciseId: "ex-003", // Supino Reto
        order: 1,
        sets: [
          {
            id: "set-001",
            exerciseId: "ex-003",
            setNumber: 1,
            targetReps: 12,
            targetWeight: 60,
            targetRPE: 7,
            isWarmup: true,
            restPeriod: 90,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-002",
            exerciseId: "ex-003",
            setNumber: 2,
            targetReps: 10,
            targetWeight: 70,
            targetRPE: 8,
            isWarmup: false,
            restPeriod: 120,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-003",
            exerciseId: "ex-003",
            setNumber: 3,
            targetReps: 8,
            targetWeight: 75,
            targetRPE: 9,
            isWarmup: false,
            restPeriod: 120,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-004",
            exerciseId: "ex-003",
            setNumber: 4,
            targetReps: 8,
            targetWeight: 75,
            targetRPE: 9,
            isWarmup: false,
            restPeriod: 180,
            completedReps: 0,
            completed: false,
            skipped: false,
          }
        ],
        notes: "Foco na amplitude completa de movimento e contração do peitoral."
      },
      {
        id: "wrk-ex-002",
        exerciseId: "ex-005", // Desenvolvimento com Halteres
        order: 2,
        sets: [
          {
            id: "set-005",
            exerciseId: "ex-005",
            setNumber: 1,
            targetReps: 10,
            targetWeight: 22, // 11kg em cada mão
            targetRPE: 7,
            isWarmup: false,
            restPeriod: 90,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-006",
            exerciseId: "ex-005",
            setNumber: 2,
            targetReps: 10,
            targetWeight: 24, // 12kg em cada mão
            targetRPE: 8,
            isWarmup: false,
            restPeriod: 90,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-007",
            exerciseId: "ex-005",
            setNumber: 3,
            targetReps: 8,
            targetWeight: 26, // 13kg em cada mão
            targetRPE: 9,
            isWarmup: false,
            restPeriod: 120,
            completedReps: 0,
            completed: false,
            skipped: false,
          }
        ],
        notes: "Mantenha a postura ereta e evite usar impulso."
      },
    ],
    targetMuscleGroups: ["chest", "shoulders", "triceps"],
    estimatedDuration: 60,
    difficulty: "intermediate",
    notes: "Realize um aquecimento geral antes de iniciar o treino, e alongamentos ao final.",
    tags: ["push", "upper-body", "chest-focus", "lafit-method"],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  },
  {
    id: "workout-002",
    userId: "user-1",
    name: "Treino B - Costas e Bíceps",
    description: "Treino focado nos músculos dorsais e bíceps, com ênfase em movimentos compostos de puxada.",
    exercises: [
      {
        id: "wrk-ex-003",
        exerciseId: "ex-004", // Barra Fixa (Pull-up)
        order: 1,
        sets: [
          {
            id: "set-008",
            exerciseId: "ex-004",
            setNumber: 1,
            targetReps: 8,
            isWarmup: true,
            restPeriod: 90,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-009",
            exerciseId: "ex-004",
            setNumber: 2,
            targetReps: 8,
            isWarmup: false,
            restPeriod: 120,
            targetRPE: 8,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-010",
            exerciseId: "ex-004",
            setNumber: 3,
            targetReps: 6,
            isWarmup: false,
            restPeriod: 120,
            targetRPE: 9,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-011",
            exerciseId: "ex-004",
            setNumber: 4,
            targetReps: 6,
            isWarmup: false,
            restPeriod: 120,
            targetRPE: 9,
            completedReps: 0,
            completed: false,
            skipped: false,
          }
        ],
        notes: "Se necessário, use banda de assistência para completar as repetições."
      },
      {
        id: "wrk-ex-004",
        exerciseId: "ex-002", // Levantamento Terra
        order: 2,
        sets: [
          {
            id: "set-012",
            exerciseId: "ex-002",
            setNumber: 1,
            targetReps: 10,
            targetWeight: 80,
            isWarmup: true,
            restPeriod: 120,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-013",
            exerciseId: "ex-002",
            setNumber: 2,
            targetReps: 8,
            targetWeight: 100,
            targetRPE: 7,
            isWarmup: false,
            restPeriod: 180,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-014",
            exerciseId: "ex-002",
            setNumber: 3,
            targetReps: 5,
            targetWeight: 120,
            targetRPE: 8,
            isWarmup: false,
            restPeriod: 240,
            completedReps: 0,
            completed: false,
            skipped: false,
          }
        ],
        notes: "Priorize a técnica perfeita em vez de aumentar a carga. Mantenha a coluna neutra."
      }
    ],
    targetMuscleGroups: ["back", "biceps", "forearms", "hamstrings", "glutes"],
    estimatedDuration: 55,
    difficulty: "intermediate",
    notes: "Realize um aquecimento específico para a lombar antes do levantamento terra.",
    tags: ["pull", "back-focus", "compound", "lafit-method"],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  },
  {
    id: "workout-003",
    userId: "user-1",
    name: "Treino C - Pernas",
    description: "Treino focado nos músculos das pernas, com ênfase nos movimentos compostos para membros inferiores.",
    exercises: [
      {
        id: "wrk-ex-005",
        exerciseId: "ex-001", // Agachamento Livre
        order: 1,
        sets: [
          {
            id: "set-015",
            exerciseId: "ex-001",
            setNumber: 1,
            targetReps: 12,
            targetWeight: 60,
            isWarmup: true,
            restPeriod: 90,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-016",
            exerciseId: "ex-001",
            setNumber: 2,
            targetReps: 10,
            targetWeight: 80,
            targetRPE: 7,
            isWarmup: false,
            restPeriod: 120,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-017",
            exerciseId: "ex-001",
            setNumber: 3,
            targetReps: 8,
            targetWeight: 90,
            targetRPE: 8,
            isWarmup: false,
            restPeriod: 180,
            completedReps: 0,
            completed: false,
            skipped: false,
          },
          {
            id: "set-018",
            exerciseId: "ex-001",
            setNumber: 4,
            targetReps: 6,
            targetWeight: 100,
            targetRPE: 9,
            isWarmup: false,
            restPeriod: 180,
            completedReps: 0,
            completed: false,
            skipped: false,
          }
        ],
        notes: "Mantenha os joelhos alinhados com os pés durante todo o movimento."
      }
    ],
    targetMuscleGroups: ["quadriceps", "hamstrings", "glutes", "calves"],
    estimatedDuration: 45,
    difficulty: "intermediate",
    notes: "Priorize a recuperação adequada após este treino, pois os exercícios para pernas são muito exigentes.",
    tags: ["legs", "compound", "lafit-method"],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  }
];
