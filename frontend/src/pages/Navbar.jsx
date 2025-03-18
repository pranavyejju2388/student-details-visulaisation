import React, { useState } from "react";
import { Menu, Search, Sun, Moon, Bell, User, Settings, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";

const Navbar = ({ setIsMobileMenuOpen, isDarkMode, toggleDarkMode }) => {
  const [isSearchLoading, setIsSearchLoading] = useState(false); // Search loading state

  // Simulate search loading
  const handleSearch = () => {
    setIsSearchLoading(true);
    setTimeout(() => setIsSearchLoading(false), 2000); // Simulate 2 seconds loading
  };

  return (
    <header className={`border-b ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-border"}`}>
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left Section: Mobile Menu Button and Title */}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden mr-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Student Details Visualization System
          </h1>
        </div>
        
        {/* Right Section: Search Bar, Dark Mode Toggle, Notifications, and User Dropdown */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className={`pl-9 w-full ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-muted/30 border-none"} focus-visible:ring-primary/30`}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            {isSearchLoading && (
              <div className="absolute right-2.5 top-2.5 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className={`hover:bg-gray-100 dark:hover:bg-gray-800 ${
              isDarkMode ? "text-yellow-400" : "text-gray-900"
            }`}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-64 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-border"}`}>
              <DropdownMenuItem className={`flex items-center gap-2 ${isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}>
                <Bell className="h-4 w-4" />
                <span>New placement data available</span>
              </DropdownMenuItem>
              <DropdownMenuItem className={`flex items-center gap-2 ${isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}>
                <Bell className="h-4 w-4" />
                <span>Upcoming technical events</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-48 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-border"}`}>
              <DropdownMenuItem className={`flex items-center gap-2 ${isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className={`flex items-center gap-2 ${isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className={`flex items-center gap-2 ${isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;