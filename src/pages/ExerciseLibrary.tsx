
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ExerciseLibrary: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Biblioteca de Exercícios</h1>
        <p className="text-muted-foreground">
          Explore uma ampla variedade de exercícios para seus treinos.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button>Adicionar Exercício</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ainda Estamos Trabalhando Nisso!</CardTitle>
          <CardDescription>
            Estamos desenvolvendo nossa biblioteca de exercícios completa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            Em breve você terá acesso a centenas de exercícios com descrições detalhadas, 
            instruções em vídeo e recomendações personalizadas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseLibrary;
