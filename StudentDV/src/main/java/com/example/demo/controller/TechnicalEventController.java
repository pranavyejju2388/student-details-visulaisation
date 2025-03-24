package com.example.demo.controller;

import com.example.demo.model.TechnicalEvent;
import com.example.demo.repository.TechnicalEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/technical-events")
@Transactional
public class TechnicalEventController {

    private final TechnicalEventRepository technicalEventRepository;

    @Autowired
    public TechnicalEventController(TechnicalEventRepository technicalEventRepository) {
        this.technicalEventRepository = technicalEventRepository;
    }

    @GetMapping
    public ResponseEntity<List<TechnicalEvent>> getAllEvents() {
        return ResponseEntity.ok(technicalEventRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<TechnicalEvent> createEvent(@RequestBody TechnicalEvent technicalEvent) {
        return ResponseEntity.ok(technicalEventRepository.save(technicalEvent));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<TechnicalEvent>> filterEvents(
            @RequestParam(required = false, defaultValue = "all") String department,
            @RequestParam(required = false, defaultValue = "all") String category,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear) {
        
        Date startDate = (Date) technicalEventRepository.parseYearToDate(fromYear, true);
        Date endDate = (Date) technicalEventRepository.parseYearToDate(toYear, false);
        
        List<TechnicalEvent> events;
        
        if (!"all".equals(department) && !"all".equals(category)) {
            events = technicalEventRepository.findByDepartmentAndCategoryAndDateBetween(department, category, startDate, endDate);
        } else if (!"all".equals(department)) {
            events = technicalEventRepository.findByDepartmentAndDateBetween(department, startDate, endDate);
        } else if (!"all".equals(category)) {
            events = technicalEventRepository.findByCategoryAndDateBetween(category, startDate, endDate);
        } else {
            events = technicalEventRepository.findByDateBetween(startDate, endDate);
        }
        
        return ResponseEntity.ok(events);
    }

    @GetMapping("/stats/category")
    public ResponseEntity<Map<String, Object>> getCategoryStats() {
        var stats = technicalEventRepository.getCategoryStatistics().stream()
            .collect(Collectors.toMap(
                TechnicalEventRepository.CategoryStats::getName,
                TechnicalEventRepository.CategoryStats::getCount
            ));
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", stats
        ));
    }

    @GetMapping("/stats/achievement")
    public ResponseEntity<Map<String, Object>> getAchievementStats() {
        var stats = technicalEventRepository.getAchievementStatistics().stream()
            .collect(Collectors.toMap(
                TechnicalEventRepository.AchievementStats::getName,
                TechnicalEventRepository.AchievementStats::getCount
            ));
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", stats
        ));
    }
}