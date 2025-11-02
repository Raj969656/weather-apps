import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShowWeather from "./pages/ShowWeather";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <HashRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ✅ only /weather (no :params) */}
        <Route path="/weather" element={<ShowWeather />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
