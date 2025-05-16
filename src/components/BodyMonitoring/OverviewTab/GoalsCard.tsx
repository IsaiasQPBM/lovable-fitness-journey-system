
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Goal, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BodyGoal } from "@/types/bodyMonitoring";

interface GoalsCardProps {
  activeGoals: BodyGoal[];
}

const GoalsCard: React.FC<GoalsCardProps> = ({ activeGoals }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Metas Ativas</CardTitle>
        <CardDescription>
          {activeGoals.length} metas em progresso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {activeGoals.slice(0, 2).map(goal => (
            <div key={goal.id} className="text-sm">
              <div className="flex justify-between items-center mb-1">
                <span>{goal.title}</span>
                <span className="text-xs">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-1" />
            </div>
          ))}
          {activeGoals.length === 0 && (
            <div className="text-center text-muted-foreground">
              Nenhuma meta ativa
            </div>
          )}
        </div>
        <Button asChild variant="ghost" size="sm" className="w-full mt-2 text-primary">
          <Link to="/body-monitoring/goals">
            <Goal className="h-4 w-4 mr-2" />
            Ver todas as metas
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default GoalsCard;
