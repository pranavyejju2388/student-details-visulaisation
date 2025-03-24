import React from "react";
import Charts from "../components/Charts";
import { ChevronDown, RefreshCw } from "lucide-react";

const PlacementData = () => {
  // Departments, years, and companies data
  const departments = ["CSE", "ECE", "MECH", "EEE", "CHEM", "CIVIL"];
  const years = Array.from({ length: 11 }, (_, i) => 2025 - i); // 2025 to 2015
  const companies = ["Oracle", "Google", "Microsoft", "Amazon", "Infosys", "TCS"];

  return (
    <div className="flex-grow p-6 bg-gray-100">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mt-4">Placement Data</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Placements</h3>
          <p className="text-2xl font-bold text-blue-600">245</p>
          <p className="text-sm text-gray-500">For the selected filters</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Average Package</h3>
          <p className="text-2xl font-bold text-blue-600">18.5 LPA</p>
          <p className="text-sm text-gray-500">Across all departments</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Top Hiring Company</h3>
          <p className="text-2xl font-bold text-blue-600">Oracle</p>
          <p className="text-sm text-gray-500">Most placements</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 mt-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {/* Department Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Department</label>
            <div className="relative">
              <select className="w-full p-2 pr-8 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30">
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
              <select className="w-full p-2 pr-8 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30">
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
              <select className="w-full p-2 pr-8 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30">
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
              <select className="w-full p-2 pr-8 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                <option value="all">All Companies</option>
                {companies.map((company) => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Reset Filters Button */}
        <div className="mt-4 flex justify-end">
          <button className="bg-gray-300 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-400 transition-all">
            <RefreshCw className="h-4 w-4" />
            Reset Filters
          </button>
        </div>
      </div>

      {/* Placement Chart */}
      <div className="bg-white p-4 mt-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold">Placements by Department</h3>
        <p className="text-sm text-gray-500">
          Visualizing placement distribution across departments
        </p>
        <Charts />
      </div>
    </div>
  );
};

export default PlacementData;