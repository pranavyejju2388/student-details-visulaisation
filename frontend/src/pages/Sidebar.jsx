import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Code, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  User 
} from "lucide-react";

const Sidebar = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation(); // Get the current route
  const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing sidebar

  // Sidebar links with icons
  const links = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      path: "/placement-data",
      name: "Placement Data",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      path: "/technical-events",
      name: "Technical Events",
      icon: <Code className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={`h-screen bg-white shadow-md p-4 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:bg-gray-100 transition-all ${
          isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-100"
        }`}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Logo */}
      <h2
        className={`text-xl font-bold mb-6 text-blue-700 ${
          isCollapsed ? "hidden" : "block"
        } ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}
      >
        Student Details System
      </h2>

      {/* User Profile Section */}
      <div className={`flex items-center gap-2 mb-6 ${isCollapsed ? "justify-center" : "justify-start"}`}>
        <div className="bg-blue-500 p-2 rounded-full">
          <User className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        )}
      </div>

      {/* Links */}
      <ul>
        {links.map((link) => (
          <li key={link.path} className="mb-3">
            <Link
              to={link.path}
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-all ${
                location.pathname.startsWith(link.path)
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-700"
              } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              {link.icon}
              {!isCollapsed && <span>{link.name}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Dark Mode Toggle */}
      <div className="absolute bottom-4 left-4">
        <button
          onClick={toggleDarkMode}
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-all ${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-900" />
          )}
          {!isCollapsed && <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </div>

      {/* Logout Button */}
      <button
        className={`absolute bottom-4 right-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all ${
          isCollapsed ? "p-2" : "px-4"
        }`}
      >
        <LogOut className="h-5 w-5" />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;