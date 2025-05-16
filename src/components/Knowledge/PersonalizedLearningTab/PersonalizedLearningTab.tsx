
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LearningPathsList from "./LearningPathsList";
import UserProgressOverview from "./UserProgressOverview";
import RecommendedContent from "./RecommendedContent";
import { getFeaturedPaths, getRecommendedPaths } from "@/data/knowledge";
import { Info } from "lucide-react";

const PersonalizedLearningTab: React.FC = () => {
  const featuredPaths = getFeaturedPaths();
  const recommendedPaths = getRecommendedPaths("user-1"); // In a real app, pass the actual user ID
  
  return (
    <div className="space-y-8">
      {/* Info Alert for this tab */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Aprendizado Personalizado</AlertTitle>
        <AlertDescription>
          Acompanhe seu progresso educacional e receba recomendações de conteúdo adaptadas ao seu perfil,
          nível de conhecimento e objetivos específicos.
        </AlertDescription>
      </Alert>
      
      {/* User Progress Overview */}
      <UserProgressOverview />
      
      {/* Recommended Learning Paths */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Trilhas de Aprendizado Recomendadas</h2>
        <LearningPathsList paths={recommendedPaths} />
      </div>
      
      {/* Recommended Content based on recent activity */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Conteúdo Recomendado</h2>
        <RecommendedContent />
      </div>
      
      {/* Featured Learning Paths */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Trilhas em Destaque</h2>
        <LearningPathsList paths={featuredPaths} />
      </div>
    </div>
  );
};

export default PersonalizedLearningTab;
