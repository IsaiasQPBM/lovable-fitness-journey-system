
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChartHorizontalBig, BarChart, PieChart, LineChart, Activity, ChevronDown } from "lucide-react";

import DashboardTab from "@/components/DataAnalysis/DashboardTab/DashboardTab";
import CorrelationsTab from "@/components/DataAnalysis/CorrelationsTab/CorrelationsTab";
import ReportsTab from "@/components/DataAnalysis/ReportsTab/ReportsTab";
import PredictionsTab from "@/components/DataAnalysis/PredictionsTab/PredictionsTab";
import InsightsTab from "@/components/DataAnalysis/InsightsTab/InsightsTab";

const DataAnalysisHome: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Análise de Dados</h1>
        <p className="text-muted-foreground">
          Visualize correlações, obtenha insights e otimize sua jornada de fitness com análises avançadas.
        </p>
      </div>
      
      <Tabs defaultValue="dashboard" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="correlations" className="flex items-center gap-2">
            <BarChartHorizontalBig className="h-4 w-4" /> Correlações
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Relatórios
          </TabsTrigger>
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" /> Previsões
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <DashboardTab />
        </TabsContent>
        
        <TabsContent value="correlations">
          <CorrelationsTab />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
        
        <TabsContent value="predictions">
          <PredictionsTab />
        </TabsContent>
        
        <TabsContent value="insights">
          <InsightsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataAnalysisHome;
