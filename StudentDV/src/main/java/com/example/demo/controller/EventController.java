package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // Get all events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    // Get events by type
    @GetMapping("/type/{eventType}")
    public ResponseEntity<List<Event>> getEventsByType(@PathVariable String eventType) {
        return ResponseEntity.ok(eventService.getEventsByType(eventType));
    }

    // Get event by ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Filter events by multiple criteria
    @GetMapping("/filter")
    public ResponseEntity<List<Event>> filterEvents(
        @RequestParam(required = false) String department,
        @RequestParam(required = false) Integer fromYear,
        @RequestParam(required = false) Integer toYear,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String type
    ) {
        return ResponseEntity.ok(eventService.filterEvents(department, fromYear, toYear, category, type));
    }

    // Group events by category
    @GetMapping("/group-by-category")
    public ResponseEntity<Map<String, Long>> getEventsGroupedByCategory() {
        return ResponseEntity.ok(eventService.getEventsGroupedByCategory());
    }

    // Group events by type
    @GetMapping("/group-by-type")
    public ResponseEntity<Map<String, Long>> getEventsGroupedByType() {
        return ResponseEntity.ok(eventService.getEventsGroupedByType());
    }

    // Get achievement distribution
    @GetMapping("/achievement-distribution")
    public ResponseEntity<Map<String, Long>> getAchievementDistribution() {
        return ResponseEntity.ok(eventService.getAchievementDistribution());
    }

    // Get events over time
    @GetMapping("/events-over-time")
    public ResponseEntity<Map<Integer, Long>> getEventsOverTime() {
        return ResponseEntity.ok(eventService.getEventsOverTime());
    }
}
