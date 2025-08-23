import React, { use, useEffect, useState } from "react";
import { getWeather } from "../services/WeatherService";
import { toast } from "react-toastify";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useParams } from "react-router";
import bgImage from "../assets/bg3.jpg";


function ShowWeather() {
  const [weatherData, setWeatherData] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { selectedCity } = useParams();
  const [city, setCity] = useState(selectedCity);

  useEffect(() => {
    setLoading(true);
    getWeather(city)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("received data");
        setWeatherData(data);
        setLoading(false);
        // ...
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
      className={' p-10 px-80 py-50 relative w-full bg-cover bg-no-repeat  h-screen flex justify-center  overflow-y-hidden overflow-x-hidden  bg-top '}
    >
      <div className="absolute h-screen w-full bg-black/5 z-0"></div>
      {loading && <h1 className="text-3xl font-bold">Loading Weather...</h1>}
      {weatherData && (
            
        <div className="flex z-30 flex-col gap-1 justify-center items-center ">
          {/* <TiWeatherPartlySunny size={90} /> */}
          <img src={weatherData.current.condition.icon} alt="" />

          <h1 className="text-black font-bold">
            {weatherData.current.condition.text}
          </h1>

          <h1 className="text-black font-bold">
             City:{" "}
            <span className="text-sky-500 font-bold ">{weatherData.location.name}</span>
          </h1>
          <h1 className="text-black font-bold">Location Region: <span className="text-violet-600 font-bold">{weatherData.location.region}</span></h1>
          <h1 > <span className="text-black text-bold  font-bold"> Country</span>: <span className="text-sky-500 font-bold">{weatherData.location.country}</span></h1>
          <h1 className="text-black font-bold">
            Position: <span className="text-yellow-600 font-bold" >({weatherData.location.lat},
            {weatherData.location.lon})</span> 
          </h1>
          <h1 className="space-x-0.5"><span className="text-black font-bold"> LocalDate:</span> <span className="text-red-500 font-bold space-x-2">{weatherData.location.localtime}</span></h1>
          <h1 className="text-black font-bold">
            Temp in C:{" "}
            <span className="font-bold text-3xl text-violet-900">
              {weatherData.current.temp_c}
            </span>
          </h1>
          <h1 className="text-black font-bold">
            Temp in F:{" "}
            <span className="font-bold text-3xl text-violet-900">
              {weatherData.current.temp_f}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
}

export default ShowWeather;