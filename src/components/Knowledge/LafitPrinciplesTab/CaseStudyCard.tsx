
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CaseStudyCardProps {
  title: string;
  category: string;
  image: string;
  clientName: string;
  results: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  category,
  image,
  clientName,
  results
}) => {
  return (
    <Link to="/knowledge/case-study/123">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-[3/2] relative overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">
              {category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">Cliente: {clientName}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 border-t bg-muted/50">
          <div className="w-full">
            <p className="text-sm font-medium">Resultado:</p>
            <p className="text-sm">{results}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CaseStudyCard;
