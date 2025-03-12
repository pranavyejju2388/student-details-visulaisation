
import { useState } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
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
  Legend,
  LineChart,
  Line
} from "recharts";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import FilterSection from "../components/FilterSection";
import VisualizationSelector from "../components/VisualizationSelector";
import { placementStats } from "../utils/data";

const PlacementResults = () => {
  const [filters, setFilters] = useState({
    department: "all",
    year: "all",
    company: "all"
  });
  const [vizType, setVizType] = useState("bar");
  
  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, we would fetch data based on filters
  };
  
  const handleExport = (format) => {
    alert(`Exporting data as ${format}`);
    // In a real app, this would trigger an export process
  };
  
  const renderVisualization = () => {
    if (vizType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={placementStats.companyDistribution}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={160}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="percentage"
              nameKey="company"
              label={({ company, percentage }) => `${company} ${percentage}%`}
              animationDuration={1500}
            >
              {placementStats.companyDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Percentage']}
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={placementStats.placementsByDepartment}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} placements`, 'Count']}
            contentStyle={{ 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: 'none'
            }}
          />
          <Legend />
          <Bar 
            dataKey="placements" 
            fill="#2563eb" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Placement Results</h1>
        <div className="flex items-center gap-3">
          <VisualizationSelector onSelect={setVizType} defaultType={vizType} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <FilterSection onFilterChange={handleFilterChange} />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm">Highest Packages</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Computer Science department has the highest average package at 22 LPA.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm">Placement Trend</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Placement rate increased by 12% compared to the previous year.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm">Top Companies</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Tech Corp, StartUp Inc, and Enterprise Co hired 80% of all placed students.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="chart-container lg:col-span-2">
          <CardHeader>
            <CardTitle>Placement Results Visualization</CardTitle>
            <CardDescription>
              Interactive visualization of placement data based on selected filters
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderVisualization()}
          </CardContent>
        </Card>
      </div>
      
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Placement Trends Over Time</CardTitle>
          <CardDescription>
            Year-on-year placement performance
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { year: '2020', placements: 180 },
                { year: '2021', placements: 200 },
                { year: '2022', placements: 220 },
                { year: '2023', placements: 230 },
                { year: '2024', placements: 245 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} placements`, 'Count']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="placements" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementResults;
