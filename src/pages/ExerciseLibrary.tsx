
import React, { useState, useMemo } from "react";
import PageLayout from "@/components/Layout/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Weight, Activity } from "lucide-react";
import { exerciseLibrary } from "@/data/trainingData";
import { Exercise, MuscleGroup } from "@/types/training";

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

const ExerciseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("all");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = useMemo(() => {
    return exerciseLibrary.filter((exercise) => {
      // Filter by search term
      const matchesSearch = 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by muscle group
      const matchesMuscleGroup = 
        selectedMuscleGroup === "all" || 
        exercise.primaryMuscleGroups.includes(selectedMuscleGroup as MuscleGroup) || 
        exercise.secondaryMuscleGroups.includes(selectedMuscleGroup as MuscleGroup);

      return matchesSearch && matchesMuscleGroup;
    });
  }, [searchTerm, selectedMuscleGroup]);

  const muscleGroups = useMemo(() => {
    const allMuscleGroups = new Set<MuscleGroup>();
    
    exerciseLibrary.forEach((exercise) => {
      exercise.primaryMuscleGroups.forEach((group) => allMuscleGroups.add(group));
      exercise.secondaryMuscleGroups.forEach((group) => allMuscleGroups.add(group));
    });
    
    return Array.from(allMuscleGroups);
  }, []);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <PageLayout 
      title="Biblioteca de Exercícios" 
      description="Explorar e aprender sobre exercícios baseados nos princípios do Laércio Refundini"
    >
      <div className="grid gap-6 md:grid-cols-12">
        {/* Sidebar Filters */}
        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="search" className="text-sm font-medium mb-1 block">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nome ou descrição..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Grupo Muscular</h3>
                <div className="space-y-1">
                  <Button
                    variant={selectedMuscleGroup === "all" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedMuscleGroup("all")}
                  >
                    Todos
                  </Button>
                  {muscleGroups.map((group) => (
                    <Button
                      key={group}
                      variant={selectedMuscleGroup === group ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedMuscleGroup(group)}
                    >
                      {muscleGroupLabels[group]}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-9">
          {selectedExercise ? (
            <Card>
              <CardHeader>
                <Button 
                  variant="ghost" 
                  className="mb-2 -ml-2 text-sm" 
                  onClick={() => setSelectedExercise(null)}
                >
                  ← Voltar para a lista
                </Button>
                <CardTitle className="text-2xl">{selectedExercise.name}</CardTitle>
                <CardDescription>{selectedExercise.description}</CardDescription>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedExercise.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                  <Badge variant="secondary" className="ml-1">{selectedExercise.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video bg-muted rounded-md overflow-hidden">
                  <img 
                    src={selectedExercise.imageUrls[0]} 
                    alt={selectedExercise.name} 
                    className="object-cover w-full h-full" 
                  />
                </div>
                
                <Tabs defaultValue="instructions">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="instructions">Instruções</TabsTrigger>
                    <TabsTrigger value="muscles">Músculos</TabsTrigger>
                    <TabsTrigger value="tips">Dicas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="instructions" className="space-y-4 pt-4">
                    <h3 className="font-semibold">Como Executar</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      {selectedExercise.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                    
                    {selectedExercise.cautions && selectedExercise.cautions.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold text-amber-500">Cuidados</h3>
                        <ul className="list-disc pl-5 space-y-1 text-amber-700">
                          {selectedExercise.cautions.map((caution, index) => (
                            <li key={index}>{caution}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="muscles" className="space-y-4 pt-4">
                    <div>
                      <h3 className="font-semibold">Músculos Primários</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedExercise.primaryMuscleGroups.map((muscle) => (
                          <Badge key={muscle} className="bg-primary">{muscleGroupLabels[muscle]}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Músculos Secundários</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedExercise.secondaryMuscleGroups.map((muscle) => (
                          <Badge key={muscle} variant="outline">{muscleGroupLabels[muscle]}</Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tips" className="space-y-4 pt-4">
                    <h3 className="font-semibold">Dicas do Laércio</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {selectedExercise.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Weight className="mr-2 h-4 w-4" />
                  Adicionar ao Treino
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Activity className="mr-2 h-5 w-5" /> 
                  Exercícios ({filteredExercises.length})
                </CardTitle>
                <CardDescription>
                  {selectedMuscleGroup !== "all" 
                    ? `Mostrando exercícios para ${muscleGroupLabels[selectedMuscleGroup as MuscleGroup]}` 
                    : "Mostrando todos os exercícios"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredExercises.map((exercise) => (
                      <Card 
                        key={exercise.id} 
                        className="cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => handleExerciseClick(exercise)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle>{exercise.name}</CardTitle>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {exercise.primaryMuscleGroups.map((muscle) => (
                              <Badge key={muscle} variant="secondary" className="text-xs">
                                {muscleGroupLabels[muscle]}
                              </Badge>
                            ))}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {exercise.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {filteredExercises.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Nenhum exercício encontrado com os filtros atuais.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedMuscleGroup("all");
                        }}
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ExerciseLibrary;
