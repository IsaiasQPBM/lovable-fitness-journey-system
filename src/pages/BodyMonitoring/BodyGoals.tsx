
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Target,
  Plus,
  Calendar,
  ArrowRight,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  X,
  BarChart,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { bodyGoals } from "@/data/bodyMonitoringData";
import { BodyGoal } from "@/types/bodyMonitoring";

const BodyGoals: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<string>("active");
  const [openGoalDialog, setOpenGoalDialog] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<BodyGoal | null>(null);
  
  // Filtrar metas por status
  const activeGoals = bodyGoals.filter(goal => goal.status === "active");
  const achievedGoals = bodyGoals.filter(goal => goal.status === "achieved");
  const abandonedGoals = bodyGoals.filter(goal => goal.status === "failed" || goal.status === "abandoned");
  
  // Definir tipo de meta para exibição em texto
  const getGoalTypeLabel = (type: string): string => {
    switch (type) {
      case 'weightLoss': return 'Perda de Peso';
      case 'muscleGain': return 'Ganho de Massa';
      case 'recomposition': return 'Recomposição';
      case 'maintenance': return 'Manutenção';
      case 'proportionImprovement': return 'Melhoria de Proporções';
      case 'symmetryImprovement': return 'Melhoria de Simetria';
      default: return 'Personalizada';
    }
  };
  
  // Formatar datas
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Calcular dias restantes para a meta
  const getDaysRemaining = (targetDate: Date): number => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Verificar se a meta está atrasada
  const isGoalBehindSchedule = (goal: BodyGoal): boolean => {
    const latestCheckpoint = goal.checkpoints.find(cp => cp.actualValue !== null);
    if (!latestCheckpoint) return false;
    return latestCheckpoint.actualValue! < latestCheckpoint.expectedValue;
  };
  
  // Abrir detalhes da meta
  const openGoalDetails = (goal: BodyGoal) => {
    setSelectedGoal(goal);
    setOpenGoalDialog(true);
  };
  
  // Marcar meta como concluída
  const markGoalAchieved = (goalId: string) => {
    // Em uma aplicação real, isso atualizaria o estado no backend
    toast({
      title: "Meta concluída!",
      description: "Parabéns! Sua meta foi marcada como concluída.",
      duration: 3000,
    });
    setOpenGoalDialog(false);
  };
  
  // Abandonar meta
  const abandonGoal = (goalId: string) => {
    // Em uma aplicação real, isso atualizaria o estado no backend
    toast({
      title: "Meta abandonada",
      description: "A meta foi marcada como abandonada.",
      duration: 3000,
    });
    setOpenGoalDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Metas Corporais</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie suas metas de composição corporal e medidas.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/body-monitoring/goals/add">
            <Plus className="h-4 w-4" />
            Nova Meta
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Target className="h-4 w-4" /> 
            Ativas
            <Badge variant="secondary" className="ml-1">{activeGoals.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="achieved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> 
            Concluídas
            <Badge variant="secondary" className="ml-1">{achievedGoals.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="abandoned" className="flex items-center gap-2">
            <X className="h-4 w-4" /> 
            Abandonadas
            <Badge variant="secondary" className="ml-1">{abandonedGoals.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {activeGoals.length > 0 ? (
            activeGoals.map((goal) => {
              const daysRemaining = getDaysRemaining(goal.targetDate);
              const isBehindSchedule = isGoalBehindSchedule(goal);
              
              return (
                <Card key={goal.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{goal.title}</CardTitle>
                        <CardDescription>{goal.description || getGoalTypeLabel(goal.type)}</CardDescription>
                      </div>
                      <Badge className={daysRemaining < 14 ? "bg-orange-500" : ""}>
                        {daysRemaining > 0 
                          ? `${daysRemaining} dias restantes` 
                          : "Prazo vencido"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Progresso:</span>
                          <span>{goal.progress.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isBehindSchedule ? (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                          <span className={`text-sm ${isBehindSchedule ? "text-orange-500" : "text-green-500"}`}>
                            {isBehindSchedule ? "Abaixo da meta" : "No caminho certo"}
                          </span>
                        </div>
                      </div>
                      
                      <Progress value={goal.progress} className="h-2" />
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex flex-col items-start">
                          <span>Inicial: {goal.startValue} {goal.unit}</span>
                          <span className="text-xs">
                            {formatDate(goal.startDate)}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span>Meta: {goal.targetValue} {goal.unit}</span>
                          <span className="text-xs">
                            {formatDate(goal.targetDate)}
                          </span>
                        </div>
                      </div>
                      
                      {goal.checkpoints && goal.checkpoints.length > 0 && (
                        <div className="pt-2 border-t">
                          <h4 className="text-sm font-medium mb-2">Próximo Checkpoint</h4>
                          <div className="bg-muted p-2 rounded flex justify-between items-center">
                            <div className="text-sm">
                              {formatDate(goal.checkpoints[0].date)}
                            </div>
                            <div className="text-sm">
                              Meta: {goal.checkpoints[0].expectedValue} {goal.unit}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/20 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link to={`/body-monitoring/goals/${goal.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openGoalDetails(goal)}
                      className="gap-1"
                    >
                      Detalhes
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhuma meta ativa</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Você não tem metas ativas no momento. Crie uma nova meta para acompanhar seu progresso.
                </p>
                <Button asChild>
                  <Link to="/body-monitoring/goals/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Nova Meta
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="achieved" className="space-y-4">
          {achievedGoals.length > 0 ? (
            achievedGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {goal.title}
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </CardTitle>
                      <CardDescription>{goal.description || getGoalTypeLabel(goal.type)}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      Concluída em {formatDate(goal.updatedAt)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Meta Atingida:</span>
                    <span className="font-medium">{goal.targetValue} {goal.unit}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>Inicial: {goal.startValue} {goal.unit}</span>
                    <span>Duração: {Math.round((new Date(goal.updatedAt).getTime() - new Date(goal.startDate).getTime()) / (1000 * 60 * 60 * 24))} dias</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openGoalDetails(goal)}
                    className="gap-1"
                  >
                    Ver Detalhes
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhuma meta concluída</h3>
                <p className="text-muted-foreground mt-1">
                  Continue trabalhando em suas metas ativas para vê-las aqui quando forem concluídas.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="abandoned" className="space-y-4">
          {abandonedGoals.length > 0 ? (
            abandonedGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {goal.title}
                        <X className="h-5 w-5 text-red-500" />
                      </CardTitle>
                      <CardDescription>{goal.description || getGoalTypeLabel(goal.type)}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      Abandonada em {formatDate(goal.updatedAt)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Progresso Alcançado:</span>
                    <span className="font-medium">{goal.progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Esta meta foi abandonada antes de ser concluída.</p>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openGoalDetails(goal)}
                    className="gap-1"
                  >
                    Ver Detalhes
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <X className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhuma meta abandonada</h3>
                <p className="text-muted-foreground mt-1">
                  Todas as suas metas estão ativas ou foram concluídas com sucesso.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Dialog para detalhes da meta */}
      {selectedGoal && (
        <Dialog open={openGoalDialog} onOpenChange={setOpenGoalDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {selectedGoal.title}
              </DialogTitle>
              <DialogDescription>
                {selectedGoal.description || getGoalTypeLabel(selectedGoal.type)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Tipo de Meta</p>
                  <p className="font-medium">{getGoalTypeLabel(selectedGoal.type)}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Data de Início</p>
                  <p className="font-medium">{formatDate(selectedGoal.startDate)}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Data Alvo</p>
                  <p className="font-medium">{formatDate(selectedGoal.targetDate)}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Progresso</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Progresso atual:</span>
                    <span className="font-medium">{selectedGoal.progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={selectedGoal.progress} className="h-2" />
                  
                  <div className="grid gap-4 md:grid-cols-3 mt-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Valor Inicial</p>
                      <p className="font-medium">{selectedGoal.startValue} {selectedGoal.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valor Atual</p>
                      <p className="font-medium">
                        {/* Valor atual calculado com base no progresso */}
                        {((selectedGoal.targetValue - selectedGoal.startValue) * (selectedGoal.progress / 100) + selectedGoal.startValue).toFixed(1)} {selectedGoal.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valor Alvo</p>
                      <p className="font-medium">{selectedGoal.targetValue} {selectedGoal.unit}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedGoal.checkpoints && selectedGoal.checkpoints.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Checkpoints</h3>
                  <div className="space-y-3">
                    {selectedGoal.checkpoints.map((checkpoint, idx) => (
                      <div key={idx} className="bg-muted/50 p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{formatDate(checkpoint.date)}</p>
                          {checkpoint.actualValue !== null ? (
                            <Badge variant={checkpoint.actualValue >= checkpoint.expectedValue ? "default" : "outline"}>
                              {checkpoint.actualValue >= checkpoint.expectedValue ? "Atingido" : "Não Atingido"}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Pendente</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Meta</p>
                            <p className="text-sm">{checkpoint.expectedValue} {selectedGoal.unit}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Real</p>
                            <p className="text-sm">
                              {checkpoint.actualValue !== null 
                                ? `${checkpoint.actualValue} ${selectedGoal.unit}`
                                : "Não registrado"}
                            </p>
                          </div>
                        </div>
                        {checkpoint.notes && (
                          <p className="text-xs text-muted-foreground mt-2">{checkpoint.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedGoal.notes && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Notas</h3>
                  <p className="text-sm">{selectedGoal.notes}</p>
                </div>
              )}
              
              {selectedGoal.status === "active" && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Registrar Progresso</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-value">Valor Atual</Label>
                        <Input id="current-value" type="number" step="0.1" placeholder="0.0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="measurement-date">Data da Medição</Label>
                        <Input id="measurement-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="progress-notes">Observações</Label>
                      <Textarea id="progress-notes" placeholder="Adicione notas sobre seu progresso..." />
                    </div>
                    <Button className="w-full">
                      Registrar Progresso
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex justify-between">
              {selectedGoal.status === "active" ? (
                <>
                  <Button variant="destructive" onClick={() => abandonGoal(selectedGoal.id)}>
                    Abandonar Meta
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setOpenGoalDialog(false)}>
                      Fechar
                    </Button>
                    <Button onClick={() => markGoalAchieved(selectedGoal.id)}>
                      Marcar como Concluída
                    </Button>
                  </div>
                </>
              ) : (
                <Button variant="outline" onClick={() => setOpenGoalDialog(false)} className="ml-auto">
                  Fechar
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Análise de Metas
          </CardTitle>
          <CardDescription>
            Visão geral do seu progresso e recomendações para otimização
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Metas Ativas</h3>
                <div className="text-3xl font-bold">{activeGoals.length}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeGoals.filter(g => isGoalBehindSchedule(g)).length} meta(s) abaixo do progresso esperado
                </p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Taxa de Sucesso</h3>
                <div className="text-3xl font-bold">
                  {achievedGoals.length > 0
                    ? `${Math.round((achievedGoals.length / (achievedGoals.length + abandonedGoals.length)) * 100)}%`
                    : "N/A"}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {achievedGoals.length} meta(s) concluída(s) com sucesso
                </p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Tempo Médio</h3>
                <div className="text-3xl font-bold">
                  {achievedGoals.length > 0
                    ? `${Math.round(achievedGoals.reduce((sum, goal) => 
                        sum + (new Date(goal.updatedAt).getTime() - new Date(goal.startDate).getTime()) / (1000 * 60 * 60 * 24),
                        0
                      ) / achievedGoals.length)} dias`
                    : "N/A"}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Tempo médio para conclusão de metas
                </p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Recomendações</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Defina metas SMART</h4>
                    <p className="text-sm text-muted-foreground">
                      Específicas, Mensuráveis, Atingíveis, Relevantes e Temporais. Metas muito ambiciosas têm menor chance de sucesso.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Estabeleça checkpoints regulares</h4>
                    <p className="text-sm text-muted-foreground">
                      Divida suas metas em etapas menores e acompanhe seu progresso semanalmente ou quinzenalmente.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Seja paciente e consistente</h4>
                    <p className="text-sm text-muted-foreground">
                      Transformações corporais levam tempo. Mantenha a consistência e faça pequenos ajustes quando necessário.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link to="/body-monitoring/analysis">
              Análise Completa
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BodyGoals;
