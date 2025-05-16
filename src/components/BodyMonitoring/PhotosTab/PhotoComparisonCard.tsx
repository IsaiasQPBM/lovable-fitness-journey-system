
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhotoRecord } from "@/types/bodyMonitoring";

interface PhotoComparisonCardProps {
  photos: PhotoRecord[];
}

const PhotoComparisonCard: React.FC<PhotoComparisonCardProps> = ({ photos }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparar Progresso</CardTitle>
        <CardDescription>
          Compare fotos de diferentes datas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Selecione o tipo de pose:</h3>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="cursor-pointer">Frente Relaxado</Badge>
              <Badge variant="outline" className="cursor-pointer">Frente Contraído</Badge>
              <Badge variant="outline" className="cursor-pointer">Costas</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Antes:</h3>
                <div className="border rounded-md aspect-[3/4] overflow-hidden">
                  {photos.filter(p => p.pose === "frontRelaxed")[1] ? (
                    <img 
                      src={photos.filter(p => p.pose === "frontRelaxed")[1].imageUrl} 
                      alt="Before" 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Selecione uma foto</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-center mt-1 text-muted-foreground">
                  {photos.filter(p => p.pose === "frontRelaxed")[1] ? 
                    new Date(photos.filter(p => p.pose === "frontRelaxed")[1].date).toLocaleDateString() : 
                    'Data não selecionada'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Depois:</h3>
                <div className="border rounded-md aspect-[3/4] overflow-hidden">
                  {photos.filter(p => p.pose === "frontRelaxed")[0] ? (
                    <img 
                      src={photos.filter(p => p.pose === "frontRelaxed")[0].imageUrl} 
                      alt="After" 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Selecione uma foto</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-center mt-1 text-muted-foreground">
                  {photos.filter(p => p.pose === "frontRelaxed")[0] ? 
                    new Date(photos.filter(p => p.pose === "frontRelaxed")[0].date).toLocaleDateString() : 
                    'Data não selecionada'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium mb-3">Linha do Tempo</h3>
            <div className="space-y-3">
              {photos
                .filter(p => p.pose === "frontRelaxed")
                .slice(0, 5)
                .map((photo) => (
                  <div key={photo.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={photo.imageUrl} 
                        alt={`Timeline ${photo.pose}`} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {new Date(photo.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {photo.notes || 'Sem notas'}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      Selecionar
                    </Button>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoComparisonCard;
