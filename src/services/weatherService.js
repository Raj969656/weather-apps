const apiKey = "70eda467c1494dd992a151714250406";
const baseUrl = "https://api.weatherapi.com/v1";

// ✅ Use a stable CORS proxy (thingproxy)
const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

export const getWeather = async (city) => {
  const completeUrl = `${baseUrl}/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;
  try {
    const res = await fetch(`${proxyUrl}${completeUrl}`);
    if (!res.ok) throw new Error("Weather data fetch failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
