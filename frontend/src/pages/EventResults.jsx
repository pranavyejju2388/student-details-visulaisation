
import { useState } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
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
import { eventStats } from "../utils/data";

const EventResults = () => {
  const [filters, setFilters] = useState({
    department: "all",
    year: "all",
    eventType: "all"
  });
  const [vizType, setVizType] = useState("bar");
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, we would fetch data based on filters
  };
  
  const handleExport = (format) => {
    alert(`Exporting data as ${format}`);
    // In a real app, this would trigger an export process
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Event Results</h1>
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
          <FilterSection onFilterChange={handleFilterChange} showEventTypes={true} />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Event Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm">Popular Events</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Hackathons and workshops were the most popular events with highest attendance.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm">Department Participation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Computer Science had the highest participation rate across all events.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm">Impact Assessment</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Events directly contributed to 35% increase in placement opportunities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="chart-container lg:col-span-2">
          <CardHeader>
            <CardTitle>Events Performance</CardTitle>
            <CardDescription>
              Analyzing event types and their impact on student engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={eventStats.eventsByType}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} events`, 'Count']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="count" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Department Participation Comparison</CardTitle>
          <CardDescription>
            Comparing participation across departments for different event types
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { department: 'CSE', workshops: 180, hackathons: 120, seminars: 90 },
                { department: 'ECE', workshops: 120, hackathons: 80, seminars: 60 },
                { department: 'ME', workshops: 90, hackathons: 45, seminars: 40 },
                { department: 'CE', workshops: 70, hackathons: 30, seminars: 35 },
                { department: 'PE', workshops: 40, hackathons: 20, seminars: 25 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} participants`, 'Count']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Legend />
              <Bar dataKey="workshops" name="Workshops" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="hackathons" name="Hackathons" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="seminars" name="Seminars" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventResults;
