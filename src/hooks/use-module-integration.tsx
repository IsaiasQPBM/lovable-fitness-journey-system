
import { useEffect, useState } from 'react';
import { useIntegratedData } from '@/contexts/IntegratedDataContext';
import { useNotifications } from '@/hooks/use-notifications';

// Generic type for module data
export type ModuleIntegrationData = {
  module: string;
  data: any;
  metadata?: {
    correlations?: string[];
    impacts?: {
      module: string;
      metric: string;
      impact: number; // -1 to 1 scale
    }[];
  };
};

/**
 * Hook for cross-module integration
 * @param sourceModule Name of the module using this hook
 * @param trackEvents Events to subscribe to
 * @param dependencies Optional array of dependencies to trigger effect re-runs
 */
export function useModuleIntegration(
  sourceModule: string,
  trackEvents: string[] = [],
  dependencies: any[] = []
) {
  const { data: integratedData, triggerEvent, subscribeToEvent } = useIntegratedData();
  const { addNotification, getRelatedNotifications } = useNotifications();
  const [moduleConnections, setModuleConnections] = useState<Record<string, boolean>>({
    training: false,
    nutrition: false,
    bodyMonitoring: false,
    recovery: false,
    analysis: false,
    knowledge: false
  });
  
  // Subscribe to events from other modules
  useEffect(() => {
    const unsubscribers = trackEvents.map(eventType => {
      return subscribeToEvent(eventType, (payload) => {
        console.log(`[${sourceModule}] Received event: ${eventType}`, payload);
        
        // Example: Create cross-module notification based on events
        if (eventType.startsWith('recovery:') && sourceModule === 'training') {
          // If recovery module sends low-readiness event and we're in training module
          if (eventType === 'recovery:low-readiness') {
            addNotification({
              title: 'Ajuste de treino recomendado',
              message: `Sua pontuação de prontidão está baixa (${payload.score}). ${payload.recommendation}.`,
              type: 'warning',
              module: 'treino',
              actionUrl: '/treinos',
              actionLabel: 'Ajustar Treino',
              crossModuleReferences: [
                { module: 'recuperacao', entityId: 'readiness-score', entityType: 'recoveryMetric' }
              ]
            });
          }
        }
        
        // Similar handlers for other event types...
      });
    });
    
    // Determine which modules are connected based on data availability
    const connections = {
      training: Object.keys(integratedData.training).length > 0,
      nutrition: Object.keys(integratedData.nutrition).length > 0,
      bodyMonitoring: Object.keys(integratedData.bodyMonitoring).length > 0,
      recovery: Object.keys(integratedData.recovery).length > 0,
      analysis: Object.keys(integratedData.analysis).length > 0,
      knowledge: true
    };
    
    setModuleConnections(connections);
    
    // Cleanup subscriptions
    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [...dependencies]);
  
  // Function to get data from another module with context
  const getModuleData = (moduleName: keyof typeof integratedData) => {
    return {
      data: integratedData[moduleName],
      relatedNotifications: getRelatedNotifications(
        mapModuleNameToNotificationType(moduleName), 
        '*' // wildcard to get all related notifications
      )
    };
  };
  
  // Function to send data to another module
  const sendDataToModule = (
    targetModule: string, 
    dataType: string, 
    data: any,
    importance: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    // Create appropriate event type based on parameters
    const eventType = `${targetModule}:update-${dataType}`;
    
    // Trigger the event
    triggerEvent(eventType, {
      sourceModule,
      data,
      importance,
      timestamp: new Date()
    });
    
    console.log(`[${sourceModule}] Sent data to ${targetModule}:`, data);
    return true;
  };
  
  // Function to analyze impact of one module on another
  const analyzeModuleImpact = (targetModule: keyof typeof integratedData, metric: string) => {
    // This would normally involve complex calculations
    // For now, return a simplified impact analysis
    return {
      impact: Math.random() * 2 - 1, // -1 to 1 scale
      confidence: Math.random() * 0.5 + 0.5, // 0.5 to 1 scale
      description: `Impact of ${sourceModule} on ${targetModule}'s ${metric}`,
      suggestedActions: [
        `Optimize ${sourceModule} settings to improve ${targetModule} performance`,
        `Monitor changes in ${metric} when modifying ${sourceModule} parameters`
      ]
    };
  };
  
  // Helper function to map module names to notification types
  const mapModuleNameToNotificationType = (
    moduleName: keyof typeof integratedData
  ): 'treino' | 'nutricao' | 'monitoramento' | 'recuperacao' | 'analise' | 'conhecimento' | 'sistema' => {
    const mapping: Record<string, any> = {
      training: 'treino',
      nutrition: 'nutricao',
      bodyMonitoring: 'monitoramento',
      recovery: 'recuperacao',
      analysis: 'analise',
      knowledge: 'conhecimento'
    };
    
    return mapping[moduleName] || 'sistema';
  };
  
  return {
    moduleConnections,
    getModuleData,
    sendDataToModule,
    analyzeModuleImpact,
    emitEvent: triggerEvent
  };
}
