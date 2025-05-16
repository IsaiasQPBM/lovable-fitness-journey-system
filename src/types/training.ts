
// Types for Training module

export type TrainingGoal = 
  | 'hypertrophy' 
  | 'strength' 
  | 'endurance' 
  | 'power' 
  | 'weightLoss' 
  | 'maintenance'
  | 'athleticPerformance'
  | 'rehabilitation'
  | 'custom';

export type TrainingLevel = 
  | 'beginner' 
  | 'intermediate' 
  | 'advanced' 
  | 'expert';

export type TrainingFrequency = 
  | 2 | 3 | 4 | 5 | 6 | 7;

export type TrainingSplit = 
  | 'fullBody' 
  | 'upperLower' 
  | 'push-pull-legs' 
  | 'bodyPart' 
  | 'custom';

export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'forearms'
  | 'quadriceps' 
  | 'hamstrings' 
  | 'glutes' 
  | 'calves' 
  | 'abs' 
  | 'obliques'
  | 'traps' 
  | 'lowerBack';

export type EquipmentType = 
  | 'bodyweight' 
  | 'barbell' 
  | 'dumbbell' 
  | 'cable' 
  | 'machine' 
  | 'kettlebell' 
  | 'bands' 
  | 'suspension' 
  | 'medicine-ball'
  | 'specialized';

export type IntensityTechnique = 
  | 'straight_sets' 
  | 'supersets' 
  | 'drop_sets' 
  | 'rest_pause' 
  | 'giant_sets' 
  | 'pyramid' 
  | 'reverse_pyramid'
  | 'pre_exhaustion'
  | 'post_exhaustion'
  | 'partial_reps'
  | 'tempo_manipulation'
  | 'isometrics';

export type PeriodizationType = 
  | 'linear' 
  | 'undulating' 
  | 'block' 
  | 'conjugate' 
  | 'custom';

export interface Exercise {
  id: string;
  name: string;
  primaryMuscleGroups: MuscleGroup[];
  secondaryMuscleGroups: MuscleGroup[];
  equipment: EquipmentType[];
  difficulty: TrainingLevel;
  description: string;
  instructions: string[];
  imageUrls: string[];
  videoUrl?: string;
  variations: string[]; // IDs of variant exercises
  rpeChart?: RPEGuideline[];
  tips: string[];
  cautions?: string[];
  isCompound: boolean;
  isUnilateral: boolean;
  targetRPE?: number;
  category: 'strength' | 'power' | 'olympic' | 'isolation' | 'bodyweight' | 'cardio' | 'specialized';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RPEGuideline {
  rpe: number; // 1-10 scale
  repsInReserve: number;
  percentageOfMax: number; // 0.0 to 1.0
  description: string;
}

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  setNumber: number;
  targetReps: number;
  targetWeight?: number;
  targetRPE?: number;
  isWarmup: boolean;
  restPeriod: number; // in seconds
  tempoInstruction?: string; // e.g. "3-1-2-0" (eccentric-bottom-concentric-top)
  intensityTechnique?: IntensityTechnique;
  notes?: string;
  completedReps?: number;
  completedWeight?: number;
  actualRPE?: number;
  completed: boolean;
  skipped: boolean;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  order: number;
  sets: WorkoutSet[];
  notes?: string;
  supersetGroup?: string; // exercises with the same supersetGroup ID are performed as a superset
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  targetMuscleGroups: MuscleGroup[];
  estimatedDuration: number; // in minutes
  difficulty: TrainingLevel;
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingProgram {
  id: string;
  userId: string;
  name: string;
  description?: string;
  goal: TrainingGoal;
  level: TrainingLevel;
  durationWeeks: number;
  workoutsPerWeek: TrainingFrequency;
  split: TrainingSplit;
  periodization: PeriodizationType;
  phases: TrainingPhase[];
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingPhase {
  id: string;
  name: string;
  description?: string;
  durationWeeks: number;
  weeklySchedule: (string | null)[]; // array of workout IDs or null for rest days
  deloadStrategy?: string;
  volumeStrategy?: string;
  intensityStrategy?: string;
  progressionModel?: string;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutId: string;
  date: Date;
  duration: number; // in minutes
  exercises: {
    exerciseId: string;
    sets: {
      setNumber: number;
      reps: number;
      weight: number;
      rpe?: number;
      notes?: string;
    }[];
  }[];
  notes?: string;
  rating: number; // 1-5 scale
  energyLevel: number; // 1-10 scale
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingPreferences {
  id: string;
  userId: string;
  preferredEquipment: EquipmentType[];
  favoriteMuscleGroups: MuscleGroup[];
  excludedExercises: string[]; // IDs of exercises to exclude
  timeAvailable: number; // minutes per session
  primaryGoal: TrainingGoal;
  secondaryGoal?: TrainingGoal;
  injuryConsiderations?: string[];
  preferredTrainingDays: number[]; // 0-6, where 0 is Sunday
  preferredIntensityTechniques: IntensityTechnique[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingStats {
  userId: string;
  totalWorkouts: number;
  totalSets: number;
  totalReps: number;
  totalWeight: number; // kg
  volumeByMuscleGroup: Record<MuscleGroup, number>;
  weeklyVolume: number;
  weeklyFrequency: number;
  bestLift: {
    exerciseId: string;
    weight: number;
    reps: number;
    date: Date;
  };
  consistencyRate: number; // 0.0 to 1.0
  averageSessionDuration: number; // minutes
  updatedAt: Date;
}
