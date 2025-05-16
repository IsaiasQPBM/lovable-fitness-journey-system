
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardWidget } from "@/types/dataAnalysis";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Activity, AlertOctagon, BarChart as BarChartIcon, LineChart as LineChartIcon, Percent, TrendingUp } from "lucide-react";

// Mock data for charts
const lineData = [
  { date: '01/05', value: 82.5 },
  { date: '08/05', value: 82.1 },
  { date: '15/05', value: 81.3 },
  { date: '22/05', value: 80.8 },
  { date: '29/05', value: 80.2 },
];

const barData = [
  { group: 'Peito', value: 18 },
  { group: 'Costas', value: 20 },
  { group: 'Pernas', value: 24 },
  { group: 'Ombros', value: 14 },
  { group: 'Braços', value: 12 },
];

const scatterData = [
  { x: 5, y: 6 },
  { x: 7, y: 8 },
  { x: 6, y: 7 },
  { x: 8, y: 9 },
  { x: 4, y: 5 },
  { x: 9, y: 9 },
  { x: 7, y: 7 },
  { x: 6, y: 6 },
  { x: 8, y: 7 },
];

interface DashboardWidgetCardProps {
  widget: DashboardWidget;
}

const DashboardWidgetCard: React.FC<DashboardWidgetCardProps> = ({ widget }) => {
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'chart':
        return renderChartWidget();
      case 'metric':
        return renderMetricWidget();
      case 'alert':
        return renderAlertWidget();
      default:
        return <p>Tipo de widget não suportado</p>;
    }
  };

  const renderChartWidget = () => {
    if (!widget.config.chartType) return <p>Configuração de gráfico inválida</p>;

    const chartConfig = {
      value: {
        theme: { light: "#2563eb", dark: "#3b82f6" },
        label: "Valor",
      },
    };

    switch (widget.config.chartType) {
      case 'line':
        return (
          <div className="h-[200px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        );
      case 'bar':
        return (
          <div className="h-[200px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        );
      default:
        return <p>Tipo de gráfico não suportado</p>;
    }
  };

  const renderMetricWidget = () => {
    // Mock recovery score for the example
    const recoveryScore = 75;
    const lastWeekScore = 70;
    const change = recoveryScore - lastWeekScore;
    const isPositive = change >= 0;

    return (
      <div className="flex flex-col items-center justify-center h-[180px]">
        <div className="text-3xl font-bold">{recoveryScore}%</div>
        <div className={`flex items-center mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <Activity className="h-4 w-4 mr-1" />}
          <span>{isPositive ? '+' : ''}{change}% vs. semana anterior</span>
        </div>
      </div>
    );
  };

  const renderAlertWidget = () => {
    return (
      <div className="flex items-center p-4 bg-amber-50 rounded-md">
        <AlertOctagon className="h-8 w-8 text-amber-500 mr-4" />
        <div>
          <h4 className="font-medium">Alerta de Recuperação</h4>
          <p className="text-sm text-muted-foreground">
            Seus indicadores de recuperação estão 30% abaixo do normal. Considere reduzir a intensidade do próximo treino.
          </p>
        </div>
      </div>
    );
  };

  const getWidgetIcon = () => {
    switch (widget.type) {
      case 'chart':
        return widget.config.chartType === 'line' ? 
          <LineChartIcon className="h-4 w-4" /> : 
          <BarChartIcon className="h-4 w-4" />;
      case 'metric':
        return <Percent className="h-4 w-4" />;
      case 'alert':
        return <AlertOctagon className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {getWidgetIcon()}
          {widget.title}
        </CardTitle>
        <span className="text-xs text-muted-foreground">
          {widget.config.timeRange === 'last30days' ? 'Últimos 30 dias' : 
           widget.config.timeRange === 'last14days' ? 'Últimas 2 semanas' :
           widget.config.timeRange === 'lastWeek' ? 'Última semana' : 
           'Período personalizado'}
        </span>
      </CardHeader>
      <CardContent>
        {renderWidgetContent()}
      </CardContent>
    </Card>
  );
};

export default DashboardWidgetCard;
