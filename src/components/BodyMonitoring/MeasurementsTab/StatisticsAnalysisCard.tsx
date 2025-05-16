
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BodyMeasurementRecord } from "@/types/bodyMonitoring";

interface StatisticsAnalysisCardProps {
  latestMeasurement: BodyMeasurementRecord | null;
}

const StatisticsAnalysisCard: React.FC<StatisticsAnalysisCardProps> = ({ latestMeasurement }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas e Análises</CardTitle>
        <CardDescription>
          Informações detalhadas sobre sua composição corporal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {latestMeasurement ? (
          <>
            <div>
              <h3 className="font-medium mb-2">Estatísticas Atuais</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">IMC</p>
                  <p className="font-medium">
                    {latestMeasurement.height ? 
                      (latestMeasurement.weight! / Math.pow(latestMeasurement.height / 100, 2)).toFixed(1) : 
                      'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Relação Cintura/Quadril</p>
                  <p className="font-medium">
                    {latestMeasurement.measurements && 
                      latestMeasurement.measurements.waist && 
                      latestMeasurement.measurements.hips ?
                      (latestMeasurement.measurements.waist / latestMeasurement.measurements.hips).toFixed(2) :
                      'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Massa Magra Estimada</p>
                  <p className="font-medium">
                    {latestMeasurement.bodyFat ? 
                      (latestMeasurement.weight! * (1 - latestMeasurement.bodyFat / 100)).toFixed(1) + ' kg' : 
                      'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Massa Gorda Estimada</p>
                  <p className="font-medium">
                    {latestMeasurement.bodyFat ? 
                      (latestMeasurement.weight! * (latestMeasurement.bodyFat / 100)).toFixed(1) + ' kg' : 
                      'N/A'}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Análise de Simetria</h3>
              <div className="space-y-2">
                {latestMeasurement.measurements && 
                  latestMeasurement.measurements.rightBicep && 
                  latestMeasurement.measurements.leftBicep && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-muted-foreground">Braços (E/D):</p>
                      <p className="font-medium text-sm">
                        {(latestMeasurement.measurements.leftBicep / latestMeasurement.measurements.rightBicep * 100).toFixed(1)}%
                      </p>
                    </div>
                    <Progress 
                      value={latestMeasurement.measurements.leftBicep / latestMeasurement.measurements.rightBicep * 100}
                      className="h-1"
                    />
                  </div>
                )}
                
                {latestMeasurement.measurements && 
                  latestMeasurement.measurements.rightThigh && 
                  latestMeasurement.measurements.leftThigh && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-muted-foreground">Coxas (E/D):</p>
                      <p className="font-medium text-sm">
                        {(latestMeasurement.measurements.leftThigh / latestMeasurement.measurements.rightThigh * 100).toFixed(1)}%
                      </p>
                    </div>
                    <Progress 
                      value={latestMeasurement.measurements.leftThigh / latestMeasurement.measurements.rightThigh * 100}
                      className="h-1"
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>Nenhuma medição disponível para análise</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Análise Completa
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StatisticsAnalysisCard;
