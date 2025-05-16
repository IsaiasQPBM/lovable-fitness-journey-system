
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Apple, 
  BarChart, 
  Calculator, 
  Calendar, 
  Droplets, 
  ListPlus, 
  PlusCircle, 
  Timer, 
  Utensils,
  Plus,
  ArrowRight,
  Book,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const NutricaoHome: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Nutrição</h1>
        <p className="text-muted-foreground">
          Gerencie sua alimentação e suplementação com base nos princípios de Laércio Refundini.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ainda Estamos Trabalhando Nisso!</CardTitle>
          <CardDescription>
            Estamos desenvolvendo nosso módulo completo de nutrição.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            Em breve você terá acesso a recursos avançados de nutrição, incluindo calculadora de necessidades nutricionais,
            banco de dados de alimentos, registro de refeições, análise nutricional e gestão de suplementação.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Calculadora Nutricional</CardTitle>
            <CardDescription>
              Calcule suas necessidades nutricionais personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-muted-foreground text-center">
              Determine suas necessidades calóricas e distribuição ideal de macronutrientes
            </p>
            <Button>
              <Calculator className="mr-2 h-4 w-4" />
              Acessar Calculadora
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Registro Alimentar</CardTitle>
            <CardDescription>
              Acompanhe sua alimentação diária
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-muted-foreground text-center">
              Registre suas refeições e acompanhe seu consumo de calorias e nutrientes
            </p>
            <Button>
              <Utensils className="mr-2 h-4 w-4" />
              Registrar Refeição
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Plano de Suplementação</CardTitle>
            <CardDescription>
              Gerencie seus suplementos nutricionais
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-muted-foreground text-center">
              Organize sua suplementação e receba lembretes para não esquecer nenhuma dose
            </p>
            <Button>
              <Apple className="mr-2 h-4 w-4" />
              Gerenciar Suplementos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutricaoHome;
