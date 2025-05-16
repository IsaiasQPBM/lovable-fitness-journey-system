
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { photoRecords } from "@/data/bodyMonitoringData";
import PhotosGallery from "./PhotosGallery";
import PhotoComparisonCard from "./PhotoComparisonCard";

const PhotosTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fotos de Progresso</h2>
        <Button asChild>
          <Link to="/body-monitoring/photos/add">
            <Plus className="h-4 w-4 mr-2" />
            Nova Foto
          </Link>
        </Button>
      </div>
      
      <PhotosGallery photos={photoRecords} />
      
      {photoRecords.length > 0 && (
        <PhotoComparisonCard photos={photoRecords} />
      )}
    </div>
  );
};

export default PhotosTab;
