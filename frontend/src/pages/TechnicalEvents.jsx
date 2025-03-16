import { useState } from "react"; 
import { Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { ChevronDown, RefreshCw } from "lucide-react";

const TechnicalEvents = () => {
  const eventData = [
    { name: "Hackathon", value: 1 },
    { name: "Workshop", value: 1 },
    { name: "Competitions", value: 1 },
    { name: "TechnicalFest - Tathva", value: 1 },
    { name: "Other Technical Events", value: 1 }
  ];

  const achievementData = [
    { name: "First Place", value: 1 },
    { name: "Second Place", value: 1 },
    { name: "Third Place", value: 1 },
    { name: "Participation", value: 2 },
    { name: "Other", value: 0 }
  ];

  const eventDetails = [
    { event: "CodeFest 2023", host: "Tech Institute", category: "Hackathon", achievement: "First Place", date: "2023-05-15" },
    { event: "WebDev Workshop", host: "CS Department", category: "Workshop", achievement: "Participation", date: "2023-06-22" },
    { event: "Algorithm Challenge", host: "CodeChef", category: "Competitions", achievement: "Third Place", date: "2023-07-10" },
    { event: "Tathva Hackathon", host: "NIT Calicut", category: "TechnicalFest - Tathva", achievement: "Second Place", date: "2023-10-05" },
    { event: "ML Competition", host: "IIT Madras", category: "Other Technical Events", achievement: "Participation", date: "2023-11-12" }
  ];

  // Departments, years, and event types data
  const departments = ["CSE", "ECE", "MECH", "EEE", "CHEM", "CIVIL"];
  const years = Array.from({ length: 11 }, (_, i) => 2025 - i); // 2025 to 2015
  const eventTypes = ["Hackathons", "Workshops", "Competitions", "Technical Fest Tathva", "Other Technical Events"];
  const [selectedYearFrom, setSelectedYearFrom] = useState("all");
  const [selectedYearTo, setSelectedYearTo] = useState("all");

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
              <select className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30">
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
              {/* From Year */}
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

              {/* To Year */}
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
              <select className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30">
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
              onClick={() => {
                // Reset filters logic here
              }}
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
          <Bar data={eventData} dataKey="value" fill="blue" />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Achievement Distribution</h2>
          <Bar data={achievementData} dataKey="value" fill="green" />
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
            />
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Achievement Trends</h2>
          <LineChart width={400} height={300} data={achievementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
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
            {eventDetails.map((event, index) => (
              <tr key={index}>
                <td>{event.event}</td>
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