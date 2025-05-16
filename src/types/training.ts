
// Types for training module

export type ExerciseCategory = 
  | 'strength'
  | 'hypertrophy'
  | 'endurance'
  | 'flexibility'
  | 'balance'
  | 'cardio'
  | 'functional'
  | 'rehabilitation'
  | 'other';

export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'quadriceps'
  | 'hamstrings'
  | 'calves'
  | 'glutes'
  | 'core'
  | 'full_body'
  | 'other';

export type ExerciseType =
  | 'compound'
  | 'isolation'
  | 'bodyweight'
  | 'weighted'
  | 'machine'
  | 'cable'
  | 'resistance_band'
  | 'other';

export type ExerciseEquipment =
  | 'none'
  | 'barbell'
  | 'dumbbell'
  | 'kettlebell'
  | 'cable_machine'
  | 'smith_machine'
  | 'resistance_band'
  | 'bodyweight'
  | 'machine'
  | 'other';

export type Exercise = {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  primaryMuscleGroups: MuscleGroup[];
  secondaryMuscleGroups: MuscleGroup[];
  exerciseType: ExerciseType;
  equipment: ExerciseEquipment;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  unilateral: boolean;
  instructions: string[];
  tips: string[];
  videoUrl?: string;
  imageUrl?: string;
  estimatedCaloriesBurn?: number; // Per minute
  createdAt: Date;
  updatedAt: Date;
};

export type Set = {
  id: string;
  exerciseId: string;
  weight: number;
  weightUnit: 'kg' | 'lb';
  reps: number;
  completed: boolean;
  rpe?: number; // Rate of Perceived Exertion
  notes?: string;
  duration?: number; // In seconds (for timed exercises)
  distance?: number; // For distance-based exercises
  distanceUnit?: 'm' | 'km' | 'mi';
  tempo?: string; // E.g., "3-1-2-0" (eccentric-bottom-concentric-top)
  createdAt: Date;
  updatedAt: Date;
};

export type WorkoutExercise = {
  id: string;
  workoutId: string;
  exerciseId: string;
  order: number;
  plannedSets: number;
  plannedReps: number;
  plannedWeight?: number;
  plannedWeightUnit?: 'kg' | 'lb';
  restBetweenSets?: number; // In seconds
  sets: Set[];
  notes?: string;
  superset?: boolean;
  supersetOrder?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Workout = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  plannedDuration?: number; // In minutes
  actualDuration?: number; // In minutes
  plannedExercises: WorkoutExercise[];
  notes?: string;
  completed: boolean;
  scheduledDate?: Date;
  completedDate?: Date;
  programId?: string; // If part of a program
  templateId?: string; // If created from a template
  createdAt: Date;
  updatedAt: Date;
};

export type TrainingProgram = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  goal: 'strength' | 'hypertrophy' | 'endurance' | 'weight_loss' | 'general_fitness' | 'custom';
  durationWeeks: number;
  workoutsPerWeek: number;
  workouts: {
    dayOfWeek: number; // 0-6, Sunday = 0
    workoutId?: string;
    templateId?: string;
    name: string;
    description?: string;
  }[];
  active: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type TrainingTemplate = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  category: 'push' | 'pull' | 'legs' | 'upper' | 'lower' | 'full_body' | 'custom';
  estimatedDuration: number; // In minutes
  exercises: {
    exerciseId: string;
    order: number;
    sets: number;
    reps: number;
    weight?: number;
    weightUnit?: 'kg' | 'lb';
    restBetweenSets?: number; // In seconds
    notes?: string;
    superset?: boolean;
    supersetOrder?: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
};
