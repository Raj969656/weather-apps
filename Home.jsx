import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { WiDayHail } from "react-icons/wi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import bgHome from "../assets/bgHome.jpg";

function Home() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔍 Handle manual location input
  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  // 🔍 Manual search handler
const handleSearch = () => {
  if (!location.trim()) {
    toast.error("Please enter a location or use current location");
    return;
  }
  // ✅ Navigate to city weather page
  navigate(`/weather?city=${encodeURIComponent(location.trim())}`);
};

// 📍 Use My Current Location handler
const handleCurrentLocation = () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation not supported by your browser!");
    return;
  }

  setLoading(true);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      // ✅ Navigate using lat/lon
      navigate(`/weather?lat=${latitude}&lon=${longitude}`);
      setLoading(false);
    },
    (error) => {
      toast.error("Failed to detect location!");
      console.error(error);
      setLoading(false);
    }
  );
};


  return (
    <div
      style={{
        backgroundImage: `url(${bgHome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative bg-cover bg-center w-full h-screen overflow-hidden px-4 md:px-20 lg:px-80 py-10 flex flex-col justify-center items-center"
    >
      {/* 🌤️ Top Left Logo */}
      <div className="absolute top-2 left-7 flex flex-col items-center text-black">
        <WiDayHail size={60} />
        <h1 className="font-bold text-lg">Mr._Weather</h1>
      </div>

      {/* 🧭 Top Right Buttons */}
      <div className="absolute top-2 right-7 flex gap-3">
        <button
          onClick={() =>
            window.open("https://www.linkedin.com/in/raj-yadav-5b343128a/", "_blank")
          }
          className="bg-gray-950 text-white px-3 py-2 rounded-2xl hover:bg-gray-800"
        >
          Help
        </button>
        <button
          onClick={() =>
            alert("This is a weather app. Enter a valid location or use your current one.")
          }
          className="bg-gray-950 text-white px-3 py-2 rounded-2xl hover:bg-gray-800"
        >
          About
        </button>
      </div>

      {/* 🌤️ Main Body */}
      <div className="p-10 flex flex-col items-center justify-center text-center text-black">
        <TiWeatherPartlySunny size={60} />
        <h1 className="text-3xl font-semibold mt-3">Welcome to Weather App</h1>

        {/* 🏙️ Input Field */}
        <div className="flex flex-col gap-3 mt-10">
          <label htmlFor="location" className="font-bold">
            Enter Location
          </label>
          <input
            id="location"
            onChange={handleChange}
            value={location}
            className="px-4 py-2 w-[300px] md:w-[400px] rounded bg-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter City Name"
          />

          {/* 🔘 Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3 justify-center mt-4">
            <button
              onClick={handleSearch}
              className="bg-gray-950 text-white px-4 py-2 rounded-2xl hover:bg-gray-800"
            >
              Show Weather
            </button>

            <button
              onClick={handleCurrentLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700"
            >
              {loading ? "Detecting..." : "Use My Current Location"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
