
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { contentLibrary } from "@/data/knowledge";
import { Link } from "react-router-dom";
import { Clock, BookOpen, FileText, Video, PieChart } from "lucide-react";

const RecommendedContent: React.FC = () => {
  // For demo purposes, we'll just show the first 5 items from our library
  // In a real app, this would be personalized based on user preferences and activity
  const recommendedContent = contentLibrary.slice(0, 5);
  
  // Helper function to get appropriate icon for content format
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'infographic':
        return <PieChart className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };
  
  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-4 pr-4">
        {recommendedContent.map((content) => (
          <Link key={content.id} to={`/knowledge/content/${content.id}`}>
            <Card className="transition-all hover:bg-accent">
              <CardContent className="p-4 flex items-start gap-4">
                <div className="h-16 w-24 bg-muted rounded-md flex-shrink-0 overflow-hidden">
                  <img 
                    src={content.thumbnail} 
                    alt={content.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 bg-primary/10 rounded-full">
                      {getFormatIcon(content.format)}
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">{content.format}</span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {content.duration} min
                    </span>
                  </div>
                  
                  <h3 className="font-medium line-clamp-2">{content.title}</h3>
                  
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {content.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RecommendedContent;
