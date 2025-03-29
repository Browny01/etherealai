import React, { useEffect, useState } from 'react';
import { QueryBar } from './components/QueryBar';
import { MessageList } from './components/MessageList';
import { Sidebar } from './components/Sidebar';
import { DailyUpdate } from './components/DailyUpdate';
import { useStore } from './store';
import { cn } from './utils/cn';

function App() {
  const [isNewChat, setIsNewChat] = useState(true);
  const messages = useStore((state) => state.messages);
  const setDailyUpdate = useStore((state) => state.setDailyUpdate);

  useEffect(() => {
    if (messages.length > 0 && isNewChat) {
      setIsNewChat(false);
    }
  }, [messages]);

  useEffect(() => {
    // Simulate fetching daily updates
    setDailyUpdate({
      weather: {
        temperature: 27,
        condition: 'Sunny'
      },
      crypto: {
        symbol: 'SOL',
        change: 5.2
      }
    });
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <div className={cn(
              "space-y-8 transition-all duration-500",
              isNewChat ? "mt-[40vh]" : "mt-0"
            )}>
              <QueryBar />
              
              <div className="max-w-4xl mx-auto">
                <MessageList />
              </div>
            </div>
          </div>
        </main>
      </div>

      <DailyUpdate />
    </div>
  );
}

export default App;