package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "placements")
public class Placement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String company;
    private String jobRole;
    private int year;
    private String departmentName; // Correct field name
    private Double packageAmount;
    private LocalDate date; // Ensure this field exists

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public Double getPackageAmount() { return packageAmount; }
    public void setPackageAmount(Double packageAmount) { this.packageAmount = packageAmount; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}