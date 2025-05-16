
import { contentLibrary, getContentByCategory, getContentByLevel, getFeaturedContent, 
  getContentByFormat, getRelatedContent, searchContent } from './contentLibrary';
import { learningPaths, getPathById, getPathsByCategory, getPathsByLevel, 
  getFeaturedPaths, getRecommendedPaths } from './learningPaths';
import { interactiveTools, getToolsByCategory, getToolsByType, 
  getToolsByComplexity, getPopularTools } from './interactiveTools';
import { discussionTopics, getTopicsByCategory, getPinnedTopics, 
  getRecentTopics, getMostActiveTopics, searchTopics } from './discussionTopics';

export {
  // Content Library exports
  contentLibrary,
  getContentByCategory,
  getContentByLevel,
  getFeaturedContent,
  getContentByFormat,
  getRelatedContent,
  searchContent,
  
  // Learning Paths exports
  learningPaths,
  getPathById,
  getPathsByCategory,
  getPathsByLevel,
  getFeaturedPaths,
  getRecommendedPaths,
  
  // Interactive Tools exports
  interactiveTools,
  getToolsByCategory,
  getToolsByType,
  getToolsByComplexity,
  getPopularTools,
  
  // Discussion Topics exports
  discussionTopics,
  getTopicsByCategory,
  getPinnedTopics,
  getRecentTopics,
  getMostActiveTopics,
  searchTopics
};
