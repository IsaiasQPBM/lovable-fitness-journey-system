
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TreinosManagement from "./pages/TreinosManagement";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import TrainingPlanner from "./pages/TrainingPlanner";
import WorkoutExecution from "./pages/WorkoutExecution";
import BodyMonitoringHome from "./pages/BodyMonitoring/BodyMonitoringHome";
import AddMeasurement from "./pages/BodyMonitoring/AddMeasurement";
import BodyGoals from "./pages/BodyMonitoring/BodyGoals";
import AddGoal from "./pages/BodyMonitoring/AddGoal";
import NutricaoHome from "./pages/Nutricao/NutricaoHome";
import RecoveryHome from "./pages/Recovery/RecoveryHome";
import DataAnalysisHome from "./pages/DataAnalysis/DataAnalysisHome";
import KnowledgeHome from "./pages/Knowledge/KnowledgeHome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Treinos Module Routes */}
          <Route path="/treinos" element={<TreinosManagement />} />
          <Route path="/exercise-library" element={<ExerciseLibrary />} />
          <Route path="/training-planner" element={<TrainingPlanner />} />
          <Route path="/workout-execution" element={<WorkoutExecution />} />
          
          {/* Body Monitoring Module Routes */}
          <Route path="/body-monitoring" element={<BodyMonitoringHome />} />
          <Route path="/body-monitoring/measurements/add" element={<AddMeasurement />} />
          <Route path="/body-monitoring/goals" element={<BodyGoals />} />
          <Route path="/body-monitoring/goals/add" element={<AddGoal />} />
          
          {/* Recovery Module Routes */}
          <Route path="/recovery" element={<RecoveryHome />} />
          
          {/* Nutrition Module Routes */}
          <Route path="/nutricao" element={<NutricaoHome />} />
          
          {/* Data Analysis Module Routes */}
          <Route path="/data-analysis" element={<DataAnalysisHome />} />
          
          {/* Knowledge Bank Module Routes */}
          <Route path="/knowledge" element={<KnowledgeHome />} />
          
          {/* Catch-all Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
