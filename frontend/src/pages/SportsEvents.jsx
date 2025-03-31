import React, { useState } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Download } from "lucide-react";
import VisualizationSelector from "../components/VisualizationSelector";
import { sportsEvents } from "../utils/data";

// Define filter options for Type, Category, and Year Range
const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "Inter Department", label: "Inter Department" },
  { value: "Inter NIT", label: "Inter NIT" },
  { value: "Inter College", label: "Inter College" },
  { value: "Inter Hostel", label: "Inter Hostel" },
  { value: "Other", label: "Other" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "Kabaddi", label: "Kabaddi" },
  { value: "Badminton", label: "Badminton" },
  { value: "Basketball", label: "Basketball" },
  { value: "Handball", label: "Handball" },
  { value: "Cricket", label: "Cricket" },
  { value: "Hockey", label: "Hockey" },
];

// Generate year options dynamically (e.g., from 2000 to current year)
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => ({
  value: 2000 + index,
  label: (2000 + index).toString(),
}));

const SportsEvents = () => {
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    fromYear: "all",
    toYear: "all",
  });
  const [visualizationType, setVisualizationType] = useState("bar");
  
  const COLORS = ['#10b981', '#f59e0b', '#0ea5e9', '#8b5cf6', '#f43f5e', '#14b8a6'];
  
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };
  
  // Filter sports events based on selected filters
  const filteredEvents = sportsEvents.filter(event => {
    const matchesType = filters.type === "all" || event.type === filters.type;
    const matchesCategory = filters.category === "all" || event.category === filters.category;
    const matchesYearRange = 
      (filters.fromYear === "all" || new Date(event.date).getFullYear() >= filters.fromYear) &&
      (filters.toYear === "all" || new Date(event.date).getFullYear() <= filters.toYear);
    
    return matchesType && matchesCategory && matchesYearRange;
  });
  
  // Group data by sport category
  const categoryData = categoryOptions
    .filter(category => category.value !== "all") // Remove "All Categories" option
    .map(category => {
      const count = filteredEvents.filter(event => 
        event.category.toLowerCase().includes(category.value.toLowerCase())
      ).length;
      
      return {
        name: category.label,
        count
      };
    });
  
  // Group data by sport type
  const typeData = typeOptions
    .filter(type => type.value !== "all") // Remove "All Types" option
    .map(type => {
      const count = filteredEvents.filter(event => 
        event.type.toLowerCase().includes(type.value.toLowerCase())
      ).length;
      
      return {
        name: type.label,
        count
      };
    });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sports Events Visualization</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      {/* Type Filter Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Type</label>
        <select
          className="w-full p-2 border rounded-md"
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Category Filter Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          className="w-full p-2 border rounded-md"
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Year Range Filter Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">From Year</label>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.fromYear}
            onChange={(e) => handleFilterChange("fromYear", e.target.value)}
          >
            <option value="all">All Years</option>
            {yearOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">To Year</label>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.toYear}
            onChange={(e) => handleFilterChange("toYear", e.target.value)}
          >
            <option value="all">All Years</option>
            {yearOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Sports Statistics</h2>
        <VisualizationSelector 
          onSelect={setVisualizationType}
          defaultType={visualizationType}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sports by Category</CardTitle>
            <CardDescription>Distribution of sports participation by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {visualizationType === "bar" ? (
                  <BarChart
                    data={categoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Events" 
                      fill="#10b981" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} events`, 'Count']} />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sports by Type</CardTitle>
            <CardDescription>Distribution of sports events by competition type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {visualizationType === "bar" ? (
                  <BarChart
                    data={typeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Events" 
                      fill="#f59e0b" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={typeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {typeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} events`, 'Count']} />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sports Events Data</CardTitle>
          <CardDescription>Detailed information about sports events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Event Name</th>
                    <th className="py-3 px-4 text-left font-medium">Role</th>
                    <th className="py-3 px-4 text-left font-medium">Type</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Achievement</th>
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="border-t">
                      <td className="py-3 px-4">{event.eventName}</td>
                      <td className="py-3 px-4">{event.role}</td>
                      <td className="py-3 px-4">{event.type}</td>
                      <td className="py-3 px-4">{event.category}</td>
                      <td className="py-3 px-4">{event.achievement}</td>
                      <td className="py-3 px-4">{event.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SportsEvents;