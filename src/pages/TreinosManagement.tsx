
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TreinosManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Gerenciamento de Treinos</h1>
        <p className="text-muted-foreground">
          Gerencie seus planos de treinamento e acompanhe seu progresso.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Biblioteca de Exercícios</CardTitle>
            <CardDescription>
              Explore e gerencie sua biblioteca de exercícios
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-muted-foreground text-center">
              Acesse catálogo completo de exercícios com instruções detalhadas
            </p>
            <Button asChild>
              <Link to="/exercise-library">
                Abrir Biblioteca
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Planejador de Treinos</CardTitle>
            <CardDescription>
              Crie e gerencie seus planos de treino
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-muted-foreground text-center">
              Monte treinos personalizados com séries, repetições e cargas
            </p>
            <Button asChild>
              <Link to="/training-planner">
                Planejar Treinos
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Execução de Treino</CardTitle>
            <CardDescription>
              Registre e acompanhe seus treinos em tempo real
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-muted-foreground text-center">
              Registre séries, cargas e sensações durante o treino
            </p>
            <Button asChild>
              <Link to="/workout-execution">
                Iniciar Treino
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TreinosManagement;
