export type AIModel = 'grok' | 'gemini' | 'perplexity' | 'chatgpt' | 'llama';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  model: AIModel;
  timestamp: number;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  workflow: string[];
}

export interface DailyUpdate {
  weather: {
    temperature: number;
    condition: string;
  };
  crypto: {
    symbol: string;
    change: number;
  };
}