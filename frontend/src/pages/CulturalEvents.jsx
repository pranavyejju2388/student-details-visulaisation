
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
import { Download } from "lucide-react";
import FilterSection from "../components/FilterSection";
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
  
  // Group data by category for visualization
  const categoryData = culturalCategories.map(category => {
    const count = culturalEvents.filter(event => 
      event.category.toLowerCase().includes(category.name.toLowerCase())
    ).length;
    
    return {
      name: category.name,
      count
    };
  });
  
  // Group data by achievement status
  const achievementData = [
    { name: "First Place", value: culturalEvents.filter(event => event.achievement.includes("First")).length },
    { name: "Second Place", value: culturalEvents.filter(event => event.achievement.includes("Second")).length },
    { name: "Third Place", value: culturalEvents.filter(event => event.achievement.includes("Third")).length },
    { name: "Participation", value: culturalEvents.filter(event => event.achievement.includes("Participation")).length },
    { name: "Other", value: culturalEvents.filter(event => 
      !event.achievement.includes("First") && 
      !event.achievement.includes("Second") && 
      !event.achievement.includes("Third") && 
      !event.achievement.includes("Participation")
    ).length },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Cultural Events Visualization</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      <FilterSection 
        onFilterChange={handleFilterChange}
        showEventTypes={true}
      />
      
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
                  {culturalEvents.map((event) => (
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
