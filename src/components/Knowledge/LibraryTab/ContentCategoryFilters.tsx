
import React from "react";
import { Button } from "@/components/ui/button";
import { ContentCategory } from "@/types/knowledge";

interface ContentCategoryFiltersProps {
  selectedCategory: ContentCategory | "all";
  onSelectCategory: (category: ContentCategory | "all") => void;
}

const ContentCategoryFilters: React.FC<ContentCategoryFiltersProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const categories: { value: ContentCategory | "all"; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "training", label: "Treino" },
    { value: "nutrition", label: "Nutrição" },
    { value: "recovery", label: "Recuperação" },
    { value: "monitoring", label: "Monitoramento" },
    { value: "principles", label: "Princípios" }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category.value)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default ContentCategoryFilters;
