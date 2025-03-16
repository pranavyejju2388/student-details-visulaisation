
import { useState } from "react";
import { 
  Download, 
  Search, 
  Filter, 
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
import { students } from '../utils/data';


const PlacementReport = () => {
  const [filters, setFilters] = useState({
    department: "all",
    year: "all",
    company: "all"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredStudents = students.filter((student) => {
    // In a real app, we would apply actual filters
    // For demo, just filter by search term
    if (searchQuery.trim() === "") return true;
    
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  const pageSize = parseInt(perPage);
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const handleExport = (format) => {
    alert(`Exporting data as ${format}`);
    // In a real app, this would trigger an export process
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Placed":
        return "status-badge status-placed";
      case "Pending":
        return "status-badge status-pending";
      case "In Progress":
        return "status-badge status-progress";
      default:
        return "status-badge";
    }
  };
  
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
          <FilterSection onFilterChange={handleFilterChange} />
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
                  <TableHead>Package</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.map((student) => (
                  <TableRow key={student.id} className="animate-fade-in">
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.company}</TableCell>
                    <TableCell>{student.position}</TableCell>
                    <TableCell>
                      <span className={getStatusBadgeClass(student.status)}>
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell>{student.package}</TableCell>
                  </TableRow>
                ))}
                
                {paginatedStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No students found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page</span>
              <Select value={perPage} onValueChange={setPerPage}>
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
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, filteredStudents.length)} of{" "}
                {filteredStudents.length} entries
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
                disabled={currentPage === totalPages}
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
