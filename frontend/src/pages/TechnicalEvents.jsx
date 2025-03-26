import { useState, useEffect } from "react"; 
import { Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { ChevronDown, RefreshCw } from "lucide-react";

const TechnicalEvents = () => {
  const [eventData, setEventData] = useState([]);
  const [achievementData, setAchievementData] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Departments, years, and event types data
  const departments = ["CSE", "ECE", "MECH", "EEE", "CHEM", "CIVIL"];
  const years = Array.from({ length: 11 }, (_, i) => 2025 - i); // 2025 to 2015
  const mainEventTypes = ["Hackathon", "Workshop", "Competition", "Technical Fest"];
  const eventTypes = [...mainEventTypes, "Other"];
  const [selectedYearFrom, setSelectedYearFrom] = useState("all");
  const [selectedYearTo, setSelectedYearTo] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedEventType, setSelectedEventType] = useState("all");

  // Function to categorize event type
  const categorizeEventType = (eventType) => {
    return mainEventTypes.includes(eventType) ? eventType : "Other";
  };

  useEffect(() => {
    fetchData();
  }, [selectedDepartment, selectedYearFrom, selectedYearTo, selectedEventType]);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching data with filters:', {
        department: selectedDepartment,
        yearFrom: selectedYearFrom,
        yearTo: selectedYearTo,
        eventType: selectedEventType
      });
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (selectedDepartment !== 'all') {
        queryParams.append('department', selectedDepartment);
      }
      if (selectedYearFrom !== 'all') {
        queryParams.append('startDate', `${selectedYearFrom}-01-01`);
      }
      if (selectedYearTo !== 'all') {
        queryParams.append('endDate', `${selectedYearTo}-12-31`);
      }
      if (selectedEventType !== 'all') {
        // If "Other" is selected, we need to handle it differently
        if (selectedEventType === 'Other') {
          // Add a parameter to indicate we want non-main categories
          queryParams.append('category', 'Other');
        } else {
          queryParams.append('category', selectedEventType);
        }
        console.log('Adding category filter:', selectedEventType);
      }

      // Log the full URL for debugging
      console.log('API URL:', `http://localhost:8080/api/technical-events?${queryParams.toString()}`);

      // Fetch all events with filters
      const eventsResponse = await fetch(`http://localhost:8080/api/technical-events?${queryParams.toString()}`);
      if (!eventsResponse.ok) {
        throw new Error(`HTTP error! status: ${eventsResponse.status}`);
      }
      const events = await eventsResponse.json();
      console.log('Events fetched:', events);
      
      // Fetch category stats with filters
      const categoryStatsResponse = await fetch(`http://localhost:8080/api/technical-events/stats/category?${queryParams.toString()}`);
      if (!categoryStatsResponse.ok) {
        throw new Error(`HTTP error! status: ${categoryStatsResponse.status}`);
      }
      const categoryStats = await categoryStatsResponse.json();
      console.log('Category stats fetched:', categoryStats);
      
      // Fetch achievement stats with filters
      const achievementStatsResponse = await fetch(`http://localhost:8080/api/technical-events/stats/achievement?${queryParams.toString()}`);
      if (!achievementStatsResponse.ok) {
        throw new Error(`HTTP error! status: ${achievementStatsResponse.status}`);
      }
      const achievementStats = await achievementStatsResponse.json();
      console.log('Achievement stats fetched:', achievementStats);

      // Transform data for charts
      const categoryData = Object.entries(categoryStats).map(([name, value]) => ({
        name: name === "Other" ? "Other" : name,
        value
      }));

      const achievementData = Object.entries(achievementStats).map(([name, value]) => ({
        name,
        value
      }));

      // Log the transformed data
      console.log('Transformed category data:', categoryData);
      console.log('Transformed achievement data:', achievementData);

      setEventData(categoryData);
      setAchievementData(achievementData);
      setEventDetails(events);
      setError(null);
    } catch (err) {
      console.error('Detailed error:', err);
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedDepartment("all");
    setSelectedYearFrom("all");
    setSelectedYearTo("all");
    setSelectedEventType("all");
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Technical Events Visualization</h1>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow p-4 my-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Department Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Department</label>
            <div className="relative">
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Year Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Year Range</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <select
                  value={selectedYearFrom}
                  onChange={(e) => setSelectedYearFrom(e.target.value)}
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="all">From</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  value={selectedYearTo}
                  onChange={(e) => setSelectedYearTo(e.target.value)}
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="all">To</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Event Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Event Type</label>
            <div className="relative">
              <select 
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="all">All Event Types</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Reset and Export Buttons */}
          <div className="flex items-end">
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg mr-2 flex items-center"
              onClick={handleResetFilters}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Filters
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Export Data</button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Events by Category</h2>
          <Bar 
            data={eventData} 
            dataKey="value" 
            fill="blue"
            key="category-bar"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Achievement Distribution</h2>
          <Bar 
            data={achievementData} 
            dataKey="value" 
            fill="green"
            key="achievement-bar"
          />
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Event Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={eventData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
              key="category-pie"
            />
            <Tooltip key="category-tooltip" />
          </PieChart>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Achievement Trends</h2>
          <LineChart width={400} height={300} data={achievementData}>
            <CartesianGrid strokeDasharray="3 3" key="achievement-grid" />
            <XAxis dataKey="name" key="achievement-xaxis" />
            <YAxis key="achievement-yaxis" />
            <Tooltip key="achievement-tooltip" />
            <Legend key="achievement-legend" />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#82ca9d"
              key="achievement-line"
            />
          </LineChart>
        </div>
      </div>

      {/* Event Details Table */}
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Host</th>
              <th>Category</th>
              <th>Achievement</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {eventDetails.map((event) => (
              <tr key={event.id}>
                <td>{event.eventName}</td>
                <td>{event.host}</td>
                <td>{event.category}</td>
                <td>{event.achievement}</td>
                <td>{event.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnicalEvents;