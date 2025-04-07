import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, RefreshCw, Loader2 } from "lucide-react";
import axios from "axios";
import Charts from "../components/Charts";

const PlacementData = () => {
  const [filters, setFilters] = useState({
    department: "all",
    fromYear: "all",
    toYear: "all",
    company: "all"
  });
  const [stats, setStats] = useState({
    totalPlacements: 0,
    averagePackage: 0,
    topCompany: "N/A"
  });
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [yearlyTrendData, setYearlyTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visualizationType, setVisualizationType] = useState("bar");

  // Format data safely with fallbacks
  const formatData = (data, nameKey, valueKey) => {
    if (!Array.isArray(data)) return [];
    return data.map(item => ({
      [nameKey]: item[nameKey] || item[0] || 'Unknown',
      [valueKey]: item[valueKey] || item[1] || 0
    }));
  };

  // Fetch data with comprehensive error handling
  const fetchData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryString = new URLSearchParams(params).toString();
      const baseUrl = 'http://localhost:8080/api/placement-data';

      const endpoints = [
        axios.get(`${baseUrl}/stats?${queryString}`),
        axios.get(`${baseUrl}/department-stats?${queryString}`),
        axios.get(`${baseUrl}/yearly-stats?${queryString}`),
        axios.get(`${baseUrl}/companies`),
        axios.get(`${baseUrl}/stats?groupBy=company&${queryString}`)
      ];

      const responses = await Promise.all(
        endpoints.map(p => p.catch(e => {
          console.error("API Error:", e);
          return { data: null };
        }))
      );

      const [statsRes, deptsRes, yearsRes, companiesRes, companyStatsRes] = responses;

      // Set basic stats with fallbacks
      setStats({
        totalPlacements: statsRes?.data?.totalPlacements || 0,
        averagePackage: statsRes?.data?.averagePackage || 0,
        topCompany: statsRes?.data?.topCompany || "N/A"
      });

      // Set filter options with fallbacks
      setDepartments(formatData(deptsRes?.data, 'department', 'count').map(d => d.department));
      setYears(formatData(yearsRes?.data, 'year', 'count').map(y => y.year).sort((a, b) => b - a));
      setCompanies(companiesRes?.data || []);

      // Format chart data
      setDepartmentData(formatData(deptsRes?.data, 'department', 'count'));
      setCompanyData(formatData(companyStatsRes?.data, 'company', 'hired'));
      setYearlyTrendData(formatData(yearsRes?.data, 'year', 'placements'));

    } catch (error) {
      console.error("Fetch Error:", error);
      setError({
        message: "Failed to load data. Please try again later.",
        details: error.message
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle filter changes with debounce
  const handleFilterChange = useCallback(() => {
    const params = {};
    if (filters.department !== "all") params.department = filters.department;
    if (filters.fromYear !== "all") params.fromYear = filters.fromYear;
    if (filters.toYear !== "all") params.toYear = filters.toYear;
    if (filters.company !== "all") params.company = filters.company;

    fetchData(params);
  }, [filters, fetchData]);

  // Auto-apply filters with debounce
  useEffect(() => {
    const timer = setTimeout(handleFilterChange, 500);
    return () => clearTimeout(timer);
  }, [filters, handleFilterChange]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      department: "all",
      fromYear: "all",
      toYear: "all",
      company: "all"
    });
  }, []);

  if (error) {
    return (
      <div className="flex-grow p-6 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md text-center max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mt-4">Placement Data</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {['totalPlacements', 'averagePackage', 'topCompany'].map((stat) => (
          <div key={stat} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold capitalize">
              {stat.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin inline" />
              ) : stat === 'averagePackage' ? (
                `${stats[stat]?.toFixed(1) || 0} LPA`
              ) : (
                stats[stat] || 'N/A'
              )}
            </p>
            <p className="text-sm text-gray-500">
              {stat === 'totalPlacements' ? 'For selected filters' : 
               stat === 'averagePackage' ? 'Across all departments' : 
               'Most placements'}
            </p>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 mt-4 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-md ${visualizationType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setVisualizationType('bar')}
            >
              Bar
            </button>
            <button
              className={`px-3 py-1 rounded-md ${visualizationType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setVisualizationType('pie')}
            >
              Pie
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {[
            { id: 'department', label: 'Department', options: departments },
            { id: 'fromYear', label: 'From Year', options: years },
            { id: 'toYear', label: 'To Year', options: years },
            { id: 'company', label: 'Company', options: companies }
          ].map((filter) => (
            <div key={filter.id} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{filter.label}</label>
              <div className="relative">
                <select
                  className="w-full p-2 pr-8 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={filters[filter.id]}
                  onChange={(e) => setFilters({...filters, [filter.id]: e.target.value})}
                  disabled={loading}
                >
                  <option value="all">All {filter.label}s</option>
                  {filter.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-400 transition-all disabled:opacity-50"
            onClick={resetFilters}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4" />
            Reset Filters
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50"
            onClick={handleFilterChange}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply Filters"}
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <Charts
        visualizationType={visualizationType}
        departmentData={departmentData}
        companyData={companyData}
        yearlyTrendData={yearlyTrendData}
        isLoading={loading}
        error={error}
      />
    </div>
  );
};

export default PlacementData;