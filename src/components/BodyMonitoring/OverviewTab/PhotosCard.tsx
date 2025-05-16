
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import { PhotoRecord } from "@/types/bodyMonitoring";

interface PhotosCardProps {
  photos: PhotoRecord[];
}

const PhotosCard: React.FC<PhotosCardProps> = ({ photos }) => {
  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Fotos de Progresso</CardTitle>
        <CardDescription>
          Fotos de progresso recentes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {photos.slice(0, 6).map((photo) => (
              <div 
                key={photo.id} 
                className="aspect-square rounded-md bg-muted overflow-hidden relative"
              >
                <img 
                  src={photo.imageUrl} 
                  alt={`Progress photo ${photo.pose}`} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                  <p className="text-xs text-white truncate">
                    {new Date(photo.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <Camera className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>Nenhuma foto de progresso registrada</p>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/body-monitoring/photos/add">
              <Camera className="h-4 w-4 mr-2" />
              Nova Foto
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotosCard;
