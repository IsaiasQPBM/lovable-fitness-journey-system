
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BodyMeasurementRecord } from "@/types/bodyMonitoring";

interface WeightChartProps {
  measurementHistory: BodyMeasurementRecord[];
}

const WeightChart: React.FC<WeightChartProps> = ({ measurementHistory }) => {
  // Prepare data for the weight chart
  const weightChartData = measurementHistory
    .slice(0, 10) // Get the 10 most recent measurements
    .reverse() // Reverse to show chronologically
    .map(measurement => ({
      date: new Date(measurement.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }),
      weight: measurement.weight,
      bodyFat: measurement.bodyFat || null
    }));

  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Evolução do Peso</CardTitle>
        <CardDescription>
          Últimas 10 medições
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weightChartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="weight"
                stroke="#8884d8"
                name="Peso (kg)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              {measurementHistory.some(m => m.bodyFat !== undefined) && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bodyFat"
                  stroke="#82ca9d"
                  name="% Gordura"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/body-monitoring/measurements/add">
              <Plus className="h-4 w-4 mr-2" />
              Nova Medição
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightChart;
