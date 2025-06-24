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

export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude: lat, longitude: lon } = position.coords;
          const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=0d7e0434effa4ea3825e16245d95ba24`;
          
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.features && data.features.length > 0) {
            const location = data.features[0].properties;
            resolve({
              city: location.city || location.county || "Unknown City",
              country: location.country || "Unknown Country",
              state: location.state || "",
              formatted: location.formatted || "",
              lat,
              lon
            });
          } else {
            reject(new Error("Location data not found"));
          }
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      }
    );
  });
};

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0c929e38ae6eb16de30595e9cce49de&units=metric`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.status}`);
  }
  
  const data = await response.json();
  
  return {
    description: data.weather[0].description,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon
  };
};

export const generateExcuse = async (
  locationData: LocationData,
  weatherData: WeatherData,
  tone: string,
  context: string,
  situation: string,
  currentTime: string
): Promise<string> => {
  const apiKey = "ak_01jxyw0xa6e8v8tyzh7e2pky4d";
  const endpoint = "https://api.dappier.com/app/aimodel/am_01j06ytn18ejftedz6dyhz2b15";

  const prompt = `
Generate 4-5 funny but believable excuses to leave an event, numbered as Excuse 1, Excuse 2, etc.

Current Context:
- Time: ${currentTime}
- Location: ${locationData.city}, ${locationData.state}, ${locationData.country}
- Weather: ${weatherData.description}, ${weatherData.temperature}°C, feels like ${weatherData.feelsLike}°C, humidity ${weatherData.humidity}%, wind ${weatherData.windSpeed} m/s
- User Situation: ${situation || "General excuse needed"}
- Tone: ${tone}
- Context: ${context}

Requirements:
- Make excuses contextually appropriate for the ${tone} tone
- Use the weather and location creatively
- Make them believable with no chance of excuse detection
- Keep each excuse to 1-2 sentences
- Be creative and use the specific weather/location details
- Format as:

Excuse 1: [excuse text]

Excuse 2: [excuse text]

Excuse 3: [excuse text]

Excuse 4: [excuse text]

Excuse 5: [excuse text]
`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: prompt })
    });

    const data = await response.json();
    return data.message || "Sorry, couldn't generate an excuse right now. Try again!";
  } catch (error) {
    console.error("❌ Error generating excuse:", error);
    return "Sorry, couldn't generate an excuse right now. Try again!";
  }
};