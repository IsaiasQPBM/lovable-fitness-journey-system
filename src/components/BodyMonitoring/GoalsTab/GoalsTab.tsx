
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Goal, Plus } from "lucide-react";
import { bodyGoals } from "@/data/bodyMonitoringData";
import ActiveGoalCard from "./ActiveGoalCard";
import CompletedGoalsCard from "./CompletedGoalsCard";

const GoalsTab: React.FC = () => {
  // Filter active goals
  const activeGoals = bodyGoals.filter(goal => goal.status === "active");
  // Filter completed goals - using achieved for compatibility
  const completedGoals = bodyGoals.filter(goal => goal.status === "achieved");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Metas Corporais</h2>
        <Button asChild>
          <Link to="/body-monitoring/goals/add">
            <Plus className="h-4 w-4 mr-2" />
            Nova Meta
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeGoals.map((goal) => (
          <ActiveGoalCard key={goal.id} goal={goal} />
        ))}
        
        <CompletedGoalsCard goals={completedGoals} />
        
        {bodyGoals.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            <Goal className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>Nenhuma meta definida</p>
            <Button asChild className="mt-4">
              <Link to="/body-monitoring/goals/add">
                <Plus className="h-4 w-4 mr-2" />
                Definir Primeira Meta
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsTab;
