
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { correlationAnalyses } from "@/data/dataAnalysis";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CorrelationsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Análise de Correlações</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Análise
        </Button>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Correlações Detectadas</CardTitle>
          <CardDescription>
            Relações significativas entre diferentes variáveis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variável X</TableHead>
                <TableHead>Variável Y</TableHead>
                <TableHead>Coeficiente</TableHead>
                <TableHead>Significância</TableHead>
                <TableHead>Interpretação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {correlationAnalyses.map((analysis) => (
                <TableRow key={analysis.id}>
                  <TableCell>{analysis.variables.x.label}</TableCell>
                  <TableCell>{analysis.variables.y.label}</TableCell>
                  <TableCell className={analysis.correlationCoefficient > 0 ? "text-green-600" : "text-red-600"}>
                    {analysis.correlationCoefficient.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {analysis.isSignificant ? 
                      <span className="text-green-600">Significativa (p={analysis.pValue})</span> : 
                      <span className="text-amber-600">Não significativa (p={analysis.pValue})</span>
                    }
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {analysis.interpretation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Explorador de Correlações</CardTitle>
          <CardDescription>
            Explore relações entre quaisquer variáveis rastreadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-10">
            <div className="text-center space-y-4">
              <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium">Descubra padrões nos seus dados</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Use o explorador de correlações para analisar como diferentes variáveis se relacionam entre si,
                detectando padrões que podem ajudar a otimizar seus resultados.
              </p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Iniciar Exploração
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorrelationsTab;
