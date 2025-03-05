import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Charts from "./Charts";

const PlacementData = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-6 bg-gray-100">
        <Navbar />

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
            <p className="text-2xl font-bold text-blue-600">Tech Corp</p>
            <p className="text-sm text-gray-500">Most placements</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 mt-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <select className="border p-2 rounded-md">
              <option>All Departments</option>
            </select>
            <select className="border p-2 rounded-md">
              <option>All Years</option>
            </select>
            <select className="border p-2 rounded-md">
              <option>All Years</option>
            </select>
            <select className="border p-2 rounded-md">
              <option>All Companies</option>
            </select>
          </div>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
            Reset Filters
          </button>
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
    </div>
  );
};

export default PlacementData;
