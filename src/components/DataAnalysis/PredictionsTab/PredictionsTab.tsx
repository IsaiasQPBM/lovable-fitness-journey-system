
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";
import { predictions } from "@/data/dataAnalysis";

const PredictionsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Previsões e Simulações</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Simulação
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predictions.map((prediction) => (
          <Card key={prediction.id}>
            <CardHeader>
              <CardTitle className="text-lg">{prediction.targetMetric.label}</CardTitle>
              <CardDescription>Previsão para {prediction.timeframe}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Atual</p>
                    <p className="text-2xl font-bold">{prediction.currentValue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Previsto</p>
                    <p className="text-2xl font-bold text-primary">{prediction.predictedValue}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Confiança</span>
                    <span>{(prediction.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${prediction.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <p className="text-sm font-medium">Principais Fatores</p>
                  {prediction.factors.slice(0, 3).map((factor, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="truncate">{factor.factor}</span>
                      <span className={factor.impact > 0 ? "text-green-600" : "text-red-600"}>
                        {factor.impact > 0 ? "+" : ""}{factor.impact.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Simulador "E Se"</CardTitle>
          <CardDescription>
            Explore cenários hipotéticos para otimizar sua jornada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-6">
            <div className="text-center space-y-4">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium">Simule diferentes cenários</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Use o simulador para explorar como mudanças em treino, nutrição e recuperação
                podem impactar seus resultados antes de implementá-las.
              </p>
              <Button className="mt-4">
                Iniciar Simulação
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionsTab;
