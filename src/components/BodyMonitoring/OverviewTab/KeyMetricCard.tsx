
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface KeyMetricCardProps {
  title: string;
  description: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  isNegativeGood?: boolean;
}

const KeyMetricCard: React.FC<KeyMetricCardProps> = ({
  title,
  description,
  value,
  change,
  icon,
  isNegativeGood = false
}) => {
  const getChangeDisplay = () => {
    if (change === undefined || change === 0) return null;
    
    const isPositiveChange = change > 0;
    const isGoodChange = isNegativeGood ? !isPositiveChange : isPositiveChange;
    const colorClass = isGoodChange ? "text-green-500" : "text-red-500";
    
    return (
      <div className="flex items-center text-xs mt-1">
        {isPositiveChange ? (
          <TrendingUp className={`h-3 w-3 mr-1 ${colorClass}`} />
        ) : (
          <TrendingDown className={`h-3 w-3 mr-1 ${colorClass}`} />
        )}
        <span className={colorClass}>
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {getChangeDisplay()}
          </div>
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyMetricCard;
