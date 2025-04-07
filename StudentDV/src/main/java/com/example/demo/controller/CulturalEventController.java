package com.example.demo.controller;

import com.example.demo.model.CulturalEvent;
import com.example.demo.repository.CulturalEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class CulturalEventController {

    private final CulturalEventRepository culturalEventRepository;

    @Autowired
    public CulturalEventController(CulturalEventRepository culturalEventRepository) {
        this.culturalEventRepository = culturalEventRepository;
    }

    @GetMapping("/cultural")
    public ResponseEntity<List<CulturalEvent>> getAllCulturalEvents() {
        return ResponseEntity.ok(culturalEventRepository.findAll());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<CulturalEvent>> getEventsByType(@PathVariable String type) {
        return ResponseEntity.ok(culturalEventRepository.findByCategory(type));
    }

    @GetMapping("/cultural/filter")
    public ResponseEntity<List<CulturalEvent>> filterCulturalEvents(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear) {
        
        Date startDate = fromYear != null ? culturalEventRepository.parseYearToDate(fromYear, true) : null;
        Date endDate = toYear != null ? culturalEventRepository.parseYearToDate(toYear, false) : null;
        
        List<CulturalEvent> events;
        
        if (department != null && category != null && startDate != null && endDate != null) {
            events = culturalEventRepository.findByDepartmentAndCategoryAndDateBetween(
                department, category, startDate, endDate);
        } else if (department != null && startDate != null && endDate != null) {
            events = culturalEventRepository.findByDepartmentAndDateBetween(
                department, startDate, endDate);
        } else if (category != null && startDate != null && endDate != null) {
            events = culturalEventRepository.findByCategoryAndDateBetween(
                category, startDate, endDate);
        } else if (startDate != null && endDate != null) {
            events = culturalEventRepository.findByDateBetween(startDate, endDate);
        } else if (department != null) {
            events = culturalEventRepository.findByDepartment(department);
        } else if (category != null) {
            events = culturalEventRepository.findByCategory(category);
        } else {
            events = culturalEventRepository.findAll();
        }
        
        return ResponseEntity.ok(events);
    }

    @GetMapping("/cultural/stats/category")
    public ResponseEntity<Map<String, Long>> getCategoryStats() {
        Map<String, Long> stats = culturalEventRepository.getCategoryStatistics().stream()
            .collect(Collectors.toMap(
                stat -> stat.getName(),
                stat -> stat.getCount()
            ));
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/cultural/stats/achievement")
    public ResponseEntity<Map<String, Long>> getAchievementStats() {
        Map<String, Long> stats = culturalEventRepository.getAchievementStatistics().stream()
            .collect(Collectors.toMap(
                stat -> stat.getName(),
                stat -> stat.getCount()
            ));
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/cultural/stats/yearly")
    public ResponseEntity<List<CulturalEventRepository.YearlyEventStats>> getYearlyEventStats() {
        return ResponseEntity.ok(culturalEventRepository.getYearlyEventStatistics());
    }

    public ResponseEntity<CulturalEvent> createCulturalEvent(CulturalEvent newEvent) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createCulturalEvent'");
    }
}