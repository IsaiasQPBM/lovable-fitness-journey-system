
import React from 'react';
import PageLayout from "@/components/Layout/PageLayout";
import NutritionTabs from "@/components/Nutricao/NutritionTabs";
import { TabsContent } from "@/components/ui/tabs";
import CalculadoraNutricional from './CalculadoraNutricional';

const NutricaoHome: React.FC = () => {
  return (
    <PageLayout
      title="Nutrição"
      description="Gerencie sua alimentação e necessidades nutricionais"
    >
      <NutritionTabs>
        <TabsContent value="calculator">
          <CalculadoraNutricional />
        </TabsContent>
        
        <TabsContent value="diary">
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Diário Alimentar</h2>
            <p className="text-muted-foreground">
              O registro de refeições será implementado em breve.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="supplements">
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Plano de Suplementação</h2>
            <p className="text-muted-foreground">
              O gerenciamento de suplementos será implementado em breve.
            </p>
          </div>
        </TabsContent>
      </NutritionTabs>
    </PageLayout>
  );
};

export default NutricaoHome;
