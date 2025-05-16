
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Clock } from "lucide-react";

const UserProgressOverview: React.FC = () => {
  // This would be connected to actual user data in a real implementation
  const mockUserProgress = {
    contentCompleted: 8,
    totalContent: 25,
    pathsInProgress: 2,
    pathsCompleted: 1,
    totalPaths: 5,
    totalLearningTime: 12.5, // hours
    nextMilestone: "Completar o módulo 'Fundamentos da Hipertrofia'"
  };
  
  const completionPercentage = 
    (mockUserProgress.contentCompleted / mockUserProgress.totalContent) * 100;
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seu Progresso</CardTitle>
        <CardDescription>
          Acompanhe sua jornada de aprendizado e cumpra seus objetivos educacionais
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Progresso Geral</span>
            <span className="text-sm text-muted-foreground">{completionPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={completionPercentage} />
          <p className="text-xs text-muted-foreground mt-2">
            {mockUserProgress.contentCompleted} de {mockUserProgress.totalContent} conteúdos completos
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{mockUserProgress.pathsInProgress} Trilhas</p>
              <p className="text-xs text-muted-foreground">Em progresso</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{mockUserProgress.pathsCompleted} Trilhas</p>
              <p className="text-xs text-muted-foreground">Completadas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{mockUserProgress.totalLearningTime} horas</p>
              <p className="text-xs text-muted-foreground">Tempo de estudo</p>
            </div>
          </div>
        </div>
        
        {/* Next Milestone */}
        <div className="bg-muted p-3 rounded-md">
          <p className="text-sm font-medium">Próxima meta</p>
          <p className="text-xs text-muted-foreground">{mockUserProgress.nextMilestone}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProgressOverview;
