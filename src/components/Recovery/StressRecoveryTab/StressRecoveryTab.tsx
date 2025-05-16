
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";
import { stressRecords } from "@/data/recoveryData/stressData";

const StressRecoveryTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Estresse e Recuperação</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Dados
        </Button>
      </div>
      
      {/* HRV and Recovery Score Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">HRV Matinal</CardTitle>
            <CardDescription>Média dos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Heart className="h-5 w-5 mr-2 text-primary" />
              {Math.round(stressRecords.slice(0, 7).reduce((sum, record) => sum + (record.hrvMorning || 0), 0) / 7)} ms
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prontidão para Treino</CardTitle>
            <CardDescription>Avaliação atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stressRecords[0].trainingReadiness}/10</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Score de Recuperação</CardTitle>
            <CardDescription>Avaliação atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stressRecords[0].recoveryScore}/100</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nível de Estresse</CardTitle>
            <CardDescription>Avaliação atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stressRecords[0].perceivedStressLevel}/10</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monitoramento de Estresse e Recuperação</CardTitle>
          <CardDescription>Use esta seção para monitorar e analisar seus níveis de estresse e recuperação ao longo do tempo.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <div className="text-center space-y-4">
            <Heart className="h-16 w-16 mx-auto text-primary animate-pulse" />
            <h3 className="text-xl font-medium">Monitore sua Variabilidade Cardíaca e muito mais</h3>
            <p className="text-muted-foreground max-w-md">
              Utilize dispositivos como Apple Watch, Garmin, WHOOP ou Oura Ring para registrar dados de HRV, 
              ou faça medições manuais e registre seus níveis subjetivos de estresse e recuperação.
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

export default StressRecoveryTab;
