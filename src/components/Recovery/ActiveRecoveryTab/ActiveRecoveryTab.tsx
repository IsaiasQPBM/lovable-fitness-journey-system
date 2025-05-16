
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Activity } from "lucide-react";

const ActiveRecoveryTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Estratégias de Recuperação Ativa</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Atividade
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Biblioteca de Recuperação</CardTitle>
          <CardDescription>Explore métodos e técnicas para otimizar sua recuperação</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <div className="text-center space-y-4">
            <Activity className="h-16 w-16 mx-auto text-primary" />
            <h3 className="text-xl font-medium">Técnicas baseadas na ciência para recuperação acelerada</h3>
            <p className="text-muted-foreground max-w-md">
              Acesse protocolos de mobilidade, alongamento, relaxamento muscular e outras técnicas comprovadas para 
              acelerar sua recuperação entre treinos e maximizar o desempenho.
            </p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Explorar Biblioteca
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveRecoveryTab;
