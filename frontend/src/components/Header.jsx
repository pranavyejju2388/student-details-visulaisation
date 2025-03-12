import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User, LogOut, Settings, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export const Header = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setPageTitle('Dashboard');
    } else {
      const formattedPath = path.substring(1)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setPageTitle(formattedPath);
    }
  }, [location]);
  
  return (
    <header className="h-16 px-6 flex items-center justify-between bg-white border-b shadow-sm">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 capitalize tracking-wide">
        {pageTitle}
      </h1>
      
      {/* User Profile Dropdown */}
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-2 hover:bg-gray-100 transition">
              <Avatar className="h-10 w-10 ring-2 ring-indigo-500/30 hover:ring-indigo-500 transition">
                <AvatarFallback className="bg-indigo-500 text-white">
                  <User size={20} />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700 hidden md:inline">
                Admin User
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 shadow-lg border bg-white rounded-md" align="end">
            <DropdownMenuLabel className="px-4 py-2 font-semibold text-gray-800">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
                <UserCircle size={18} className="text-gray-600" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
                <Settings size={18} className="text-gray-600" /> Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 cursor-pointer text-red-600 hover:bg-red-100 transition">
              <LogOut size={18} className="text-red-600" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;