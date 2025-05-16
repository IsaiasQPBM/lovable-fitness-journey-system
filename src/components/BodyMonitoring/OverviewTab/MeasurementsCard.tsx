
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";
import { BodyMeasurementRecord } from "@/types/bodyMonitoring";

interface MeasurementsCardProps {
  latestMeasurement: BodyMeasurementRecord | null;
}

const MeasurementsCard: React.FC<MeasurementsCardProps> = ({ latestMeasurement }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Medidas</CardTitle>
        <CardDescription>
          Circunferências corporais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          {latestMeasurement && latestMeasurement.measurements && Object.entries(latestMeasurement.measurements).slice(0, 3).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-medium">{value} cm</span>
            </div>
          ))}
          {(!latestMeasurement || !latestMeasurement.measurements || Object.keys(latestMeasurement.measurements).length === 0) && (
            <div className="text-center text-muted-foreground">
              Nenhuma medida registrada
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-2 text-primary">
          <Ruler className="h-4 w-4 mr-2" />
          Ver todas as medidas
        </Button>
      </CardContent>
    </Card>
  );
};

export default MeasurementsCard;
