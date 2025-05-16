
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Check, Ruler, User, Weight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { BodyGoalType, BodyPart } from "@/types/bodyMonitoring";

// Define o esquema de validação
const goalFormSchema = z.object({
  title: z.string()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(100, { message: "O título deve ter no máximo 100 caracteres" }),
  description: z.string().optional(),
  type: z.string(),
  startDate: z.date({ required_error: "A data de início é obrigatória" }),
  targetDate: z.date({ required_error: "A data alvo é obrigatória" }),
  startValue: z.string()
    .refine(val => !isNaN(parseFloat(val)), { message: "Valor inicial deve ser um número" }),
  targetValue: z.string()
    .refine(val => !isNaN(parseFloat(val)), { message: "Valor alvo deve ser um número" }),
  unit: z.string(),
  measurementType: z.string(),
  bodyPart: z.string().optional(),
  weeklyTarget: z.string()
    .optional()
    .refine(val => !val || !isNaN(parseFloat(val)), { message: "Meta semanal deve ser um número" }),
  notes: z.string().optional(),
});

type GoalFormValues = z.infer<typeof goalFormSchema>;

const goalTypes: Record<BodyGoalType, string> = {
  weightLoss: "Perda de Peso",
  muscleGain: "Ganho Muscular",
  recomposition: "Recomposição Corporal",
  maintenance: "Manutenção",
  proportionImprovement: "Melhoria de Proporções",
  symmetryImprovement: "Melhoria de Simetria",
  custom: "Personalizada"
};

const measurementTypes: Record<string, string> = {
  weight: "Peso",
  bodyFat: "Percentual de Gordura",
  measurement: "Medida Específica",
  proportion: "Proporção"
};

const bodyPartLabels: Record<BodyPart, string> = {
  weight: "Peso",
  neck: "Pescoço",
  shoulders: "Ombros",
  chest: "Peito",
  leftBicep: "Bíceps Esquerdo",
  rightBicep: "Bíceps Direito",
  leftForearm: "Antebraço Esquerdo",
  rightForearm: "Antebraço Direito",
  waist: "Cintura",
  abdomen: "Abdômen",
  hips: "Quadril",
  leftThigh: "Coxa Esquerda",
  rightThigh: "Coxa Direita",
  leftCalf: "Panturrilha Esquerda",
  rightCalf: "Panturrilha Direita"
};

const unitOptions: Record<string, string[]> = {
  weight: ["kg", "lb"],
  bodyFat: ["%"],
  measurement: ["cm", "in"],
  proportion: ["ratio"]
};

