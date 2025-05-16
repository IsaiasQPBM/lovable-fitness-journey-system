
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, LineChart, Calendar, BedDouble } from "lucide-react";
import SleepQualityChart from "./SleepQualityChart";
import SleepDurationChart from "./SleepDurationChart";
import RecentSleepList from "./RecentSleepList";
import { sleepRecords } from "@/data/recoveryData/sleepData";

const SleepMonitoringTab: React.FC = () => {
  const lastWeekData = sleepRecords.slice(0, 7);
  
  // Calculate average sleep quality
  const avgQuality = lastWeekData.reduce((sum, record) => sum + record.quality, 0) / lastWeekData.length;
  
  // Calculate average sleep duration (in hours)
  const avgDuration = lastWeekData.reduce((sum, record) => sum + record.duration, 0) / lastWeekData.length / 60;
  
  // Get last recorded sleep
  const lastSleep = lastWeekData[0];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Monitoramento do Sono</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Sono
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Sleep Quality Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Qualidade do Sono</CardTitle>
            <CardDescription>Média dos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgQuality.toFixed(1)}/10</div>
            <p className="text-xs text-muted-foreground mt-1">
              {avgQuality >= 7 
                ? "Boa qualidade de sono" 
                : avgQuality >= 5 
                ? "Qualidade de sono média" 
                : "Qualidade de sono baixa"}
            </p>
          </CardContent>
        </Card>

        {/* Sleep Duration Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Duração do Sono</CardTitle>
            <CardDescription>Média dos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgDuration.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground mt-1">
              {avgDuration >= 8 
                ? "Duração ideal de sono" 
                : avgDuration >= 7 
                ? "Duração adequada de sono" 
                : "Duração de sono insuficiente"}
            </p>
          </CardContent>
        </Card>

        {/* Last Sleep Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Último Sono</CardTitle>
            <CardDescription>{new Date(lastSleep.date).toLocaleDateString('pt-BR')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <BedDouble className="h-5 w-5 text-muted-foreground" />
              <span>{new Date(lastSleep.bedTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
              <span>—</span>
              <span>{new Date(lastSleep.wakeTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{Math.floor(lastSleep.duration / 60)}h {lastSleep.duration % 60}min</span>
              <span className="ml-2 py-0.5 px-2 bg-primary/10 text-primary rounded-md text-xs">
                {lastSleep.quality}/10
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sleep Quality Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Qualidade do Sono</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SleepQualityChart data={lastWeekData} />
            </div>
          </CardContent>
        </Card>
        
        {/* Sleep Duration Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Duração do Sono</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SleepDurationChart data={lastWeekData} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Registros Recentes</CardTitle>
          <CardDescription>Detalhes dos últimos 5 registros de sono</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentSleepList records={lastWeekData} />
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Ver Todos os Registros
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SleepMonitoringTab;
