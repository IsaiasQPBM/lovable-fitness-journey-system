
// Types for Nutrition module

// Nutrition Calculator Types
export interface NutritionCalculatorResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: {
    protein: { grams: number; percentage: number };
    carbs: { grams: number; percentage: number };
    fat: { grams: number; percentage: number };
  };
  goal: string;
  formulaUsed: string;
  timestamp: Date;
}

// Food and Meal Types
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  servingSize: number;
  servingUnit: string;
  isCommonFood?: boolean;
  category?: string;
}

export interface MealEntry {
  id: string;
  userId: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Array<{
    food: FoodItem;
    quantity: number;
  }>;
  notes?: string;
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface DailyNutritionLog {
  date: Date;
  meals: MealEntry[];
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  targetNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  waterIntake: number; // in ml
  completed: boolean;
}

// Supplement Types
export interface Supplement {
  id: string;
  name: string;
  type: string;
  dosage: number;
  unit: string;
  timing: string[];
  frequency: 'daily' | 'weekly' | 'custom';
  customFrequency?: string;
  notes?: string;
  nutrientContent?: {
    protein?: number;
    carbs?: number;
    fat?: number;
    [key: string]: number | undefined;
  };
  active: boolean;
  effectivenessSelfRating?: number;
  startDate: Date;
  endDate?: Date;
}

// Nutrition Plan Types
export interface NutritionPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  targetCalories: number;
  macroDistribution: {
    protein: { grams: number; percentage: number };
    carbs: { grams: number; percentage: number };
    fat: { grams: number; percentage: number };
  };
  mealStructure: {
    numberOfMeals: number;
    mealTiming: string[];
    mealDistribution: Array<{
      mealType: string;
      caloriePercentage: number;
    }>;
  };
  specialConsiderations?: string[];
  createdAt: Date;
  modifiedAt: Date;
  isActive: boolean;
}
