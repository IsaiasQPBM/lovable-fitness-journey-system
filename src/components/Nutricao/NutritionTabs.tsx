
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Weight, Heart } from "lucide-react";

interface NutritionTabsProps {
  defaultTab?: string;
  children?: React.ReactNode;
}

const NutritionTabs: React.FC<NutritionTabsProps> = ({ 
  defaultTab = "calculator",
  children 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <Tabs defaultValue={defaultTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="calculator" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span className="hidden sm:inline">Calculadora</span>
        </TabsTrigger>
        <TabsTrigger value="diary" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">Diário Alimentar</span>
        </TabsTrigger>
        <TabsTrigger value="supplements" className="flex items-center gap-2">
          <Weight className="h-4 w-4" />
          <span className="hidden sm:inline">Suplementação</span>
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default NutritionTabs;
