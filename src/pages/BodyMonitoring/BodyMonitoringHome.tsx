
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Plus,
  Weight,
  Ruler,
  Activity,
  BarChart3,
  Goal,
  ChevronRight,
  Calendar,
  TrendingDown,
  TrendingUp
} from "lucide-react";

import { bodyMeasurements, bodyGoals, progressPhotos } from "@/data/bodyMonitoringData";

const BodyMonitoringHome: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Get the most recent measurement
  const latestMeasurement = bodyMeasurements[0];
  
  // Get the previous measurement for comparison
  const previousMeasurement = bodyMeasurements[1];
  
  // Calculate percentage changes for key metrics
  const weightChange = previousMeasurement && latestMeasurement ? 
    ((latestMeasurement.weight - previousMeasurement.weight) / previousMeasurement.weight) * 100 : 0;
    
  const bodyFatChange = previousMeasurement && latestMeasurement && previousMeasurement.bodyFat && latestMeasurement.bodyFat ? 
    ((latestMeasurement.bodyFat - previousMeasurement.bodyFat) / previousMeasurement.bodyFat) * 100 : 0;
  
  // Format measurement date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Prepare data for the weight chart
  const weightChartData = bodyMeasurements
    .slice(0, 10) // Get the 10 most recent measurements
    .reverse() // Reverse to show chronologically
    .map(measurement => ({
      date: new Date(measurement.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }),
      weight: measurement.weight,
      bodyFat: measurement.bodyFat || null
    }));
    
  // Prepare data for the measurements chart
  const measurementsChartData = bodyMeasurements
    .slice(0, 7) // Get the 7 most recent measurements
    .reverse() // Reverse to show chronologically
    .map(measurement => {
      const measurements: Record<string, any> = {
        date: new Date(measurement.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
      };
      
      // Add measurements that exist
      if (measurement.measurements) {
        Object.entries(measurement.measurements).forEach(([key, value]) => {
          measurements[key] = value;
        });
      }
      
      return measurements;
    });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Monitoramento Corporal</h1>
        <p className="text-muted-foreground">
          Acompanhe suas medidas, composição corporal e progresso visual.
        </p>
      </div>
      
      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Visão Geral
          </TabsTrigger>
          <TabsTrigger value="measurements" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" /> Medidas
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <Camera className="h-4 w-4" /> Fotos
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Goal className="h-4 w-4" /> Metas
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Weight Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Peso</CardTitle>
                <CardDescription>
                  Última medição: {latestMeasurement ? formatDate(latestMeasurement.date) : 'N/A'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <div className="text-2xl font-bold">
                      {latestMeasurement ? `${latestMeasurement.weight.toFixed(1)} kg` : 'N/A'}
                    </div>
                    {previousMeasurement && (
                      <div className="flex items-center text-xs mt-1">
                        {weightChange < 0 ? (
                          <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                        ) : weightChange > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
                        ) : null}
                        <span className={weightChange < 0 ? "text-green-500" : weightChange > 0 ? "text-red-500" : ""}>
                          {weightChange !== 0 ? `${Math.abs(weightChange).toFixed(1)}%` : "Sem alteração"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Weight className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Body Fat Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">% de Gordura</CardTitle>
                <CardDescription>
                  Última medição: {latestMeasurement && latestMeasurement.bodyFat ? formatDate(latestMeasurement.date) : 'N/A'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <div className="text-2xl font-bold">
                      {latestMeasurement && latestMeasurement.bodyFat ? `${latestMeasurement.bodyFat.toFixed(1)}%` : 'N/A'}
                    </div>
                    {previousMeasurement && previousMeasurement.bodyFat && latestMeasurement && latestMeasurement.bodyFat && (
                      <div className="flex items-center text-xs mt-1">
                        {bodyFatChange < 0 ? (
                          <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                        ) : bodyFatChange > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
                        ) : null}
                        <span className={bodyFatChange < 0 ? "text-green-500" : bodyFatChange > 0 ? "text-red-500" : ""}>
                          {bodyFatChange !== 0 ? `${Math.abs(bodyFatChange).toFixed(1)}%` : "Sem alteração"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Measurements Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Medidas</CardTitle>
                <CardDescription>
                  Circunferências corporais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  {latestMeasurement && latestMeasurement.measurements && Object.entries(latestMeasurement.measurements).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">{value} cm</span>
                    </div>
                  ))}
                  {(!latestMeasurement || !latestMeasurement.measurements || Object.keys(latestMeasurement.measurements).length === 0) && (
                    <div className="text-center text-muted-foreground">
                      Nenhuma medida registrada
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2 text-primary">
                  <Ruler className="h-4 w-4 mr-2" />
                  Ver todas as medidas
                </Button>
              </CardContent>
            </Card>
            
            {/* Goals Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Metas Ativas</CardTitle>
                <CardDescription>
                  {bodyGoals.filter(goal => goal.active).length} metas em progresso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {bodyGoals.filter(goal => goal.active).slice(0, 2).map(goal => (
                    <div key={goal.id} className="text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span>{goal.name}</span>
                        <span className="text-xs">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-1" />
                    </div>
                  ))}
                  {bodyGoals.filter(goal => goal.active).length === 0 && (
                    <div className="text-center text-muted-foreground">
                      Nenhuma meta ativa
                    </div>
                  )}
                </div>
                <Button asChild variant="ghost" size="sm" className="w-full mt-2 text-primary">
                  <Link to="/body-monitoring/goals">
                    <Goal className="h-4 w-4 mr-2" />
                    Ver todas as metas
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Weight Chart Card */}
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Evolução do Peso</CardTitle>
                <CardDescription>
                  Últimas 10 medições
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weightChartData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="weight"
                        stroke="#8884d8"
                        name="Peso (kg)"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      {bodyMeasurements.some(m => m.bodyFat !== undefined) && (
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="bodyFat"
                          stroke="#82ca9d"
                          name="% Gordura"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/body-monitoring/measurements/add">
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Medição
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Photos Card */}
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Fotos de Progresso</CardTitle>
                <CardDescription>
                  Fotos de progresso recentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progressPhotos.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {progressPhotos.slice(0, 6).map((photo) => (
                      <div 
                        key={photo.id} 
                        className="aspect-square rounded-md bg-muted overflow-hidden relative"
                      >
                        <img 
                          src={photo.imageUrl} 
                          alt={`Progress photo ${photo.poseType}`} 
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                          <p className="text-xs text-white truncate">
                            {new Date(photo.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <Camera className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma foto de progresso registrada</p>
                  </div>
                )}
                <div className="flex justify-center mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/body-monitoring/photos/add">
                      <Camera className="h-4 w-4 mr-2" />
                      Nova Foto
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <Link to="/body-monitoring/measurements/add">
                      <Weight className="h-8 w-8 mb-2" />
                      <span className="font-medium">Registrar Medição</span>
                      <span className="text-xs text-muted-foreground mt-1">Peso, % de gordura e medidas</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <Link to="/body-monitoring/photos/add">
                      <Camera className="h-8 w-8 mb-2" />
                      <span className="font-medium">Adicionar Foto</span>
                      <span className="text-xs text-muted-foreground mt-1">Registrar foto de progresso</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <Link to="/body-monitoring/goals/add">
                      <Goal className="h-8 w-8 mb-2" />
                      <span className="font-medium">Definir Meta</span>
                      <span className="text-xs text-muted-foreground mt-1">Criar uma nova meta corporal</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Measurements Tab */}
        <TabsContent value="measurements" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Medidas Corporais</h2>
            <Button asChild>
              <Link to="/body-monitoring/measurements/add">
                <Plus className="h-4 w-4 mr-2" />
                Nova Medição
              </Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Medições</CardTitle>
              <CardDescription>
                Registro completo de suas medidas corporais
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bodyMeasurements.length > 0 ? (
                <div className="space-y-4">
                  {bodyMeasurements.slice(0, 5).map((measurement, index) => (
                    <Card key={measurement.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/40 py-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-sm">{formatDate(measurement.date)}</h4>
                            {index === 0 && <Badge className="mt-1">Mais recente</Badge>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Peso</p>
                            <p className="font-medium">{measurement.weight} kg</p>
                          </div>
                          {measurement.bodyFat && (
                            <div>
                              <p className="text-sm text-muted-foreground">% de Gordura</p>
                              <p className="font-medium">{measurement.bodyFat}%</p>
                            </div>
                          )}
                          {measurement.measurements && Object.entries(measurement.measurements).map(([key, value]) => (
                            <div key={key}>
                              <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <p className="font-medium">{value} cm</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {bodyMeasurements.length > 5 && (
                    <div className="flex justify-center mt-4">
                      <Button variant="outline">Ver Todas as Medições</Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Weight className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma medição registrada</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeira Medição
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Medidas</CardTitle>
                <CardDescription>
                  Visualize a evolução de suas medidas corporais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={measurementsChartData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {bodyMeasurements.length > 0 && bodyMeasurements[0].measurements && Object.keys(bodyMeasurements[0].measurements).slice(0, 4).map((key, index) => {
                        const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];
                        return (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={colors[index % colors.length]}
                            name={key.replace(/([A-Z])/g, ' $1').trim()}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Análise Avançada
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas e Análises</CardTitle>
                <CardDescription>
                  Informações detalhadas sobre sua composição corporal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {latestMeasurement && (
                  <>
                    <div>
                      <h3 className="font-medium mb-2">Estatísticas Atuais</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">IMC</p>
                          <p className="font-medium">
                            {latestMeasurement.height ? 
                              (latestMeasurement.weight / Math.pow(latestMeasurement.height / 100, 2)).toFixed(1) : 
                              'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Relação Cintura/Quadril</p>
                          <p className="font-medium">
                            {latestMeasurement.measurements && 
                              latestMeasurement.measurements.waist && 
                              latestMeasurement.measurements.hips ?
                              (latestMeasurement.measurements.waist / latestMeasurement.measurements.hips).toFixed(2) :
                              'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Massa Magra Estimada</p>
                          <p className="font-medium">
                            {latestMeasurement.bodyFat ? 
                              (latestMeasurement.weight * (1 - latestMeasurement.bodyFat / 100)).toFixed(1) + ' kg' : 
                              'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Massa Gorda Estimada</p>
                          <p className="font-medium">
                            {latestMeasurement.bodyFat ? 
                              (latestMeasurement.weight * (latestMeasurement.bodyFat / 100)).toFixed(1) + ' kg' : 
                              'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Análise de Simetria</h3>
                      <div className="space-y-2">
                        {latestMeasurement.measurements && 
                          latestMeasurement.measurements.rightBicep && 
                          latestMeasurement.measurements.leftBicep && (
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-sm text-muted-foreground">Braços (E/D):</p>
                              <p className="font-medium text-sm">
                                {(latestMeasurement.measurements.leftBicep / latestMeasurement.measurements.rightBicep * 100).toFixed(1)}%
                              </p>
                            </div>
                            <Progress 
                              value={latestMeasurement.measurements.leftBicep / latestMeasurement.measurements.rightBicep * 100}
                              className="h-1"
                            />
                          </div>
                        )}
                        
                        {latestMeasurement.measurements && 
                          latestMeasurement.measurements.rightThigh && 
                          latestMeasurement.measurements.leftThigh && (
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-sm text-muted-foreground">Coxas (E/D):</p>
                              <p className="font-medium text-sm">
                                {(latestMeasurement.measurements.leftThigh / latestMeasurement.measurements.rightThigh * 100).toFixed(1)}%
                              </p>
                            </div>
                            <Progress 
                              value={latestMeasurement.measurements.leftThigh / latestMeasurement.measurements.rightThigh * 100}
                              className="h-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                
                {!latestMeasurement && (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>Nenhuma medição disponível para análise</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Análise Completa
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Photos Tab */}
        <TabsContent value="photos" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Fotos de Progresso</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Foto
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Galeria de Fotos</CardTitle>
              <CardDescription>
                Organize suas fotos de progresso
              </CardDescription>
            </CardHeader>
            <CardContent>
              {progressPhotos.length > 0 ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Filtrar por:</h3>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="cursor-pointer">Todos</Badge>
                      <Badge variant="secondary" className="cursor-pointer">Frente</Badge>
                      <Badge variant="outline" className="cursor-pointer">Costas</Badge>
                      <Badge variant="outline" className="cursor-pointer">Lateral</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {progressPhotos.map((photo) => (
                      <div 
                        key={photo.id} 
                        className="aspect-[3/4] rounded-md bg-muted overflow-hidden relative group"
                      >
                        <img 
                          src={photo.imageUrl} 
                          alt={`Progress photo ${photo.poseType}`} 
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button variant="secondary" size="sm">
                            Ver
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2">
                          <p className="text-white text-sm font-medium">
                            {new Date(photo.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                          <p className="text-xs text-white/80 capitalize">
                            {photo.poseType.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Camera className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma foto de progresso registrada</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeira Foto
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {progressPhotos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Comparar Progresso</CardTitle>
                <CardDescription>
                  Compare fotos de diferentes datas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Selecione o tipo de pose:</h3>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="cursor-pointer">Frente Relaxado</Badge>
                      <Badge variant="outline" className="cursor-pointer">Frente Contraído</Badge>
                      <Badge variant="outline" className="cursor-pointer">Costas</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Antes:</h3>
                        <div className="border rounded-md aspect-[3/4] overflow-hidden">
                          {progressPhotos.filter(p => p.poseType === "frontRelaxed")[1] ? (
                            <img 
                              src={progressPhotos.filter(p => p.poseType === "frontRelaxed")[1].imageUrl} 
                              alt="Before" 
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <p className="text-sm text-muted-foreground">Selecione uma foto</p>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-center mt-1 text-muted-foreground">
                          {progressPhotos.filter(p => p.poseType === "frontRelaxed")[1] ? 
                            new Date(progressPhotos.filter(p => p.poseType === "frontRelaxed")[1].date).toLocaleDateString() : 
                            'Data não selecionada'}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Depois:</h3>
                        <div className="border rounded-md aspect-[3/4] overflow-hidden">
                          {progressPhotos.filter(p => p.poseType === "frontRelaxed")[0] ? (
                            <img 
                              src={progressPhotos.filter(p => p.poseType === "frontRelaxed")[0].imageUrl} 
                              alt="After" 
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <p className="text-sm text-muted-foreground">Selecione uma foto</p>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-center mt-1 text-muted-foreground">
                          {progressPhotos.filter(p => p.poseType === "frontRelaxed")[0] ? 
                            new Date(progressPhotos.filter(p => p.poseType === "frontRelaxed")[0].date).toLocaleDateString() : 
                            'Data não selecionada'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-3">Linha do Tempo</h3>
                    <div className="space-y-3">
                      {progressPhotos
                        .filter(p => p.poseType === "frontRelaxed")
                        .slice(0, 5)
                        .map((photo) => (
                          <div key={photo.id} className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={photo.imageUrl} 
                                alt={`Timeline ${photo.poseType}`} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">
                                {new Date(photo.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {photo.notes || 'Sem notas'}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" className="flex-shrink-0">
                              Selecionar
                            </Button>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Metas Corporais</h2>
            <Button asChild>
              <Link to="/body-monitoring/goals/add">
                <Plus className="h-4 w-4 mr-2" />
                Nova Meta
              </Link>
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bodyGoals.filter(goal => goal.active).map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{goal.name}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <Badge>{goal.type !== "custom" ? goal.type : "Personalizado"}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{goal.progress}% Completa</span>
                      <span className="text-xs text-muted-foreground">
                        Meta: {new Date(goal.targetDate).toLocaleDateString('pt-BR', {day: 'numeric', month: 'short', year: 'numeric'})}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Valor Inicial:</span>
                      <span className="font-medium">{goal.startValue}{goal.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valor Atual:</span>
                      <span className="font-medium">{goal.currentValue}{goal.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meta Final:</span>
                      <span className="font-medium">{goal.targetValue}{goal.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Progresso:</span>
                      <span className="font-medium">
                        {Math.abs(goal.currentValue - goal.startValue)}{goal.unit} de {Math.abs(goal.targetValue - goal.startValue)}{goal.unit}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Atualizar Progresso</Button>
                </CardFooter>
              </Card>
            ))}
            
            {bodyGoals.filter(goal => !goal.active).length > 0 && (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Metas Completadas</CardTitle>
                  <CardDescription>
                    Metas que você já alcançou
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {bodyGoals.filter(goal => !goal.active).map((goal) => (
                      <div key={goal.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{goal.name}</h3>
                            <p className="text-xs text-muted-foreground">{goal.description}</p>
                          </div>
                          <Badge variant="secondary">Completada</Badge>
                        </div>
                        <div className="mt-3 text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Meta:</span>
                            <span className="font-medium">{goal.targetValue}{goal.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Alcançada em:</span>
                            <span className="font-medium">
                              {new Date(goal.completedDate || new Date()).toLocaleDateString('pt-BR', {day: 'numeric', month: 'short', year: 'numeric'})}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {bodyGoals.length === 0 && (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                <Goal className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>Nenhuma meta definida</p>
                <Button asChild className="mt-4">
                  <Link to="/body-monitoring/goals/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Definir Primeira Meta
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BodyMonitoringHome;
