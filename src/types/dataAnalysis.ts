
// Types for Data Analysis module

// Dashboard types
export interface DashboardWidget {
  id: string;
  userId: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'alert' | 'progress';
  source: string; // which module the data comes from
  size: 'small' | 'medium' | 'large';
  position: {
    x: number;
    y: number;
  };
  config: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardConfig {
  id: string;
  userId: string;
  name: string;
  isDefault: boolean;
  widgets: DashboardWidget[];
  createdAt: Date;
  updatedAt: Date;
}

// Correlation analysis types
export interface CorrelationAnalysis {
  id: string;
  userId: string;
  variables: {
    x: {
      source: string;
      metric: string;
      label: string;
    };
    y: {
      source: string;
      metric: string;
      label: string;
    };
  };
  correlationCoefficient: number;
  pValue: number;
  sampleSize: number;
  timeRange: {
    start: Date;
    end: Date;
  };
  interpretation: string;
  isSignificant: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Report types
export interface Report {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom' | 'comparison';
  timeRange: {
    start: Date;
    end: Date;
    comparisonStart?: Date;
    comparisonEnd?: Date;
  };
  sections: ReportSection[];
  status: 'draft' | 'generated' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'chart' | 'table' | 'text' | 'metrics' | 'images';
  content: any;
  order: number;
}

// Prediction types
export interface Prediction {
  id: string;
  userId: string;
  targetMetric: {
    source: string;
    metric: string;
    label: string;
  };
  currentValue: number;
  predictedValue: number;
  confidence: number;
  timeframe: string;
  factors: PredictionFactor[];
  scenario: 'default' | 'optimistic' | 'pessimistic' | 'custom';
  createdAt: Date;
  updatedAt: Date;
}

export interface PredictionFactor {
  source: string;
  factor: string;
  impact: number; // -1 to 1, negative to positive impact
  confidence: number; // 0 to 1
}

// Insight types
export interface Insight {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'opportunity' | 'warning' | 'achievement' | 'pattern' | 'recommendation';
  priority: 'low' | 'medium' | 'high' | 'critical';
  relatedMetrics: string[];
  status: 'new' | 'viewed' | 'actioned' | 'dismissed';
  actionSteps?: string[];
  createdAt: Date;
  updatedAt: Date;
}
