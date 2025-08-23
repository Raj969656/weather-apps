import { useState } from "react";
import "./App.css";
import ShowWather from "./pages/ShowWeather";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:selectedCity" element={<ShowWather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;