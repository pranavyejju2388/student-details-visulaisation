import { useState, useEffect } from "react";
import { 
  Download, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  FileSpreadsheet 
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Card } from "../components/ui/card";
import FilterSection from "../components/FilterSection";
import axios from 'axios';

const PlacementReport = () => {
  const [filters, setFilters] = useState({
    department: "all",
    fromYear: "all",
    toYear: "all",
    category: "all"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [deptsRes, yearsRes, catsRes] = await Promise.all([
          axios.get('http://localhost:8080/api/placement-reports/departments'),
          axios.get('http://localhost:8080/api/placement-reports/years'),
          axios.get('http://localhost:8080/api/placement-reports/categories')
        ]);
        
        setDepartments(deptsRes.data);
        setYears(yearsRes.data);
        setCategories(catsRes.data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };
    
    fetchFilterOptions();
  }, []);
  
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/placement-reports', {
          params: {
            search: searchQuery,
            department: filters.department === "all" ? "" : filters.department,
            fromYear: filters.fromYear === "all" ? "" : filters.fromYear,
            toYear: filters.toYear === "all" ? "" : filters.toYear,
            category: filters.category === "all" ? "" : filters.category,
            page: currentPage - 1,
            size: perPage
          }
        });
        
        setReports(response.data.content);
        setTotalReports(response.data.totalElements);
      } catch (error) {
        console.error("Error fetching placement reports:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, [filters, searchQuery, currentPage, perPage]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  
  const handleExport = async (format) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/placement-reports/export', 
        null,
        { params: { format } }
      );
      alert(response.data);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Placed":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs";
      case "In Progress":
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
    }
  };
  
  const totalPages = Math.ceil(totalReports / parseInt(perPage));
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Placement Report</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport("csv")}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("excel")}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("pdf")}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <FilterSection 
            departments={departments}
            years={years}
            categories={categories}
            onFilterChange={handleFilterChange} 
          />
        </div>
        
        <Card className="table-container lg:col-span-2">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Package (kPA)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : reports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No placement records found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.studentName}</TableCell>
                      <TableCell>{report.department}</TableCell>
                      <TableCell>{report.company}</TableCell>
                      <TableCell>{report.position}</TableCell>
                      <TableCell>
                        <span className={getStatusBadgeClass(report.status)}>
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell>{report.packageAmount} kPA</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page</span>
              <Select value={perPage} onValueChange={(value) => {
                setPerPage(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              
              <span className="text-sm text-muted-foreground ml-4">
                Showing {(currentPage - 1) * parseInt(perPage) + 1} to{" "}
                {Math.min(currentPage * parseInt(perPage), totalReports)} of{" "}
                {totalReports} entries
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlacementReport;