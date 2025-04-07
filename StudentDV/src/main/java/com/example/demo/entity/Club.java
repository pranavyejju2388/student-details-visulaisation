package com.example.demo.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clubs")
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String description;
    
    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClubMembership> memberships = new ArrayList<>();

    public Club(Long id2, String name2, String category2, String department) {
        //TODO Auto-generated constructor stub
    }
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<ClubMembership> getMemberships() { return memberships; }
    public void setMemberships(List<ClubMembership> memberships) { this.memberships = memberships; }

    // Helper methods
    public void addMembership(ClubMembership membership) {
        memberships.add(membership);
        membership.setClub(this);
    }
}