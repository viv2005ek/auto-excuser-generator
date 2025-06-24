import React from 'react';

const LoadingStates: React.FC = () => {
  const messages = [
    "Fetching believable lies from the excuse dimension…",
    "Bribing your weather data for a better alibi…",
    "Consulting the masters of procrastination…",
    "Crafting your perfect escape plan…",
    "Analyzing local conditions for maximum believability…"
  ];

  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-violet-500/30 border-t-violet-500"></div>
        <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-500 animate-pulse"></div>
      </div>
      
      <p className="text-gray-300 mt-4 text-center animate-pulse">
        {messages[currentMessage]}
      </p>
    </div>
  );
};

export default LoadingStates;