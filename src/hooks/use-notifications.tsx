
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
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
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
    actionLabel: 'Iniciar Treino'
  },
  {
    title: 'Meta alcançada',
    message: 'Parabéns! Você atingiu sua meta de peso de 80kg',
    type: 'success',
    module: 'monitoramento'
  },
  {
    title: 'Lembrete nutricional',
    message: 'Você ainda não registrou suas refeições de hoje',
    type: 'warning',
    module: 'nutricao',
    actionUrl: '/nutricao',
    actionLabel: 'Registrar Agora'
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
      timestamp: new Date(),
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

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications
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
