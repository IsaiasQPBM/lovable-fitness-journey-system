
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertOctagon, ChevronRight, Lightbulb, Award, ArrowUpRight, BarChartHorizontal } from "lucide-react";
import { insights } from "@/data/dataAnalysis";

const InsightsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Insights e Recomendações</h2>
        <Button variant="outline">
          Ver Todos os Insights
        </Button>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight) => (
          <Card key={insight.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className={`shrink-0 p-2 rounded-full ${
                  insight.type === 'warning' ? 'bg-red-100' : 
                  insight.type === 'opportunity' ? 'bg-amber-100' : 
                  insight.type === 'achievement' ? 'bg-green-100' : 
                  insight.type === 'pattern' ? 'bg-blue-100' : 
                  'bg-purple-100'
                }`}>
                  {insight.type === 'warning' && <AlertOctagon className={`h-5 w-5 text-red-600`} />}
                  {insight.type === 'opportunity' && <Lightbulb className={`h-5 w-5 text-amber-600`} />}
                  {insight.type === 'achievement' && <Award className={`h-5 w-5 text-green-600`} />}
                  {insight.type === 'pattern' && <BarChartHorizontal className={`h-5 w-5 text-blue-600`} />}
                  {insight.type === 'recommendation' && <ArrowUpRight className={`h-5 w-5 text-purple-600`} />}
                </div>
                
                <div className="grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{insight.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {insight.actionSteps && (
                    <div className="mt-4 border-t pt-3">
                      <p className="text-xs font-medium mb-2">AÇÕES RECOMENDADAS</p>
                      <ul className="space-y-1">
                        {insight.actionSteps.slice(0, 2).map((step, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                            {step}
                          </li>
                        ))}
                        {insight.actionSteps.length > 2 && (
                          <li className="text-sm text-muted-foreground">
                            + {insight.actionSteps.length - 2} mais ações...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InsightsTab;
