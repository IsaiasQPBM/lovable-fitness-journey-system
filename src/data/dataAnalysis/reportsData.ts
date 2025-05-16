
import { Report } from "@/types/dataAnalysis";

// Mock reports data
export const reports: Report[] = [
  {
    id: "report-1",
    userId: "user-1",
    title: "Relatório Mensal - Maio 2024",
    description: "Análise completa de progresso para o mês de Maio 2024.",
    type: "monthly",
    timeRange: {
      start: new Date("2024-05-01"),
      end: new Date("2024-05-31")
    },
    sections: [
      {
        id: "section-1",
        title: "Resumo Executivo",
        type: "text",
        content: "Maio foi um mês de progresso constante, com melhorias significativas em força e redução consistente de medidas na cintura. O foco em melhorar a qualidade do sono teve impacto positivo no desempenho geral de treino.",
        order: 0
      },
      {
        id: "section-2",
        title: "Progresso Corporal",
        type: "metrics",
        content: {
          metrics: [
            { label: "Mudança de Peso", value: "-1.2kg", change: "-1.5%" },
            { label: "Mudança de % de Gordura", value: "-0.8%", change: "-4.7%" },
            { label: "Mudança na Circunferência da Cintura", value: "-2.1cm", change: "-2.5%" }
          ]
        },
        order: 1
      },
      {
        id: "section-3",
        title: "Desempenho de Treino",
        type: "chart",
        content: {
          chartType: "line",
          data: [/* data points would go here */]
        },
        order: 2
      }
    ],
    status: "generated",
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01")
  },
  {
    id: "report-2",
    userId: "user-1",
    title: "Comparativo: Cutting vs. Bulking",
    description: "Análise comparativa entre as fases de cutting e bulking.",
    type: "comparison",
    timeRange: {
      start: new Date("2024-04-01"),
      end: new Date("2024-05-31"),
      comparisonStart: new Date("2023-10-01"),
      comparisonEnd: new Date("2023-11-30")
    },
    sections: [
      {
        id: "section-1",
        title: "Principais Diferenças",
        type: "text",
        content: "A fase de cutting mostrou maior eficiência na perda de gordura com menos perda de força comparada à fase anterior. A melhor estratégia de distribuição de calorias e o foco em proteína contribuíram para este resultado.",
        order: 0
      },
      {
        id: "section-2",
        title: "Comparação de Resultados",
        type: "table",
        content: {
          headers: ["Métrica", "Cutting Atual", "Bulking Anterior"],
          rows: [
            ["Mudança de Peso", "-4.2kg", "+3.8kg"],
            ["Mudança de Força (Supino)", "-2.5kg", "+7.5kg"],
            ["Mudança de % de Gordura", "-2.4%", "+1.6%"],
            ["Aderência à Dieta", "87%", "78%"]
          ]
        },
        order: 1
      }
    ],
    status: "generated",
    createdAt: new Date("2024-06-02"),
    updatedAt: new Date("2024-06-02")
  },
  {
    id: "report-3",
    userId: "user-1",
    title: "Análise de Periodização",
    description: "Avaliação da eficácia do ciclo de periodização recente.",
    type: "custom",
    timeRange: {
      start: new Date("2024-02-01"),
      end: new Date("2024-05-31")
    },
    sections: [],
    status: "draft",
    createdAt: new Date("2024-06-05"),
    updatedAt: new Date("2024-06-05")
  }
];
