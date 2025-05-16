
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DiscussionTopic } from "@/types/knowledge";
import { MessageSquare, Eye, Clock, CheckCircle, Pin } from "lucide-react";
import { Link } from "react-router-dom";

interface TopicsListProps {
  topics: DiscussionTopic[];
}

const TopicsList: React.FC<TopicsListProps> = ({ topics }) => {
  if (topics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">Nenhum tópico encontrado</p>
      </div>
    );
  }
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Hoje";
    } else if (diffDays === 1) {
      return "Ontem";
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <Link key={topic.id} to={`/knowledge/community/topic/${topic.id}`}>
          <Card className="p-4 transition-all hover:bg-accent">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {topic.isPinned && (
                    <Pin className="h-3 w-3 text-muted-foreground" />
                  )}
                  {topic.isAnswered && (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  )}
                  <span className="font-medium">{topic.title}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {topic.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {topic.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{topic.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{topic.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(topic.lastActivity)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <span>Por: {topic.author}</span>
              <span>•</span>
              <span>Criado em: {new Date(topic.dateCreated).toLocaleDateString()}</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default TopicsList;