const AddGoal: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showBodyPartField, setShowBodyPartField] = useState<boolean>(false);
  
  // Inicializar formulário
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "weightLoss",
      startDate: new Date(),
      targetDate: new Date(new Date().setMonth(new Date().getMonth() + 3)), // 3 meses a partir de hoje
      startValue: "",
      targetValue: "",
      unit: "kg",
      measurementType: "weight",
      notes: ""
    }
  });
  
  // Observar mudanças no tipo de medição
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "measurementType") {
        const measurementType = form.getValues("measurementType");
        
        // Mostrar campo de parte do corpo apenas para medidas específicas
        setShowBodyPartField(measurementType === "measurement");
        
        // Atualizar unidade com base no tipo de medição
        if (unitOptions[measurementType]) {
          form.setValue("unit", unitOptions[measurementType][0]);
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  // Calcular data mínima para data alvo (tem que ser após a data inicial)
  const minTargetDate = new Date(form.watch("startDate"));
  minTargetDate.setDate(minTargetDate.getDate() + 1); // pelo menos 1 dia após a data inicial
  
  // Calcular número de semanas entre as datas
  const calculateWeeks = () => {
    const startDate = form.watch("startDate");
    const targetDate = form.watch("targetDate");
    
    if (!startDate || !targetDate) return 0;
    
    const diffTime = targetDate.getTime() - startDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return Math.ceil(diffDays / 7);
  };
  
  // Calcular meta semanal sugerida
  const calculateSuggestedWeeklyTarget = () => {
    const startValue = parseFloat(form.watch("startValue") || "0");
    const targetValue = parseFloat(form.watch("targetValue") || "0");
    const weeks = calculateWeeks();
    
    if (isNaN(startValue) || isNaN(targetValue) || weeks <= 0) return "";
    
    const totalChange = targetValue - startValue;
    const weeklyChange = totalChange / weeks;
    
    return weeklyChange.toFixed(2);
  };
  
  // Enviar formulário
  const onSubmit = (data: GoalFormValues) => {
    // Converter valores string para número
    const formattedData = {
      ...data,
      startValue: parseFloat(data.startValue),
      targetValue: parseFloat(data.targetValue),
      weeklyTarget: data.weeklyTarget ? parseFloat(data.weeklyTarget) : undefined
    };
    
    console.log("Meta criada:", formattedData);
    
    // Em uma aplicação real, aqui enviaria os dados para API/banco de dados
    toast({
      title: "Meta criada com sucesso!",
      description: "Sua nova meta corporal foi adicionada.",
    });
    
    navigate("/body-monitoring/goals");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Criar Nova Meta</h1>
        <p className="text-muted-foreground">
          Defina metas específicas para acompanhar seu progresso corporal.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Meta</CardTitle>
              <CardDescription>
                Defina as informações básicas da sua meta corporal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Meta</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Reduzir percentual de gordura para o verão" {...field} />
                    </FormControl>
                    <FormDescription>
                      Um nome descritivo para sua meta.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Meta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de meta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(goalTypes).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Categoria da meta que você está definindo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid gap-6 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Início</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Escolha uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("2000-01-01")
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Quando você começará a trabalhar nesta meta.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="targetDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data Alvo</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Escolha uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < minTargetDate
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Quando você pretende alcançar esta meta.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva sua meta com mais detalhes..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Uma descrição mais detalhada da sua meta.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Métricas da Meta</CardTitle>
              <CardDescription>
                Defina os valores específicos que deseja alcançar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="measurementType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Medição</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de medição" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(measurementTypes).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Qual métrica você quer acompanhar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {showBodyPartField && (
                <FormField
                  control={form.control}
                  name="bodyPart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parte do Corpo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a parte do corpo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(bodyPartLabels).map(([value, label]) => (
                            value !== 'weight' && <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Parte específica do corpo que você quer monitorar.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <div className="grid gap-6 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Inicial</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input 
                            type="number" 
                            step="0.1" 
                            placeholder="0.0" 
                            {...field}
                            className="rounded-r-none"
                          />
                          <div className="flex items-center justify-center bg-muted border border-l-0 border-input rounded-r-md px-3">
                            {form.watch("unit")}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Seu valor atual ou ponto de partida.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="targetValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Alvo</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input 
                            type="number" 
                            step="0.1" 
                            placeholder="0.0" 
                            {...field}
                            className="rounded-r-none"
                          />
                          <div className="flex items-center justify-center bg-muted border border-l-0 border-input rounded-r-md px-3">
                            {form.watch("unit")}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        O valor que você deseja alcançar.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid gap-6 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidade de Medida</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a unidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitOptions[form.watch("measurementType") || "weight"]?.map(unit => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Unidade de medida para esta meta.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weeklyTarget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Semanal (opcional)</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input 
                            type="number" 
                            step="0.01" 
                            placeholder={calculateSuggestedWeeklyTarget()}
                            {...field}
                            className="rounded-r-none"
                          />
                          <div className="flex items-center justify-center bg-muted border border-l-0 border-input rounded-r-md px-3">
                            {form.watch("unit")}/semana
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Quanto você planeja progredir por semana. Valor sugerido: {calculateSuggestedWeeklyTarget()} {form.watch("unit")}/semana.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Recomendação</h4>
                    {form.watch("measurementType") === "weight" && (
                      <p className="text-sm text-muted-foreground">
                        Para perda de peso saudável, recomenda-se uma meta de 0,5-1kg por semana. Para ganho muscular, 0,2-0,5kg por semana é realista para a maioria das pessoas.
                      </p>
                    )}
                    {form.watch("measurementType") === "bodyFat" && (
                      <p className="text-sm text-muted-foreground">
                        Uma taxa segura e sustentável de redução de gordura corporal é de 0,5-1% por mês, dependendo do seu percentual atual e histórico de treino.
                      </p>
                    )}
                    {form.watch("measurementType") === "measurement" && (
                      <p className="text-sm text-muted-foreground">
                        As medidas corporais tendem a mudar mais lentamente. Para a maioria das medidas, 0,5-1cm por mês é um progresso realista e sustentável.
                      </p>
                    )}
                    {form.watch("measurementType") === "proportion" && (
                      <p className="text-sm text-muted-foreground">
                        Melhorias em proporções corporais são um processo gradual. Defina metas menores e alcançáveis para manter a motivação.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurações Adicionais</CardTitle>
              <CardDescription>
                Defina checkpoints e adicione notas para acompanhamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Checkpoints</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Checkpoints serão criados automaticamente com base na sua data de início, data alvo e meta semanal. Você poderá personalizá-los depois.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 rounded-full p-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm font-medium">{calculateWeeks()} semanas</p>
                      <p className="text-xs text-muted-foreground">Duração da meta</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 rounded-full p-2 mb-2">
                        {form.watch("measurementType") === "weight" ? (
                          <Weight className="h-5 w-5 text-primary" />
                        ) : form.watch("measurementType") === "measurement" ? (
                          <Ruler className="h-5 w-5 text-primary" />
                        ) : (
                          <User className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm font-medium">
                        {form.watch("startValue") && form.watch("targetValue") ? 
                          `${Math.abs(parseFloat(form.watch("targetValue")) - parseFloat(form.watch("startValue"))).toFixed(1)} ${form.watch("unit")}` : 
                          "0.0 " + form.watch("unit")}
                      </p>
                      <p className="text-xs text-muted-foreground">Mudança total</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 rounded-full p-2 mb-2">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm font-medium">
                        {Math.ceil(calculateWeeks() / 2)} checkpoints
                      </p>
                      <p className="text-xs text-muted-foreground">A cada 2 semanas</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas Adicionais (opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Adicione notas ou estratégias para atingir sua meta..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Quaisquer informações adicionais sobre sua meta ou estratégias para alcançá-la.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/body-monitoring/goals")}
              >
                Cancelar
              </Button>
              <Button type="submit">Criar Meta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default AddGoal;
