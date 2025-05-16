
import { Insight } from "@/types/dataAnalysis";

// Mock insights data
export const insights: Insight[] = [
  {
    id: "insight-1",
    userId: "user-1",
    title: "Sono Afetando Recuperação",
    description: "Detectamos uma forte correlação entre noites com menos de 7 horas de sono e redução significativa na sua pontuação de recuperação no dia seguinte. A qualidade do sono tem sido o fator limitante mais consistente para sua recuperação ótima.",
    type: "warning",
    priority: "high",
    relatedMetrics: ["sleepDuration", "sleepQuality", "recoveryScore"],
    status: "new",
    actionSteps: [
      "Estabelecer horário de dormir consistente 30 minutos mais cedo",
      "Implementar rotina de desaceleração noturna sem telas",
      "Monitorar temperatura do quarto (ideal: 18-20°C)"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "insight-2",
    userId: "user-1",
    title: "Oportunidade de Nutrição Pré-Treino",
    description: "Análise de seus dados mostra desempenho 12% superior em sessões de treino que ocorrem 60-90 minutos após uma refeição contendo ao menos 30g de carboidratos, comparado a treinos com mais de 3 horas desde a última refeição.",
    type: "opportunity",
    priority: "medium",
    relatedMetrics: ["preworkoutNutrition", "trainingPerformance", "energyLevels"],
    status: "new",
    actionSteps: [
      "Adicionar refeição leve 1h antes dos treinos",
      "Testar diferentes fontes de carboidratos pré-treino",
      "Registrar efeito na energia durante treinos"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "insight-3",
    userId: "user-1",
    title: "Perda de Gordura Acelerada",
    description: "Parabéns! Sua taxa de perda de gordura nas últimas 3 semanas foi 20% mais rápida que a média para seu perfil, mantendo praticamente toda sua massa muscular. A combinação de déficit moderado, alta proteína e manutenção de volume de treino está funcionando excepcionalmente bem.",
    type: "achievement",
    priority: "medium",
    relatedMetrics: ["bodyFatPercentage", "weightChange", "muscleMassRetention"],
    status: "new",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "insight-4",
    userId: "user-1",
    title: "Risco de Platô de Emagrecimento",
    description: "Detectamos sinais precoces de adaptação metabólica que podem levar a um platô nas próximas 2-3 semanas se mantiver a mesma abordagem. Sua taxa metabólica basal apresentou redução de 5% além do esperado para a perda de peso atual.",
    type: "warning",
    priority: "medium",
    relatedMetrics: ["bmrChange", "weightLossRate", "calorieIntake"],
    status: "new",
    actionSteps: [
      "Implementar 1-2 dias de refeed por semana",
      "Aumentar ligeiramente treinos de força para grandes grupos musculares",
      "Considerar ajuste no déficit calórico para 15% em vez de 25%"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "insight-5",
    userId: "user-1",
    title: "Padrão de Resposta a Treino Identificado",
    description: "Análise dos últimos 6 meses revela que seu grupo muscular com melhor resposta a volume é quadríceps (crescimento 2.1x mais rápido que média), enquanto peitoral responde melhor a intensidade que volume (1.7x melhor resposta com séries próximas à falha vs. séries adicionais).",
    type: "pattern",
    priority: "low",
    relatedMetrics: ["muscleGrowthRate", "trainingVolume", "trainingIntensity"],
    status: "new",
    actionSteps: [
      "Ajustar treino de quadríceps para maior volume total",
      "Priorizar intensidade sobre volume para peitoral",
      "Testar abordagens mistas para outros grupos musculares"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
