
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { bodyMeasurementHistory } from "@/data/bodyMonitoringData";
import MeasurementHistoryList from "./MeasurementHistoryList";
import MeasurementsChart from "./MeasurementsChart";
import StatisticsAnalysisCard from "./StatisticsAnalysisCard";

const MeasurementsTab: React.FC = () => {
  // Get the most recent measurement
  const latestMeasurement = bodyMeasurementHistory[0] || null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Medidas Corporais</h2>
        <Button asChild>
          <Link to="/body-monitoring/measurements/add">
            <Plus className="h-4 w-4 mr-2" />
            Nova Medição
          </Link>
        </Button>
      </div>
      
      <MeasurementHistoryList measurements={bodyMeasurementHistory} />
      
      <div className="grid gap-6 md:grid-cols-2">
        <MeasurementsChart measurements={bodyMeasurementHistory} />
        <StatisticsAnalysisCard latestMeasurement={latestMeasurement} />
      </div>
    </div>
  );
};

export default MeasurementsTab;
