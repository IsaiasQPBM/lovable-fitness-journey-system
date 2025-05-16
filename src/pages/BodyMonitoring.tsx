
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BodyMonitoringHome from "./BodyMonitoring/BodyMonitoringHome";
import AddMeasurement from "./BodyMonitoring/AddMeasurement";
import BodyGoals from "./BodyMonitoring/BodyGoals";
import AddGoal from "./BodyMonitoring/AddGoal";

const BodyMonitoring: React.FC = () => {
  return (
    <Routes>
      <Route index element={<BodyMonitoringHome />} />
      <Route path="measurements/add" element={<AddMeasurement />} />
      <Route path="goals" element={<BodyGoals />} />
      <Route path="goals/add" element={<AddGoal />} />
    </Routes>
  );
};

export default BodyMonitoring;
