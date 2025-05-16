
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Clock, BarChart, Target, Settings } from "lucide-react";

const CorePrinciplesList: React.FC = () => {
  const principles = [
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Estímulo Eficiente",
      description: "Maximizar resultados com o mínimo estímulo necessário, evitando sobrecarga desnecessária"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Abordagem Científica",
      description: "Todas as recomendações baseadas em evidências científicas e testadas na prática"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Economia de Tempo",
      description: "Treinos otimizados em duração e frequência para resultados máximos com tempo mínimo"
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Progresso Mensurável",
      description: "Acompanhamento constante de métricas relevantes para garantir evolução contínua"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Individualização Completa",
      description: "Reconhecimento da resposta única de cada indivíduo e adaptação a suas necessidades específicas"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Adaptabilidade Dinâmica",
      description: "Sistema que evolui continuamente baseado nos dados e respostas individuais"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {principles.map((principle, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              {principle.icon}
            </div>
            <div>
              <CardTitle className="text-xl">{principle.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm">
              {principle.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CorePrinciplesList;
