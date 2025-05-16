
export type ContentFormat = 'article' | 'video' | 'infographic' | 'podcast' | 'tutorial' | 'quiz';
export type ContentLevel = 'beginner' | 'intermediate' | 'advanced';
export type ContentCategory = 'training' | 'nutrition' | 'recovery' | 'monitoring' | 'principles';
export type ContentSubcategory =
  // Training subcategories
  | 'hypertrophy' | 'strength' | 'technique' | 'periodization' | 'exercises'
  // Nutrition subcategories
  | 'macros' | 'meal-planning' | 'supplements' | 'diet-strategies' | 'nutrient-timing'
  // Recovery subcategories
  | 'sleep' | 'stress' | 'active-recovery' | 'injury-prevention' | 'mobility'
  // Monitoring subcategories
  | 'progress-tracking' | 'body-composition' | 'goal-setting' | 'metrics'
  // Principles subcategories
  | 'scientific-basis' | 'methodology' | 'case-studies' | 'myths-facts' | 'research';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  format: ContentFormat;
  level: ContentLevel;
  category: ContentCategory;
  subcategory: ContentSubcategory;
  thumbnail: string;
  content: string; // This could be HTML content or a URL depending on format
  duration: number; // In minutes for video/podcast, estimated reading time for text
  author: string;
  datePublished: string;
  dateUpdated: string;
  tags: string[];
  relatedContent?: string[]; // IDs of related content
  views: number;
  likes: number;
  featured?: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: ContentLevel;
  category: ContentCategory;
  duration: number; // Total estimated time to complete in hours
  contentItems: string[]; // IDs of content items in sequence
  completionCriteria: string;
  createdBy: string;
  featured?: boolean;
}

export interface DiscussionTopic {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  subcategory: ContentSubcategory;
  author: string;
  dateCreated: string;
  comments: number;
  views: number;
  tags: string[];
  isPinned?: boolean;
  isAnswered?: boolean;
  lastActivity: string;
}

export interface InteractiveTool {
  id: string;
  title: string;
  description: string;
  type: 'calculator' | 'simulator' | 'assessment' | 'anatomical-model';
  category: ContentCategory;
  thumbnail: string;
  url: string; // Path to the tool
  complexity: ContentLevel;
  helpContent?: string; // ID of related content explaining the tool
}
