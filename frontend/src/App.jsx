import React from "react";
import Login from "./pages/Login/Login";
import "./index.css"; // Import the App.css file
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PlacementData from "./components/PlacementData";
import TechnicalEventsPage from "./components/TechnicalEventsPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/technical-events" element={<TechnicalEventsPage />} />
      <Route path="/placement-data" element={<PlacementData />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;