
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, Calendar, Info, LineChart, Utensils, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/Layout/PageLayout";

const UnifiedDashboard: React.FC = () => {
  // Esta seria uma chamada para obter dados unificados de todos os módulos
  // Por enquanto usamos dados simulados
  const nextWorkout = {
    title: "Treino A - Superior",
    date: "Hoje, 18:00",
    duration: "60 min",
  };

  const nutritionSummary = {
    calories: 2340,
    protein: 180,
    carbs: 250,
    fat: 60,
    target: 2500,
  };

  const bodyStats = {
    weight: 82.3,
    lastMeasurement: "2 dias atrás",
    trend: -0.5,
  };

  const recoveryStatus = {
    score: 85,
    quality: "Boa",
    recommendation: "Treino de intensidade moderada recomendado",
  };

  return (
    <PageLayout
      title="Dashboard Unificado"
      description="Visão integrada de todos os aspectos do seu programa de fitness"
    >
      {/* Alertas e Lembretes */}
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Lembrete Importante</AlertTitle>
        <AlertDescription>
          Não se esqueça de registrar suas refeições de hoje e prepare-se para seu treino às 18h.
        </AlertDescription>
      </Alert>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Próximo Treino */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" />
              Próximo Treino
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{nextWorkout.title}</h3>
                <Badge variant="outline">{nextWorkout.date}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{nextWorkout.duration}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/workout-execution">
                Iniciar Treino <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Resumo Nutricional */}
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
                <span className="font-medium">{nutritionSummary.calories} / {nutritionSummary.target} kcal</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${(nutritionSummary.calories / nutritionSummary.target) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <div>
                  <span className="text-muted-foreground">Proteína</span>
                  <p className="font-medium">{nutritionSummary.protein}g</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Carboidratos</span>
                  <p className="font-medium">{nutritionSummary.carbs}g</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Gorduras</span>
                  <p className="font-medium">{nutritionSummary.fat}g</p>
                </div>
              </div>
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

        {/* Monitoramento Corporal */}
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
                  <p className="text-2xl font-bold">{bodyStats.weight} kg</p>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">Variação</span>
                  <p className={`font-medium ${bodyStats.trend < 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {bodyStats.trend > 0 ? '+' : ''}{bodyStats.trend} kg
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Última medição: {bodyStats.lastMeasurement}
              </p>
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

        {/* Status de Recuperação */}
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
                <p className="text-2xl font-bold">{recoveryStatus.score}%</p>
                <Badge variant={recoveryStatus.score > 70 ? "outline" : "secondary"}>
                  {recoveryStatus.quality}
                </Badge>
              </div>
              <p className="text-sm">
                {recoveryStatus.recommendation}
              </p>
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

      {/* Calendário da Semana */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Programação Semanal
          </CardTitle>
          <CardDescription>Visão integrada da sua semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { day: "Segunda", activities: ["Treino A - Superior", "Check-in de peso"] },
              { day: "Terça", activities: ["Descanso ativo", "Monitoramento de recuperação"] },
              { day: "Quarta", activities: ["Treino B - Inferior", "Check-in nutricional"] },
              { day: "Quinta", activities: ["Descanso"] },
              { day: "Sexta", activities: ["Treino C - Full Body"] },
              { day: "Sábado", activities: ["Cardio leve", "Avaliação semanal"] },
              { day: "Domingo", activities: ["Descanso completo", "Planejamento semanal"] },
            ].map((item) => (
              <div key={item.day} className="flex border-b pb-2 last:border-0 last:pb-0">
                <div className="w-24 font-medium">{item.day}</div>
                <div className="flex-1">
                  {item.activities.map((activity, index) => (
                    <div key={index} className="text-sm mb-1 last:mb-0">
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default UnifiedDashboard;

// Componente Badge necessário para o Dashboard
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
