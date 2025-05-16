
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPopularTools } from "@/data/knowledge";
import { Calculator, Activity, PenTool, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PopularToolsSection: React.FC = () => {
  const popularTools = getPopularTools();

  // Helper to get icon based on tool type
  const getToolIcon = (type: string) => {
    switch (type) {
      case "calculator":
        return <Calculator className="h-4 w-4" />;
      case "simulator":
        return <Activity className="h-4 w-4" />;
      case "assessment":
        return <PenTool className="h-4 w-4" />;
      case "anatomical-model":
        return <User className="h-4 w-4" />; // Changed to User icon
      default:
        return <Calculator className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ferramentas Populares</CardTitle>
        <CardDescription>
          As ferramentas interativas mais utilizadas pela comunidade
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularTools.map(tool => (
            <Link 
              key={tool.id}
              to={tool.url}
              className="flex items-center p-3 rounded-lg border transition-all hover:bg-accent"
            >
              <div className="mr-4 p-2 bg-primary/10 rounded-full">
                {getToolIcon(tool.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{tool.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {tool.description}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="#all-tools">Ver Todas as Ferramentas</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PopularToolsSection;
