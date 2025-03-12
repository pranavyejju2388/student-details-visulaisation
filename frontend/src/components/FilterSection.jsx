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
import { 
  departments, 
  companies, 
  eventTypes, 
  years 
} from "../utils/data";

const FilterSection = ({ showEventTypes = false, onFilterChange }) => {
  const [department, setDepartment] = useState("all");
  const [fromYear, setFromYear] = useState("all");
  const [toYear, setToYear] = useState("all");
  const [company, setCompany] = useState("all");
  const [eventType, setEventType] = useState("all");

  const handleFilterChange = (key, value) => {
    if (key === "department") setDepartment(value);
    if (key === "fromYear") setFromYear(value);
    if (key === "toYear") setToYear(value);
    if (key === "company") setCompany(value);
    if (key === "eventType") setEventType(value);

    const updatedFilters = {
      department: key === "department" ? value : department,
      fromYear: key === "fromYear" ? value : fromYear,
      toYear: key === "toYear" ? value : toYear,
      company: key === "company" ? value : company,
      eventType: key === "eventType" ? value : eventType
    };

    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    setDepartment("all");
    setFromYear("all");
    setToYear("all");
    setCompany("all");
    setEventType("all");
    
    onFilterChange({
      department: "all",
      fromYear: "all",
      toYear: "all",
      company: "all",
      eventType: "all"
    });
  };

  return (
    <div className="filter-section animate-fade-in">
      <h3 className="text-lg font-medium mb-4">Filters</h3>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Department</label>
          <Select value={department} onValueChange={(value) => handleFilterChange("department", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">From Year</label>
          <Select value={fromYear} onValueChange={(value) => handleFilterChange("fromYear", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select From Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((yr) => (
                <SelectItem key={yr.id} value={yr.id}>
                  {yr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">To Year</label>
          <Select value={toYear} onValueChange={(value) => handleFilterChange("toYear", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select To Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((yr) => (
                <SelectItem key={yr.id} value={yr.id}>
                  {yr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Company</label>
          <Select value={company} onValueChange={(value) => handleFilterChange("company", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((comp) => (
                <SelectItem key={comp.id} value={comp.id}>
                  {comp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {showEventTypes && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Event Type</label>
            <Select value={eventType} onValueChange={(value) => handleFilterChange("eventType", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Event Type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
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
