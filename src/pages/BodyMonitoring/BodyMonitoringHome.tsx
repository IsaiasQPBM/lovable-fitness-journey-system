
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Camera, Goal, Ruler } from "lucide-react";

import OverviewTab from "@/components/BodyMonitoring/OverviewTab/OverviewTab";
import MeasurementsTab from "@/components/BodyMonitoring/MeasurementsTab/MeasurementsTab";
import PhotosTab from "@/components/BodyMonitoring/PhotosTab/PhotosTab";
import GoalsTab from "@/components/BodyMonitoring/GoalsTab/GoalsTab";

const BodyMonitoringHome: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Monitoramento Corporal</h1>
        <p className="text-muted-foreground">
          Acompanhe suas medidas, composição corporal e progresso visual.
        </p>
      </div>
      
      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Visão Geral
          </TabsTrigger>
          <TabsTrigger value="measurements" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" /> Medidas
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <Camera className="h-4 w-4" /> Fotos
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Goal className="h-4 w-4" /> Metas
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        
        {/* Measurements Tab */}
        <TabsContent value="measurements">
          <MeasurementsTab />
        </TabsContent>
        
        {/* Photos Tab */}
        <TabsContent value="photos">
          <PhotosTab />
        </TabsContent>
        
        {/* Goals Tab */}
        <TabsContent value="goals">
          <GoalsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BodyMonitoringHome;
