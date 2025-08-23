import React, { useState } from "react";
//elcome to weather app ke upar ka logo h
import { TiWeatherPartlySunny } from "react-icons/ti";
//ye ak page se dusre pe le jane ke liye navigation ko use kiya gya h
import { useNavigate } from "react-router";
//ye pop up messgae data recived karne ka h 
import { toast } from "react-toastify";
//ye home page ka background img h 
import bgHome from "../assets/bgHome.jpg";
//ye top icon left side ka h
import { WiDayHail } from "react-icons/wi";
//home naam ka ak function h jo location kotrack karega jo user input dega

function Home() {
  const [location, setLocation] = useState("");
  //ak page se dusre page pe le jane ke liye
  const navigate = useNavigate();
  // Defines a function handleChange that will be called when the user types into the location input field. It updates the location state with the current value of the input field.
  function handleChange(event) {
    setLocation(event.target.value);
  }
  return (
    //bagckground image home page ka
        <div
      style={{
        backgroundImage: `url(${bgHome})`,
        backgroundSize: "full"}} className={' relative bg-cover bg-center  w-full h-screen bg-fixed position-fixed overflow-y-hidden overflow-x-hidden  px-4 md:px-20 lg:px-80 py-5 md:py-10 lg:py-30'}>
     {/*//help button*/}
  
 <div className="absolute top-2 right-7 ">
        <button
          onClick={() => {
           window.open("https://www.linkedin.com/in/raj-yadav-5b343128a/", '_blank');
          }}
            className="bg-gray-950 cursor-pointer text-white px-3 py-2 rounded-2xl mr-2">Help</button>

        <button
          onClick={() => {
           alert("This is a weather app. Enter a valid location to see the weather...");
          }}
            className="bg-gray-950 cursor-pointer text-white px-3 py-2 rounded-2xl ">About</button>
  </div>








{/* middle icon ke liye*/}
     <div className="absolute top-2 left-7"> <WiDayHail   color="black"size={60} /><h7 className="text-gray-950 text-bold">Mr._ Weather</h7></div>


{/*body of home page jha pe input button rakha hua h */}
    <div className="p-10 px-10 items-center gap-4 flex flex-col h-screen w-full ">
      <TiWeatherPartlySunny color="black" size={60} />
      <h1 className="text-3xl font-semibold text-center text-black">Welcome to Weather App</h1>

      {/* city selection */}
      <div className="flex gap-1 flex-col mt-10 text-black font-bold">
        <label  htmlFor="">Enter location</label>
        <input
          onChange={handleChange}
          className="px-4 py-2 w-[400px] rounded  bg-slate-400"
          type="text"
          placeholder="Enter Valid_Location"
        />
     {/* </div>*/}

{/*event handler.h jb input field khali rahega to ye Check karega ki valid location h ya nhi. If it is, it displays an error message using toast.error("Location required") or return karega ki llocation is required pop messgae ke jariye*/}
      
        <button
          onClick={() => {
            if (location.trim() == "") {
              toast.error("Location required");
              return;
            }
            navigate(`/weather/${location}`);
          }}
          className="bg-gray-950 cursor-pointer text-white px-3 py-2 rounded-2xl hover:bg-gray-800"
        >
          Show Weather
        </button>
      </div>
    </div>
    </div>
  );
}
export default Home;