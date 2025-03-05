import React from "react";
import { Link } from "react-router-dom";
import { FaChartPie, FaSignOutAlt } from "react-icons/fa";
import PlacementData from "./PlacementData";
const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6 text-blue-700">Student Details System</h2>
      <ul>
        <li className="mb-3">
          <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
            <FaChartPie /> Dashboard
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/placement-data" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
            Placement Data
          </Link>
        </li>
        
        <li className="mb-3">
          <Link to="/" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
            Technical Events 
          </Link>
        </li>
      </ul>
      <button className="absolute bottom-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
