
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
import { clubMemberships, clubCategories } from "../utils/data";

const ClubsAndSocieties = () => {
  const [filters, setFilters] = useState({
    department: "all",
    fromYear: "all",
    toYear: "all",
    category: "all",
  });
  const [visualizationType, setVisualizationType] = useState("bar");
  
  const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#0ea5e9', '#14b8a6'];
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  // Group data by club category
  const categoryData = clubCategories.map(category => {
    const count = clubMemberships.filter(club => 
      club.category.toLowerCase().includes(category.name.toLowerCase())
    ).length;
    
    return {
      name: category.name,
      count
    };
  });
  
  // Group data by position
  const positionData = [
    { name: "President", value: clubMemberships.filter(club => club.position === "President").length },
    { name: "Secretary", value: clubMemberships.filter(club => club.position === "Secretary").length },
    { name: "Technical Lead", value: clubMemberships.filter(club => club.position === "Technical Lead").length },
    { name: "Member", value: clubMemberships.filter(club => club.position === "Member").length },
    { name: "Other", value: clubMemberships.filter(club => 
      club.position !== "President" && 
      club.position !== "Secretary" && 
      club.position !== "Technical Lead" && 
      club.position !== "Member"
    ).length },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clubs and Societies Visualization</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      <FilterSection 
        onFilterChange={handleFilterChange}
      />
      
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
                  {clubMemberships.map((club) => (
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
