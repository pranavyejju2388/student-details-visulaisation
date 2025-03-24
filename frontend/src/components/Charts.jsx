import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Charts = ({ visualizationType, eventData, achievementData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold">Events by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          {visualizationType === "bar" ? (
            <BarChart data={eventData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          ) : (
            <PieChart>
              <Pie data={eventData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {eventData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold">Achievement Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          {visualizationType === "bar" ? (
            <BarChart data={achievementData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          ) : (
            <PieChart>
              <Pie data={achievementData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {achievementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;