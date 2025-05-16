
import React from "react";
import { bodyMeasurementHistory, photoRecords, bodyGoals } from "@/data/bodyMonitoringData";
import { Activity, Weight } from "lucide-react";
import KeyMetricCard from "./KeyMetricCard";
import MeasurementsCard from "./MeasurementsCard";
import GoalsCard from "./GoalsCard";
import WeightChart from "./WeightChart";
import PhotosCard from "./PhotosCard";
import QuickActionsCard from "./QuickActionsCard";
import { BodyGoal } from "@/types/bodyMonitoring";

const OverviewTab: React.FC = () => {
  // Get the most recent measurement
  const latestMeasurement = bodyMeasurementHistory[0] || null;
  
  // Get the previous measurement for comparison
  const previousMeasurement = bodyMeasurementHistory[1] || null;
  
  // Calculate percentage changes for key metrics
  const weightChange = previousMeasurement && latestMeasurement ? 
    ((latestMeasurement.weight! - previousMeasurement.weight!) / previousMeasurement.weight!) * 100 : 0;
    
  const bodyFatChange = previousMeasurement && latestMeasurement && previousMeasurement.bodyFat && latestMeasurement.bodyFat ? 
    ((latestMeasurement.bodyFat - previousMeasurement.bodyFat) / previousMeasurement.bodyFat) * 100 : 0;
  
  // Format measurement date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Filter active goals
  const activeGoals: BodyGoal[] = bodyGoals.filter(goal => goal.status === "active");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Weight Card */}
        <KeyMetricCard
          title="Peso"
          description={`Última medição: ${latestMeasurement ? formatDate(latestMeasurement.date) : 'N/A'}`}
          value={latestMeasurement ? `${latestMeasurement.weight?.toFixed(1)} kg` : 'N/A'}
          change={weightChange}
          icon={<Weight className="h-5 w-5 text-primary" />}
          isNegativeGood={true}
        />
        
        {/* Body Fat Card */}
        <KeyMetricCard
          title="% de Gordura"
          description={`Última medição: ${latestMeasurement && latestMeasurement.bodyFat ? formatDate(latestMeasurement.date) : 'N/A'}`}
          value={latestMeasurement && latestMeasurement.bodyFat ? `${latestMeasurement.bodyFat.toFixed(1)}%` : 'N/A'}
          change={bodyFatChange}
          icon={<Activity className="h-5 w-5 text-primary" />}
          isNegativeGood={true}
        />
        
        {/* Measurements Card */}
        <MeasurementsCard latestMeasurement={latestMeasurement} />
        
        {/* Goals Card */}
        <GoalsCard activeGoals={activeGoals} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Weight Chart Card */}
        <WeightChart measurementHistory={bodyMeasurementHistory} />
        
        {/* Recent Photos Card */}
        <PhotosCard photos={photoRecords} />
        
        {/* Quick Actions */}
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default OverviewTab;
