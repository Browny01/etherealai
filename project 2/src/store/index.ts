import { create } from 'zustand';
import type { Message, AIModel, DailyUpdate } from '../types';

interface AppState {
  messages: Message[];
  selectedModel: AIModel;
  isOffline: boolean;
  logo: string | null;
  dailyUpdate: DailyUpdate | null;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setSelectedModel: (model: AIModel) => void;
  setOffline: (offline: boolean) => void;
  setLogo: (logo: string) => void;
  setDailyUpdate: (update: DailyUpdate) => void;
}

export const useStore = create<AppState>((set) => ({
  messages: [],
  selectedModel: 'grok',
  isOffline: false,
  logo: null,
  dailyUpdate: null,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      ],
    })),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setOffline: (offline) => set({ isOffline: offline }),
  setLogo: (logo) => set({ logo }),
  setDailyUpdate: (update) => set({ dailyUpdate: update }),
}));