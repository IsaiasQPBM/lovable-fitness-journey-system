
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InteractiveTool } from "@/types/knowledge";
import { Calculator, Activity, PenTool, User, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  tool: InteractiveTool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  // Get the appropriate icon for the tool type
  const ToolIcon = () => {
    switch (tool.type) {
      case "calculator":
        return <Calculator className="h-5 w-5" />;
      case "simulator":
        return <Activity className="h-5 w-5" />;
      case "assessment":
        return <PenTool className="h-5 w-5" />;
      case "anatomical-model":
        return <User className="h-5 w-5" />; // Changed to User icon
      default:
        return <Calculator className="h-5 w-5" />;
    }
  };

  // Get complexity color
  const getComplexityColor = () => {
    switch (tool.complexity) {
      case "beginner":
        return "bg-green-500/80";
      case "intermediate":
        return "bg-blue-500/80";
      case "advanced":
        return "bg-purple-500/80";
      default:
        return "bg-gray-500/80";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md flex flex-col">
      <div className="relative h-40 overflow-hidden bg-muted">
        <img 
          src={tool.thumbnail} 
          alt={tool.title} 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
          <div className="p-4 bg-white/90 dark:bg-black/90 rounded-full">
            <ToolIcon />
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className={`${getComplexityColor()}`}>
            {tool.complexity === "beginner" ? "Iniciante" : 
             tool.complexity === "intermediate" ? "Intermediário" : "Avançado"}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {tool.type === "calculator" ? "Calculadora" : 
             tool.type === "simulator" ? "Simulador" : 
             tool.type === "assessment" ? "Avaliação" : "Modelo Anatômico"}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4">
        <h3 className="font-semibold text-lg">{tool.title}</h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground">
          {tool.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex gap-2">
          <Button asChild className="flex-1">
            <Link to={tool.url}>Acessar Ferramenta</Link>
          </Button>
          {tool.helpContent && (
            <Button variant="outline" size="icon" asChild>
              <Link to={`/knowledge/content/${tool.helpContent}`}>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
