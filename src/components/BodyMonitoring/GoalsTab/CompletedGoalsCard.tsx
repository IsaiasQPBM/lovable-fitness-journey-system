
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BodyGoal } from "@/types/bodyMonitoring";

interface CompletedGoalsCardProps {
  goals: BodyGoal[];
}

const CompletedGoalsCard: React.FC<CompletedGoalsCardProps> = ({ goals }) => {
  if (goals.length === 0) return null;
  
  return (
    <Card className="md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Metas Completadas</CardTitle>
        <CardDescription>
          Metas que você já alcançou
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <div key={goal.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-xs text-muted-foreground">{goal.description}</p>
                </div>
                <Badge variant="secondary">Completada</Badge>
              </div>
              <div className="mt-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Meta:</span>
                  <span className="font-medium">{goal.targetValue}{goal.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Alcançada em:</span>
                  <span className="font-medium">
                    {new Date(goal.updatedAt).toLocaleDateString('pt-BR', {day: 'numeric', month: 'short', year: 'numeric'})}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletedGoalsCard;
