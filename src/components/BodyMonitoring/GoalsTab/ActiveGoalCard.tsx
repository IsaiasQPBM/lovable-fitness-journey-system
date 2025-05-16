
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BodyGoal } from "@/types/bodyMonitoring";

interface ActiveGoalCardProps {
  goal: BodyGoal;
}

const ActiveGoalCard: React.FC<ActiveGoalCardProps> = ({ goal }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{goal.title}</CardTitle>
            <CardDescription>{goal.description}</CardDescription>
          </div>
          <Badge>{goal.type !== "custom" ? goal.type : "Personalizado"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">{goal.progress}% Completa</span>
            <span className="text-xs text-muted-foreground">
              Meta: {new Date(goal.targetDate).toLocaleDateString('pt-BR', {day: 'numeric', month: 'short', year: 'numeric'})}
            </span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>
        
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Valor Inicial:</span>
            <span className="font-medium">{goal.startValue}{goal.unit}</span>
          </div>
          <div className="flex justify-between">
            <span>Valor Atual:</span>
            <span className="font-medium">
            {(goal.startValue + ((goal.targetValue - goal.startValue) * (goal.progress / 100))).toFixed(1)}{goal.unit}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Meta Final:</span>
            <span className="font-medium">{goal.targetValue}{goal.unit}</span>
          </div>
          <div className="flex justify-between">
            <span>Progresso:</span>
            <span className="font-medium">
              {Math.abs(
                (goal.startValue + ((goal.targetValue - goal.startValue) * (goal.progress / 100))) - goal.startValue
              ).toFixed(1)}{goal.unit} de {Math.abs(goal.targetValue - goal.startValue).toFixed(1)}{goal.unit}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Atualizar Progresso</Button>
      </CardFooter>
    </Card>
  );
};

export default ActiveGoalCard;
