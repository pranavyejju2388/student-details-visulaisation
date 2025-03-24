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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Download, ChevronDown, RefreshCw } from "lucide-react";
import VisualizationSelector from "../components/VisualizationSelector";
import { clubMemberships, clubCategories } from "../utils/data";

const ClubsAndSocieties = () => {
  const [filters, setFilters] = useState({
    department: "all",
    fromYear: "all",
    toYear: "all",
    category: "all",
  });
  const [visualizationType, setVisualizationType] = useState("bar");
  
  // Define filter options
  const departments = [
    { id: "all", name: "All Departments" },
    { id: "cse", name: "Computer Science" },
    { id: "ece", name: "Electronics" },
    { id: "me", name: "Mechanical" },
    { id: "ce", name: "Civil" },
    { id: "pe", name: "Petroleum" },
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2025 - i); // Generates years from 2025 to 2015
  const clubTypes = [
    { id: "all", name: "All Categories" },
    { id: "cultural", name: "Cultural Club" },
    { id: "technical", name: "Technical Club" },
    { id: "hometeam", name: "Hometeam" },
    { id: "society", name: "Society" },
    { id: "other", name: "Other" }
  ];

  const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#0ea5e9', '#14b8a6'];
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      department: "all",
      fromYear: "all",
      toYear: "all",
      category: "all",
    });
  };

  // Filter data based on current filters
  const filteredMemberships = clubMemberships.filter(member => {
    return (
      (filters.department === "all" || member.department === filters.department) &&
      (filters.fromYear === "all" || parseInt(member.startYear) >= parseInt(filters.fromYear)) &&
      (filters.toYear === "all" || parseInt(member.endYear) <= parseInt(filters.toYear)) &&
      (filters.category === "all" || member.category.toLowerCase() === filters.category.toLowerCase())
    );
  });

  // Group data by club category
  const categoryData = clubCategories.map(category => {
    const count = filteredMemberships.filter(club => 
      club.category.toLowerCase().includes(category.name.toLowerCase())
    ).length;
    
    return {
      name: category.name,
      count
    };
  }).filter(item => item.count > 0);
  
  // Group data by position
  const positionData = [
    { name: "President", value: filteredMemberships.filter(club => club.position === "President").length },
    { name: "Secretary", value: filteredMemberships.filter(club => club.position === "Secretary").length },
    { name: "Technical Lead", value: filteredMemberships.filter(club => club.position === "Technical Lead").length },
    { name: "Member", value: filteredMemberships.filter(club => club.position === "Member").length },
    { name: "Other", value: filteredMemberships.filter(club => 
      club.position !== "President" && 
      club.position !== "Secretary" && 
      club.position !== "Technical Lead" && 
      club.position !== "Member"
    ).length },
  ].filter(item => item.value > 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clubs and Societies Visualization</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      {/* Filters Section */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Department Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <div className="relative">
                <select
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={filters.department}
                  onChange={(e) => handleFilterChange("department", e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* From Year Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From Year</label>
              <div className="relative">
                <select
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={filters.fromYear}
                  onChange={(e) => handleFilterChange("fromYear", e.target.value)}
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* To Year Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To Year</label>
              <div className="relative">
                <select
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={filters.toYear}
                  onChange={(e) => handleFilterChange("toYear", e.target.value)}
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Club Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Club Type</label>
              <div className="relative">
                <select
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  {clubTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-100"
              onClick={resetFilters}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Membership Statistics</h2>
        <VisualizationSelector 
          onSelect={setVisualizationType}
          defaultType={visualizationType}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Membership by Category</CardTitle>
            <CardDescription>Distribution of club memberships by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {categoryData.length > 0 ? (
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
                        name="Memberships" 
                        fill="#8b5cf6" 
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
                      <Tooltip formatter={(value) => [`${value} memberships`, 'Count']} />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No data available for selected filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Membership by Position</CardTitle>
            <CardDescription>Distribution of positions held by students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {positionData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  {visualizationType === "bar" ? (
                    <BarChart
                      data={positionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Students" 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={positionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {positionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No data available for selected filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Clubs & Societies Membership Data</CardTitle>
          <CardDescription>Detailed information about club and society memberships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Club Name</th>
                    <th className="py-3 px-4 text-left font-medium">Position</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Start Date</th>
                    <th className="py-3 px-4 text-left font-medium">End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMemberships.map((club) => (
                    <tr key={club.id} className="border-t">
                      <td className="py-3 px-4">{club.clubName}</td>
                      <td className="py-3 px-4">{club.position}</td>
                      <td className="py-3 px-4">{club.category}</td>
                      <td className="py-3 px-4">{club.startDate}</td>
                      <td className="py-3 px-4">{club.endDate}</td>
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

export default ClubsAndSocieties;