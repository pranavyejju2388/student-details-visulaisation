import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Button } from "../components/ui/button";
import { UserPlus, Download, Filter } from "lucide-react";
import FilterSection from "../components/FilterSection";

// Sample data for society memberships
const societyData = [
  { name: "IEEE", members: 120, category: "Technical" },
  { name: "ACM", members: 85, category: "Technical" },
  { name: "ASME", members: 65, category: "Professional" },
  { name: "ASCE", members: 45, category: "Professional" },
  { name: "AICHE", members: 30, category: "Professional" },
  { name: "IEI", members: 55, category: "Professional" },
  { name: "SAE", members: 40, category: "Professional" }
];

const membershipByYear = [
  { year: "2020", members: 180 },
  { year: "2021", members: 250 },
  { year: "2022", members: 310 },
  { year: "2023", members: 390 },
  { year: "2024", members: 425 }
];

const membershipDistribution = [
  { name: "Technical", value: 40 },
  { name: "Cultural", value: 25 },
  { name: "Sports", value: 20 },
  { name: "Professional", value: 15 }
];

const SocietyMembership = () => {
  const [filters, setFilters] = useState({
    department: "all",
    fromYear: "all",
    toYear: "all",
    company: "all"
  });
  
  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#EC4899', '#14B8A6'];
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Professional Society Membership</h1>
          <p className="text-muted-foreground mt-1">Visualize student participation in professional societies</p>
        </div>
        <Button onClick={handleExport} className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      <FilterSection onFilterChange={handleFilterChange} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card flex items-center">
          <div className="mr-4 bg-primary/10 p-3 rounded-full">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="stat-value">425</h3>
            <p className="stat-label">Total Society Members</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="chart-container animate-slide-up">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={societyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value} members`, 'Count']} />
                <Legend />
                <Bar dataKey="members" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyMembership;
