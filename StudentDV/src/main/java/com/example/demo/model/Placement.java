package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "placements") // Renamed to "placements" for consistency
public class Placement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String studentName;
    private String company;
    private String jobRole;
    private int year;

    // Constructors
    public Placement() {}

    public Placement(String studentName, String company, String jobRole, int year) {
        this.studentName = studentName;
        this.company = company;
        this.jobRole = jobRole;
        this.year = year;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
