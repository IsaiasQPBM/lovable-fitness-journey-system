
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

// Tipos para as notificações
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  module: 'treino' | 'nutricao' | 'monitoramento' | 'recuperacao' | 'analise' | 'conhecimento' | 'sistema';
  actionUrl?: string;
  actionLabel?: string;
  relatedData?: any; // For cross-module integration
  crossModuleReferences?: {
    module: string;
    entityId: string;
    entityType: string;
  }[];
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  getModuleNotifications: (module: Notification['module']) => Notification[];
  getRelatedNotifications: (module: Notification['module'], entityId: string) => Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Dados de exemplo para notificações iniciais
const exampleNotifications: Omit<Notification, 'id' | 'timestamp' | 'read'>[] = [
  {
    title: 'Treino agendado',
    message: 'Seu próximo treino está agendado para hoje às 18:00',
    type: 'info',
    module: 'treino',
    actionUrl: '/workout-execution',
    actionLabel: 'Iniciar Treino',
    crossModuleReferences: [
      { module: 'recuperacao', entityId: 'rec-001', entityType: 'recoveryStatus' }
    ]
  },
  {
    title: 'Meta alcançada',
    message: 'Parabéns! Você atingiu sua meta de peso de 80kg',
    type: 'success',
    module: 'monitoramento',
    crossModuleReferences: [
      { module: 'nutricao', entityId: 'nut-001', entityType: 'nutritionPlan' }
    ]
  },
  {
    title: 'Lembrete nutricional',
    message: 'Você ainda não registrou suas refeições de hoje',
    type: 'warning',
    module: 'nutricao',
    actionUrl: '/nutricao',
    actionLabel: 'Registrar Agora'
  },
  {
    title: 'Oportunidade de recuperação',
    message: 'Seus músculos peitorais precisam de mais 24h de recuperação',
    type: 'info',
    module: 'recuperacao',
    crossModuleReferences: [
      { module: 'treino', entityId: 'tr-chest', entityType: 'muscleGroup' }
    ]
  },
  {
    title: 'Nova correlação detectada',
    message: 'Descobrimos uma correlação entre seu sono e desempenho em treinos',
    type: 'info',
    module: 'analise',
    actionUrl: '/data-analysis',
    actionLabel: 'Ver Análise',
    crossModuleReferences: [
      { module: 'recuperacao', entityId: 'sleep-001', entityType: 'sleepData' },
      { module: 'treino', entityId: 'workout-performance', entityType: 'performanceData' }
    ]
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  // Carregar exemplos de notificações ao iniciar
  useEffect(() => {
    const initialNotifications = exampleNotifications.map(note => ({
      ...note,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)), // Random time in last 24h
      read: false
    }));
    
    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.length);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    // Mostrar toast para notificação em tempo real
    toast({
      title: notification.title,
      description: notification.message,
      duration: 5000
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(note => 
        note.id === id && !note.read
          ? { ...note, read: true }
          : note
      )
    );
    
    // Recalcular contagem de não lidas
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(note => ({ ...note, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };
  
  // New functions for cross-module integration
  const getModuleNotifications = (module: Notification['module']) => {
    return notifications.filter(note => note.module === module);
  };
  
  const getRelatedNotifications = (module: Notification['module'], entityId: string) => {
    return notifications.filter(note => 
      note.crossModuleReferences?.some(
        ref => ref.module === module && ref.entityId === entityId
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        getModuleNotifications,
        getRelatedNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
