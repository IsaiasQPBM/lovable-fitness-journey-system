
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { SleepRecord } from "@/types/recovery";

interface SleepQualityChartProps {
  data: SleepRecord[];
}

const SleepQualityChart: React.FC<SleepQualityChartProps> = ({ data }) => {
  // Format data for the chart
  const chartData = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((record) => ({
      date: new Date(record.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      quality: record.quality,
    }));

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            Qualidade: {payload[0].value}/10
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
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
        <defs>
          <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="quality"
          stroke="#9b87f5"
          fill="url(#colorQuality)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SleepQualityChart;
