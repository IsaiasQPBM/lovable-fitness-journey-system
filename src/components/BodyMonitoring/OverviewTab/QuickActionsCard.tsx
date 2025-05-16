
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Goal, Weight } from "lucide-react";

const QuickActionsCard: React.FC = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
            <Link to="/body-monitoring/measurements/add">
              <Weight className="h-8 w-8 mb-2" />
              <span className="font-medium">Registrar Medição</span>
              <span className="text-xs text-muted-foreground mt-1">Peso, % de gordura e medidas</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
            <Link to="/body-monitoring/photos/add">
              <Camera className="h-8 w-8 mb-2" />
              <span className="font-medium">Adicionar Foto</span>
              <span className="text-xs text-muted-foreground mt-1">Registrar foto de progresso</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
            <Link to="/body-monitoring/goals/add">
              <Goal className="h-8 w-8 mb-2" />
              <span className="font-medium">Definir Meta</span>
              <span className="text-xs text-muted-foreground mt-1">Criar uma nova meta corporal</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
