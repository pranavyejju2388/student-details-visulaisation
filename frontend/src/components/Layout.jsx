
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
import Sidebar from "./Sidebar";
import Navbar from "../pages/Navbar";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Add animation classes on initial render
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main-content");
    
    if (sidebar) sidebar.classList.add("slide-up");
    if (main) main.classList.add("fade-in");
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        handleLogout={handleLogout}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        <main id="main-content" className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
