import React, { useState, useEffect } from "react";
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
  Legend,
} from "recharts";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Download, ChevronDown, RefreshCw } from "lucide-react";
import VisualizationSelector from "../components/VisualizationSelector";
import {
  fetchEventsGroupedByCategory,
  fetchAchievementDistribution,
  fetchEventsOverTime,
  fetchFilteredEvents,
} from "../utils/api";

const TechnicalEvents = () => {
  const [filters, setFilters] = useState({
    department: "all",
    fromYear: "all",
    toYear: "all",
    category: "all",
  });
  const [visualizationType, setVisualizationType] = useState("bar");
  const [eventData, setEventData] = useState([]);
  const [achievementData, setAchievementData] = useState([]);
  const [eventsOverTime, setEventsOverTime] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Define the arrays for dropdown options
  const departments = [
    { id: "all", name: "All Departments" },
    { id: "cse", name: "Computer Science" },
    { id: "ece", name: "Electronics" },
    { id: "me", name: "Mechanical" },
    { id: "ce", name: "Civil" },
    { id: "pe", name: "Petroleum" },
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2025 - i); // Generates years from 2025 to 2015
  const eventTypes = [
    { id: "all", name: "All Event Types" },
    { id: "hackathon", name: "Hackathons" },
    { id: "workshop", name: "Workshops" },
    { id: "competition", name: "Competitions" },
    { id: "techfest", name: "Technical Fest Tathva" },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Fetching data with filters:", filters);

        // Fetch data based on filters
        const groupedByCategory = await fetchEventsGroupedByCategory(filters);
        const achievementDistribution = await fetchAchievementDistribution(filters);
        const eventsOverTimeData = await fetchEventsOverTime(filters);
        const filteredEventsData = await fetchFilteredEvents(filters);

        console.log("Events by Category:", groupedByCategory);
        console.log("Achievement Distribution:", achievementDistribution);
        console.log("Events Over Time:", eventsOverTimeData);
        console.log("Filtered Events:", filteredEventsData);

        // Transform data into the correct format
        const transformedEventData = Object.entries(groupedByCategory).map(([name, value]) => ({
          name,
          value,
        }));

        const transformedAchievementData = Object.entries(achievementDistribution).map(([name, value]) => ({
          name,
          value,
        }));

        const transformedEventsOverTime = Object.entries(eventsOverTimeData).map(([name, value]) => ({
          name,
          value,
        }));

        // Update state with transformed data
        setEventData(transformedEventData);
        setAchievementData(transformedAchievementData);
        setEventsOverTime(transformedEventsOverTime);
        setFilteredEvents(filteredEventsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    loadData();
  }, [filters]); // Re-fetch data when filters change

  const handleFilterChange = (filterType, value) => {
    console.log(`Filter changed: ${filterType} = ${value}`);
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const resetFilters = () => {
    setFilters({
      department: "all",
      fromYear: "all",
      toYear: "all",
      category: "all",
    });
  };

  const COLORS = ["#f43f5e", "#8b5cf6", "#ec4899", "#6366f1", "#14b8a6", "#0ea5e9"];

  return (
    <div className="space-y-6">
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
                  <option value="all">All Departments</option>
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

            {/* Event Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Type</label>
              <div className="relative">
                <select
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  <option value="all">All Event Types</option>
                  {eventTypes.map((type) => (
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

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Events by Category</CardTitle>
            <CardDescription>Distribution of technical events by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {eventData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  {visualizationType === "bar" ? (
                    <BarChart data={eventData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#007bff" />
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={eventData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {eventData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievement Distribution</CardTitle>
            <CardDescription>Student achievements in technical events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {achievementData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  {visualizationType === "bar" ? (
                    <BarChart data={achievementData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#00C49F" />
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={achievementData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {achievementData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Events Over Time</CardTitle>
          <CardDescription>Trend of technical events by year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {eventsOverTime.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={eventsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No data available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Events Data</CardTitle>
          <CardDescription>Detailed information about technical events</CardDescription>
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
                  {filteredEvents.map((event, index) => (
                    <tr key={index} className="border-t">
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

export default TechnicalEvents;