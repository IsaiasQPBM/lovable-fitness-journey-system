
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/types/knowledge";
import { Clock, Eye, ThumbsUp, FileText, Video, PieChart, Headphones, Scroll, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ContentCardProps {
  content: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  // Get the appropriate icon for the content format
  const FormatIcon = () => {
    switch (content.format) {
      case "article":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "infographic":
        return <PieChart className="h-4 w-4" />;
      case "podcast":
        return <Headphones className="h-4 w-4" />;
      case "tutorial":
        return <Scroll className="h-4 w-4" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Get level color
  const getLevelColor = () => {
    switch (content.level) {
      case "beginner":
        return "bg-green-500";
      case "intermediate":
        return "bg-blue-500";
      case "advanced":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link to={`/knowledge/content/${content.id}`}>
        <div className="aspect-video relative overflow-hidden bg-muted">
          <img 
            src={content.thumbnail} 
            alt={content.title} 
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <FormatIcon />
              <span className="capitalize">{content.format}</span>
            </Badge>
          </div>
          <div className={`absolute bottom-2 left-2 w-2 h-2 rounded-full ${getLevelColor()}`} />
        </div>
      
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold line-clamp-2">{content.title}</h3>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {content.description}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{content.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{content.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{content.likes}</span>
            </div>
          </div>
          <span className="text-xs">{new Date(content.dateUpdated).toLocaleDateString()}</span>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ContentCard;
