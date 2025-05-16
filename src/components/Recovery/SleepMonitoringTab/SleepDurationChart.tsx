
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { SleepRecord } from "@/types/recovery";

interface SleepDurationChartProps {
  data: SleepRecord[];
}

const SleepDurationChart: React.FC<SleepDurationChartProps> = ({ data }) => {
  // Format data for the chart
  const chartData = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((record) => ({
      date: new Date(record.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      hours: record.duration / 60, // Convert minutes to hours
    }));

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const hours = Math.floor(Number(payload[0].value));
      const minutes = Math.round((Number(payload[0].value) - hours) * 60);
      
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            Duração: {hours}h {minutes}min
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="date" stroke="#888888" />
        <YAxis domain={[0, 10]} stroke="#888888" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="hours" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SleepDurationChart;
