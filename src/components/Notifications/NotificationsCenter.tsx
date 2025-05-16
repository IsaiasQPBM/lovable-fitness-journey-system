
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notification, useNotifications } from '@/hooks/use-notifications';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { markAsRead } = useNotifications();
  
  const handleClick = () => {
    markAsRead(notification.id);
  };
  
  const getTypeStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-amber-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  const getModuleLabel = () => {
    switch (notification.module) {
      case 'treino':
        return 'Treino';
      case 'nutricao':
        return 'Nutrição';
      case 'monitoramento':
        return 'Monitoramento';
      case 'recuperacao':
        return 'Recuperação';
      case 'analise':
        return 'Análise';
      case 'conhecimento':
        return 'Conhecimento';
      default:
        return 'Sistema';
    }
  };
  
  return (
    <div 
      className={`p-4 border-b last:border-b-0 ${notification.read ? 'opacity-70' : 'bg-accent/20'}`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-full w-2 h-2 mt-2 ${getTypeStyles()}`} />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-foreground">{notification.title}</h4>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: ptBR })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
              {getModuleLabel()}
            </span>
            {notification.actionUrl && (
              <Link 
                to={notification.actionUrl} 
                className="text-xs text-primary hover:underline"
              >
                {notification.actionLabel || 'Ver Detalhes'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsCenter = () => {
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotifications();
  const [open, setOpen] = useState(false);
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Opcionalmente marcar como lido quando aberto
      // markAllAsRead();
    }
  };
  
  const filterByModule = (module: string | null) => {
    if (!module) return notifications;
    return notifications.filter(note => note.module === module);
  };
  
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Notificações</SheetTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Marcar como lidas
              </Button>
              <Button variant="ghost" size="sm" onClick={clearNotifications}>
                Limpar
              </Button>
            </div>
          </div>
        </SheetHeader>
        
        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="treino">Treino</TabsTrigger>
              <TabsTrigger value="nutricao">Nutrição</TabsTrigger>
              <TabsTrigger value="monitoramento">Monitoramento</TabsTrigger>
              <TabsTrigger value="sistema">Sistema</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="flex-1 overflow-y-auto">
            <div className="divide-y">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhuma notificação para exibir.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="treino" className="flex-1 overflow-y-auto">
            <div className="divide-y">
              {filterByModule('treino').length > 0 ? (
                filterByModule('treino').map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhuma notificação de treino para exibir.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="nutricao" className="flex-1 overflow-y-auto">
            <div className="divide-y">
              {filterByModule('nutricao').length > 0 ? (
                filterByModule('nutricao').map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhuma notificação de nutrição para exibir.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="monitoramento" className="flex-1 overflow-y-auto">
            <div className="divide-y">
              {filterByModule('monitoramento').length > 0 ? (
                filterByModule('monitoramento').map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhuma notificação de monitoramento para exibir.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="sistema" className="flex-1 overflow-y-auto">
            <div className="divide-y">
              {filterByModule('sistema').length > 0 ? (
                filterByModule('sistema').map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhuma notificação do sistema para exibir.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsCenter;
