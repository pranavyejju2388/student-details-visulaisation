package com.studentdv.controller;

import com.studentdv.model.TechnicalEvent;
import com.studentdv.service.TechnicalEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/technical-events")
@CrossOrigin(origins = "http://localhost:5173") // Add your frontend URL
public class TechnicalEventController {

    private static final Logger logger = LoggerFactory.getLogger(TechnicalEventController.class);

    @Autowired
    private TechnicalEventService technicalEventService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Backend is working!");
    }

    @GetMapping
    public ResponseEntity<List<TechnicalEvent>> getAllEvents(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        logger.info("Received request with filters - department: {}, category: {}, startDate: {}, endDate: {}", 
                   department, category, startDate, endDate);
        
        List<TechnicalEvent> events = technicalEventService.getEventsWithFilters(department, category, startDate, endDate);
        
        logger.info("Returning {} events", events.size());
        return ResponseEntity.ok(events);
    }

    @GetMapping("/stats/category")
    public ResponseEntity<Map<String, Long>> getEventCountByCategory(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        logger.info("Getting category stats with filters - department: {}, category: {}, startDate: {}, endDate: {}", 
                   department, category, startDate, endDate);
        
        // Get filtered events first
        List<TechnicalEvent> filteredEvents = technicalEventService.getEventsWithFilters(department, category, startDate, endDate);
        
        // Generate stats from filtered events
        Map<String, Long> stats = filteredEvents.stream()
            .collect(Collectors.groupingBy(
                event -> technicalEventService.MAIN_CATEGORIES.contains(event.getCategory()) ? event.getCategory() : "Other",
                Collectors.counting()
            ));
        
        logger.info("Category stats: {}", stats);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/stats/achievement")
    public ResponseEntity<Map<String, Long>> getEventCountByAchievement(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        logger.info("Getting achievement stats with filters - department: {}, category: {}, startDate: {}, endDate: {}", 
                   department, category, startDate, endDate);
        
        // Get filtered events first
        List<TechnicalEvent> filteredEvents = technicalEventService.getEventsWithFilters(department, category, startDate, endDate);
        
        // Generate stats from filtered events
        Map<String, Long> stats = filteredEvents.stream()
            .collect(Collectors.groupingBy(
                TechnicalEvent::getAchievement,
                Collectors.counting()
            ));
        
        logger.info("Achievement stats: {}", stats);
        return ResponseEntity.ok(stats);
    }
} 