package com.example.demo.entity; // or com.example.demo.entity

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "placement_results")
public class PlacementResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String studentName;
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department; // Must point to the properly annotated Department entity
    
    private String company;
    private String position;
    private BigDecimal salaryPackage;
    private Integer academicYear;
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public BigDecimal getSalaryPackage() { return salaryPackage; }
    public void setSalaryPackage(BigDecimal salaryPackage) { this.salaryPackage = salaryPackage; }
    public Integer getAcademicYear() { return academicYear; }
    public void setAcademicYear(Integer academicYear) { this.academicYear = academicYear; }
}