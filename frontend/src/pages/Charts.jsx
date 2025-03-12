import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Computer", students: 120 },
  { name: "Electronics", students: 90 },
  { name: "Mechanical", students: 75 },
  { name: "Civil", students: 60 },
  { name: "Petroleum", students: 50 },
];

const pieData = [
  { name: "Technical", value: 40 },
  { name: "Cultural", value: 25 },
  { name: "Sports", value: 20 },
  { name: "Professional", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Charts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold">Students by Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold">Society Membership Distribution</h3>
        <PieChart width={300} height={300}>
          <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default Charts;
