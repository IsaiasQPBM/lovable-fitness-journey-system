
export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl?: string;
  imageUrl?: string;
  variations?: string[];
  tips?: string[];
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
};

export type TrainingSet = {
  id: string;
  exerciseId: string;
  weight?: number;
  reps?: number;
  time?: number; // in seconds
  distance?: number; // in meters
  rpe?: number; // Rate of Perceived Exertion (1-10)
  restTime?: number; // in seconds
  notes?: string;
  completed?: boolean;
  actualReps?: number;
  actualWeight?: number;
  actualTime?: number;
  actualDistance?: number;
  actualRpe?: number;
};

export type TrainingExercise = {
  id: string;
  exercise: Exercise;
  sets: TrainingSet[];
  supersetGroup?: string;
  position: number;
  notes?: string;
};

export type TrainingSession = {
  id: string;
  name: string;
  date: Date;
  exercises: TrainingExercise[];
  notes?: string;
  duration?: number; // in minutes
  type: 'strength' | 'hypertrophy' | 'endurance' | 'cardio' | 'mobility' | 'other';
  targetMuscleGroups: string[];
  completed: boolean;
};

export type CompletedTrainingSession = {
  id: string;
  originalSessionId: string;
  name: string;
  date: Date;
  exercises: TrainingExercise[];
  notes?: string;
  duration: number; // in minutes
  type: 'strength' | 'hypertrophy' | 'endurance' | 'cardio' | 'mobility' | 'other';
  targetMuscleGroups: string[];
  feedback: {
    intensity: number; // 1-10
    feeling: 'great' | 'good' | 'average' | 'bad' | 'terrible';
    energyLevel: number; // 1-10
    notes?: string;
  };
  metrics?: {
    totalVolume: number;
    totalReps: number;
    totalSets: number;
  };
};
