
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModuleIntegration } from '@/hooks/use-module-integration';
import { useIntegratedData } from '@/contexts/IntegratedDataContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface CrossModuleDataDisplayProps {
  sourceModule: string;
  entityId?: string;
  title: string;
  showRelatedInsights?: boolean;
  showRelatedMetrics?: boolean;
  className?: string;
}

const CrossModuleDataDisplay: React.FC<CrossModuleDataDisplayProps> = ({
  sourceModule,
  entityId,
  title,
  showRelatedInsights = true,
  showRelatedMetrics = true,
  className
}) => {
  const { data } = useIntegratedData();
  const { getModuleData } = useModuleIntegration(sourceModule);
  
  // Map module names to their data
  const moduleDataMapping: Record<string, any> = {
    'treino': data.training,
    'nutricao': data.nutrition,
    'monitoramento': data.bodyMonitoring,
    'recuperacao': data.recovery,
    'analise': data.analysis
  };

  // Helper function to get related data from other modules
  const getRelatedData = () => {
    const relatedData: Record<string, any> = {};
    
    if (sourceModule === 'treino' || sourceModule === 'training') {
      // Example: Get recovery status for muscle groups that were trained
      const muscleGroups = data.training.lastWorkout?.muscleGroups || [];
      relatedData.muscleRecovery = Object.entries(data.recovery.muscleRecovery)
        .filter(([group]) => muscleGroups.includes(group))
        .reduce((acc, [group, value]) => ({...acc, [group]: value}), {});
      
      // Get nutrition recommendations based on training
      relatedData.nutritionRecommendation = {
        calories: data.training.volume.weekly * 200, // example calculation
        protein: data.training.volume.weekly * 10,
        message: data.training.lastWorkout?.intensity === 'high' 
          ? "Aumente carboidratos em 20% para recuperação muscular"
          : "Mantenha distribuição de macros atual para recuperação"
      };
    }
    
    if (sourceModule === 'nutricao' || sourceModule === 'nutrition') {
      // Example: Get training impact on nutrition needs
      relatedData.trainingImpact = {
        calorieAdjustment: data.training.volume.weekly * 200,
        message: "Ajuste baseado no volume de treino semanal"
      };
      
      // Get body metrics that might be affected by nutrition
      relatedData.bodyMetricsImpact = {
        weightTrend: data.bodyMonitoring.weightTrend,
        bodyFat: data.bodyMonitoring.bodyFatPercentage,
        message: data.bodyMonitoring.weightTrend < 0 
          ? "Déficit calórico atual está efetivo para perda de peso"
          : "Considere revisar plano nutricional para atingir metas"
      };
    }
    
    if (sourceModule === 'monitoramento' || sourceModule === 'bodyMonitoring') {
      // Example: Get training effects on body measurements
      relatedData.trainingEffects = {
        focusAreas: Object.entries(data.training.volume.byMuscleGroup)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([group]) => group),
        message: "Grupos musculares com maior volume de treino"
      };
      
      // Get nutrition effects on body composition
      relatedData.nutritionEffects = {
        proteinAdequacy: data.nutrition.macroBreakdown.protein >= 1.8 ? "Adequado" : "Baixo",
        calorieBalance: data.nutrition.dailyCalories - 2500, // example maintenance calories
        message: data.nutrition.dailyCalories < 2500
          ? "Déficit calórico pode afetar composição corporal"
          : "Superávit calórico pode afetar composição corporal"
      };
    }
    
    if (sourceModule === 'recuperacao' || sourceModule === 'recovery') {
      // Example: Get training impact on recovery
      relatedData.trainingImpact = {
        intensity: data.training.lastWorkout?.intensity,
        timeSinceLastWorkout: data.training.lastWorkout?.date 
          ? Math.round((Date.now() - data.training.lastWorkout.date.getTime()) / (1000 * 60 * 60))
          : null,
        message: "Impacto do último treino na recuperação"
      };
      
      // Get nutrition impact on recovery
      relatedData.nutritionImpact = {
        proteinAdequacy: data.nutrition.macroBreakdown.protein >= 1.8 ? "Adequado" : "Baixo",
        hydrationStatus: data.nutrition.hydrationStatus,
        message: data.nutrition.hydrationStatus < 70
          ? "Baixa hidratação pode comprometer recuperação"
          : "Hidratação adequada contribui para recuperação"
      };
    }
    
    return relatedData;
  };
  
  const relatedData = getRelatedData();
  const hasRelatedData = Object.keys(relatedData).length > 0;
  
  // Find related insights from analysis module
  const relatedInsights = data.analysis.keyInsights
    .filter(insight => 
      insight.relatedMetrics.some(metric => 
        metric.includes(sourceModule) || 
        (entityId && metric.includes(entityId))
      )
    );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasRelatedData ? (
          <div className="space-y-4">
            {Object.entries(relatedData).map(([key, value]) => (
              <div key={key} className="border-b pb-3 last:border-0 last:pb-0">
                <h3 className="text-sm font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                {typeof value === 'object' ? (
                  <div className="space-y-2">
                    {Object.entries(value).map(([subKey, subValue]) => {
                      // Skip message field to display it separately
                      if (subKey === 'message') return null;
                      
                      // Handle different types of values
                      if (Array.isArray(subValue)) {
                        return (
                          <div key={subKey} className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground capitalize">
                              {subKey.replace(/([A-Z])/g, ' $1')}:
                            </span>
                            <span className="text-sm">{subValue.join(', ')}</span>
                          </div>
                        );
                      }
                      
                      return (
                        <div key={subKey} className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground capitalize">
                            {subKey.replace(/([A-Z])/g, ' $1')}:
                          </span>
                          <span className="text-sm">{subValue}</span>
                        </div>
                      );
                    })}
                    
                    {/* Display message if exists */}
                    {value.message && (
                      <p className="text-sm text-muted-foreground mt-1">{value.message}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm">{value}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum dado relacionado disponível</p>
        )}
        
        {/* Show related insights if requested and available */}
        {showRelatedInsights && relatedInsights.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Insights Relacionados</h3>
            {relatedInsights.map((insight, index) => (
              <Alert key={index} className="mb-2">
                <Info className="h-4 w-4" />
                <AlertTitle>{insight.title}</AlertTitle>
                <AlertDescription className="text-xs">
                  {insight.description}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CrossModuleDataDisplay;
