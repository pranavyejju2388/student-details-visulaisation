import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  PieChart, 
  Calendar, 
  FileBarChart, 
  FileText, 
  LogOut, 
  X, 
  UserPlus, 
  Code, 
  Music, 
  Trophy, 
  UsersRound 
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, handleLogout }) => {
  return (
    <>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border shadow-sm transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-primary">Student Details System</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {/* Main Navigation Section */}
            <div className="text-xs uppercase font-semibold text-muted-foreground tracking-wider px-3 mb-2 text-center">
              Main Navigation
            </div>
            <ul className="space-y-1.5 mb-6">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
            </ul>
            
            {/* Student Activities Section */}
            <div className="text-xs uppercase font-semibold text-muted-foreground tracking-wider px-3 mb-2 text-center">
              Student Activities
            </div>
            <ul className="space-y-1.5 mb-6">
              <li>
                <NavLink
                  to="/technical-events"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Code className="w-5 h-5" />
                  <span>Technical Events</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cultural-events"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Music className="w-5 h-5" />
                  <span>Cultural Events</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sports-events"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Trophy className="w-5 h-5" />
                  <span>Sports Events</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/clubs-and-societies"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UsersRound className="w-5 h-5" />
                  <span>Clubs & Societies</span>
                </NavLink>
              </li>
            </ul>
            
            {/* Data & Reports Section */}
            <div className="text-xs uppercase font-semibold text-muted-foreground tracking-wider px-3 mb-2 text-center">
              Data & Reports
            </div>
            <ul className="space-y-1.5">
              <li>
                <NavLink
                  to="/placement-data"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PieChart className="w-5 h-5" />
                  <span>Placement Data</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events-data"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Events Data</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/placement-results"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileBarChart className="w-5 h-5" />
                  <span>Placement Results</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/event-results"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileBarChart className="w-5 h-5" />
                  <span>Event Results</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/society-membership"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Society Membership</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/placement-report"
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:text-blue-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="w-5 h-5" />
                  <span>Placement Report</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          
          {/* Logout Button */}
          <div className="mt-auto p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;