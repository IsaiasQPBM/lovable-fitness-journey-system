
import React from "react";
import { ContentItem } from "@/types/knowledge";
import ContentCard from "./ContentCard";

interface ContentGridProps {
  content: ContentItem[];
}

const ContentGrid: React.FC<ContentGridProps> = ({ content }) => {
  if (content.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">Nenhum conteúdo encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
    </div>
  );
};

export default ContentGrid;
