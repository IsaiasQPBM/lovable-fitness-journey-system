
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WorkoutExecution: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Execução de Treino</h1>
        <p className="text-muted-foreground">
          Registre e acompanhe seus treinos em tempo real.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button>Iniciar Novo Treino</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ainda Estamos Trabalhando Nisso!</CardTitle>
          <CardDescription>
            Estamos desenvolvendo nosso sistema de execução de treinos completo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            Em breve você poderá registrar seus treinos em tempo real, 
            incluindo controle de séries, repetições, cargas e intervalos de descanso.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutExecution;
