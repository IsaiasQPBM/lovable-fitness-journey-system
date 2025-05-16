
import { DashboardWidget, DashboardConfig } from "@/types/dataAnalysis";

// Mock dashboard widgets
export const defaultWidgets: DashboardWidget[] = [
  {
    id: "widget-1",
    userId: "user-1",
    title: "Progresso de Peso",
    type: "chart",
    source: "bodyMonitoring",
    size: "medium",
    position: { x: 0, y: 0 },
    config: {
      chartType: "line",
      metric: "weight",
      timeRange: "last30days"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "widget-2",
    userId: "user-1",
    title: "Qualidade do Sono vs. Desempenho de Treino",
    type: "chart",
    source: "recovery",
    size: "medium",
    position: { x: 1, y: 0 },
    config: {
      chartType: "scatter",
      xMetric: "sleepQuality",
      yMetric: "trainingPerformance",
      timeRange: "last14days"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "widget-3",
    userId: "user-1",
    title: "Calorias vs. Peso",
    type: "chart",
    source: "nutrition",
    size: "large",
    position: { x: 0, y: 1 },
    config: {
      chartType: "multiLine",
      metrics: ["calories", "weight"],
      timeRange: "last30days"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "widget-4",
    userId: "user-1",
    title: "Volume de Treino por Grupo Muscular",
    type: "chart",
    source: "training",
    size: "medium",
    position: { x: 0, y: 2 },
    config: {
      chartType: "bar",
      metric: "volumeByMuscleGroup",
      timeRange: "lastWeek"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "widget-5",
    userId: "user-1",
    title: "Score de Recuperação",
    type: "metric",
    source: "recovery",
    size: "small",
    position: { x: 2, y: 0 },
    config: {
      metric: "recoveryScore",
      format: "percent",
      comparison: "lastWeek",
      goal: 80
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock dashboard configurations
export const dashboardConfigs: DashboardConfig[] = [
  {
    id: "dashboard-1",
    userId: "user-1",
    name: "Dashboard Principal",
    isDefault: true,
    widgets: defaultWidgets,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "dashboard-2",
    userId: "user-1",
    name: "Foco em Treino",
    isDefault: false,
    widgets: defaultWidgets.filter(w => w.source === "training" || w.id === "widget-5"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "dashboard-3",
    userId: "user-1",
    name: "Nutrição & Composição Corporal",
    isDefault: false,
    widgets: defaultWidgets.filter(w => ["nutrition", "bodyMonitoring"].includes(w.source)),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
