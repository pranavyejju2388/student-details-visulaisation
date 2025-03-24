package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "society_membership")
public class SocietyMembership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "society_name", nullable = false)
    private String societyName;  // IEEE, ACM, ASME, etc.

    @Column(name = "category")
    private String category;  // Technical, Cultural, Professional

    @Column(name = "members")
    private int members;  // Total members in the society

    @Column(name = "year")
    private int year;  // Membership year

    @Column(name = "department")
    private String department;  // CSE, ECE, ME, etc.

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSocietyName() { return societyName; }
    public void setSocietyName(String societyName) { this.societyName = societyName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getMembers() { return members; }
    public void setMembers(int members) { this.members = members; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
