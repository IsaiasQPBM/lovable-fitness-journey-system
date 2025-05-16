
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { interactiveTools, getToolsByType } from "@/data/knowledge";
import ToolGrid from "./ToolGrid";
import PopularToolsSection from "./PopularToolsSection";

const InteractiveToolsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter tools based on search query
  const filteredTools = searchQuery.trim() !== "" 
    ? interactiveTools.filter(tool => 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : interactiveTools;
    
  // Get tools by type
  const calculators = getToolsByType("calculator");
  const simulators = getToolsByType("simulator");
  const assessments = getToolsByType("assessment");
  const anatomicalModels = getToolsByType("anatomical-model");

  return (
    <div className="space-y-8">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar ferramentas..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Popular Tools Section */}
      {searchQuery.trim() === "" && (
        <PopularToolsSection />
      )}
      
      {/* Tools by Type */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="calculator">Calculadoras</TabsTrigger>
          <TabsTrigger value="simulator">Simuladores</TabsTrigger>
          <TabsTrigger value="assessment">Avaliações</TabsTrigger>
          <TabsTrigger value="anatomical-model">Modelos Anatômicos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ToolGrid tools={filteredTools} />
        </TabsContent>
        
        <TabsContent value="calculator">
          <ToolGrid tools={filteredTools.filter(tool => tool.type === "calculator")} />
        </TabsContent>
        
        <TabsContent value="simulator">
          <ToolGrid tools={filteredTools.filter(tool => tool.type === "simulator")} />
        </TabsContent>
        
        <TabsContent value="assessment">
          <ToolGrid tools={filteredTools.filter(tool => tool.type === "assessment")} />
        </TabsContent>
        
        <TabsContent value="anatomical-model">
          <ToolGrid tools={filteredTools.filter(tool => tool.type === "anatomical-model")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveToolsTab;
