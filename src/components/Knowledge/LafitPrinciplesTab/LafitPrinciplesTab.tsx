
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CorePrinciplesList from "./CorePrinciplesList";
import LaercioQuote from "./LaercioQuote";
import CaseStudyCard from "./CaseStudyCard";
import { GraduationCap, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const LafitPrinciplesTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Princípios Fundamentais Lafit</h1>
        <p className="text-muted-foreground">
          Conheça a base científica e metodológica desenvolvida por Laércio Refundini que
          fundamenta todas as funcionalidades e recomendações do sistema.
        </p>
      </div>
      
      {/* Laércio Quote */}
      <LaercioQuote />
      
      {/* Core Principles */}
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-6">Pilares da Metodologia</h2>
        <CorePrinciplesList />
      </div>
      
      {/* Learning Path Card */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Trilha de Aprendizado: Fundamentos Lafit</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Aprenda passo a passo os fundamentos científicos e práticos da metodologia Lafit
            com esta trilha estruturada criada pelo próprio Laércio Refundini.
          </p>
          <Button asChild>
            <Link to="/knowledge/path/lafit-principles">
              Iniciar Trilha de Aprendizado
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      {/* Scientific Basis FAQ */}
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-6">Base Científica</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>O que diferencia a metodologia Lafit?</AccordionTrigger>
            <AccordionContent>
              A metodologia Lafit diferencia-se pela integração de princípios científicos rigorosos 
              com aplicações práticas testadas. Cada recomendação é baseada em pesquisas atualizadas 
              e na ampla experiência prática com diversos perfis de alunos, resultando em um sistema 
              que prioriza a eficiência, a individualização e os resultados sustentáveis.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Como a periodização é abordada na metodologia Lafit?</AccordionTrigger>
            <AccordionContent>
              A periodização na metodologia Lafit é adaptativa e individualizada, baseando-se na resposta 
              específica de cada pessoa aos estímulos de treino. Em vez de seguir modelos rígidos pré-definidos, 
              o sistema utiliza dados de desempenho, recuperação e progresso para ajustar dinamicamente 
              variáveis como volume, intensidade e frequência, otimizando os resultados ao longo do tempo.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Quais princípios nutritivos fundamentam o sistema?</AccordionTrigger>
            <AccordionContent>
              Os princípios nutritivos da metodologia Lafit enfatizam a personalização baseada em dados, 
              equilíbrio de macronutrientes alinhados com objetivos específicos, timing nutricional 
              estratégico e sustentabilidade a longo prazo. A abordagem rejeita dietas extremas ou 
              restritivas, focando em estratégias que possam ser mantidas consistentemente enquanto 
              suportam os objetivos de desenvolvimento físico.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Como a recuperação é integrada na metodologia?</AccordionTrigger>
            <AccordionContent>
              A recuperação é tratada como um componente fundamental e não secundário na metodologia Lafit. 
              O sistema monitora múltiplos marcadores de recuperação (sono, HRV, percepção de fadiga, etc.) 
              para otimizar o equilíbrio entre estresse e adaptação. As recomendações de treino são 
              dinamicamente ajustadas baseadas no estado de recuperação atual, garantindo que o estímulo 
              de treino seja apropriado para maximizar adaptações positivas.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Case Studies Section */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Estudos de Caso</h2>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <span>Ver todos</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CaseStudyCard 
            title="Máximo resultado com treino 3x por semana"
            category="Hipertrofia"
            image="/placeholder.svg"
            clientName="Carlos M."
            results="12kg de massa muscular em 8 meses"
          />
          <CaseStudyCard 
            title="Superação de platô após 5 anos de treino"
            category="Força e Hipertrofia"
            image="/placeholder.svg"
            clientName="Mariana S."
            results="Aumento de 30% em força e desenvolvimento muscular significativo"
          />
        </div>
      </div>
    </div>
  );
};

export default LafitPrinciplesTab;
