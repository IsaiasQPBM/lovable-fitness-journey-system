
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BodyFatMethod, BodyPart } from "@/types/bodyMonitoring";

// Define o esquema de validação do formulário
const measurementFormSchema = z.object({
  date: z.string().nonempty("A data é obrigatória"),
  weight: z.string().optional().refine(val => !val || !isNaN(parseFloat(val)), {
    message: "O peso deve ser um número válido",
  }),
  bodyFat: z.string().optional().refine(val => !val || !isNaN(parseFloat(val)), {
    message: "O percentual de gordura deve ser um número válido",
  }),
  bodyFatMethod: z.string().optional(),
  notes: z.string().optional(),
});

type MeasurementFormValues = z.infer<typeof measurementFormSchema>;

const bodyPartLabels: Record<string, string> = {
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
  rightCalf: "Panturrilha Direita",
};

const bodyFatMethods: Record<BodyFatMethod, string> = {
  skinfold: "Dobras Cutâneas",
  bioimpedance: "Bioimpedância",
  dexa: "DEXA Scan",
  bodpod: "BodPod",
  hydrostatic: "Pesagem Hidrostática",
  visual: "Estimativa Visual",
  navy: "Fórmula da Marinha",
  jackson_pollock: "Jackson & Pollock",
  custom: "Personalizado",
};

const AddMeasurement: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>("basic");
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  
  // Formatar a data atual para formato ISO (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // Inicializar formulário
  const form = useForm<MeasurementFormValues>({
    resolver: zodResolver(measurementFormSchema),
    defaultValues: {
      date: today,
      weight: "",
      bodyFat: "",
      bodyFatMethod: "skinfold",
      notes: "",
    },
  });

  // Lidar com mudança em campos de medidas
  const handleMeasurementChange = (bodyPart: string, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [bodyPart]: value,
    }));
  };

  // Enviar o formulário
  const onSubmit = (data: MeasurementFormValues) => {
    // Converter strings para números onde necessário
    const formattedData = {
      ...data,
      weight: data.weight ? parseFloat(data.weight) : undefined,
      bodyFat: data.bodyFat ? parseFloat(data.bodyFat) : undefined,
      measurements: Object.entries(measurements).reduce((acc, [key, value]) => {
        if (value) {
          acc[key as BodyPart] = parseFloat(value);
        }
        return acc;
      }, {} as Record<BodyPart, number>),
      date: new Date(data.date),
    };

    console.log("Medidas enviadas:", formattedData);
    
    // Em uma aplicação real, aqui você enviaria os dados para API/banco de dados
    toast({
      title: "Medidas registradas com sucesso!",
      description: "Suas medidas foram salvas e seu progresso atualizado.",
    });
    
    navigate("/body-monitoring");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Registrar Medidas</h1>
        <p className="text-muted-foreground">
          Registre suas medidas corporais para acompanhar seu progresso ao longo do tempo.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Registre suas medidas essenciais como peso e percentual de gordura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Medição</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} max={today} />
                      </FormControl>
                      <FormDescription>
                        Data em que as medidas foram realizadas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peso (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="0.0" {...field} />
                        </FormControl>
                        <FormDescription>
                          Seu peso atual em quilogramas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="bodyFat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Percentual de Gordura (%)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="0.0" {...field} />
                          </FormControl>
                          <FormDescription>
                            Seu percentual de gordura corporal atual.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bodyFatMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Método de Medição</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o método de medição" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(bodyFatMethods).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Método utilizado para medir o percentual de gordura.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Medidas Detalhadas</CardTitle>
              <CardDescription>
                Registre as circunferências corporais para um acompanhamento completo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upper" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upper">Parte Superior</TabsTrigger>
                  <TabsTrigger value="core">Core</TabsTrigger>
                  <TabsTrigger value="lower">Parte Inferior</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upper" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['neck', 'shoulders', 'chest', 'leftBicep', 'rightBicep', 'leftForearm', 'rightForearm'].map((bodyPart) => (
                      <div key={bodyPart} className="space-y-2">
                        <Label htmlFor={bodyPart}>{bodyPartLabels[bodyPart]} (cm)</Label>
                        <Input 
                          id={bodyPart}
                          type="number" 
                          step="0.1" 
                          placeholder="0.0"
                          value={measurements[bodyPart] || ''} 
                          onChange={(e) => handleMeasurementChange(bodyPart, e.target.value)} 
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="core" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['waist', 'abdomen', 'hips'].map((bodyPart) => (
                      <div key={bodyPart} className="space-y-2">
                        <Label htmlFor={bodyPart}>{bodyPartLabels[bodyPart]} (cm)</Label>
                        <Input 
                          id={bodyPart}
                          type="number" 
                          step="0.1" 
                          placeholder="0.0"
                          value={measurements[bodyPart] || ''} 
                          onChange={(e) => handleMeasurementChange(bodyPart, e.target.value)} 
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="lower" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['leftThigh', 'rightThigh', 'leftCalf', 'rightCalf'].map((bodyPart) => (
                      <div key={bodyPart} className="space-y-2">
                        <Label htmlFor={bodyPart}>{bodyPartLabels[bodyPart]} (cm)</Label>
                        <Input 
                          id={bodyPart}
                          type="number" 
                          step="0.1" 
                          placeholder="0.0"
                          value={measurements[bodyPart] || ''} 
                          onChange={(e) => handleMeasurementChange(bodyPart, e.target.value)} 
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Digite quaisquer observações sobre suas medidas..." 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Adicione notas sobre as condições da medição ou quaisquer observações relevantes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/body-monitoring")}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar Medidas</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default AddMeasurement;
