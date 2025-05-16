
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Plus, Weight } from "lucide-react";
import { BodyMeasurementRecord } from "@/types/bodyMonitoring";

interface MeasurementHistoryListProps {
  measurements: BodyMeasurementRecord[];
}

const MeasurementHistoryList: React.FC<MeasurementHistoryListProps> = ({ measurements }) => {
  // Format measurement date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Medições</CardTitle>
        <CardDescription>
          Registro completo de suas medidas corporais
        </CardDescription>
      </CardHeader>
      <CardContent>
        {measurements.length > 0 ? (
          <div className="space-y-4">
            {measurements.slice(0, 5).map((measurement, index) => (
              <Card key={measurement.id} className="overflow-hidden">
                <CardHeader className="bg-muted/40 py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{formatDate(measurement.date)}</h4>
                      {index === 0 && <Badge className="mt-1">Mais recente</Badge>}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Peso</p>
                      <p className="font-medium">{measurement.weight} kg</p>
                    </div>
                    {measurement.bodyFat && (
                      <div>
                        <p className="text-sm text-muted-foreground">% de Gordura</p>
                        <p className="font-medium">{measurement.bodyFat}%</p>
                      </div>
                    )}
                    {measurement.measurements && Object.entries(measurement.measurements).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="font-medium">{value} cm</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {measurements.length > 5 && (
              <div className="flex justify-center mt-4">
                <Button variant="outline">Ver Todas as Medições</Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <Weight className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>Nenhuma medição registrada</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeira Medição
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeasurementHistoryList;
