
export interface Exercise {
  id: string;
  name: string;
  category: string;
  primaryMuscleGroup: string;
  secondaryMuscleGroups: string[];
  equipment: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  description?: string;
  instructions?: string[];
  videoUrl?: string;
  imageUrl?: string;
  tags?: string[];
}

export interface TrainingSession {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: string;
  exercises: TrainingExercise[];
  targetMuscleGroups: string[];
  estimatedDuration: number; // Em minutos
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingExercise {
  exerciseId: string;
  order: number;
  sets: number;
  repsPerSet: number[] | string; // Pode ser um array [8, 10, 12] ou uma string "8-12"
  weightPerSet?: number[]; // Em kg, opcional para exercícios com peso corporal
  restBetweenSets: number; // Em segundos
  tempo?: string; // Ex: "3-1-2-0" (excêntrica-pausa-concêntrica-pausa)
  notes?: string;
  alternateWith?: string; // ExerciseId para superset ou exercícios alternados
}

export interface CompletedTrainingSession {
  id: string;
  trainingSessionId: string;
  date: Date;
  exercises: CompletedExercise[];
  duration: number; // Em minutos
  notes?: string;
  rating: number; // 1-5, avaliação subjetiva do treino
  effort: number; // 1-10, percepção de esforço
  muscleGroups: Record<string, number>; // Mapeamento de grupos musculares para volume de treino
}

export interface CompletedExercise {
  exerciseId: string;
  order: number;
  completedSets: CompletedSet[];
  notes?: string;
}

export interface CompletedSet {
  setNumber: number;
  reps: number;
  weight?: number; // Em kg
  rpe?: number; // Rate of Perceived Exertion, 1-10
  failureType?: "technical" | "muscular" | "none"; // Tipo de falha, se houve
  restAfter?: number; // Descanso após o set, em segundos
  notes?: string;
}

export interface TrainingProgram {
  id: string;
  userId: string;
  name: string;
  description?: string;
  goal: string;
  duration: number; // Em semanas
  sessionsPerWeek: number;
  sessions: {
    sessionId: string;
    weekday: number; // 0-6, sendo 0 = domingo
    notes?: string;
  }[];
  progressionStrategy?: string;
  deloadStrategy?: string;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
