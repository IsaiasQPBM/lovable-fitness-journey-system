
import React from "react";
import { DashboardWidget } from "@/types/dataAnalysis";
import DashboardWidgetCard from "./DashboardWidgetCard";

interface DashboardWidgetGridProps {
  widgets: DashboardWidget[];
}

const DashboardWidgetGrid: React.FC<DashboardWidgetGridProps> = ({ widgets }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {widgets.map(widget => (
        <div 
          key={widget.id} 
          className={`${
            widget.size === 'small' ? 'col-span-1' : 
            widget.size === 'medium' ? 'col-span-1 md:col-span-1' : 
            'col-span-1 md:col-span-2'
          }`}
        >
          <DashboardWidgetCard widget={widget} />
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgetGrid;
