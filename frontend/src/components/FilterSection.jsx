import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { RefreshCw } from "lucide-react";
import { departments } from "../utils/data";

const clubCategories = [
  { id: "cultural", name: "Cultural Club" },
  { id: "technical", name: "Technical Club" },
  { id: "hometeam", name: "Hometeam" },
  { id: "society", name: "Society" },
  { id: "other", name: "Other" }
];

const FilterSection = ({ onFilterChange }) => {
  const [department, setDepartment] = useState("all");
  const [fromYear, setFromYear] = useState("all");
  const [toYear, setToYear] = useState("all");
  const [category, setCategory] = useState("all");

  // Dynamically generate years from 2015 to 2025
  const years = Array.from({ length: 11 }, (_, i) => ({
    id: String(2015 + i),
    name: String(2015 + i)
  }));

  const handleFilterChange = (key, value) => {
    if (key === "department") setDepartment(value);
    if (key === "fromYear") setFromYear(value);
    if (key === "toYear") setToYear(value);
    if (key === "category") setCategory(value);

    const updatedFilters = {
      department: key === "department" ? value : department,
      fromYear: key === "fromYear" ? value : fromYear,
      toYear: key === "toYear" ? value : toYear,
      category: key === "category" ? value : category
    };

    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    setDepartment("all");
    setFromYear("all");
    setToYear("all");
    setCategory("all");
    
    onFilterChange({
      department: "all",
      fromYear: "all",
      toYear: "all",
      category: "all"
    });
  };

  return (
    <div className="filter-section animate-fade-in">
      <h3 className="text-lg font-medium mb-4">Filters</h3>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Department Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Department</label>
          <Select value={department} onValueChange={(value) => handleFilterChange("department", value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* From Year Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium">From Year</label>
          <Select value={fromYear} onValueChange={(value) => handleFilterChange("fromYear", value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select From Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              <SelectItem value="all">All Years</SelectItem>
              {years.map((yr) => (
                <SelectItem key={yr.id} value={yr.id}>
                  {yr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* To Year Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium">To Year</label>
          <Select value={toYear} onValueChange={(value) => handleFilterChange("toYear", value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select To Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              <SelectItem value="all">All Years</SelectItem>
              {years.map((yr) => (
                <SelectItem key={yr.id} value={yr.id}>
                  {yr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Category Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              <SelectItem value="all">All Categories</SelectItem>
              {clubCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Reset Filters Button */}
      <div className="mt-6 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="flex items-center"
        >
          <RefreshCw className="mr-2 h-3.5 w-3.5" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;