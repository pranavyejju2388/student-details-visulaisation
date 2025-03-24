package com.example.demo.controller;

import com.example.demo.model.Visualization;
import com.example.demo.repository.VisualizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/visualizations")
public class VisualizationController {

    @Autowired
    private VisualizationRepository visualizationRepository;

    // Get all visualizations
    @GetMapping
    public List<Visualization> getAllVisualizations() {
        return visualizationRepository.findAll();
    }

    // Get visualizations by chart type
    @GetMapping("/chart-type")
    public List<Visualization> getVisualizationsByChartType(@RequestParam String chartType) {
        return visualizationRepository.findByChartType(chartType);
    }

    // Get visualizations by category
    @GetMapping("/category")
    public List<Visualization> getVisualizationsByCategory(@RequestParam String category) {
        return visualizationRepository.findByCategory(category);
    }

    // Get visualizations by filter criteria
    @GetMapping("/filter-criteria")
    public List<Visualization> getVisualizationsByFilterCriteria(@RequestParam String filterCriteria) {
        return visualizationRepository.findByFilterCriteria(filterCriteria);
    }

    // Get visualizations by date range
    @GetMapping("/date-range")
    public List<Visualization> getVisualizationsByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {
        return visualizationRepository.findByEventDateBetween(startDate, endDate);
    }

    // Get visualizations by data count greater than or equal to a value
    @GetMapping("/data-count")
    public List<Visualization> getVisualizationsByDataCount(@RequestParam int dataCount) {
        return visualizationRepository.findByDataCountGreaterThanEqual(dataCount);
    }
}