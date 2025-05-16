
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageSquare } from "lucide-react";

const CommunityGuidelines: React.FC = () => {
  return (
    <Alert>
      <MessageSquare className="h-4 w-4" />
      <AlertTitle>Comunidade Lafit</AlertTitle>
      <AlertDescription>
        Bem-vindo ao fórum da comunidade! Aqui você pode fazer perguntas, compartilhar experiências
        e aprender com outros membros. Lembre-se de manter o respeito e seguir nossas diretrizes
        de comunidade em todas as interações.
      </AlertDescription>
    </Alert>
  );
};

export default CommunityGuidelines;
