
import React, { createContext, useContext, useState, useEffect } from 'react';
import { bodyMeasurementHistory, bodyGoals } from '@/data/bodyMonitoringData';
import { correlationAnalyses, insights } from '@/data/dataAnalysis';

// Define types for our integrated data store
type ModuleData = {
  training: {
    lastWorkout: {
      date: Date | null;
      type: string;
      intensity: 'low' | 'moderate' | 'high';
      muscleGroups: string[];
    };
    upcomingWorkouts: {
      date: Date;
      type: string;
      description: string;
    }[];
    volume: {
      weekly: number;
      byMuscleGroup: Record<string, number>;
    };
  };
  nutrition: {
    dailyCalories: number;
    macroBreakdown: {
      protein: number;
      carbs: number;
      fat: number;
    };
    lastMeal: {
      time: Date | null;
      type: string;
      calories: number;
    };
    hydrationStatus: number; // percentage
  };
  bodyMonitoring: {
    currentWeight: number;
    weightTrend: number;
    bodyFatPercentage: number;
    keyMeasurements: Record<string, number>;
    activeGoals: typeof bodyGoals;
  };
  recovery: {
    overallStatus: number; // 0-100
    sleepQuality: number; // 0-100
    muscleRecovery: Record<string, number>; // muscle group to recovery percentage
    stressLevel: number; // 0-100
    readinessScore: number; // 0-100
  };
  analysis: {
    keyInsights: typeof insights;
    correlations: typeof correlationAnalyses;
    recommendations: string[];
  };
};

// Define types for context
interface IntegratedDataContextType {
  data: ModuleData;
  updateTrainingData: (data: Partial<ModuleData['training']>) => void;
  updateNutritionData: (data: Partial<ModuleData['nutrition']>) => void;
  updateBodyMonitoringData: (data: Partial<ModuleData['bodyMonitoring']>) => void;
  updateRecoveryData: (data: Partial<ModuleData['recovery']>) => void;
  updateAnalysisData: (data: Partial<ModuleData['analysis']>) => void;
  correlateData: (modules: string[], metrics: string[]) => any;
  triggerEvent: (eventType: string, payload: any) => void;
  subscribeToEvent: (eventType: string, callback: (payload: any) => void) => () => void;
}

// Create context with default values
const IntegratedDataContext = createContext<IntegratedDataContextType | undefined>(undefined);

// Mock initial data
const initialData: ModuleData = {
  training: {
    lastWorkout: {
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // yesterday
      type: 'Treino A - Superior',
      intensity: 'high',
      muscleGroups: ['Peito', 'Ombros', 'Tríceps']
    },
    upcomingWorkouts: [
      {
        date: new Date(Date.now() + 1000 * 60 * 60 * 5), // in 5 hours
        type: 'Treino B - Inferior',
        description: 'Foco em quadríceps e posterior'
      }
    ],
    volume: {
      weekly: 12, // hours
      byMuscleGroup: {
        'Peito': 45, // minutes weekly
        'Costas': 45,
        'Ombros': 30,
        'Bíceps': 20,
        'Tríceps': 20,
        'Pernas': 60,
        'Abdômen': 20
      }
    }
  },
  nutrition: {
    dailyCalories: 2400,
    macroBreakdown: {
      protein: 180,
      carbs: 250,
      fat: 60
    },
    lastMeal: {
      time: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      type: 'Almoço',
      calories: 650
    },
    hydrationStatus: 65 // percentage
  },
  bodyMonitoring: {
    currentWeight: 82.5,
    weightTrend: -0.3, // losing 0.3kg
    bodyFatPercentage: 14.5,
    keyMeasurements: {
      'Peito': 110,
      'Cintura': 84,
      'Quadril': 102,
      'Coxa': 62,
      'Braço': 38
    },
    activeGoals: bodyGoals.filter(goal => goal.status === 'active')
  },
  recovery: {
    overallStatus: 78,
    sleepQuality: 82,
    muscleRecovery: {
      'Peito': 60,
      'Costas': 85,
      'Ombros': 70,
      'Bíceps': 90,
      'Tríceps': 65,
      'Pernas': 95,
      'Abdômen': 100
    },
    stressLevel: 35,
    readinessScore: 80
  },
  analysis: {
    keyInsights: insights.slice(0, 3),
    correlations: correlationAnalyses.slice(0, 3),
    recommendations: [
      'Aumentar consumo proteico em 15g nos dias de treino de pernas',
      'Adicionar 15min de mobilidade antes de treinos de superior',
      'Focar em melhorar qualidade do sono para otimizar recuperação'
    ]
  }
};

// Create event system
type EventSubscription = {
  eventType: string;
  callback: (payload: any) => void;
  id: string;
};

