package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Get events by type
    public List<Event> getEventsByType(String eventType) {
        return eventRepository.findByEventType(eventType);
    }

    // Get event by ID
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    // Filter events by multiple criteria
    public List<Event> filterEvents(String department, Integer fromYear, Integer toYear, String category, String eventType) {
        LocalDate fromDate = (fromYear != null) ? LocalDate.of(fromYear, 1, 1) : LocalDate.of(2000, 1, 1);
        LocalDate toDate = (toYear != null) ? LocalDate.of(toYear, 12, 31) : LocalDate.now();
        return eventRepository.findByDepartmentAndDateBetweenAndCategoryAndEventType(department, fromDate, toDate, category, eventType);
    }

    // Convert List<Object[]> to Map<String, Long>
    private Map<String, Long> convertListToMap(List<Object[]> list) {
        return list.stream()
                .collect(Collectors.toMap(obj -> (String) obj[0], obj -> (Long) obj[1]));
    }

    // Group events by category
    public Map<String, Long> getEventsGroupedByCategory() {
        return convertListToMap(eventRepository.countEventsByCategory());
    }

    // Group events by type
    public Map<String, Long> getEventsGroupedByType() {
        return convertListToMap(eventRepository.countEventsByType());
    }

    // Get achievement distribution
    public Map<String, Long> getAchievementDistribution() {
        return convertListToMap(eventRepository.countEventsByAchievement());
    }

    // Get events count over time (Fixed)
    public Map<Integer, Long> getEventsOverTime() {
        return eventRepository.countEventsByYear().stream()
                .collect(Collectors.toMap(obj -> (Integer) obj[0], obj -> (Long) obj[1]));
    }
}
