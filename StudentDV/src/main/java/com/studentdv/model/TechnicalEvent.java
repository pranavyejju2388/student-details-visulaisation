package com.studentdv.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "technical_events")
public class TechnicalEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Column(nullable = false)
    private String host;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String achievement;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String department;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
} 