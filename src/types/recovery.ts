
// Sleep tracking types
export interface SleepRecord {
  id: string;
  userId: string;
  date: Date;
  bedTime: Date;
  wakeTime: Date;
  duration: number; // in minutes
  quality: number; // 1-10
  interruptions: number;
  feelingOnWaking: 'refreshed' | 'tired' | 'neutral';
  sleepAids: string[]; // e.g., ['melatonin', 'magnesium']
  notes: string;
  deviceData?: DeviceSleepData;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeviceSleepData {
  source: string; // e.g., 'Apple Watch', 'Garmin', 'Oura Ring'
  deepSleep?: number; // in minutes
  lightSleep?: number; // in minutes
  remSleep?: number; // in minutes
  heartRateDuringSleep?: number[];
  respirationRate?: number[];
  movementDuringSleep?: number[];
  snoring?: boolean;
  oxygenSaturation?: number[];
}

// Stress and Recovery tracking types
export interface StressRecord {
  id: string;
  userId: string;
  date: Date;
  hrvMorning?: number;
  hrvEvening?: number;
  perceivedStressLevel: number; // 1-10
  energyLevel: number; // 1-10
  mentalFatigue: number; // 1-10
  physicalFatigue: number; // 1-10
  stressors: string[]; // e.g., ['work', 'personal', 'training']
  recoveryScore: number; // 1-100
  trainingReadiness: number; // 1-10
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pain and discomfort tracking types
export interface PainRecord {
  id: string;
  userId: string;
  date: Date;
  bodyParts: BodyPainMap[];
  painType: 'doms' | 'acute' | 'chronic';
  painTriggers: string[];
  painRelievers: string[];
  impactOnTraining: 'none' | 'slight' | 'moderate' | 'significant' | 'preventing';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BodyPainMap {
  bodyPart: string;
  intensity: number; // 1-10
  description?: string;
}

// Active Recovery tracking types
export interface RecoveryActivityRecord {
  id: string;
  userId: string;
  date: Date;
  activityType: string; // e.g., 'mobility', 'stretching', 'foam rolling'
  duration: number; // in minutes
  bodyPartsTargeted: string[];
  perceivedEffectiveness: number; // 1-10
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mental wellbeing tracking types
export interface MentalWellbeingRecord {
  id: string;
  userId: string;
  date: Date;
  mood: 'excellent' | 'good' | 'neutral' | 'poor' | 'terrible';
  motivation: number; // 1-10
  anxietyLevel: number; // 1-10
  satisfactionWithProgress: number; // 1-10
  stressManagementPractices: string[];
  mindfulnessMinutes: number;
  gratitudeEntries: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Biomarker tracking types
export interface BiomarkerRecord {
  id: string;
  userId: string;
  date: Date;
  restingHeartRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  basalBodyTemperature?: number;
  morningWeight?: number;
  bloodMarkers?: BloodMarkers;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BloodMarkers {
  testDate: Date;
  crp?: number; // C-reactive protein
  cortisol?: number;
  testosterone?: number;
  estrogen?: number;
  tsh?: number; // Thyroid stimulating hormone
  ferritin?: number;
  vitaminD?: number;
  glucose?: number;
  insulin?: number;
  igf1?: number; // Insulin-like growth factor
  otherMarkers?: Record<string, number>;
}

// Integrated recovery analysis types
export interface RecoveryAnalysis {
  id: string;
  userId: string;
  date: Date;
  overallRecoveryScore: number; // 1-100
  sleepContribution: number; // percentage
  stressContribution: number; // percentage
  nutritionContribution: number; // percentage
  physicalRecoveryContribution: number; // percentage
  mentalRecoveryContribution: number; // percentage
  limitingFactors: string[];
  recommendations: string[];
  trainingModificationSuggestions: string[];
  recoveryTrend: 'improving' | 'stable' | 'declining';
  createdAt: Date;
  updatedAt: Date;
}
