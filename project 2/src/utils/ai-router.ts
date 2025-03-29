import type { AIModel } from '../types';

const MATH_PATTERNS = [
  /solve\s+.*equation/i,
  /calculate/i,
  /\d+[\s+\-*\/]\d+/,
  /what\s+is\s+\d+/i
];

const CODE_PATTERNS = [
  /code/i,
  /program/i,
  /function/i,
  /algorithm/i,
  /debug/i,
  /\b(html|css|javascript|typescript|python|java|react|angular|vue)\b/i
];

const RESEARCH_PATTERNS = [
  /research/i,
  /analyze/i,
  /compare/i,
  /explain/i,
  /what\s+is\s+the\s+difference/i,
  /how\s+does.*work/i
];

export function routeQuery(query: string): AIModel {
  // Default to Grok for general queries
  let selectedModel: AIModel = 'grok';

  // Check if we're offline
  if (navigator.onLine === false) {
    return 'llama';
  }

  // Route based on query patterns
  if (MATH_PATTERNS.some(pattern => pattern.test(query))) {
    selectedModel = 'gemini';
  } else if (CODE_PATTERNS.some(pattern => pattern.test(query))) {
    selectedModel = 'chatgpt';
  } else if (RESEARCH_PATTERNS.some(pattern => pattern.test(query))) {
    selectedModel = 'perplexity';
  }

  return selectedModel;
}