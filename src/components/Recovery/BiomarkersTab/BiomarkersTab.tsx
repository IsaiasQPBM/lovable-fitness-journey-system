
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Thermometer } from "lucide-react";

const BiomarkersTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Biomarcadores</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Biomarcadores
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monitoramento de Biomarcadores</CardTitle>
          <CardDescription>Acompanhe indicadores-chave para otimizar sua recuperação</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <div className="text-center space-y-4">
            <Thermometer className="h-16 w-16 mx-auto text-primary" />
            <h3 className="text-xl font-medium">Dados objetivos para decisões inteligentes</h3>
            <p className="text-muted-foreground max-w-md">
              Registre e acompanhe biomarcadores como frequência cardíaca de repouso, temperatura corporal, 
              e resultados de exames sanguíneos para entender melhor seu estado de recuperação e saúde geral.
            </p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Começar a Monitorar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiomarkersTab;
