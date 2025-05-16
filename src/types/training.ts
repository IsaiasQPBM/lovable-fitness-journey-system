
// Define completed training session type
export interface CompletedTrainingSession {
  id: string;
  trainingSessionId: string;
  date: Date;
  exercises: any[]; // This would typically be a more specific type
  duration: number;
  notes?: string;
  rating?: number;
  effort?: number;
  muscleGroups: {
    chest: number;
    triceps: number;
    shoulders: number;
    back: number;
    biceps: number;
    legs: number;
    glutes: number;
    abs: number;
    calves: number;
    forearms: number;
    neck: number;
    core: number;
  };
}
