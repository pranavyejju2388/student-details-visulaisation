import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
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
import { culturalEvents, culturalCategories } from "../utils/data";

const CulturalEvents = () => {
  const [filters, setFilters] = useState({
    department: "all",
    fromYear: "all",
    toYear: "all",
    category: "all",
  });
  const [visualizationType, setVisualizationType] = useState("bar");
  
  const COLORS = ['#f43f5e', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6', '#0ea5e9'];
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      department: "all",
      fromYear: "all",
      toYear: "all",
      category: "all",
    });
  };

  // Filter events based on selected filters
  const filteredEvents = culturalEvents.filter(event => {
    return (
      (filters.department === "all" || event.department === filters.department) &&
      (filters.fromYear === "all" || new Date(event.date).getFullYear() >= filters.fromYear) &&
      (filters.toYear === "all" || new Date(event.date).getFullYear() <= filters.toYear) &&
      (filters.category === "all" || event.category === filters.category)
    );
  });

  console.log("Filtered Events:", filteredEvents); // Debugging

  // Group data by category for visualization
  const categoryData = culturalCategories.map(category => {
    const count = filteredEvents.filter(event => 
      event.category.toLowerCase().includes(category.name.toLowerCase())
    ).length;
    
    return {
      name: category.name,
      count
    };
  });

  console.log("Category Data:", categoryData); // Debugging
  
  // Group data by achievement status
  const achievementData = [
    { name: "First Place", value: filteredEvents.filter(event => event.achievement.includes("First")).length },
    { name: "Second Place", value: filteredEvents.filter(event => event.achievement.includes("Second")).length },
    { name: "Third Place", value: filteredEvents.filter(event => event.achievement.includes("Third")).length },
    { name: "Participation", value: filteredEvents.filter(event => event.achievement.includes("Participation")).length },
    { name: "Other", value: filteredEvents.filter(event => 
      !event.achievement.includes("First") && 
      !event.achievement.includes("Second") && 
      !event.achievement.includes("Third") && 
      !event.achievement.includes("Participation")
    ).length },
  ];

  console.log("Achievement Data:", achievementData); // Debugging

  // Group data by year for Line Chart
  const eventsByYear = filteredEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year]++;
    return acc;
  }, {});

  const lineChartData = Object.keys(eventsByYear).map(year => ({
    year: parseInt(year),
    events: eventsByYear[year]
  })).sort((a, b) => a.year - b.year);

  console.log("Line Chart Data:", lineChartData); // Debugging

  // Departments, years, and event types data
  const departments = ["CSE", "ECE", "MECH", "EEE", "CHEM", "CIVIL"];
  const years = Array.from({ length: 11 }, (_, i) => 2025 - i); // 2025 to 2015
  const eventTypes = ["Hackathon", "Ragam Workshops", "Cultural Fest - Ragam", "Other Cultural Fests"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Cultural Events Visualization</h1>
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
                  onChange={(e) => handleFilterChange({ ...filters, department: e.target.value })}
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
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
                  onChange={(e) => handleFilterChange({ ...filters, fromYear: e.target.value })}
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
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
                  onChange={(e) => handleFilterChange({ ...filters, toYear: e.target.value })}
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Event Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Type</label>
              <div className="relative">
                <select
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={filters.category}
                  onChange={(e) => handleFilterChange({ ...filters, category: e.target.value })}
                >
                  <option value="all">All Event Types</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
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
        <h2 className="text-lg font-semibold">Event Statistics</h2>
        <VisualizationSelector 
          onSelect={setVisualizationType}
          defaultType={visualizationType}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Events by Category</CardTitle>
            <CardDescription>Distribution of cultural events by category</CardDescription>
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
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Events" 
                      fill="#ec4899" 
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
            <CardTitle>Achievement Distribution</CardTitle>
            <CardDescription>Student achievements in cultural events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {visualizationType === "bar" ? (
                  <BarChart
                    data={achievementData}
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
                      fill="#8b5cf6" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={achievementData}
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
                      {achievementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Events Over Time</CardTitle>
          <CardDescription>Trend of cultural events by year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="events" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Cultural Events Data</CardTitle>
          <CardDescription>Detailed information about cultural events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Event Name</th>
                    <th className="py-3 px-4 text-left font-medium">Host</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Achievement</th>
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="border-t">
                      <td className="py-3 px-4">{event.eventName}</td>
                      <td className="py-3 px-4">{event.host}</td>
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

export default CulturalEvents;