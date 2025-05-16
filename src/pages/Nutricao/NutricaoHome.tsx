
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart,
  Calculator,
  Calendar,
  Check,
  Droplets,
  ListPlus,
  Plus,
  Timer,
  Utensils
} from "lucide-react";
import { Link } from "react-router-dom";

const NutricaoHome: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Nutrição</h1>
        <p className="text-muted-foreground">
          Gerencie sua alimentação e suplementação com base em princípios científicos.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Cálculo Nutricional</CardTitle>
            <CardDescription>
              Calcule suas necessidades nutricionais personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Calculator className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground text-center">
              Calcule suas necessidades calóricas e distribuição de macronutrientes
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Calculadora Nutricional</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Registro Alimentar</CardTitle>
            <CardDescription>
              Registre e acompanhe sua alimentação diária
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Utensils className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground text-center">
              Registre refeições, monitore calorias e macronutrientes
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Diário Alimentar</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Planos Alimentares</CardTitle>
            <CardDescription>
              Crie e gerencie seus planos de alimentação
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <ListPlus className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground text-center">
              Planeje suas refeições e organize seu cardápio semanal
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Planejar Refeições</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ainda Estamos Trabalhando Nisso!</CardTitle>
          <CardDescription>
            O módulo completo de nutrição está em desenvolvimento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            Em breve você terá acesso a todas as funcionalidades do módulo de nutrição,
            incluindo banco de alimentos, planejamento de refeições, suplementação e muito mais!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutricaoHome;
