
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/types/knowledge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedContentCarouselProps {
  featuredContent: ContentItem[];
}

const FeaturedContentCarousel: React.FC<FeaturedContentCarouselProps> = ({ featuredContent }) => {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex gap-4 pb-2 overflow-x-auto">
          {featuredContent.map((item) => (
            <div key={item.id} className="min-w-[300px] md:min-w-[350px] flex-shrink-0">
              <Link to={`/knowledge/content/${item.id}`}>
                <Card className="overflow-hidden h-full">
                  <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                      <Badge className="w-fit mb-2">{item.format}</Badge>
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-2 mt-1">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Button 
        size="icon" 
        variant="outline" 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm z-10"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button 
        size="icon" 
        variant="outline" 
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm z-10"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FeaturedContentCarousel;
