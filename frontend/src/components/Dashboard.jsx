import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Charts from "./Charts";
import PlacementData from "./PlacementData";
const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6 bg-gray-100">
        <Navbar />
        <h1 className="text-2xl font-semibold mt-4">Student Details Overview</h1>

        {/* Filters */}
        <div className="bg-white p-4 mt-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <select className="border p-2 rounded-md">
              <option>All Departments</option>
            </select>
            <select className="border p-2 rounded-md">
              <option>All Companies</option>
            </select>
            <select className="border p-2 rounded-md">
              <option>All Years</option>
            </select>
            <select className="border p-2 rounded-md">
              <option>All Years</option>
            </select>
          </div>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Reset Filters</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Total Students</h3>
            <p className="text-2xl font-bold">750</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Placement Rate</h3>
            <p className="text-2xl font-bold">78%</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Society Members</h3>
            <p className="text-2xl font-bold">325</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Academic Achievements</h3>
            <p className="text-2xl font-bold">86</p>
          </div>
        </div>

        {/* Charts */}
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
