
import { useState } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import FilterSection from "../components/FilterSection";
import StatCard from "../components/StatCard";
import VisualizationSelector from "../components/VisualizationSelector";
import { eventStats } from "../utils/data";
import { Calendar, Users } from "lucide-react";

const EventsData = () => {
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
  
  return (  
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events Data</h1>
        <VisualizationSelector onSelect={setVizType} defaultType={vizType} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Events" 
          value={eventStats.totalEvents}
          description="Events held this year"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard 
          title="Upcoming Events" 
          value={eventStats.upcomingEvents}
          description="Events scheduled next week"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard 
          title="Total Participants" 
          value={eventStats.totalParticipants}
          description="Students who participated in events"
          icon={<Users className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <FilterSection onFilterChange={handleFilterChange} showEventTypes={true} />
        </div>
        
        <Card className="chart-container lg:col-span-2">
          <CardHeader>
            <CardTitle>Events by Type</CardTitle>
            <CardDescription>Distribution of events by category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
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
          <CardTitle>Participation by Department</CardTitle>
          <CardDescription>
            Number of students participated from each department
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={eventStats.participationByDepartment}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="department" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.split(' ')[0]}
              />
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
              <Bar 
                dataKey="participants" 
                fill="#8b5cf6" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsData;
