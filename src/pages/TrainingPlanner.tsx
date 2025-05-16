
import React, { useState } from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import { workoutTemplates } from '@/data/trainingData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Activity, Calendar, Clock, Dumbbell, MoreHorizontal, PlayCircle, Plus, User, Weight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Workout, MuscleGroup, WorkoutExercise } from '@/types/training';
import { exerciseLibrary } from '@/data/trainingData';
import { useIntegratedData } from '@/contexts/IntegratedDataContext';

type WorkoutSessionType = 'session' | 'template';
type TabValue = 'plans' | 'templates' | 'history';

const muscleGroupLabels: Record<MuscleGroup, string> = {
  chest: "Peitoral",
  back: "Costas",
  shoulders: "Ombros",
  biceps: "Bíceps",
  triceps: "Tríceps",
  forearms: "Antebraços",
  quadriceps: "Quadríceps",
  hamstrings: "Posteriores",
  glutes: "Glúteos",
  calves: "Panturrilhas",
  abs: "Abdômen",
  obliques: "Oblíquos",
  traps: "Trapézio",
  lowerBack: "Lombar",
};

const TrainingPlanner: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabValue>('templates');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: integratedData, updateTrainingData } = useIntegratedData();

  const handleStartWorkout = (workout: Workout) => {
    // In a real app, this would navigate to the workout execution page
    // and prepare the workout for execution
    toast({
      title: "Treino iniciado!",
      description: `${workout.name} pronto para execução.`,
    });
    
    // Update integrated data
    updateTrainingData({
      lastWorkout: {
        date: new Date(),
        type: workout.name,
        intensity: 'moderate',
        muscleGroups: workout.targetMuscleGroups
      }
    });
    
    // Navigate to workout execution
    navigate('/workout-execution', { state: { workout } });
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template salvo!",
      description: "O template de treino foi adicionado ao seu plano."
    });
    setDialogOpen(false);
  };

  const renderExerciseList = (exercises: WorkoutExercise[]) => {
    return exercises.map((exercise) => {
      const exerciseDetails = exerciseLibrary.find(e => e.id === exercise.exerciseId);
      if (!exerciseDetails) return null;

      return (
        <div key={exercise.id} className="flex justify-between items-center py-3 border-b">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium">{exerciseDetails.name}</span>
            </div>
            <div className="flex text-sm text-muted-foreground mt-1">
              <span>
                {exercise.sets.length} séries • 
                {exercise.sets.map(s => s.targetReps || '??').join('-')} reps
              </span>
              {exercise.sets[0].targetWeight && (
                <span className="ml-2">• {exercise.sets[0].targetWeight}kg+</span>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      );
    });
  };

  return (
    <PageLayout
      title="Planejador de Treinos"
      description="Crie, personalize e gerencie seus planos de treino"
    >
      <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as TabValue)} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Planos Ativos
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" /> Templates
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Histórico
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Seu Plano de Treino Atual</CardTitle>
                <CardDescription>
                  Plano baseado nos princípios do Laércio Refundini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col p-4 border rounded-md">
                      <span className="text-sm text-muted-foreground">Objetivo</span>
                      <span className="font-medium">Hipertrofia</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-md">
                      <span className="text-sm text-muted-foreground">Frequência</span>
                      <span className="font-medium">4× por semana</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-md">
                      <span className="text-sm text-muted-foreground">Divisão</span>
                      <span className="font-medium">Upper/Lower</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-md">
                      <span className="text-sm text-muted-foreground">Periodização</span>
                      <span className="font-medium">Linear</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6">Sessões de Treino</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {workoutTemplates.map((workout) => (
                      <Card key={workout.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{workout.name}</CardTitle>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {workout.targetMuscleGroups.slice(0, 3).map((muscle) => (
                              <Badge key={muscle} variant="outline" className="text-xs">
                                {muscleGroupLabels[muscle]}
                              </Badge>
                            ))}
                            {workout.targetMuscleGroups.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{workout.targetMuscleGroups.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="text-sm text-muted-foreground flex items-center gap-4">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {workout.estimatedDuration} min
                            </span>
                            <span className="flex items-center">
                              <Weight className="h-4 w-4 mr-1" />
                              {workout.exercises.length} exercícios
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs w-full"
                            onClick={() => handleStartWorkout(workout)}
                          >
                            <PlayCircle className="h-3 w-3 mr-1" />
                            Iniciar treino
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Templates de Treino</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Template
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              {workoutTemplates.map((template) => (
                <Card key={template.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {template.name}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          setSelectedWorkout(template);
                          setDialogOpen(true);
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.targetMuscleGroups.map((muscle) => (
                        <Badge key={muscle} variant="secondary" className="text-xs">
                          {muscleGroupLabels[muscle]}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {template.exercises.slice(0, 3).map((exercise) => {
                        const exerciseDetails = exerciseLibrary.find(e => e.id === exercise.exerciseId);
                        return (
                          <div key={exercise.id} className="flex justify-between text-sm">
                            <span>{exerciseDetails?.name || 'Desconhecido'}</span>
                            <span className="text-muted-foreground">
                              {exercise.sets.length} × {exercise.sets[0].targetReps || '??'}
                            </span>
                          </div>
                        );
                      })}
                      {template.exercises.length > 3 && (
                        <div className="text-sm text-muted-foreground">
                          + {template.exercises.length - 3} exercícios
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {template.estimatedDuration} min
                    </div>
                    <Button 
                      onClick={() => handleStartWorkout(template)}
                      size="sm"
                    >
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Iniciar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Add new template card */}
              <Card className="border-dashed hover:border-primary transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-muted-foreground flex flex-col items-center justify-center h-40">
                    <Plus className="h-10 w-10 mb-2" />
                    <span>Criar Novo Template</span>
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Treinos</CardTitle>
              <CardDescription>
                Registro dos seus treinos realizados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center p-4 border rounded-md">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Treino A - Superior (Push)</h3>
                        <p className="text-sm text-muted-foreground">16 de maio, 2025 • 58 min</p>
                      </div>
                      <Badge>Completo</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline" className="text-xs">Peito</Badge>
                      <Badge variant="outline" className="text-xs">Ombros</Badge>
                      <Badge variant="outline" className="text-xs">Tríceps</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-md">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Treino B - Costas e Bíceps</h3>
                        <p className="text-sm text-muted-foreground">14 de maio, 2025 • 62 min</p>
                      </div>
                      <Badge>Completo</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline" className="text-xs">Costas</Badge>
                      <Badge variant="outline" className="text-xs">Bíceps</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-md">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Treino A - Superior (Push)</h3>
                        <p className="text-sm text-muted-foreground">12 de maio, 2025 • 55 min</p>
                      </div>
                      <Badge>Completo</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline" className="text-xs">Peito</Badge>
                      <Badge variant="outline" className="text-xs">Ombros</Badge>
                      <Badge variant="outline" className="text-xs">Tríceps</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Workout Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedWorkout && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedWorkout.name}</DialogTitle>
                <DialogDescription>{selectedWorkout.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="flex flex-col p-3 border rounded-md">
                    <span className="text-muted-foreground">Duração</span>
                    <span className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedWorkout.estimatedDuration} min
                    </span>
                  </div>
                  <div className="flex flex-col p-3 border rounded-md">
                    <span className="text-muted-foreground">Dificuldade</span>
                    <span className="font-medium flex items-center capitalize">
                      <Activity className="h-4 w-4 mr-1" />
                      {selectedWorkout.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-col p-3 border rounded-md">
                    <span className="text-muted-foreground">Exercícios</span>
                    <span className="font-medium flex items-center">
                      <Weight className="h-4 w-4 mr-1" />
                      {selectedWorkout.exercises.length}
                    </span>
                  </div>
                  <div className="flex flex-col p-3 border rounded-md">
                    <span className="text-muted-foreground">Séries Totais</span>
                    <span className="font-medium flex items-center">
                      <Dumbbell className="h-4 w-4 mr-1" />
                      {selectedWorkout.exercises.reduce((total, ex) => total + ex.sets.length, 0)}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  <span className="text-sm text-muted-foreground mr-1">Músculos:</span>
                  {selectedWorkout.targetMuscleGroups.map((muscle) => (
                    <Badge key={muscle} variant="secondary">{muscleGroupLabels[muscle]}</Badge>
                  ))}
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-3">Exercícios</h3>
                  <div className="space-y-0 divide-y">
                    {renderExerciseList(selectedWorkout.exercises)}
                  </div>
                </div>
                
                {selectedWorkout.notes && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Notas</h3>
                    <p className="text-sm text-muted-foreground">{selectedWorkout.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Fechar
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={handleSaveTemplate}
                  >
                    Salvar como Template
                  </Button>
                  <Button onClick={() => handleStartWorkout(selectedWorkout)}>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Iniciar Treino
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default TrainingPlanner;
