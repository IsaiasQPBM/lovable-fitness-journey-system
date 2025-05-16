
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/Layout/PageLayout";
import KnowledgeLibraryTab from "@/components/Knowledge/LibraryTab/KnowledgeLibraryTab";
import PersonalizedLearningTab from "@/components/Knowledge/PersonalizedLearningTab/PersonalizedLearningTab";
import InteractiveToolsTab from "@/components/Knowledge/InteractiveToolsTab/InteractiveToolsTab";
import CommunityTab from "@/components/Knowledge/CommunityTab/CommunityTab";
import LafitPrinciplesTab from "@/components/Knowledge/LafitPrinciplesTab/LafitPrinciplesTab";

const KnowledgeHome: React.FC = () => {
  return (
    <PageLayout
      title="Banco de Conhecimento"
      description="Acesse conteúdo educacional sobre treino, nutrição e recuperação"
    >
      <div className="space-y-6">
        <Tabs defaultValue="library">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="library">Biblioteca</TabsTrigger>
            <TabsTrigger value="personalized">Aprendizado Personalizado</TabsTrigger>
            <TabsTrigger value="interactive">Ferramentas Interativas</TabsTrigger>
            <TabsTrigger value="community">Comunidade</TabsTrigger>
            <TabsTrigger value="laercio">Princípios Lafit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="library">
            <KnowledgeLibraryTab />
          </TabsContent>
          
          <TabsContent value="personalized">
            <PersonalizedLearningTab />
          </TabsContent>
          
          <TabsContent value="interactive">
            <InteractiveToolsTab />
          </TabsContent>
          
          <TabsContent value="community">
            <CommunityTab />
          </TabsContent>
          
          <TabsContent value="laercio">
            <LafitPrinciplesTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default KnowledgeHome;
