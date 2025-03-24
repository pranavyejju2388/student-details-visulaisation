package com.example.demo.controller;

import com.example.demo.model.CulturalEvent;
import com.example.demo.repository.CulturalEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cultural-events")
@Transactional
public class CulturalEventController {

    private final CulturalEventRepository culturalEventRepository;

    @Autowired
    public CulturalEventController(CulturalEventRepository culturalEventRepository) {
        this.culturalEventRepository = culturalEventRepository;
    }

    @GetMapping
    public ResponseEntity<List<CulturalEvent>> getAllEvents() {
        return ResponseEntity.ok(culturalEventRepository.findAll());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<CulturalEvent>> getEventsByType(@PathVariable String type) {
        return ResponseEntity.ok(culturalEventRepository.findByCategory(type));
    }

    @PostMapping
    public ResponseEntity<CulturalEvent> createEvent(@RequestBody CulturalEvent culturalEvent) {
        return ResponseEntity.ok(culturalEventRepository.save(culturalEvent));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<CulturalEvent>> filterEvents(
            @RequestParam(required = false, defaultValue = "all") String department,
            @RequestParam(required = false, defaultValue = "all") String category,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear) {
        
        Date startDate = culturalEventRepository.parseYearToDate(fromYear, true);
        Date endDate = culturalEventRepository.parseYearToDate(toYear, false);
        
        List<CulturalEvent> events;
        
        if (!"all".equals(department) && !"all".equals(category)) {
            events = culturalEventRepository.findByDepartmentAndCategoryAndDateBetween(department, category, startDate, endDate);
        } else if (!"all".equals(department)) {
            events = culturalEventRepository.findByDepartmentAndDateBetween(department, startDate, endDate);
        } else if (!"all".equals(category)) {
            events = culturalEventRepository.findByCategoryAndDateBetween(category, startDate, endDate);
        } else {
            events = culturalEventRepository.findByDateBetween(startDate, endDate);
        }
        
        return ResponseEntity.ok(events);
    }

    @GetMapping("/stats/category")
    public ResponseEntity<Map<String, Object>> getCategoryStats() {
        var stats = culturalEventRepository.getCategoryStatistics().stream()
            .collect(Collectors.toMap(
                CulturalEventRepository.CategoryStats::getName,
                CulturalEventRepository.CategoryStats::getCount
            ));
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", stats
        ));
    }

    @GetMapping("/stats/achievement")
    public ResponseEntity<Map<String, Object>> getAchievementStats() {
        var stats = culturalEventRepository.getAchievementStatistics().stream()
            .collect(Collectors.toMap(
                CulturalEventRepository.AchievementStats::getName,
                CulturalEventRepository.AchievementStats::getCount
            ));
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", stats
        ));
    }

  @GetMapping("/stats/yearly")
public ResponseEntity<List<Map<String, Object>>> getYearlyEventStats() {
    List<Map<String, Object>> stats = culturalEventRepository.getYearlyEventStatistics().stream()
        .map(stat -> {
            Map<String, Object> map = new HashMap<>();
            map.put("year", stat.getYear());
            map.put("events", stat.getCount());
            return map;
        })
        .collect(Collectors.toList());
    
    return ResponseEntity.ok(stats);
}
}