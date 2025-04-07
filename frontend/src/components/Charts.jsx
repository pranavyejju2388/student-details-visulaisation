import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend
} from "recharts";
import { Loader2 } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Charts = ({ 
  visualizationType, 
  departmentData = [], 
  companyData = [],
  yearlyTrendData = [],
  isLoading = false,
  error = null
}) => {
  // Safe data check functions
  const hasDepartmentData = Array.isArray(departmentData) && departmentData.length > 0;
  const hasCompanyData = Array.isArray(companyData) && companyData.length > 0;
  const hasYearlyData = Array.isArray(yearlyTrendData) && yearlyTrendData.length > 0;

  // Format company data for chart - handles both array of arrays and array of objects
  const formatCompanyData = (data) => {
    if (!Array.isArray(data)) return [];
    
    // Handle array of arrays format (like [['CompanyA', 10], ['CompanyB', 5]])
    if (Array.isArray(data[0]) && data[0].length === 2) {
      return data.map(([company, hired]) => ({
        name: company || 'Unknown',
        hired: hired || 0
      }));
    }
    
    // Handle array of objects format (like [{company: 'CompanyA', hired: 10}])
    return data.map(item => ({
      name: item.company || item.name || 'Unknown',
      hired: item.hired || item.count || 0
    }));
  };

  const formattedCompanyData = formatCompanyData(companyData);

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 text-red-600">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error Loading Charts</h3>
          <p>{error.message || "Failed to load chart data"}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Department-wise Placements */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Placements by Department</h3>
        <div className="h-80">
          {hasDepartmentData ? (
            <ResponsiveContainer width="100%" height="100%">
              {visualizationType === "bar" ? (
                <BarChart
                  data={departmentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Placements" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="department"
                    label={({ department, percent }) => `${department}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No department data available
            </div>
          )}
        </div>
      </div>

      {/* Company-wise Placements */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Top Hiring Companies</h3>
        <div className="h-80">
          {hasCompanyData ? (
            <ResponsiveContainer width="100%" height="100%">
              {visualizationType === "bar" ? (
                <BarChart
                  data={formattedCompanyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    content={<CustomTooltip />}
                    formatter={(value) => [`${value} Students`, "Hired"]}
                  />
                  <Legend />
                  <Bar 
                    dataKey="hired" 
                    name="Students Hired" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={formattedCompanyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hired"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {formattedCompanyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip />}
                    formatter={(value) => [`${value} Students`, "Hired"]}
                  />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No company data available
            </div>
          )}
        </div>
      </div>

      {/* Yearly Trend */}
      {hasYearlyData && (
        <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Yearly Placement Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={yearlyTrendData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip 
                  content={<CustomTooltip />}
                  formatter={(value) => [`${value} Students`, "Placements"]}
                  labelFormatter={(year) => `Year: ${year}`}
                />
                <Legend />
                <Bar 
                  dataKey="placements" 
                  name="Placements" 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;