export const IntegratedDataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [data, setData] = useState<ModuleData>(initialData);
  const [eventSubscriptions, setEventSubscriptions] = useState<EventSubscription[]>([]);
  
  // Update functions for each module
  const updateTrainingData = (newData: Partial<ModuleData['training']>) => {
    setData(prev => {
      const updated = {...prev, training: {...prev.training, ...newData}};
      
      // Example of cross-module integration:
      // If workout intensity is high, adjust recovery recommendations
      if (newData.lastWorkout?.intensity === 'high') {
        triggerEvent('workout:high-intensity', {
          muscleGroups: newData.lastWorkout.muscleGroups,
          date: newData.lastWorkout.date
        });
      }
      
      return updated;
    });
  };
  
  const updateNutritionData = (newData: Partial<ModuleData['nutrition']>) => {
    setData(prev => {
      const updated = {...prev, nutrition: {...prev.nutrition, ...newData}};
      
      // Example: If protein intake is low, trigger an event
      if (newData.macroBreakdown?.protein && 
          newData.macroBreakdown.protein < prev.training.volume.weekly * 10) { // 10g per training hour rule
        triggerEvent('nutrition:low-protein', {
          current: newData.macroBreakdown.protein,
          recommended: prev.training.volume.weekly * 10
        });
      }
      
      return updated;
    });
  };
  
  const updateBodyMonitoringData = (newData: Partial<ModuleData['bodyMonitoring']>) => {
    setData(prev => {
      const updated = {...prev, bodyMonitoring: {...prev.bodyMonitoring, ...newData}};
      
      // Example: If weight changed significantly, adjust nutrition targets
      if (newData.currentWeight && 
          Math.abs(newData.currentWeight - prev.bodyMonitoring.currentWeight) > 1) {
        triggerEvent('body:significant-weight-change', {
          previous: prev.bodyMonitoring.currentWeight,
          current: newData.currentWeight,
          difference: newData.currentWeight - prev.bodyMonitoring.currentWeight
        });
      }
      
      return updated;
    });
  };
  
  const updateRecoveryData = (newData: Partial<ModuleData['recovery']>) => {
    setData(prev => {
      const updated = {...prev, recovery: {...prev.recovery, ...newData}};
      
      // Example: If recovery score is low, adjust training recommendations
      if (newData.readinessScore && newData.readinessScore < 60) {
        triggerEvent('recovery:low-readiness', {
          score: newData.readinessScore,
          recommendation: 'Consider a lighter training session or active recovery'
        });
      }
      
      return updated;
    });
  };
  
  const updateAnalysisData = (newData: Partial<ModuleData['analysis']>) => {
    setData(prev => ({...prev, analysis: {...prev.analysis, ...newData}}));
  };
  
  // Function to correlate data between modules
  const correlateData = (modules: string[], metrics: string[]) => {
    // In a real implementation, this would do actual data correlation analysis
    // For now, we'll return a mock correlation result
    return {
      correlation: 0.75,
      confidence: 'high',
      description: `Strong correlation found between ${modules.join(' and ')} for metrics ${metrics.join(', ')}`,
      recommendation: 'Consider optimizing these factors together for better results'
    };
  };
  
  // Event system implementation
  const triggerEvent = (eventType: string, payload: any) => {
    // Find all callbacks subscribed to this event type
    const matchingSubscriptions = eventSubscriptions.filter(
      sub => sub.eventType === eventType
    );
    
    // Call each callback with the payload
    matchingSubscriptions.forEach(sub => {
      setTimeout(() => {
        sub.callback(payload);
      }, 0);
    });
    
    console.log(`Event triggered: ${eventType}`, payload);
  };
  
  const subscribeToEvent = (eventType: string, callback: (payload: any) => void) => {
    const id = Math.random().toString(36).substring(7);
    
    setEventSubscriptions(prev => [
      ...prev,
      { eventType, callback, id }
    ]);
    
    // Return unsubscribe function
    return () => {
      setEventSubscriptions(prev => 
        prev.filter(sub => sub.id !== id)
      );
    };
  };
  
  // Update data based on real data from the system
  useEffect(() => {
    if (bodyMeasurementHistory.length > 0) {
      const latestMeasurement = bodyMeasurementHistory[0];
      // Only update if there's actual data
      if (latestMeasurement.weight) {
        updateBodyMonitoringData({
          currentWeight: latestMeasurement.weight,
          // Add other updates as needed
        });
      }
    }
  }, []);
  
  const contextValue = {
    data,
    updateTrainingData,
    updateNutritionData,
    updateBodyMonitoringData,
    updateRecoveryData,
    updateAnalysisData,
    correlateData,
    triggerEvent,
    subscribeToEvent
  };
  
  return (
    <IntegratedDataContext.Provider value={contextValue}>
      {children}
    </IntegratedDataContext.Provider>
  );
};

// Custom hook to use the context
export const useIntegratedData = () => {
  const context = useContext(IntegratedDataContext);
  if (context === undefined) {
    throw new Error('useIntegratedData must be used within an IntegratedDataProvider');
  }
  return context;
};
