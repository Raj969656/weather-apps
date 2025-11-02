import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiCloudy,
} from "react-icons/wi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ShowWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [bg, setBg] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);

  const API_KEY = "70eda467c1494dd992a151714250406";

  // 🌍 Auto detect on load
  useEffect(() => {
    handleDetectLocation();
  }, []);

  // 🌦 Backgrounds
  const weatherBackgrounds = {
    Rain: "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80')",
    Thunder:
      "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80')",
    Snow: "url('https://images.unsplash.com/photo-1608889175123-338b36d5df45?auto=format&fit=crop&w=1600&q=80')",
    Cloudy:
      "url('https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=1600&q=80')",
    Sunny:
      "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1600&q=80')",
    Clear:
      "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80')",
  };

  const updateBackground = (condition) => {
    if (!condition) return;
    const key = Object.keys(weatherBackgrounds).find((w) =>
      condition.toLowerCase().includes(w.toLowerCase())
    );
    setBg(weatherBackgrounds[key] || weatherBackgrounds.Clear);
  };

  // 🌐 Fetch Weather Function (CORS FIXED)
  const fetchWeather = async (query) => {
    try {
      const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=1&aqi=no&alerts=no`
      )}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data || !data.current) throw new Error("Invalid city");
      setWeatherData(data);
      updateBackground(data.current.condition.text);
      setCity(data.location.name);
      toast.success("Weather updated!");
    } catch (error) {
      toast.error("City not found!");
    }
  };

  // 🔍 Manual Search
  const handleSearch = async () => {
    if (!city.trim()) return toast.error("Please enter a city name");
    setLoading(true);
    await fetchWeather(city);
    setLoading(false);
  };

  // 📍 Detect Current Location
  const handleDetectLocation = () => {
    if (!navigator.geolocation)
      return toast.error("Geolocation not supported!");
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const query = `${pos.coords.latitude},${pos.coords.longitude}`;
        await fetchWeather(query);
        setDetecting(false);
      },
      () => {
        toast.error("Location access denied! Please search manually.");
        setDetecting(false);
      }
    );
  };

  // 🌅 Chart data
  const chartData = [
    { name: "Temp (°C)", value: weatherData?.current?.temp_c || 0 },
    { name: "Feels Like", value: weatherData?.current?.feelslike_c || 0 },
    { name: "Wind (kph)", value: weatherData?.current?.wind_kph || 0 },
    { name: "Humidity (%)", value: weatherData?.current?.humidity || 0 },
  ];

  const renderIcon = (condition) => {
    if (!condition) return <WiCloudy size={70} />;
    const lower = condition.toLowerCase();
    if (lower.includes("rain")) return <WiRain size={70} />;
    if (lower.includes("snow")) return <WiSnow size={70} />;
    if (lower.includes("thunder")) return <WiThunderstorm size={70} />;
    if (lower.includes("clear")) return <WiDaySunny size={70} />;
    return <WiCloudy size={70} />;
  };

  return (
    <div
      className={`relative w-full h-screen flex flex-col items-center justify-center transition-all duration-700 overflow-hidden ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      {/* 🌄 Background */}
      <div
        className="absolute inset-0 -z-10 transition-all duration-700"
        style={{
          backgroundImage: `${bg}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: darkMode ? "brightness(0.5)" : "brightness(0.9)",
        }}
      ></div>

      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>

      {/* 🔍 Search + Buttons */}
      <div className="flex gap-3 items-center mb-6 flex-wrap justify-center">
        <input
          type="text"
          placeholder="Search city..."
          className="px-4 py-2 rounded-xl outline-none text-black w-60"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          {loading ? "..." : "Search"}
        </button>
        <button
          onClick={handleDetectLocation}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          {detecting ? "Detecting..." : "📍 Use My Location"}
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-xl ${
            darkMode ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"
          }`}
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>

      {/* 🌤 Weather Card */}
      {weatherData && (
        <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl w-[90%] max-w-md text-center">
          <div className="flex justify-center mb-2">
            {renderIcon(weatherData.current.condition.text)}
          </div>
          <h2 className="text-2xl font-bold">
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p className="text-md mb-2">{weatherData.current.condition.text}</p>
          <h1 className="text-4xl font-extrabold mb-1">
            {weatherData.current.temp_c}°C
          </h1>
          <p className="text-md mb-4">
            Feels Like: {weatherData.current.feelslike_c}°C
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <p>Pressure: {weatherData.current.pressure_mb} mb</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind: {weatherData.current.wind_kph} kph</p>
            <p>UV Index: {weatherData.current.uv}</p>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm">
            <div>
              ☀️{" "}
              <span className="block">
                {weatherData.forecast?.forecastday?.[0]?.astro?.sunrise ||
                  "06:00 AM"}
              </span>
            </div>
            <div>
              🌇{" "}
              <span className="block">
                {weatherData.forecast?.forecastday?.[0]?.astro?.sunset ||
                  "06:00 PM"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 📊 Chart */}
      {weatherData && (
        <div className="w-[90%] max-w-md h-48 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
              <YAxis stroke={darkMode ? "#fff" : "#000"} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#facc15"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default ShowWeather;
