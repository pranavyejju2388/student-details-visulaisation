import React from "react";
import "./index.css"; // Import the App.css file
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlacementData from "./pages/PlacementData";
import EventsData from "./pages/EventsData"; // Fix duplicate import
import PlacementResults from "./pages/PlacementResults";
import EventResults from "./pages/EventResults";
import PlacementReport from "./pages/PlacementReport";
import SocietyMembership from "./pages/SocietyMembership";
import TechnicalEvents from "./pages/TechnicalEvents";
import CulturalEvents from "./pages/CulturalEvents";
import SportsEvents from "./pages/SportsEvents";
import ClubsAndSocieties from "./pages/ClubsAndSocieties";
import NotFound from "./pages/NotFound"; // Import the NotFound page
import Layout from "./components/Layout"; // Ensure the correct path

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Protect routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/placement-data" element={<PlacementData />} />
        <Route path="/events-data" element={<EventsData />} />
        <Route path="/placement-results" element={<PlacementResults />} />
        <Route path="/event-results" element={<EventResults />} />
        <Route path="/society-membership" element={<SocietyMembership />} />
        <Route path="/placement-report" element={<PlacementReport />} />
        <Route path="/technical-events" element={<TechnicalEvents />} />
        <Route path="/cultural-events" element={<CulturalEvents />} />
        <Route path="/sports-events" element={<SportsEvents />} />
        <Route path="/clubs-and-societies" element={<ClubsAndSocieties />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;