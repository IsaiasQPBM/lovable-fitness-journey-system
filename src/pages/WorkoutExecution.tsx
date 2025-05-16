
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Activity, Check, ChevronLeft, Clock, ClockCountdown, Edit, Pause, Play, SkipForward, Timer, X } from 'lucide-react';
import { Workout, WorkoutExercise, WorkoutSet, Exercise } from '@/types/training';
import { exerciseLibrary } from '@/data/trainingData';
import { useIntegratedData } from '@/contexts/IntegratedDataContext';

const WorkoutExecution: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateTrainingData } = useIntegratedData();
  
  // Check if workout data was provided
  const workout = location.state?.workout as Workout;
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<string, { reps: number, weight: number, rpe?: number }>>({});
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date>(new Date());
  const [workoutDuration, setWorkoutDuration] = useState(0); // in seconds
  const [isWorkoutActive, setIsWorkoutActive] = useState(true);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  
  // If no workout was provided, show error and redirect
  if (!workout) {
    useEffect(() => {
      toast({
        title: "Erro",
        description: "Nenhum treino foi selecionado.",
        variant: "destructive"
      });
      navigate('/training-planner');
    }, []);
    
    return <div>Redirecionando...</div>;
  }
  
  const currentExercise = workout.exercises[currentExerciseIndex];
  const currentSet = currentExercise?.sets[currentSetIndex];
  
  // Get exercise details from the library
  const getExerciseDetails = (exerciseId: string): Exercise | undefined => {
    return exerciseLibrary.find(e => e.id === exerciseId);
  };
  
  const exerciseDetails = currentExercise ? getExerciseDetails(currentExercise.exerciseId) : undefined;
  
  // Workout Progress
  const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSetsCount = Object.keys(completedSets).length;
  const workoutProgress = Math.round((completedSetsCount / totalSets) * 100);
  
  // Timer for rest periods
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    
    if (isResting && restTimeLeft > 0) {
      timerId = setInterval(() => {
        setRestTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isResting && restTimeLeft === 0) {
      setIsResting(false);
      toast({
        title: "Descanso concluído!",
        description: "Hora de fazer a próxima série."
      });
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isResting, restTimeLeft]);
  
  // Timer for workout duration
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    
    if (isWorkoutActive) {
      timerId = setInterval(() => {
        const now = new Date();
        const durationInSeconds = Math.floor((now.getTime() - workoutStartTime.getTime()) / 1000);
        setWorkoutDuration(durationInSeconds);
      }, 1000);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isWorkoutActive, workoutStartTime]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle set completion
  const handleCompleteSet = (reps: number, weight: number, rpe?: number) => {
    const setId = currentSet.id;
    setCompletedSets(prev => ({
      ...prev,
      [setId]: { reps, weight, rpe }
    }));
    
    // Start rest timer
    setIsResting(true);
    setRestTimeLeft(currentSet.restPeriod);
    
    // Move to next set or exercise
    if (currentSetIndex < currentExercise.sets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      // Move to next exercise
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSetIndex(0);
      } else {
        // Workout complete
        setShowCompletionDialog(true);
      }
    }
  };
  
  const handleSkipSet = () => {
    // Simply move to next set without recording it as completed
    if (currentSetIndex < currentExercise.sets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      // Move to next exercise
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSetIndex(0);
      } else {
        // Workout complete
        setShowCompletionDialog(true);
      }
    }
  };
  
  const handleCompleteWorkout = () => {
    const workoutEndTime = new Date();
    const durationMinutes = Math.round((workoutEndTime.getTime() - workoutStartTime.getTime()) / 60000);
    
    // Update integration data
    updateTrainingData({
      lastWorkout: {
        date: workoutEndTime,
        type: workout.name,
        intensity: 'high',
        muscleGroups: workout.targetMuscleGroups
      }
    });
    
    toast({
      title: "Treino Concluído!",
      description: `Parabéns! Você completou seu treino em ${durationMinutes} minutos.`,
    });
    
    navigate('/training-planner');
  };
  
  const [repsInput, setRepsInput] = useState(currentSet?.targetReps?.toString() || '');
  const [weightInput, setWeightInput] = useState(currentSet?.targetWeight?.toString() || '');
  const [rpeInput, setRpeInput] = useState(currentSet?.targetRPE?.toString() || '');
  
  // Update input values when current set changes
  useEffect(() => {
    if (currentSet) {
      setRepsInput(currentSet.targetReps?.toString() || '');
      setWeightInput(currentSet.targetWeight?.toString() || '');
      setRpeInput(currentSet.targetRPE?.toString() || '');
    }
  }, [currentSet]);
  
  // Pause/Resume workout
  const toggleWorkoutActive = () => {
    setIsWorkoutActive(!isWorkoutActive);
  };
  
  return (
    <div className="container max-w-3xl px-4 py-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="-ml-2 mb-2"
          onClick={() => setShowExitDialog(true)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
        </Button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{workout.name}</h1>
            <p className="text-muted-foreground">{workout.description}</p>
          </div>
          <Button
            variant={isWorkoutActive ? "outline" : "default"}
            size="sm"
            onClick={toggleWorkoutActive}
          >
            {isWorkoutActive ? (
              <><Pause className="h-4 w-4 mr-1" /> Pausar</>
            ) : (
              <><Play className="h-4 w-4 mr-1" /> Retomar</>
            )}
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Progresso do Treino</CardTitle>
            <div className="text-muted-foreground text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(workoutDuration)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-1 text-sm">
            <span>{completedSetsCount} de {totalSets} séries</span>
            <span>{workoutProgress}%</span>
          </div>
          <Progress value={workoutProgress} className="h-2" />
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border rounded-md p-3">
              <div className="text-xs text-muted-foreground">Exercícios</div>
              <div className="text-lg font-medium mt-1">{currentExerciseIndex + 1}/{workout.exercises.length}</div>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-xs text-muted-foreground">Séries Restantes</div>
              <div className="text-lg font-medium mt-1">{totalSets - completedSetsCount}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {isResting ? (
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle>Descansando</CardTitle>
            <CardDescription>Próxima série em</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-5xl font-bold mb-4">{formatTime(restTimeLeft)}</div>
            <Progress value={(restTimeLeft / currentSet.restPeriod) * 100} className="w-full mb-6" />
            <Button onClick={() => setIsResting(false)}>
              Pular Descanso
            </Button>
          </CardContent>
        </Card>
      ) : exerciseDetails && currentExercise && currentSet ? (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{exerciseDetails.name}</CardTitle>
              <Badge>Série {currentSetIndex + 1}/{currentExercise.sets.length}</Badge>
            </div>
            <CardDescription>
              {exerciseDetails.primaryMuscleGroups.map(m => m).join(", ")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <img 
                src={exerciseDetails.imageUrls[0]} 
                alt={exerciseDetails.name} 
                className="object-cover w-full h-full" 
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reps">Repetições</Label>
                <Input 
                  id="reps" 
                  type="number"
                  value={repsInput}
                  onChange={(e) => setRepsInput(e.target.value)}
                  placeholder={currentSet.targetReps?.toString() || "0"}
                />
                {currentSet.targetReps && (
                  <div className="text-xs text-muted-foreground">
                    Alvo: {currentSet.targetReps}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Carga (kg)</Label>
                <Input 
                  id="weight" 
                  type="number"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder={currentSet.targetWeight?.toString() || "0"}
                />
                {currentSet.targetWeight && (
                  <div className="text-xs text-muted-foreground">
                    Alvo: {currentSet.targetWeight}kg
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rpe">RPE (0-10)</Label>
                <Input 
                  id="rpe" 
                  type="number"
                  min="0"
                  max="10"
                  value={rpeInput}
                  onChange={(e) => setRpeInput(e.target.value)}
                  placeholder={currentSet.targetRPE?.toString() || "0"}
                />
                {currentSet.targetRPE && (
                  <div className="text-xs text-muted-foreground">
                    Alvo: {currentSet.targetRPE}
                  </div>
                )}
              </div>
            </div>
            
            {exerciseDetails.tips.length > 0 && (
              <div className="border rounded-md p-3">
                <h4 className="font-medium mb-1 text-sm">Dica do Laércio:</h4>
                <p className="text-sm text-muted-foreground">{exerciseDetails.tips[0]}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSkipSet}>
              <SkipForward className="h-4 w-4 mr-1" /> Pular
            </Button>
            <Button onClick={() => handleCompleteSet(
              parseInt(repsInput) || 0,
              parseInt(weightInput) || 0,
              rpeInput ? parseInt(rpeInput) : undefined
            )}>
              <Check className="h-4 w-4 mr-1" /> Completar
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p>Carregando exercício...</p>
          </CardContent>
        </Card>
      )}
      
      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sair do treino?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja sair? Seu progresso será perdido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate('/training-planner')}>Sair</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Workout Completion Dialog */}
      <AlertDialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Treino Concluído!</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="py-4">
                <p>Parabéns! Você concluiu seu treino.</p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="border rounded p-3 flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Duração</span>
                    <span className="font-bold text-lg">{formatTime(workoutDuration)}</span>
                  </div>
                  <div className="border rounded p-3 flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Séries Completadas</span>
                    <span className="font-bold text-lg">{completedSetsCount}/{totalSets}</span>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleCompleteWorkout}>
              Finalizar Treino
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorkoutExecution;
