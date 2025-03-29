import React from 'react';
import { MessageSquare, Plus, Settings } from 'lucide-react';
import { useStore } from '../store';
import { formatDistanceToNow } from '../utils/date';
import { cn } from '../utils/cn';
import { LogoUpload } from './LogoUpload';
import { Button } from './ui/button';

export function Sidebar() {
  const { messages, selectedModel, logo } = useStore();

  const conversations = messages.reduce((acc, message) => {
    const date = new Date(message.timestamp).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, typeof messages>);

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {logo ? (
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          ) : (
            <div className="h-8 w-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 font-bold">E</span>
            </div>
          )}
          <LogoUpload />
        </div>
        <Button className="w-full" onClick={() => window.location.reload()}>
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(conversations).map(([date, msgs]) => (
          <div key={date} className="mb-6">
            <h3 className="text-xs font-medium text-gray-500 mb-2">{date}</h3>
            {msgs.filter(m => m.role === 'user').map((msg) => (
              <button
                key={msg.id}
                className={cn(
                  "w-full text-left p-2 rounded-lg mb-1 hover:bg-gray-100 transition-colors",
                  "flex items-center gap-2 text-sm"
                )}
              >
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="truncate">{msg.content}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}