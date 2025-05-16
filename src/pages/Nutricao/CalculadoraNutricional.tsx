import React, { useState, useEffect } from 'react';
import { useIntegratedData } from '@/contexts/IntegratedDataContext';
import { useToast } from "@/hooks/use-toast";
import { useModuleIntegration } from '@/hooks/use-module-integration';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Gauge, Weight } from "lucide-react";
import { NutritionCalculatorResult } from "@/types/nutrition";
import CrossModuleDataDisplay from '@/components/CrossModuleDataDisplay';

const CalculadoraNutricional = () => {
  const { data, updateNutritionData } = useIntegratedData();
  const { toast } = useToast();
  const { moduleConnections, sendDataToModule } = useModuleIntegration('nutrition');
  const navigate = useNavigate();

  // Form state
  const [personalInfo, setPersonalInfo] = useState({
    age: 30,
    weight: data.bodyMonitoring.currentWeight || 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    bodyFat: data.bodyMonitoring.bodyFatPercentage || 15,
  });

  const [goal, setGoal] = useState('maintenance');
  const [formulaType, setFormulaType] = useState('mifflin');
  const [macroDistribution, setMacroDistribution] = useState({
    protein: 2.0, // g per kg
    fat: 25, // % of calories
  });
  
  const [results, setResults] = useState<NutritionCalculatorResult | null>(null);

  // Effect to update from body monitoring data if available
  useEffect(() => {
    if (data.bodyMonitoring.currentWeight) {
      setPersonalInfo(prev => ({
        ...prev,
        weight: data.bodyMonitoring.currentWeight
      }));
    }
    
    if (data.bodyMonitoring.bodyFatPercentage) {
      setPersonalInfo(prev => ({
        ...prev,
        bodyFat: data.bodyMonitoring.bodyFatPercentage
      }));
    }
  }, [data.bodyMonitoring.currentWeight, data.bodyMonitoring.bodyFatPercentage]);

  // Effect to consider training volume for activity level suggestion
  useEffect(() => {
    if (data.training.volume.weekly > 8) {
      // Suggest high activity for users training more than 8 hours weekly
      toast({
        title: "Sugestão de Nível de Atividade",
        description: "Baseado no seu volume de treino, recomendamos utilizar 'Alto' como nível de atividade.",
        duration: 5000
      });
    }
  }, [data.training.volume.weekly, toast]);

  const handleInputChange = (field: string, value: string | number) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateBMR = () => {
    const { age, weight, height, gender, bodyFat } = personalInfo;
    let bmr = 0;
    
    // Harris-Benedict Formula
    const harrisBenedictBMR = gender === 'male' 
      ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
      : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      
    // Mifflin-St Jeor Formula
    const mifflinBMR = gender === 'male'
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161;
      
    // Katch-McArdle Formula (uses lean body mass)
    const leanBodyMass = weight * (1 - (bodyFat / 100));
    const katchBMR = 370 + (21.6 * leanBodyMass);
    
    switch(formulaType) {
      case 'harris':
        bmr = harrisBenedictBMR;
        break;
      case 'mifflin':
        bmr = mifflinBMR;
        break;
      case 'katch':
        bmr = katchBMR;
        break;
      case 'average':
        bmr = (harrisBenedictBMR + mifflinBMR + katchBMR) / 3;
        break;
      default:
        bmr = mifflinBMR;
    }
    
    return Math.round(bmr);
  };
  
  const calculateTDEE = (bmr: number) => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very: 1.9
    };
    
    const multiplier = activityMultipliers[personalInfo.activityLevel as keyof typeof activityMultipliers];
    return Math.round(bmr * multiplier);
  };
  
  const calculateTargetCalories = (tdee: number) => {
    switch(goal) {
      case 'fat-loss':
        return Math.round(tdee * 0.8); // 20% deficit
      case 'maintenance':
        return tdee;
      case 'muscle-gain':
        return Math.round(tdee * 1.1); // 10% surplus
      default:
        return tdee;
    }
  };
  
  const calculateMacros = (targetCalories: number) => {
    const { weight } = personalInfo;
    const { protein, fat } = macroDistribution;
    
    // Calculate protein in grams based on weight
    const proteinGrams = Math.round(weight * protein);
    const proteinCalories = proteinGrams * 4;
    
    // Calculate fat in grams based on percentage of total calories
    const fatCalories = targetCalories * (fat / 100);
    const fatGrams = Math.round(fatCalories / 9);
    
    // Calculate carbs with remaining calories
    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.round(carbCalories / 4);
    
    // Calculate percentages
    const proteinPercentage = Math.round((proteinCalories / targetCalories) * 100);
    const fatPercentage = Math.round((fatCalories / targetCalories) * 100);
    const carbPercentage = Math.round((carbCalories / targetCalories) * 100);
    
    return {
      protein: { grams: proteinGrams, percentage: proteinPercentage },
      fat: { grams: fatGrams, percentage: fatPercentage },
      carbs: { grams: carbGrams, percentage: carbPercentage }
    };
  };
  
  const handleCalculate = () => {
    const bmr = calculateBMR();
    const tdee = calculateTDEE(bmr);
    const targetCalories = calculateTargetCalories(tdee);
    const macros = calculateMacros(targetCalories);
    
    const result: NutritionCalculatorResult = {
      bmr,
      tdee,
      targetCalories,
      macros,
      goal,
      formulaUsed: formulaType,
      timestamp: new Date()
    };
    
    setResults(result);
    
    // Update integrated data context
    updateNutritionData({
      dailyCalories: targetCalories,
      macroBreakdown: {
        protein: macros.protein.grams,
        carbs: macros.carbs.grams,
        fat: macros.fat.grams
      }
    });
    
    // Send data to other modules
    sendDataToModule('training', 'nutrition-calculation', {
      dailyCalories: targetCalories,
      macroBreakdown: macros,
      goal
    });
    
    sendDataToModule('bodyMonitoring', 'nutrition-calculation', {
      dailyCalories: targetCalories,
      goal
    });
    
    toast({
      title: "Cálculo Nutricional Concluído",
      description: `Suas necessidades calóricas diárias são aproximadamente ${targetCalories} calorias.`,
      duration: 5000
    });
  };
  
  const handleSaveAsDefault = () => {
    if (!results) return;
    
    // Save to local storage or backend
    localStorage.setItem('nutritionDefaults', JSON.stringify({
      goal,
      formulaType,
      macroDistribution
    }));
    
    toast({
      title: "Configurações Salvas",
      description: "Suas preferências nutricionais foram salvas como padrão.",
      duration: 3000
    });
  };
  
  // Prepare data for pie chart
  const prepareMacroChartData = () => {
    if (!results) return [];
    
    return [
      { name: 'Proteínas', value: results.macros.protein.percentage },
      { name: 'Carboidratos', value: results.macros.carbs.percentage },
      { name: 'Gorduras', value: results.macros.fat.percentage }
    ];
  };
  
  const chartColors = ['#8B5CF6', '#3B82F6', '#F97316'];
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Calculadora Nutricional</h1>
            <p className="text-muted-foreground">
              Calcule suas necessidades calóricas e distribuição de macronutrientes
            </p>
          </div>
          {results && (
            <Button onClick={handleSaveAsDefault}>
              Salvar como Padrão
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Insira suas informações para cálculos precisos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input 
                      id="age" 
                      type="number" 
                      value={personalInfo.age} 
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value))} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number" 
                      value={personalInfo.weight} 
                      onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      value={personalInfo.height} 
                      onChange={(e) => handleInputChange('height', parseInt(e.target.value))} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bodyFat">% de Gordura Corporal</Label>
                    <Input 
                      id="bodyFat" 
                      type="number" 
                      value={personalInfo.bodyFat} 
                      onChange={(e) => handleInputChange('bodyFat', parseFloat(e.target.value))} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Gênero</Label>
                    <RadioGroup 
                      value={personalInfo.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="gender-male" />
                        <Label htmlFor="gender-male">Masculino</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="gender-female" />
                        <Label htmlFor="gender-female">Feminino</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="activity">Nível de Atividade</Label>
                    <Select 
                      value={personalInfo.activityLevel}
                      onValueChange={(value) => handleInputChange('activityLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível de atividade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentário (pouco ou nenhum exercício)</SelectItem>
                        <SelectItem value="light">Levemente ativo (exercício leve 1-3x/semana)</SelectItem>
                        <SelectItem value="moderate">Moderadamente ativo (exercício moderado 3-5x/semana)</SelectItem>
                        <SelectItem value="active">Muito ativo (exercício intenso 6-7x/semana)</SelectItem>
                        <SelectItem value="very">Extremamente ativo (exercício muito intenso, trabalho físico)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Objetivo e Método de Cálculo</CardTitle>
                <CardDescription>
                  Defina seu objetivo e preferências de cálculo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Objetivo</Label>
                    <Select 
                      value={goal}
                      onValueChange={setGoal}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fat-loss">Perda de Gordura</SelectItem>
                        <SelectItem value="maintenance">Manutenção</SelectItem>
                        <SelectItem value="muscle-gain">Ganho de Massa Muscular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="formula">Fórmula de Cálculo</Label>
                    <Select 
                      value={formulaType}
                      onValueChange={setFormulaType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a fórmula" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="harris">Harris-Benedict</SelectItem>
                        <SelectItem value="mifflin">Mifflin-St Jeor</SelectItem>
                        <SelectItem value="katch">Katch-McArdle (usa % gordura)</SelectItem>
                        <SelectItem value="average">Média das três fórmulas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Macronutrientes</CardTitle>
                <CardDescription>
                  Ajuste a distribuição de macros conforme seus objetivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Proteína (g por kg de peso corporal)</Label>
                      <span className="text-sm text-muted-foreground">{macroDistribution.protein}g/kg</span>
                    </div>
                    <Slider 
                      min={0.8} 
                      max={3} 
                      step={0.1} 
                      value={[macroDistribution.protein]} 
                      onValueChange={(value) => setMacroDistribution({...macroDistribution, protein: value[0]})}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.8</span>
                      <span>Recomendado: 1.8-2.2</span>
                      <span>3.0</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Gordura (% das calorias totais)</Label>
                      <span className="text-sm text-muted-foreground">{macroDistribution.fat}%</span>
                    </div>
                    <Slider 
                      min={15} 
                      max={45} 
                      step={1} 
                      value={[macroDistribution.fat]} 
                      onValueChange={(value) => setMacroDistribution({...macroDistribution, fat: value[0]})}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>15%</span>
                      <span>Recomendado: 20-30%</span>
                      <span>45%</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>Carboidratos serão calculados para completar suas necessidades calóricas diárias.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCalculate} className="w-full">Calcular Necessidades</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            {results ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Resultados</CardTitle>
                    <CardDescription>
                      Cálculo realizado em {results.timestamp.toLocaleTimeString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center p-3 border rounded-lg">
                          <Gauge className="h-6 w-6 mb-1 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Metabolismo Basal</p>
                          <p className="text-xl font-bold">{results.bmr} kcal</p>
                        </div>
                        <div className="flex flex-col items-center p-3 border rounded-lg">
                          <Activity className="h-6 w-6 mb-1 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Gasto Total</p>
                          <p className="text-xl font-bold">{results.tdee} kcal</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 border rounded-lg bg-muted/30">
                        <Heart className="h-7 w-7 mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Meta Calórica Diária</p>
                        <p className="text-3xl font-bold">{results.targetCalories} kcal</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {goal === 'fat-loss' && '(Déficit de 20%)'}
                          {goal === 'muscle-gain' && '(Superávit de 10%)'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2">Distribuição de Macronutrientes:</p>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="flex flex-col items-center p-2 border rounded-lg">
                            <p className="text-xs text-muted-foreground">Proteínas</p>
                            <p className="font-bold">{results.macros.protein.grams}g</p>
                            <p className="text-xs text-muted-foreground">{results.macros.protein.percentage}%</p>
                          </div>
                          <div className="flex flex-col items-center p-2 border rounded-lg">
                            <p className="text-xs text-muted-foreground">Carboidratos</p>
                            <p className="font-bold">{results.macros.carbs.grams}g</p>
                            <p className="text-xs text-muted-foreground">{results.macros.carbs.percentage}%</p>
                          </div>
                          <div className="flex flex-col items-center p-2 border rounded-lg">
                            <p className="text-xs text-muted-foreground">Gorduras</p>
                            <p className="font-bold">{results.macros.fat.grams}g</p>
                            <p className="text-xs text-muted-foreground">{results.macros.fat.percentage}%</p>
                          </div>
                        </div>
                        
                        <div className="h-[200px] mb-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={prepareMacroChartData()}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                fill="#8884d8"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {prepareMacroChartData().map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <CrossModuleDataDisplay
                  sourceModule="nutricao"
                  title="Dados Relacionados"
                  className="mt-4"
                />
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Resultados</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-[300px] text-center">
                  <Weight className="h-10 w-10 mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Preencha suas informações e clique em "Calcular Necessidades" para ver os resultados.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraNutricional;
