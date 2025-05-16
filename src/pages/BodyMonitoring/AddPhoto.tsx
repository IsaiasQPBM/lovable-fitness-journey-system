
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhotoPose, PhotoRecord } from "@/types/bodyMonitoring";

const AddPhoto: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [pose, setPose] = useState<PhotoPose>("front");
  const [notes, setNotes] = useState<string>("");
  const [visibility, setVisibility] = useState<"private" | "shared" | "public">("private");
  const [tags, setTags] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // For demo purposes, using a placeholder image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real implementation, you would upload this to a server/storage
    // For now, we'll create a local preview using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      // In a real app, this would be the URL from your storage service
      setPhotoUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const poseOptions: { value: PhotoPose; label: string }[] = [
    { value: "front", label: "Frente" },
    { value: "back", label: "Costas" },
    { value: "left", label: "Lateral Esquerda" },
    { value: "right", label: "Lateral Direita" },
    { value: "frontRelaxed", label: "Frente Relaxado" },
    { value: "frontFlexed", label: "Frente Flexionado" },
    { value: "backRelaxed", label: "Costas Relaxado" },
    { value: "backFlexed", label: "Costas Flexionado" },
    { value: "custom", label: "Personalizado" },
  ];

  const visibilityOptions = [
    { value: "private", label: "Privado" },
    { value: "shared", label: "Compartilhado (Equipe)" },
    { value: "public", label: "Público" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!photoUrl) {
      toast({
        title: "Erro ao salvar foto",
        description: "Por favor, selecione uma imagem para upload.",
        variant: "destructive",
      });
      return;
    }

    const newPhotoRecord: Partial<PhotoRecord> = {
      date: new Date(),
      pose,
      poseType: pose, // For compatibility with existing code
      imageUrl: photoUrl,
      notes: notes || undefined,
      visibility,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
    };

    console.log("Nova foto registrada:", newPhotoRecord);

    // In a production app, we would save this to the database
    toast({
      title: "Foto registrada com sucesso!",
      description: "Sua foto de progresso foi salva.",
    });

    navigate("/body-monitoring");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Adicionar Foto de Progresso</h1>
        <p className="text-muted-foreground">
          Registre fotografias para acompanhar sua evolução visual ao longo do tempo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Nova Foto</CardTitle>
            <CardDescription>
              Adicione uma nova foto de progresso ao seu histórico.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-5">
              <div className="md:col-span-2">
                <div className="flex flex-col items-center justify-center h-full">
                  {imagePreview ? (
                    <div className="relative w-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-full h-64 rounded-md"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => {
                          setImagePreview(null);
                          setPhotoUrl("");
                        }}
                      >
                        Remover
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-12 w-full h-64">
                      <Camera className="h-12 w-12 text-muted-foreground mb-2" />
                      <div className="text-center">
                        <Label
                          htmlFor="photo-upload"
                          className="cursor-pointer text-primary font-medium hover:underline"
                        >
                          Selecionar uma imagem
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG ou GIF (max. 10MB)
                        </p>
                      </div>
                      <Input
                        id="photo-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pose">Pose</Label>
                  <Select
                    value={pose}
                    onValueChange={(value) => setPose(value as PhotoPose)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a pose" />
                    </SelectTrigger>
                    <SelectContent>
                      {poseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    defaultValue={format(new Date(), "yyyy-MM-dd")}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibilidade</Label>
                  <Select
                    value={visibility}
                    onValueChange={(value) =>
                      setVisibility(value as "private" | "shared" | "public")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a visibilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {visibilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Ex: braços, ombros, progresso"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Adicione notas ou observações sobre esta foto..."
                className="h-24"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
            <Button type="submit">Salvar Foto</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddPhoto;
