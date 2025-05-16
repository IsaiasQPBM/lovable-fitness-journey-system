import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import MainLayout from './components/Layout/MainLayout';
import BodyMonitoring from './pages/BodyMonitoring';
import TreinosManagement from './pages/TreinosManagement';
import NutricaoHome from './pages/Nutricao/NutricaoHome';
import RecoveryHome from './pages/Recovery/RecoveryHome';
import KnowledgeHome from './pages/Knowledge/KnowledgeHome';
import DataAnalysisHome from './pages/DataAnalysis/DataAnalysisHome';
import UnifiedDashboard from './pages/UnifiedDashboard';
import ExerciseLibrary from './pages/ExerciseLibrary';
import TrainingPlanner from './pages/TrainingPlanner';
import WorkoutExecution from './pages/WorkoutExecution';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/unified-dashboard" element={<UnifiedDashboard />} />
          <Route path="/body-monitoring/*" element={<BodyMonitoring />} />
          <Route path="/treinos-management" element={<TreinosManagement />} />
          <Route path="/exercise-library" element={<ExerciseLibrary />} />
          <Route path="/training-planner" element={<TrainingPlanner />} />
          <Route path="/workout-execution" element={<WorkoutExecution />} />
          <Route path="/nutricao/*" element={<NutricaoHome />} />
          <Route path="/recovery/*" element={<RecoveryHome />} />
          <Route path="/knowledge/*" element={<KnowledgeHome />} />
          <Route path="/data-analysis/*" element={<DataAnalysisHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
