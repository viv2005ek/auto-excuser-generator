import React from 'react';
import { MapPin, Clock, Cloud } from 'lucide-react';

interface StatsCardsProps {
  location: string;
  currentTime: string;
  weather: string;
  loading: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ location, currentTime, weather, loading }) => {
  const cards = [
    {
      label: "Location",
      value: loading ? "Fetching..." : location || "Unknown",
      icon: MapPin,
      gradient: "from-violet-500 to-purple-600"
    },
    {
      label: "Current Time",
      value: currentTime,
      icon: Clock,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      label: "Weather",
      value: loading ? "Loading..." : weather || "Unknown",
      icon: Cloud,
      gradient: "from-green-500 to-teal-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-xl bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm border border-white/10 dark:border-gray-700/50 p-4 hover:bg-white/10 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          
          <div className="relative z-10 flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${card.gradient} bg-opacity-20`}>
              <card.icon size={20} className="text-white" />
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-gray-400 dark:text-gray-500">{card.label}</p>
              <p className="text-lg font-semibold text-white truncate">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;