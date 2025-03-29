import React, { useState } from 'react';
import { Sparkles, Send, Paperclip } from 'lucide-react';
import { useStore } from '../store';
import { routeQuery } from '../utils/ai-router';
import { Button } from './ui/button';
import { FileUpload } from './FileUpload';

export function QueryBar() {
  const [query, setQuery] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const { addMessage, setSelectedModel } = useStore();

  const enhancePrompt = async () => {
    // TODO: Implement Gemini Flash 2.0 prompt enhancement
    console.log('Enhancing prompt...');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const selectedModel = routeQuery(query);
    setSelectedModel(selectedModel);

    addMessage({
      content: query,
      role: 'user',
      model: selectedModel,
    });

    setTimeout(() => {
      addMessage({
        content: `This is a simulated response using ${selectedModel} to: "${query}"`,
        role: 'assistant',
        model: selectedModel,
      });
    }, 1000);

    setQuery('');
    setShowUpload(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-4">
      {showUpload && (
        <div className="mb-4">
          <FileUpload />
        </div>
      )}
      
      <div className="relative flex items-center gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={enhancePrompt}
          title="Enhance prompt with Gemini Flash 2.0"
        >
          <Sparkles className="w-5 h-5 text-indigo-600" />
        </Button>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
        />
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowUpload(!showUpload)}
        >
          <Paperclip className="w-5 h-5 text-gray-400" />
        </Button>
        
        <Button type="submit" size="icon">
          <Send className="w-5 h-5 text-white" />
        </Button>
      </div>
    </form>
  );
}