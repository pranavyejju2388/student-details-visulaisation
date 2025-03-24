package com.example.demo.controller;

import com.example.demo.model.SportEvent;
import com.example.demo.repository.SportEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sport-events")
@Transactional
public class SportEventController {

    private final SportEventRepository sportEventRepository;

    @Autowired
    public SportEventController(SportEventRepository sportEventRepository) {
        this.sportEventRepository = sportEventRepository;
    }

    @GetMapping
    public ResponseEntity<List<SportEvent>> getAllEvents() {
        return ResponseEntity.ok(sportEventRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<SportEvent> createEvent(@RequestBody SportEvent sportEvent) {
        return ResponseEntity.ok(sportEventRepository.save(sportEvent));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<SportEvent>> filterEvents(
            @RequestParam(required = false, defaultValue = "all") String type,
            @RequestParam(required = false, defaultValue = "all") String category,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear) {
        
        Date startDate = (Date) sportEventRepository.parseYearToDate(fromYear, true);
        Date endDate = (Date) sportEventRepository.parseYearToDate(toYear, false);
        
        List<SportEvent> events;
        
        if (!"all".equals(type) && !"all".equals(category)) {
            events = sportEventRepository.findByTypeAndCategoryAndDateBetween(type, category, startDate, endDate);
        } else if (!"all".equals(type)) {
            events = sportEventRepository.findByTypeAndDateBetween(type, startDate, endDate);
        } else if (!"all".equals(category)) {
            events = sportEventRepository.findByCategoryAndDateBetween(category, startDate, endDate);
        } else {
            events = sportEventRepository.findByDateBetween(startDate, endDate);
        }
        
        return ResponseEntity.ok(events);
    }

    @GetMapping("/stats/category")
    public ResponseEntity<Map<String, Object>> getCategoryStats() {
        var stats = sportEventRepository.getCategoryStatistics().stream()
            .collect(Collectors.toMap(
                SportEventRepository.CategoryStats::getName,
                SportEventRepository.CategoryStats::getCount
            ));
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", stats
        ));
    }

    @GetMapping("/stats/type")
    public ResponseEntity<Map<String, Object>> getTypeStats() {
        var stats = sportEventRepository.getTypeStatistics().stream()
            .collect(Collectors.toMap(
                SportEventRepository.TypeStats::getName,
                SportEventRepository.TypeStats::getCount
            ));
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", stats
        ));
    }
}