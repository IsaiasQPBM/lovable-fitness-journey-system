
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BodyMeasurementRecord } from "@/types/bodyMonitoring";

interface MeasurementsChartProps {
  measurements: BodyMeasurementRecord[];
}

const MeasurementsChart: React.FC<MeasurementsChartProps> = ({ measurements }) => {
  // Prepare data for the measurements chart
  const measurementsChartData = measurements
    .slice(0, 7) // Get the 7 most recent measurements
    .reverse() // Reverse to show chronologically
    .map(measurement => {
      const data: Record<string, any> = {
        date: new Date(measurement.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
      };
      
      // Add measurements that exist
      if (measurement.measurements) {
        Object.entries(measurement.measurements).forEach(([key, value]) => {
          data[key] = value;
        });
      }
      
      return data;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução de Medidas</CardTitle>
        <CardDescription>
          Visualize a evolução de suas medidas corporais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={measurementsChartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {measurements.length > 0 && measurements[0].measurements && Object.keys(measurements[0].measurements).slice(0, 4).map((key, index) => {
                const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colors[index % colors.length]}
                    name={key.replace(/([A-Z])/g, ' $1').trim()}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Análise Avançada
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MeasurementsChart;
