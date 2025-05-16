
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, GraduationCap } from "lucide-react";
import { LearningPath } from "@/types/knowledge";
import { Link } from "react-router-dom";

interface LearningPathsListProps {
  paths: LearningPath[];
}

const LearningPathsList: React.FC<LearningPathsListProps> = ({ paths }) => {
  if (paths.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground">Nenhuma trilha de aprendizado disponível</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {paths.map((path) => (
        <Card key={path.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{path.title}</CardTitle>
                <CardDescription className="mt-1">{path.description}</CardDescription>
              </div>
              <Badge variant={path.level === 'beginner' ? 'default' : path.level === 'intermediate' ? 'secondary' : 'outline'}>
                {path.level === 'beginner' ? 'Iniciante' : path.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{path.duration} horas</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span>{path.contentItems.length} conteúdos</span>
                </div>
              </div>
              
              {/* Mock progress - in a real app this would be based on user's actual progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progresso</span>
                  <span>0%</span>
                </div>
                <Progress value={0} />
              </div>
              
              <Button asChild className="w-full">
                <Link to={`/knowledge/path/${path.id}`}>
                  Começar Trilha
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LearningPathsList;
