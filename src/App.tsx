import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import ExcuseForm from './components/ExcuseForm';
import ExcuseOutput from './components/ExcuseOutput';
import LoadingStates from './components/LoadingStates';
import { getCurrentLocation, getWeatherData, generateExcuse } from './utils/apiServices';

interface LocationData {
  city: string;
  country: string;
  state: string;
  formatted: string;
  lat: number;
  lon: number;
}

interface WeatherData {
  description: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

function AppContent() {
  const [currentTime, setCurrentTime] = useState('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingExcuse, setGeneratingExcuse] = useState(false);
  
  // Form states
  const [tone, setTone] = useState('Funny');
  const [context, setContext] = useState('Social Event');
  const [situation, setSituation] = useState('');
  const [excuse, setExcuse] = useState('');

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch location and weather data on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Get location
        const location = await getCurrentLocation();
        setLocationData(location);
        
        // Get weather using the location
        const weather = await getWeatherData(location.city);
        setWeatherData(weather);
        
      } catch (error) {
        console.error('Error fetching initial data:', error);
        // Set fallback data
        setLocationData({
          city: 'Unknown City',
          country: 'Unknown Country',
          state: '',
          formatted: 'Location unavailable',
          lat: 0,
          lon: 0
        });
        setWeatherData({
          description: 'weather unavailable',
          temperature: 0,
          feelsLike: 0,
          humidity: 0,
          windSpeed: 0,
          icon: '01d'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleGenerateExcuse = async () => {
    if (!locationData || !weatherData) return;
    
    setGeneratingExcuse(true);
    try {
      const generatedExcuse = await generateExcuse(
        locationData,
        weatherData,
        tone,
        context,
        situation,
        currentTime
      );
      setExcuse(generatedExcuse);
    } catch (error) {
      console.error('Error generating excuse:', error);
      setExcuse('Sorry, couldn\'t generate an excuse right now. Even our AI needs an excuse sometimes! 😅');
    } finally {
      setGeneratingExcuse(false);
    }
  };

  const locationString = locationData 
    ? `${locationData.city}${locationData.state ? `, ${locationData.state}` : ''}`
    : '';
    
  const weatherString = weatherData
    ? `${weatherData.description}, ${Math.round(weatherData.temperature)}°C`
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 dark:from-gray-950 dark:via-purple-950 dark:to-violet-950 transition-colors duration-500">
      <div className="min-h-screen bg-black/20 dark:bg-black/40">
        <Header />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <StatsCards 
            location={locationString}
            currentTime={currentTime}
            weather={weatherString}
            loading={loading}
          />
          
          {loading ? (
            <div className="bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-gray-700/50 p-8">
              <LoadingStates />
            </div>
          ) : (
            <>
              <ExcuseForm
                tone={tone}
                setTone={setTone}
                context={context}
                setContext={setContext}
                situation={situation}
                setSituation={setSituation}
                onGenerate={handleGenerateExcuse}
                loading={generatingExcuse}
              />
              
              <ExcuseOutput
                excuse={excuse}
                onRegenerate={handleGenerateExcuse}
                loading={generatingExcuse}
              />
            </>
          )}
        </main>

        {/* Bolt.new Badge */}
        <div className="fixed bottom-4 right-4 z-50">
          <a 
            href="https://bolt.new/?rid=os72mi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block transition-all duration-300 hover:shadow-2xl"
          >
            <img 
              src="https://storage.bolt.army/logotext_poweredby_360w.png" 
              alt="Powered by Bolt.new badge" 
              className="h-8 md:h-10 w-auto shadow-lg opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110" 
            />
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;