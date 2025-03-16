
import React, { useState } from 'react';
import StudentCard from './StudentCard1';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Example student data
  const students = [
    {
      id: 1,
      name: "John Doe",
      rollNumber: "CS20001",
      email: "john.doe@example.com",
      department: "Computer Science",
      year: "Third Year",
      achievements: ["Hackathon Winner", "Best Project Award"]
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNumber: "EC20015",
      email: "jane.smith@example.com",
      department: "Electronics",
      year: "Final Year",
      achievements: ["Research Paper Published", "Department Topper"]
    },
    {
      id: 3,
      name: "Alex Johnson",
      rollNumber: "ME20042",
      email: "alex.j@example.com",
      department: "Mechanical Engineering",
      year: "Second Year",
      achievements: []
    }
  ];
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>
      
      {filteredStudents.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No students found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StudentList;
