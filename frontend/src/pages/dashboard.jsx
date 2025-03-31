import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  BriefcaseBusiness, 
  FileText, 
  ExternalLink, 
  Code, 
  Music, 
  Trophy, 
  UsersRound,
  ChevronDown,
  RefreshCw
} from "lucide-react";
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
import StatCard from "../components/StatCard";
import { 
  placementStats, 
  technicalEvents, 
  culturalEvents, 
  sportsEvents, 
  clubMemberships 
} from "../utils/data";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    department: "all",
    fromYear: "all",
    toYear: "all",
    company: "all",
    eventType: "all"
  });

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];

  // First, create a department mapping
  const departmentMapping = {
    "CSE": "Computer Science",
    "ECE": "Electronics",
    "MECH": "Mechanical",
    "EEE": "Electrical",
    "CHEM": "Chemical",
    "CIVIL": "Civil"
  };

  // Update the filterData function
  const filterData = (data, filters) => {
    return data.filter(item => {
      // Department filtering
      const matchesDepartment = filters.department === "all" || item.department === filters.department;

      // Year filtering - Fix the comparison
      let matchesYearRange = true;
      if (item.date && filters.fromYear !== "all" && filters.toYear !== "all") {
        const itemYear = new Date(item.date).getFullYear();
        const fromYear = parseInt(filters.fromYear);
        const toYear = parseInt(filters.toYear);
        matchesYearRange = itemYear >= fromYear && itemYear <= toYear;
      } else if (filters.fromYear !== "all") {
        const itemYear = new Date(item.date).getFullYear();
        matchesYearRange = itemYear >= parseInt(filters.fromYear);
      } else if (filters.toYear !== "all") {
        const itemYear = new Date(item.date).getFullYear();
        matchesYearRange = itemYear <= parseInt(filters.toYear);
      }

      // Company filtering
      const matchesCompany = filters.company === "all" || item.company === filters.company;
      
      return matchesDepartment && matchesYearRange && matchesCompany;
    });
  };

  // Apply filters to each dataset
  const filteredTechnicalEvents = filterData(technicalEvents, filters);
  const filteredCulturalEvents = filterData(culturalEvents, filters);
  const filteredSportsEvents = filterData(sportsEvents, filters);
  const filteredClubMemberships = filterData(clubMemberships, filters);

  // Update the stats calculations to use filtered data
  const totalTechnicalEvents = filteredTechnicalEvents.length;
  const totalCulturalEvents = filteredCulturalEvents.length;
  const totalSportsEvents = filteredSportsEvents.length;
  const totalClubMemberships = filteredClubMemberships.length;

  // Update activity category data with filtered counts
  const activityCategoryData = [
    { name: "Technical", value: totalTechnicalEvents },
    { name: "Cultural", value: totalCulturalEvents },
    { name: "Sports", value: totalSportsEvents },
    { name: "Clubs", value: totalClubMemberships },
  ];

  // Update placement stats filtering
  const filteredPlacementStats = {
    ...placementStats,
    placementsByDepartment: placementStats.placementsByDepartment.filter(stat => {
      const matchesDepartment = filters.department === "all" || 
        stat.department === departmentMapping[filters.department] ||
        stat.department === filters.department;
      
      // Since placement stats don't have year, only filter by department
      return matchesDepartment;
    })
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      department: "all",
      fromYear: "all",
      toYear: "all",
      company: "all",
      eventType: "all"
    });
  };

  // Departments, years, and companies data
  const departments = [
    { value: "CSE", label: "Computer Science" },
    { value: "ECE", label: "Electronics" },
    { value: "MECH", label: "Mechanical" },
    { value: "EEE", label: "Electrical" },
    { value: "CHEM", label: "Chemical" },
    { value: "CIVIL", label: "Civil" }
  ];
  const years = Array.from({ length: 11 }, (_, i) => 2025 - i); // 2025 to 2015
  const companies = ["Salesforce", "DE Shaw", "Wells Fargo", "Oracle", "Google", "Microsoft"];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Student Details Overview</h1>
        <Button asChild variant="outline" className="bg-white hover:bg-gray-100">
          <Link to="/placement-report" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            View Full Report
          </Link>
        </Button>
      </div>

      {/* Filters Section */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                    <option key={dept.value} value={dept.value}>{dept.label}</option>
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

            {/* Company Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <div className="relative">
                <select
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={filters.company}
                  onChange={(e) => handleFilterChange({ ...filters, company: e.target.value })}
                >
                  <option value="all">All Companies</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Reset Filters Button */}
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-100"
                onClick={resetFilters}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Technical Events" 
          value={totalTechnicalEvents}
          description="Student participations"
          icon={<Code className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard 
          title="Cultural Events" 
          value={totalCulturalEvents}
          description="Student participations"
          icon={<Music className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard 
          title="Sports Events" 
          value={totalSportsEvents}
          description="Student participations"
          icon={<Trophy className="h-4 w-4" />}
          trend={{ value: 5, positive: true }}
        />
        <StatCard 
          title="Club Memberships" 
          value={totalClubMemberships}
          description="Active memberships"
          icon={<UsersRound className="h-4 w-4" />}
          trend={{ value: 15, positive: true }}
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-gray-900">Student Activity Categories</CardTitle>
              <CardDescription className="text-gray-500">Distribution of student participation across activities</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" asChild>
              <Link to="/technical-events" className="flex items-center">
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                Details
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityCategoryData}
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
                    {activityCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} events`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Bar Chart Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-gray-900">Placement Statistics</CardTitle>
              <CardDescription className="text-gray-500">Overview of student placement data</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" asChild>
              <Link to="/placement-data" className="flex items-center">
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                Details
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredPlacementStats.placementsByDepartment}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} placements`, 'Count']} />
                  <Legend />
                  <Bar 
                    dataKey="placements" 
                    fill="#2563eb" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Links and Recent Events Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Quick Links Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">Quick Links</CardTitle>
            <CardDescription className="text-gray-500">Quick access to key pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start hover:bg-gray-100" asChild>
                <Link to="/technical-events" className="flex items-center">
                  <Code className="mr-2 h-4 w-4" />
                  Technical Events
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start hover:bg-gray-100" asChild>
                <Link to="/cultural-events" className="flex items-center">
                  <Music className="mr-2 h-4 w-4" />
                  Cultural Events
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start hover:bg-gray-100" asChild>
                <Link to="/sports-events" className="flex items-center">
                  <Trophy className="mr-2 h-4 w-4" />
                  Sports Events
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start hover:bg-gray-100" asChild>
                <Link to="/society-membership" className="flex items-center">
                  <UsersRound className="mr-2 h-4 w-4" />
                  Society Membership
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Events Card */}
        <Card className="md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Events</CardTitle>
            <CardDescription className="text-gray-500">Latest student activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Code className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Hackathon Winners</h4>
                  <p className="text-sm text-gray-500">3 students from CSE won the national hackathon</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-green-500/10 p-2 rounded-full">
                  <Trophy className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Sports Tournament</h4>
                  <p className="text-sm text-gray-500">College cricket team reached semi-finals at state level</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-purple-500/10 p-2 rounded-full">
                  <BriefcaseBusiness className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Placement Drive</h4>
                  <p className="text-sm text-gray-500">15 students placed in top tech companies last week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;