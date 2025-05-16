
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, Calendar, Info, LineChart, Utensils, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/Layout/PageLayout";
import { useIntegratedData } from "@/contexts/IntegratedDataContext";
import { useNotifications } from "@/hooks/use-notifications";
import { useModuleIntegration } from "@/hooks/use-module-integration";

const Badge = ({ 
  children, 
  variant = "default" 
}: { 
  children: React.ReactNode; 
  variant?: "default" | "secondary" | "outline" | "destructive"; 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary text-secondary-foreground";
      case "outline":
        return "bg-background text-foreground border border-input";
      case "destructive":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getVariantClasses()}`}>
      {children}
    </span>
  );
};

const UnifiedDashboard: React.FC = () => {
  const { data } = useIntegratedData();
  const { notifications, addNotification } = useNotifications();
  const { moduleConnections, getModuleData } = useModuleIntegration('dashboard', ['workout:high-intensity', 'recovery:low-readiness', 'body:significant-weight-change']);
  
  // Get related data from various modules
  const trainingData = data.training;
  const nutritionData = data.nutrition;
  const bodyData = data.bodyMonitoring;
  const recoveryData = data.recovery;
  
  // Example of cross-module data usage - creating notifications based on data from multiple modules
  useEffect(() => {
    // Check if we have low recovery but high intensity workout planned soon
    const hasUpcomingWorkout = trainingData.upcomingWorkouts.length > 0;
    const workoutSoonInHours = hasUpcomingWorkout ? 
      (trainingData.upcomingWorkouts[0].date.getTime() - Date.now()) / (1000 * 60 * 60) : 24;
      
    if (hasUpcomingWorkout && workoutSoonInHours < 6 && recoveryData.readinessScore < 70) {
      // Create an integrated notification about potentially adjusting workout intensity
      addNotification({
        title: 'Ajuste de treino recomendado',
        message: `Sua prontidão está em ${recoveryData.readinessScore}%, considere reduzir a intensidade do treino de hoje.`,
        type: 'warning',
        module: 'sistema',
        actionUrl: '/workout-execution',
        actionLabel: 'Ajustar Treino',
        crossModuleReferences: [
          { module: 'recuperacao', entityId: 'readiness-score', entityType: 'recoveryMetric' },
          { module: 'treino', entityId: 'upcoming-workout', entityType: 'workoutPlan' }
        ]
      });
    }
    
    // Check if we have nutrition deficits based on training needs
    const proteinTarget = trainingData.volume.weekly * 10; // 10g per training hour as example
    if (nutritionData.macroBreakdown.protein < proteinTarget * 0.8) { // Less than 80% of target
      addNotification({
        title: 'Déficit nutricional detectado',
        message: `Seu consumo proteico está abaixo do ideal para seu volume de treino. Considere aumentar em ${Math.ceil(proteinTarget - nutritionData.macroBreakdown.protein)}g.`,
        type: 'info',
        module: 'nutricao',
        actionUrl: '/nutricao',
        actionLabel: 'Ver Plano Nutricional',
        crossModuleReferences: [
          { module: 'treino', entityId: 'training-volume', entityType: 'trainingMetric' },
          { module: 'nutricao', entityId: 'protein-intake', entityType: 'nutritionMetric' }
        ]
      });
    }
  }, [trainingData, recoveryData, nutritionData]);

  return (
    <PageLayout
      title="Dashboard Unificado"
      description="Visão integrada de todos os aspectos do seu programa de fitness"
    >
      {/* Cross-Module Integration Status */}
      <div className="mb-6 px-4 py-2 bg-muted/30 rounded-lg border border-muted">
        <h2 className="text-sm font-medium mb-2">Status de Integração entre Módulos</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(moduleConnections).map(([module, isConnected]) => (
            <Badge key={module} variant={isConnected ? "default" : "outline"}>
              {module} {isConnected ? "✓" : "✗"}
            </Badge>
          ))}
        </div>
      </div>

      {/* Alertas e Lembretes - Dinâmicos baseados em notificações integradas */}
      {notifications.filter(n => !n.read).slice(0, 1).map(notification => (
        <Alert key={notification.id} className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>{notification.title}</AlertTitle>
          <AlertDescription>
            {notification.message}
            {notification.actionUrl && (
              <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                <Link to={notification.actionUrl}>{notification.actionLabel}</Link>
              </Button>
            )}
          </AlertDescription>
        </Alert>
      ))}

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Próximo Treino - Dados dinâmicos de training */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" />
              Próximo Treino
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trainingData.upcomingWorkouts.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{trainingData.upcomingWorkouts[0].type}</h3>
                  <Badge variant="outline">
                    {trainingData.upcomingWorkouts[0].date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>60 min</span>
                </div>
                {/* Cross-module integration: Show recovery status for muscle groups */}
                <div className="text-sm border-t pt-2 mt-2">
                  <p className="text-muted-foreground mb-1">Status de recuperação dos músculos:</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {Object.entries(recoveryData.muscleRecovery)
                      .filter(([group]) => trainingData.lastWorkout.muscleGroups.includes(group))
                      .map(([group, percentage]) => (
                        <div key={group} className="flex items-center gap-1">
                          <span>{group}:</span>
                          <span className={percentage < 80 ? "text-amber-500" : "text-green-500"}>
                            {percentage}%
                          </span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Nenhum treino agendado
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/workout-execution">
                Iniciar Treino <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Resumo Nutricional - Dados dinâmicos de nutrition */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Utensils className="h-5 w-5 text-primary" />
              Resumo Nutricional de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Calorias</span>
                <span className="font-medium">{nutritionData.dailyCalories} / 2500 kcal</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${(nutritionData.dailyCalories / 2500) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <div>
                  <span className="text-muted-foreground">Proteína</span>
                  <p className="font-medium">{nutritionData.macroBreakdown.protein}g</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Carboidratos</span>
                  <p className="font-medium">{nutritionData.macroBreakdown.carbs}g</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Gorduras</span>
                  <p className="font-medium">{nutritionData.macroBreakdown.fat}g</p>
                </div>
              </div>
              {/* Cross-module integration: Show workout-based nutrition recommendation */}
              {trainingData.lastWorkout && (
                <div className="border-t pt-2 mt-2">
                  <p className="text-sm text-muted-foreground mb-1">Recomendação baseada no treino:</p>
                  <p className="text-sm">
                    {trainingData.lastWorkout.intensity === 'high'
                      ? "Aumente carboidratos em 20% para recuperação muscular após treino intenso"
                      : "Mantenha distribuição de macros atual para recuperação adequada"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/nutricao">
                Ver Detalhes <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Monitoramento Corporal - Dados dinâmicos de bodyMonitoring */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <LineChart className="h-5 w-5 text-primary" />
              Monitoramento Corporal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-muted-foreground">Peso Atual</span>
                  <p className="text-2xl font-bold">{bodyData.currentWeight} kg</p>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">Variação</span>
                  <p className={`font-medium ${bodyData.weightTrend < 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {bodyData.weightTrend > 0 ? '+' : ''}{bodyData.weightTrend} kg
                  </p>
                </div>
              </div>
              {/* Integration from multiple modules */}
              <div className="border-t pt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">% Gordura:</p>
                  <p className="font-medium">{bodyData.bodyFatPercentage}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Meta ativa:</p>
                  <p className="font-medium truncate">
                    {bodyData.activeGoals.length > 0 
                      ? bodyData.activeGoals[0].title 
                      : "Nenhuma meta ativa"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/body-monitoring">
                Ver Progresso <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Status de Recuperação - Dados dinâmicos de recovery */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Status de Recuperação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold">{recoveryData.readinessScore}%</p>
                <Badge variant={recoveryData.readinessScore > 70 ? "outline" : "secondary"}>
                  {recoveryData.readinessScore > 80 ? "Excelente" : 
                   recoveryData.readinessScore > 70 ? "Boa" : 
                   recoveryData.readinessScore > 50 ? "Moderada" : "Baixa"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Sono</p>
                  <p className="font-medium">{recoveryData.sleepQuality}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Estresse</p>
                  <p className="font-medium">{100 - recoveryData.stressLevel}%</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Recuperação muscular</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${Object.values(recoveryData.muscleRecovery).reduce((sum, val) => sum + val, 0) / 
                                      (Object.values(recoveryData.muscleRecovery).length * 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/recovery">
                Ver Detalhes <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Calendário da Semana - Integrado com dados de múltiplos módulos */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Programação Semanal Integrada
          </CardTitle>
          <CardDescription>Visão unificada de treinos, nutrição e monitoramento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                day: "Segunda", 
                activities: [
                  { text: "Treino A - Superior", module: "treino" },
                  { text: "Check-in de peso", module: "monitoramento" },
                  { text: "Dia alto em carboidratos", module: "nutricao" }
                ]
              },
              { 
                day: "Terça", 
                activities: [
                  { text: "Descanso ativo", module: "treino" },
                  { text: "Monitoramento de recuperação", module: "recuperacao" },
                  { text: "Dia moderado em carboidratos", module: "nutricao" }
                ]
              },
              { 
                day: "Quarta", 
                activities: [
                  { text: "Treino B - Inferior", module: "treino" },
                  { text: "Check-in nutricional", module: "nutricao" }
                ]
              },
              { 
                day: "Quinta", 
                activities: [
                  { text: "Descanso", module: "treino" },
                  { text: "Monitoramento de sono", module: "recuperacao" }
                ]
              },
              { 
                day: "Sexta", 
                activities: [
                  { text: "Treino C - Full Body", module: "treino" },
                  { text: "Dia alto em carboidratos", module: "nutricao" }
                ]
              },
              { 
                day: "Sábado", 
                activities: [
                  { text: "Cardio leve", module: "treino" },
                  { text: "Avaliação semanal", module: "monitoramento" },
                  { text: "Dia flexível", module: "nutricao" }
                ]
              },
              { 
                day: "Domingo", 
                activities: [
                  { text: "Descanso completo", module: "treino" },
                  { text: "Planejamento semanal", module: "sistema" }
                ]
              },
            ].map((item) => (
              <div key={item.day} className="flex border-b pb-2 last:border-0 last:pb-0">
                <div className="w-24 font-medium">{item.day}</div>
                <div className="flex-1">
                  {item.activities.map((activity, index) => (
                    <div key={index} className="text-sm mb-1 last:mb-0 flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        activity.module === 'treino' ? 'bg-blue-500' :
                        activity.module === 'nutricao' ? 'bg-green-500' :
                        activity.module === 'monitoramento' ? 'bg-purple-500' :
                        activity.module === 'recuperacao' ? 'bg-amber-500' :
                        'bg-gray-500'
                      }`}></span>
                      {activity.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Integração Cross-Module - Insights e Correlações */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Insights Integrados
          </CardTitle>
          <CardDescription>Análises baseadas em dados de todos os módulos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
            
            {data.analysis.correlations.length > 0 && (
              <div className="border-t pt-3 mt-3">
                <h4 className="text-sm font-medium mb-2">Correlações Detectadas:</h4>
                <div className="space-y-2">
                  {data.analysis.correlations.map((correlation, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      <span className="font-medium">
                        {correlation.variables.x.label} → {correlation.variables.y.label}:
                      </span> {' '}
                      Correlação {correlation.correlationCoefficient.toFixed(2)} 
                      ({correlation.isSignificant ? 'Significativa' : 'Não significativa'})
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default UnifiedDashboard;
