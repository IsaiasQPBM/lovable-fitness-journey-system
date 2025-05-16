
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Calendar,
  LineChart,
  RulerSquare,
  Weight,
  ArrowDown,
  ArrowUp,
  Camera,
  Target,
  User,
  Plus,
  ChevronRight,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { bodyMeasurementHistory, bodyGoals, progressReports, photoRecords } from "@/data/bodyMonitoringData";

const BodyMonitoringHome: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  
  // Obter o registro mais recente
  const latestRecord = bodyMeasurementHistory[0];
  const previousRecord = bodyMeasurementHistory[1];
  
  // Calcular diferenças
  const weightDiff = latestRecord?.weight && previousRecord?.weight 
    ? latestRecord.weight - previousRecord.weight 
    : 0;
  
  const bodyFatDiff = latestRecord?.bodyFat && previousRecord?.bodyFat 
    ? latestRecord.bodyFat - previousRecord.bodyFat 
    : 0;
  
  const waistDiff = latestRecord?.measurements?.waist && previousRecord?.measurements?.waist
    ? latestRecord.measurements.waist - previousRecord.measurements.waist
    : 0;
  
  // Calcular média semanal de peso (últimos 7 dias)
  const recentWeights = bodyMeasurementHistory
    .filter(record => {
      const recordDate = new Date(record.date);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return recordDate >= oneWeekAgo;
    })
    .map(record => record.weight)
    .filter(weight => weight !== undefined) as number[];
  
  const weeklyWeightAverage = recentWeights.length > 0 
    ? recentWeights.reduce((sum, weight) => sum + weight, 0) / recentWeights.length 
    : 0;

  // Formatar a data do último registro
  const lastMeasurementDate = new Date(latestRecord?.date);
  const today = new Date();
  const isToday = 
    lastMeasurementDate.getDate() === today.getDate() && 
    lastMeasurementDate.getMonth() === today.getMonth() && 
    lastMeasurementDate.getFullYear() === today.getFullYear();
  
  const formattedDate = isToday 
    ? "Hoje" 
    : lastMeasurementDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Monitoramento Corporal</h1>
        <p className="text-muted-foreground">
          Acompanhe suas medidas, composição corporal e progresso ao longo do tempo.
        </p>
      </div>
      
      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Visão Geral
          </TabsTrigger>
          <TabsTrigger value="measurements" className="flex items-center gap-2">
            <RulerSquare className="h-4 w-4" /> Medidas
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <Camera className="h-4 w-4" /> Fotos
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" /> Metas
          </TabsTrigger>
        </TabsList>
        
        {/* Visão Geral Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-primary" />
                    Peso
                  </span>
                  <span className="text-sm flex items-center">
                    {weightDiff < 0 ? (
                      <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
                    ) : weightDiff > 0 ? (
                      <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                    ) : null}
                    {Math.abs(weightDiff).toFixed(1)} kg
                  </span>
                </CardTitle>
                <CardDescription>{formattedDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {latestRecord?.weight?.toFixed(1)} kg
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Média semanal: {weeklyWeightAverage.toFixed(1)} kg
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Gordura Corporal
                  </span>
                  <span className="text-sm flex items-center">
                    {bodyFatDiff < 0 ? (
                      <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
                    ) : bodyFatDiff > 0 ? (
                      <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                    ) : null}
                    {Math.abs(bodyFatDiff).toFixed(1)}%
                  </span>
                </CardTitle>
                <CardDescription>{formattedDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {latestRecord?.bodyFat?.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Método: {latestRecord?.bodyFatMethod === "skinfold" ? "Dobras Cutâneas" : latestRecord?.bodyFatMethod}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <RulerSquare className="h-4 w-4 text-primary" />
                    Cintura
                  </span>
                  <span className="text-sm flex items-center">
                    {waistDiff < 0 ? (
                      <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
                    ) : waistDiff > 0 ? (
                      <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                    ) : null}
                    {Math.abs(waistDiff).toFixed(1)} cm
                  </span>
                </CardTitle>
                <CardDescription>{formattedDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {latestRecord?.measurements?.waist?.toFixed(1)} cm
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ombro/Cintura: {(latestRecord?.measurements?.shoulders && latestRecord?.measurements?.waist) 
                    ? (latestRecord.measurements.shoulders / latestRecord.measurements.waist).toFixed(2) 
                    : "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Metas em Andamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Metas em Andamento
                </CardTitle>
                <CardDescription>
                  Seu progresso atual em direção às metas estabelecidas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bodyGoals.filter(goal => goal.status === "active").map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{goal.title}</h4>
                      <Badge variant={goal.progress > 50 ? "default" : "outline"}>
                        {goal.progress.toFixed(1)}%
                      </Badge>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{goal.startValue} {goal.unit}</span>
                      <span>
                        {goal.type === "weightLoss" || goal.type === "bodyFat" 
                          ? "Meta: " + goal.targetValue
                          : "Meta: " + goal.targetValue}
                        {" " + goal.unit}
                      </span>
                    </div>
                  </div>
                ))}
                
                <Button asChild variant="outline" className="w-full mt-2">
                  <Link to="/body-monitoring/goals">
                    Ver Todas as Metas
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Relatórios Recentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Relatórios Recentes
                </CardTitle>
                <CardDescription>
                  Análise do seu progresso recente
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progressReports.length > 0 ? (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{progressReports[0].title}</h4>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Peso</p>
                          <p className="text-sm font-medium flex items-center">
                            {progressReports[0].metrics.weightChange! < 0 ? (
                              <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                              <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            {Math.abs(progressReports[0].metrics.weightChange!).toFixed(1)} kg
                          </p>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Gordura</p>
                          <p className="text-sm font-medium flex items-center">
                            {progressReports[0].metrics.bodyFatChange! < 0 ? (
                              <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                              <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            {Math.abs(progressReports[0].metrics.bodyFatChange!).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs font-medium mb-1">Eficiência:</p>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={progressReports[0].analysis.efficiency} 
                            className="h-2 flex-grow" 
                          />
                          <span className="text-xs font-medium">
                            {progressReports[0].analysis.efficiency}%
                          </span>
                        </div>
                      </div>
                      
                      {progressReports[0].analysis.suggestions && (
                        <div>
                          <p className="text-xs font-medium mb-1">Principais sugestões:</p>
                          <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                            {progressReports[0].analysis.suggestions.slice(0, 2).map((suggestion, idx) => (
                              <li key={idx}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/body-monitoring/reports">
                        Ver Relatório Completo
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <LineChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Nenhum relatório disponível.</p>
                    <Button className="mt-4">
                      Gerar Relatório
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Últimas Fotos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Registro Fotográfico
                </CardTitle>
                <CardDescription>
                  Suas fotos mais recentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {photoRecords.slice(0, 2).map((photo) => (
                    <div key={photo.id} className="overflow-hidden rounded-md">
                      <img 
                        src={photo.imageUrl} 
                        alt={`${photo.pose} pose`} 
                        className="w-full h-48 object-cover hover:scale-105 transition-transform"
                      />
                      <div className="mt-1 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {new Date(photo.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                        </span>
                        <Badge variant="outline">{
                          photo.pose === 'front' ? 'Frontal' :
                          photo.pose === 'back' ? 'Costas' :
                          photo.pose === 'side' ? 'Lateral' :
                          photo.pose
                        }</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between">
                  <Button asChild variant="outline" className="flex-1 mr-2">
                    <Link to="/body-monitoring/photos">
                      Ver Todas
                    </Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link to="/body-monitoring/photos/add">
                      <Plus className="h-4 w-4 mr-1" />
                      Nova Foto
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Próximas Medições */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximas Medições
                </CardTitle>
                <CardDescription>
                  Mantenha-se em dia com suas medições
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Peso</h4>
                        <p className="text-sm text-muted-foreground">Diário</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Hoje</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Medidas Completas</h4>
                        <p className="text-sm text-muted-foreground">Semanal</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Em 3 dias</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Fotos de Progresso</h4>
                        <p className="text-sm text-muted-foreground">Quinzenal</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Em 8 dias</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" className="flex-1 mr-2">
                      Definir Lembretes
                    </Button>
                    <Button asChild className="flex-1">
                      <Link to="/body-monitoring/measurements/add">
                        <Plus className="h-4 w-4 mr-1" />
                        Registrar Agora
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Medidas Tab */}
        <TabsContent value="measurements" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Histórico de Medidas</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Histórico
              </Button>
              <Button asChild className="gap-2">
                <Link to="/body-monitoring/measurements/add">
                  <Plus className="h-4 w-4" />
                  Nova Medição
                </Link>
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Registros Recentes</CardTitle>
              <CardDescription>
                Suas medições mais recentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {bodyMeasurementHistory.slice(0, 3).map((record, index) => (
                <div key={record.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">
                      {new Date(record.date).toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long'
                      })}
                    </h3>
                    <Button variant="ghost" size="sm">
                      Detalhes
                    </Button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    {record.weight !== undefined && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Peso</span>
                          <span className="text-sm font-medium">
                            {record.weight.toFixed(1)} kg
                            {index > 0 && bodyMeasurementHistory[index - 1].weight && (
                              <span className={`ml-1 text-xs ${
                                record.weight < bodyMeasurementHistory[index - 1].weight!
                                  ? 'text-green-500'
                                  : record.weight > bodyMeasurementHistory[index - 1].weight!
                                    ? 'text-red-500'
                                    : ''
                              }`}>
                                {record.weight < bodyMeasurementHistory[index - 1].weight!
                                  ? `(-${(bodyMeasurementHistory[index - 1].weight! - record.weight).toFixed(1)})`
                                  : record.weight > bodyMeasurementHistory[index - 1].weight!
                                    ? `(+${(record.weight - bodyMeasurementHistory[index - 1].weight!).toFixed(1)})`
                                    : ''}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {record.bodyFat !== undefined && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Gordura Corporal</span>
                          <span className="text-sm font-medium">
                            {record.bodyFat.toFixed(1)}%
                            {index > 0 && bodyMeasurementHistory[index - 1].bodyFat && (
                              <span className={`ml-1 text-xs ${
                                record.bodyFat < bodyMeasurementHistory[index - 1].bodyFat!
                                  ? 'text-green-500'
                                  : record.bodyFat > bodyMeasurementHistory[index - 1].bodyFat!
                                    ? 'text-red-500'
                                    : ''
                              }`}>
                                {record.bodyFat < bodyMeasurementHistory[index - 1].bodyFat!
                                  ? `(-${(bodyMeasurementHistory[index - 1].bodyFat! - record.bodyFat).toFixed(1)})`
                                  : record.bodyFat > bodyMeasurementHistory[index - 1].bodyFat!
                                    ? `(+${(record.bodyFat - bodyMeasurementHistory[index - 1].bodyFat!).toFixed(1)})`
                                    : ''}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {record.measurements?.waist && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Cintura</span>
                          <span className="text-sm font-medium">
                            {record.measurements.waist.toFixed(1)} cm
                            {index > 0 && bodyMeasurementHistory[index - 1].measurements?.waist && (
                              <span className={`ml-1 text-xs ${
                                record.measurements.waist < bodyMeasurementHistory[index - 1].measurements!.waist!
                                  ? 'text-green-500'
                                  : record.measurements.waist > bodyMeasurementHistory[index - 1].measurements!.waist!
                                    ? 'text-red-500'
                                    : ''
                              }`}>
                                {record.measurements.waist < bodyMeasurementHistory[index - 1].measurements!.waist!
                                  ? `(-${(bodyMeasurementHistory[index - 1].measurements!.waist! - record.measurements.waist).toFixed(1)})`
                                  : record.measurements.waist > bodyMeasurementHistory[index - 1].measurements!.waist!
                                    ? `(+${(record.measurements.waist - bodyMeasurementHistory[index - 1].measurements!.waist!).toFixed(1)})`
                                    : ''}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {Object.keys(record.measurements || {}).length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-2">Outras Medidas</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {record.measurements?.chest && (
                          <div className="bg-muted/50 p-2 rounded text-center">
                            <p className="text-xs text-muted-foreground">Peito</p>
                            <p className="text-sm">{record.measurements.chest.toFixed(1)} cm</p>
                          </div>
                        )}
                        {record.measurements?.leftBicep && (
                          <div className="bg-muted/50 p-2 rounded text-center">
                            <p className="text-xs text-muted-foreground">Bíceps Esq.</p>
                            <p className="text-sm">{record.measurements.leftBicep.toFixed(1)} cm</p>
                          </div>
                        )}
                        {record.measurements?.hips && (
                          <div className="bg-muted/50 p-2 rounded text-center">
                            <p className="text-xs text-muted-foreground">Quadril</p>
                            <p className="text-sm">{record.measurements.hips.toFixed(1)} cm</p>
                          </div>
                        )}
                        {record.measurements?.leftThigh && (
                          <div className="bg-muted/50 p-2 rounded text-center">
                            <p className="text-xs text-muted-foreground">Coxa Esq.</p>
                            <p className="text-sm">{record.measurements.leftThigh.toFixed(1)} cm</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {record.notes && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      <p className="italic">"{record.notes}"</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/body-monitoring/measurements">
                  Ver Todo Histórico
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Tendências</CardTitle>
                <CardDescription>
                  Visualização do seu progresso ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Gráficos interativos aparecerão aqui.
                  </p>
                  <Button className="mt-4">
                    Visualizar Gráficos
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Composição Corporal</CardTitle>
                <CardDescription>
                  Análise detalhada da sua composição corporal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">FFMI</p>
                      <p className="text-lg font-bold">21.3</p>
                      <p className="text-xs text-muted-foreground">
                        Índice de massa livre de gordura
                      </p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">FMI</p>
                      <p className="text-lg font-bold">4.4</p>
                      <p className="text-xs text-muted-foreground">
                        Índice de massa gorda
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Massa Magra</p>
                      <p className="text-lg font-bold">67.5 kg</p>
                      <p className="text-xs text-muted-foreground">
                        Músculos e outros tecidos
                      </p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Massa Gorda</p>
                      <p className="text-lg font-bold">13.8 kg</p>
                      <p className="text-xs text-muted-foreground">
                        Tecido adiposo
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/body-monitoring/composition">
                      Análise Completa
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Fotos Tab */}
        <TabsContent value="photos" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Registro Fotográfico</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Histórico
              </Button>
              <Button asChild className="gap-2">
                <Link to="/body-monitoring/photos/add">
                  <Camera className="h-4 w-4" />
                  Nova Foto
                </Link>
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Fotos Recentes</CardTitle>
              <CardDescription>
                Suas fotos de progresso mais recentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photoRecords.map((photo) => (
                  <div key={photo.id} className="overflow-hidden rounded-md">
                    <img 
                      src={photo.imageUrl} 
                      alt={`${photo.pose} pose`} 
                      className="w-full h-60 object-cover hover:scale-105 transition-transform"
                    />
                    <div className="mt-2 flex justify-between items-center">
                      <Badge variant="outline">
                        {photo.pose === 'front' ? 'Frontal' :
                         photo.pose === 'back' ? 'Costas' :
                         photo.pose === 'side' ? 'Lateral' :
                         photo.pose}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(photo.date).toLocaleDateString('pt-BR', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/body-monitoring/photos/compare">
                  Comparar Fotos
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comparação de Progresso</CardTitle>
              <CardDescription>
                Compare fotos lado a lado para visualizar seu progresso
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Selecione fotos para comparar e analisar seu progresso.
                </p>
                <Button className="mt-4">
                  Iniciar Comparação
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Metas Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Metas Corporais</h2>
            <Button asChild className="gap-2">
              <Link to="/body-monitoring/goals/add">
                <Plus className="h-4 w-4" />
                Nova Meta
              </Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Metas Ativas</CardTitle>
              <CardDescription>
                Suas metas corporais em andamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {bodyGoals.filter(goal => goal.status === "active").map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {goal.description || `Meta de ${
                          goal.type === 'weightLoss' ? 'perda de peso' :
                          goal.type === 'muscleGain' ? 'ganho muscular' :
                          goal.type === 'recomposition' ? 'recomposição' :
                          goal.type === 'maintenance' ? 'manutenção' :
                          goal.type === 'proportionImprovement' ? 'melhoria de proporções' :
                          'simetria'
                        }`}
                      </p>
                    </div>
                    <Badge>
                      {new Date(goal.targetDate).toLocaleDateString('pt-BR', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Progresso</span>
                      <span className="text-sm font-medium">{goal.progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {goal.startValue} {goal.unit}
                      </span>
                      <span>
                        Meta: {goal.targetValue} {goal.unit}
                      </span>
                    </div>
                  </div>
                  
                  {goal.checkpoints && goal.checkpoints.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Próximo Checkpoint</h4>
                      <div className="bg-muted p-2 rounded">
                        <div className="flex justify-between text-sm">
                          <span>
                            {new Date(goal.checkpoints[0].date).toLocaleDateString('pt-BR', { 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                          </span>
                          <span>
                            Meta: {goal.checkpoints[0].expectedValue} {goal.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-end">
                    <Button asChild variant="ghost" size="sm" className="gap-1">
                      <Link to={`/body-monitoring/goals/${goal.id}`}>
                        Detalhes
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recomendações</CardTitle>
              <CardDescription>
                Sugestões para otimizar seus resultados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Taxa de Perda de Peso Ideal</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Recomendado:</span>
                    <Badge variant="outline">0.5 kg/semana</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Com base no seu atual percentual de gordura de 17%, esta taxa oferece o equilíbrio ideal entre perda de gordura e preservação muscular.
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Déficit Calórico Ideal</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Recomendado:</span>
                    <Badge variant="outline">400-500 kcal/dia</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Este déficit moderado permite perda de gordura consistente enquanto minimiza a perda muscular.
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Potencial de Desenvolvimento</h4>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Ombros</p>
                      <Badge className="w-full" variant="default">Alto</Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Costas</p>
                      <Badge className="w-full" variant="default">Alto</Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Pernas</p>
                      <Badge className="w-full" variant="outline">Médio</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Baseado na sua estrutura óssea e padrões de resposta anteriores.
                  </p>
                </div>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/body-monitoring/analysis">
                    Análise Completa
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BodyMonitoringHome;
