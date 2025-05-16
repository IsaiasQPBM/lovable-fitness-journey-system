
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, BarChart, Book, Heart, LineChart, Timer, Utensils } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Laércio Refundini App</h1>
      <p className="text-xl text-muted-foreground mb-10">
        Seu aplicativo completo para treino, nutrição, monitoramento corporal e recuperação.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Treinos Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Treinos
            </CardTitle>
            <CardDescription>Planeje e execute seus treinos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Biblioteca de exercícios, planejamento de treinos personalizados, e acompanhamento de execução.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/treinos" className="w-full">
              <Button variant="outline" className="w-full">Acessar Treinos</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Nutrição Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-6 w-6 text-primary" />
              Nutrição
            </CardTitle>
            <CardDescription>Gerencie sua alimentação</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Planejamento de refeições, registro alimentar, calculadora de macros e muito mais.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/nutricao" className="w-full">
              <Button variant="outline" className="w-full">Acessar Nutrição</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Monitoramento Corporal Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-6 w-6 text-primary" />
              Monitoramento Corporal
            </CardTitle>
            <CardDescription>Acompanhe seu progresso</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Registre e visualize medidas corporais, fotos de progresso e metas.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/body-monitoring" className="w-full">
              <Button variant="outline" className="w-full">Acessar Monitoramento</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Recovery Card */}
        <Card className="hover:shadow-lg transition-shadow border-primary/20">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Recuperação e Bem-estar
            </CardTitle>
            <CardDescription>Otimize sua recuperação física e mental</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Monitore sono, estresse, dor muscular e desenvolva estratégias de recuperação ativa.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/recovery" className="w-full">
              <Button className="w-full">Acessar Recuperação</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Analytics Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-6 w-6 text-primary" />
              Análise de Dados
            </CardTitle>
            <CardDescription>Visualize suas estatísticas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Insights detalhados sobre treino, nutrição e progresso corporal.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled className="w-full">Em Breve</Button>
          </CardFooter>
        </Card>

        {/* Conhecimento Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-6 w-6 text-primary" />
              Educação e Conteúdo
            </CardTitle>
            <CardDescription>Aprenda com Laércio Refundini</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Artigos, vídeos e conteúdos exclusivos sobre musculação e hábitos saudáveis.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled className="w-full">Em Breve</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
