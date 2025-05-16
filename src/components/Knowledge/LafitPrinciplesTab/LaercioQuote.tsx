
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const LaercioQuote: React.FC = () => {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Quote className="h-10 w-10 text-primary/40 flex-shrink-0" />
          <div className="space-y-3">
            <p className="text-lg italic">
              "O verdadeiro progresso físico não vem de treinos mais longos ou mais frequentes, 
              mas da aplicação inteligente dos princípios científicos adaptados à resposta individual. 
              Quando combinamos ciência rigorosa com atenção aos dados pessoais, transformamos 
              potencial genético em resultados reais."
            </p>
            <p className="font-medium text-right">— Laércio Refundini</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LaercioQuote;
