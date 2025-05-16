
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import ContentCategoryFilters from "./ContentCategoryFilters";
import ContentGrid from "./ContentGrid";
import FeaturedContentCarousel from "./FeaturedContentCarousel";
import { contentLibrary, getContentByCategory, getFeaturedContent, searchContent } from "@/data/knowledge";
import { ContentCategory } from "@/types/knowledge";

const KnowledgeLibraryTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | "all">("all");
  
  const featuredContent = getFeaturedContent();
  
  // Filter content based on search query and category
  const filteredContent = searchQuery.trim() !== "" 
    ? searchContent(searchQuery)
    : selectedCategory !== "all" 
      ? getContentByCategory(selectedCategory as ContentCategory)
      : contentLibrary;

  return (
    <div className="space-y-8">
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar conteúdo..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <ContentCategoryFilters 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>
      </div>
      
      {/* Featured Content Carousel */}
      {searchQuery.trim() === "" && selectedCategory === "all" && (
        <div className="my-6">
          <h2 className="text-2xl font-bold mb-4">Conteúdo em Destaque</h2>
          <FeaturedContentCarousel featuredContent={featuredContent} />
        </div>
      )}
      
      {/* Content Tabs by Format */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="article">Artigos</TabsTrigger>
          <TabsTrigger value="video">Vídeos</TabsTrigger>
          <TabsTrigger value="infographic">Infográficos</TabsTrigger>
          <TabsTrigger value="podcast">Podcasts</TabsTrigger>
          <TabsTrigger value="tutorial">Tutoriais</TabsTrigger>
          <TabsTrigger value="quiz">Quizzes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ContentGrid content={filteredContent} />
        </TabsContent>
        
        <TabsContent value="article">
          <ContentGrid content={filteredContent.filter(item => item.format === "article")} />
        </TabsContent>
        
        <TabsContent value="video">
          <ContentGrid content={filteredContent.filter(item => item.format === "video")} />
        </TabsContent>
        
        <TabsContent value="infographic">
          <ContentGrid content={filteredContent.filter(item => item.format === "infographic")} />
        </TabsContent>
        
        <TabsContent value="podcast">
          <ContentGrid content={filteredContent.filter(item => item.format === "podcast")} />
        </TabsContent>
        
        <TabsContent value="tutorial">
          <ContentGrid content={filteredContent.filter(item => item.format === "tutorial")} />
        </TabsContent>
        
        <TabsContent value="quiz">
          <ContentGrid content={filteredContent.filter(item => item.format === "quiz")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeLibraryTab;
