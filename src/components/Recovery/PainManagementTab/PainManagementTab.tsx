
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Activity } from "lucide-react";

const PainManagementTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciamento de Dor e Desconforto</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Dor
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mapa Corporal Interativo</CardTitle>
          <CardDescription>Registre e acompanhe dor muscular e desconforto articular</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <div className="text-center space-y-4">
            <Activity className="h-16 w-16 mx-auto text-primary" />
            <h3 className="text-xl font-medium">Monitore dor muscular e desconforto articular</h3>
            <p className="text-muted-foreground max-w-md">
              Utilize o mapa corporal interativo para registrar a localização e intensidade da dor. 
              Diferencie entre dor muscular tardia (DOMS) e desconfortos articulares para manter um treino seguro e eficaz.
            </p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Começar a Registrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PainManagementTab;
