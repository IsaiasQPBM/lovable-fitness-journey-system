
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BedDouble, Brain, Calculator, Heart, Thermometer } from "lucide-react";

import SleepMonitoringTab from "@/components/Recovery/SleepMonitoringTab/SleepMonitoringTab";
import StressRecoveryTab from "@/components/Recovery/StressRecoveryTab/StressRecoveryTab";
import PainManagementTab from "@/components/Recovery/PainManagementTab/PainManagementTab";
import ActiveRecoveryTab from "@/components/Recovery/ActiveRecoveryTab/ActiveRecoveryTab";
import MentalWellbeingTab from "@/components/Recovery/MentalWellbeingTab/MentalWellbeingTab";
import BiomarkersTab from "@/components/Recovery/BiomarkersTab/BiomarkersTab";

const RecoveryHome: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("sleep");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Recuperação e Bem-estar</h1>
        <p className="text-muted-foreground">
          Monitore e otimize sua recuperação física e mental para maximizar resultados e prevenir lesões.
        </p>
      </div>
      
      <Tabs defaultValue="sleep" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <BedDouble className="h-4 w-4" /> Sono
          </TabsTrigger>
          <TabsTrigger value="stress" className="flex items-center gap-2">
            <Heart className="h-4 w-4" /> Estresse
          </TabsTrigger>
          <TabsTrigger value="pain" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Dor
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Recuperação Ativa
          </TabsTrigger>
          <TabsTrigger value="mental" className="flex items-center gap-2">
            <Brain className="h-4 w-4" /> Bem-estar Mental
          </TabsTrigger>
          <TabsTrigger value="biomarkers" className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" /> Biomarcadores
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sleep">
          <SleepMonitoringTab />
        </TabsContent>
        
        <TabsContent value="stress">
          <StressRecoveryTab />
        </TabsContent>
        
        <TabsContent value="pain">
          <PainManagementTab />
        </TabsContent>
        
        <TabsContent value="active">
          <ActiveRecoveryTab />
        </TabsContent>
        
        <TabsContent value="mental">
          <MentalWellbeingTab />
        </TabsContent>
        
        <TabsContent value="biomarkers">
          <BiomarkersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecoveryHome;
