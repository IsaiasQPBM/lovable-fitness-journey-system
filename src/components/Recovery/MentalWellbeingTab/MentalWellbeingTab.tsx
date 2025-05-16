
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Brain } from "lucide-react";

const MentalWellbeingTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bem-estar Mental</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Estado Mental
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monitoramento da Saúde Mental</CardTitle>
          <CardDescription>Acompanhe seu estado mental e emocional para otimizar resultados</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <div className="text-center space-y-4">
            <Brain className="h-16 w-16 mx-auto text-primary" />
            <h3 className="text-xl font-medium">Equilíbrio entre corpo e mente</h3>
            <p className="text-muted-foreground max-w-md">
              Registre seu estado mental, níveis de motivação, e utilize técnicas de gerenciamento de estresse 
              e mindfulness para melhorar seu foco, desempenho e relacionamento com o fitness.
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

export default MentalWellbeingTab;
