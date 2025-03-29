import React from 'react';
import { Sun, TrendingUp } from 'lucide-react';
import { useStore } from '../store';

export function DailyUpdate() {
  const dailyUpdate = useStore((state) => state.dailyUpdate);

  if (!dailyUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-yellow-500" />
          <span>{dailyUpdate.weather.temperature}°C</span>
          <span className="text-gray-500">{dailyUpdate.weather.condition}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>{dailyUpdate.crypto.symbol}</span>
          <span className={dailyUpdate.crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}>
            {dailyUpdate.crypto.change}%
          </span>
        </div>
      </div>
    </div>
  );
}