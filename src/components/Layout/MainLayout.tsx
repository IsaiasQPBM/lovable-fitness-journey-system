
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Activity, BarChart, Book, Heart, LineChart, Home, Utensils } from "lucide-react";
import NotificationsCenter from "@/components/Notifications/NotificationsCenter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { toast } = useToast();
  
  const navItems = [
    { name: "Início", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Treinos", path: "/treinos", icon: <Activity className="h-5 w-5" /> },
    { name: "Nutrição", path: "/nutricao", icon: <Utensils className="h-5 w-5" /> },
    { name: "Monitoramento", path: "/body-monitoring", icon: <LineChart className="h-5 w-5" /> },
    { name: "Recuperação", path: "/recovery", icon: <Heart className="h-5 w-5" /> },
    { name: "Análises", path: "/data-analysis", icon: <BarChart className="h-5 w-5" /> },
    { name: "Conhecimento", path: "/knowledge", icon: <Book className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">LAFIT</Link>
          <div className="flex items-center gap-2">
            <NotificationsCenter />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => toast({ 
                title: "Perfil de Usuário", 
                description: "Gestão de perfil em desenvolvimento" 
              })}
            >
              <span className="sr-only">Perfil</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16">
        {children}
      </main>

      {/* Navigation */}
      <nav className="bg-background border-t fixed bottom-0 w-full z-30 py-2 md:py-3">
        <div className="container mx-auto flex justify-around items-center">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={cn(
                "flex flex-col items-center text-xs p-1 rounded transition-colors",
                location.pathname === item.path 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="mt-1 hidden md:inline">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
