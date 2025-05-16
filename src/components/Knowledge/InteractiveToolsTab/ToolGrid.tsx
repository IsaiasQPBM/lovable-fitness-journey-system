
import React from "react";
import { InteractiveTool } from "@/types/knowledge";
import ToolCard from "./ToolCard";

interface ToolGridProps {
  tools: InteractiveTool[];
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools }) => {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">Nenhuma ferramenta encontrada</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
};

export default ToolGrid;
