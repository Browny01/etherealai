import React from 'react';
import { Bot, User } from 'lucide-react';
import { useStore } from '../store';
import { formatDistanceToNow } from '../utils/date';

export function MessageList() {
  const messages = useStore((state) => state.messages);

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 ${
            message.role === 'assistant'
              ? 'bg-gray-50 rounded-2xl p-6'
              : ''
          }`}
        >
          <div className="flex-shrink-0">
            {message.role === 'assistant' ? (
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Bot className="w-6 h-6 text-indigo-600" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900">
                {message.role === 'assistant' ? 'Ethereal AI' : 'You'}
              </span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(message.timestamp)}
              </span>
              {message.role === 'assistant' && (
                <span className="text-sm px-2 py-1 rounded-lg bg-indigo-100 text-indigo-600">
                  {message.model}
                </span>
              )}
            </div>
            
            <div className="leading-relaxed text-gray-700">
              {message.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}