
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { dashboardConfigs } from "@/data/dataAnalysis";
import DashboardWidgetGrid from "./DashboardWidgetGrid";

const DashboardTab: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = React.useState(
    dashboardConfigs.find(config => config.isDefault)?.id || dashboardConfigs[0]?.id
  );

  const currentDashboard = dashboardConfigs.find(config => config.id === selectedDashboard);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <Select value={selectedDashboard} onValueChange={setSelectedDashboard}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Selecionar dashboard" />
            </SelectTrigger>
            <SelectContent>
              {dashboardConfigs.map(config => (
                <SelectItem key={config.id} value={config.id}>
                  {config.name} {config.isDefault && " (Padrão)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Personalizar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Novo Dashboard
          </Button>
        </div>
      </div>
      
      {currentDashboard ? (
        <DashboardWidgetGrid widgets={currentDashboard.widgets} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum Dashboard Disponível</CardTitle>
            <CardDescription>
              Crie um novo dashboard para começar a visualizar seus dados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardTab;
