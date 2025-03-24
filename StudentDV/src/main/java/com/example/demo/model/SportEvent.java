package com.example.demo.model;  // Changed package to match your application

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "sport_events")
public class SportEvent {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String eventName;
    
    @Column(nullable = false)
    private String role;
    
    @Column(nullable = false)
    private String type;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false)
    private String achievement;
    
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt = new Date();

    // Default constructor
    public SportEvent() {}

    // Parameterized constructor
    public SportEvent(String eventName, String role, String type, 
                     String category, String achievement, Date date) {
        this.eventName = eventName;
        this.role = role;
        this.type = type;
        this.category = category;
        this.achievement = achievement;
        this.date = date;
    }

    // Getters and setters...
    // [Include all getters and setters for the fields above]
}