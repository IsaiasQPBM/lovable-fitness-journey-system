
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { PhotoRecord } from "@/types/bodyMonitoring";

interface PhotosGalleryProps {
  photos: PhotoRecord[];
}

const PhotosGallery: React.FC<PhotosGalleryProps> = ({ photos }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Galeria de Fotos</CardTitle>
        <CardDescription>
          Organize suas fotos de progresso
        </CardDescription>
      </CardHeader>
      <CardContent>
        {photos.length > 0 ? (
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Filtrar por:</h3>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="cursor-pointer">Todos</Badge>
                <Badge variant="secondary" className="cursor-pointer">Frente</Badge>
                <Badge variant="outline" className="cursor-pointer">Costas</Badge>
                <Badge variant="outline" className="cursor-pointer">Lateral</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="aspect-[3/4] rounded-md bg-muted overflow-hidden relative group"
                >
                  <img 
                    src={photo.imageUrl} 
                    alt={`Progress photo ${photo.pose}`} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" size="sm">
                      Ver
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2">
                    <p className="text-white text-sm font-medium">
                      {new Date(photo.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-white/80 capitalize">
                      {photo.pose.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <Camera className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>Nenhuma foto de progresso registrada</p>
            <Button asChild className="mt-4">
              <Link to="/body-monitoring/photos/add">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeira Foto
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotosGallery;
