import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="navbar">
        <h2>Weather App</h2>
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;