package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "visualizations")
public class Visualization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String chartType;
    private String category;
    private String filterCriteria;
    private int dataCount;

    @Column(name = "event_date")
    private LocalDate eventDate;

    // Constructors
    public Visualization() {}

    public Visualization(String chartType, String category, String filterCriteria, int dataCount, LocalDate eventDate) {
        this.chartType = chartType;
        this.category = category;
        this.filterCriteria = filterCriteria;
        this.dataCount = dataCount;
        this.eventDate = eventDate;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getChartType() { return chartType; }
    public void setChartType(String chartType) { this.chartType = chartType; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getFilterCriteria() { return filterCriteria; }
    public void setFilterCriteria(String filterCriteria) { this.filterCriteria = filterCriteria; }

    public int getDataCount() { return dataCount; }
    public void setDataCount(int dataCount) { this.dataCount = dataCount; }

    public LocalDate getEventDate() { return eventDate; }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }
}
