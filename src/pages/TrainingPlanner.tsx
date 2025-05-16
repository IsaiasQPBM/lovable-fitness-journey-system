
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TrainingPlanner: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Planejador de Treinos</h1>
        <p className="text-muted-foreground">
          Crie e personalize seus planos de treino de acordo com seus objetivos.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button>Criar Novo Plano</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ainda Estamos Trabalhando Nisso!</CardTitle>
          <CardDescription>
            Estamos desenvolvendo nosso planejador de treinos completo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            Em breve você poderá criar planos de treino personalizados, 
            incluindo periodização, controle de volume e intensidade.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingPlanner;
