
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { getRecentTopics, getMostActiveTopics, getPinnedTopics, searchTopics } from "@/data/knowledge";
import TopicsList from "./TopicsList";
import CommunityGuidelines from "./CommunityGuidelines";

const CommunityTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const recentTopics = getRecentTopics();
  const activeTopics = getMostActiveTopics();
  const pinnedTopics = getPinnedTopics();
  
  // Filter topics based on search query
  const filteredTopics = searchQuery.trim() !== "" 
    ? searchTopics(searchQuery)
    : recentTopics;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar tópicos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Create Topic Button */}
        <Button className="md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Novo Tópico
        </Button>
      </div>
      
      {/* Community Guidelines */}
      <CommunityGuidelines />
      
      {/* Topics Tabs */}
      <Tabs defaultValue="recent">
        <TabsList className="mb-6">
          <TabsTrigger value="recent">Recentes</TabsTrigger>
          <TabsTrigger value="active">Mais Ativos</TabsTrigger>
          <TabsTrigger value="pinned">Fixados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          {searchQuery.trim() !== "" ? (
            <>
              <h3 className="text-lg font-medium mb-4">Resultados da busca por: "{searchQuery}"</h3>
              <TopicsList topics={filteredTopics} />
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-4">Tópicos Recentes</h3>
              <TopicsList topics={recentTopics} />
            </>
          )}
        </TabsContent>
        
        <TabsContent value="active">
          <h3 className="text-lg font-medium mb-4">Tópicos Mais Ativos</h3>
          <TopicsList topics={activeTopics} />
        </TabsContent>
        
        <TabsContent value="pinned">
          <h3 className="text-lg font-medium mb-4">Tópicos Fixados</h3>
          <TopicsList topics={pinnedTopics} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityTab;
