
import { Menu, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Navbar = ({ setIsMobileMenuOpen }) => {
  return (
    <header className="bg-white border-b border-border">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden mr-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Student Details Visualization System</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 w-full bg-muted/30 border-none focus-visible:ring-primary/30"
            />
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">
              {localStorage.getItem("userEmail") || "faculty@school.edu"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
