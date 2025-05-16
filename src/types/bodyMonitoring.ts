
export type BodyMeasurementFrequency = 
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'custom';

export type BodyFatMethod = 
  | 'skinfold'
  | 'bioimpedance'
  | 'dexa'
  | 'bodpod'
  | 'hydrostatic'
  | 'visual'
  | 'navy'
  | 'jackson_pollock'
  | 'custom';

export type MeasurementUnit = 'metric' | 'imperial';

export type BodyPart = 
  | 'weight'
  | 'neck'
  | 'shoulders'
  | 'chest'
  | 'leftBicep'
  | 'rightBicep'
  | 'leftForearm'
  | 'rightForearm'
  | 'waist'
  | 'abdomen'
  | 'hips'
  | 'leftThigh'
  | 'rightThigh'
  | 'leftCalf'
  | 'rightCalf';

export type FatDistributionPattern = 
  | 'android'      // Acúmulo de gordura abdominal (tipo maçã)
  | 'gynoid'       // Acúmulo de gordura nos quadris/coxas (tipo pêra)
  | 'mixed';       // Padrão misto

export type PhotoPose = 
  | 'front'
  | 'back'
  | 'left'
  | 'right'
  | 'frontRelaxed'
  | 'frontFlexed'
  | 'backRelaxed'
  | 'backFlexed'
  | 'custom';

export type BodyGoalType = 
  | 'weightLoss'
  | 'muscleGain'
  | 'recomposition'
  | 'maintenance'
  | 'proportionImprovement'
  | 'symmetryImprovement'
  | 'custom';

export interface UserBodyProfile {
  id: string;
  userId: string;
  height: number;                 // em cm
  wristCircumference: number;     // em cm
  ankleCircumference: number;     // em cm
  bodyType: 'ectomorph' | 'mesomorph' | 'endomorph' | 'mixed';
  structure: 'small' | 'medium' | 'large';
  baseMeasurementUnit: MeasurementUnit;
  baseBodyFatMethod: BodyFatMethod;
  weightMeasurementFrequency: BodyMeasurementFrequency;
  bodyMeasurementFrequency: BodyMeasurementFrequency;
  photoFrequency: BodyMeasurementFrequency;
  weightConditions: string[];     // Ex: ["em jejum", "pela manhã", "após ir ao banheiro"]
  createdAt: Date;
  updatedAt: Date;
}

export interface BodyMeasurementRecord {
  id: string;
  userId: string;
  date: Date;
  weight?: number;                // em kg
  bodyFat?: number;               // em porcentagem
  bodyFatMethod?: BodyFatMethod;
  height?: number;                // em cm
  measurements: {
    [key in BodyPart]?: number;   // em cm
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhotoRecord {
  id: string;
  userId: string;
  date: Date;
  pose: PhotoPose;
  poseType?: string;              // Added missing property used in BodyMonitoringHome
  imageUrl: string;
  notes?: string;
  visibility: 'private' | 'shared' | 'public';
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BodyCompositionAnalysis {
  id: string;
  userId: string;
  date: Date;
  weight: number;                 // em kg
  bodyFat: number;                // em porcentagem
  leanMass: number;               // em kg
  bodyFatMass: number;            // em kg
  bodyWater?: number;             // em kg ou porcentagem
  boneMass?: number;              // em kg
  ffmi?: number;                  // Fat-Free Mass Index
  fmi?: number;                   // Fat Mass Index
  bmi?: number;                   // Body Mass Index
  fatDistribution?: FatDistributionPattern;
  basalMetabolicRate?: number;    // em kcal
  createdAt: Date;
  updatedAt: Date;
}

export interface BodyGoal {
  id: string;
  userId: string;
  type: BodyGoalType;
  title: string;
  description?: string;
  startDate: Date;
  targetDate: Date;
  startValue: number;             // valor inicial (peso, medida, % gordura, etc)
  targetValue: number;            // valor alvo
  unit: string;                   // unidade de medida (kg, cm, %, etc)
  measurementType: 'weight' | 'bodyFat' | 'measurement' | 'proportion';
  bodyPart?: BodyPart;            // se for medida específica
  proportionGoal?: {              // se for meta de proporção
    part1: BodyPart;
    part2: BodyPart;
    targetRatio: number;
  };
  weeklyTarget?: number;          // meta semanal (ex: 0.5kg por semana)
  status: 'active' | 'achieved' | 'failed' | 'abandoned';
  progress: number;               // progresso atual em porcentagem (0-100)
  checkpoints: {
    date: Date;
    expectedValue: number;
    actualValue?: number;
    notes?: string;
  }[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressReport {
  id: string;
  userId: string;
  title: string;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  metrics: {
    startWeight?: number;
    endWeight?: number;
    weightChange?: number;
    startBodyFat?: number;
    endBodyFat?: number;
    bodyFatChange?: number;
    measurementChanges?: {
      [key in BodyPart]?: {
        start: number;
        end: number;
        change: number;
      };
    };
  };
  goals: {
    goalId: string;
    progress: number;
    achieved: boolean;
  }[];
  analysis: {
    plateauDetected: boolean;
    changeRate: number;           // taxa de mudança por semana
    efficiency: number;           // eficiência em relação ao esperado (0-100%)
    suggestions?: string[];
    trends?: string[];
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
