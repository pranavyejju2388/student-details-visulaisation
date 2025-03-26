package com.studentdv.service;

import com.studentdv.model.TechnicalEvent;
import com.studentdv.repository.TechnicalEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Arrays;

@Service
public class TechnicalEventService {
    
    @Autowired
    private TechnicalEventRepository technicalEventRepository;
    
    public static final List<String> MAIN_CATEGORIES = Arrays.asList(
        "Hackathon", "Workshop", "Competition", "Technical Fest"
    );
    
    public List<TechnicalEvent> getAllEvents() {
        return technicalEventRepository.findAll();
    }
    
    public List<TechnicalEvent> getEventsByDepartment(String department) {
        return technicalEventRepository.findByDepartment(department);
    }
    
    public List<TechnicalEvent> getEventsByDateRange(LocalDate startDate, LocalDate endDate) {
        return technicalEventRepository.findByDateBetween(startDate, endDate);
    }
    
    public List<TechnicalEvent> getEventsByCategory(String category) {
        if ("Other".equals(category)) {
            return technicalEventRepository.findAll().stream()
                .filter(event -> !MAIN_CATEGORIES.contains(event.getCategory()))
                .collect(Collectors.toList());
        }
        return technicalEventRepository.findByCategory(category);
    }
    
    public List<TechnicalEvent> getEventsWithFilters(String department, String category, LocalDate startDate, LocalDate endDate) {
        List<TechnicalEvent> events = technicalEventRepository.findAll();
        
        if (department != null && !"all".equals(department)) {
            events = events.stream()
                .filter(event -> department.equals(event.getDepartment()))
                .collect(Collectors.toList());
        }
        
        if (startDate != null && endDate != null) {
            events = events.stream()
                .filter(event -> !event.getDate().isBefore(startDate) && !event.getDate().isAfter(endDate))
                .collect(Collectors.toList());
        }
        
        if (category != null && !"all".equals(category)) {
            if ("Other".equals(category)) {
                events = events.stream()
                    .filter(event -> !MAIN_CATEGORIES.contains(event.getCategory()))
                    .collect(Collectors.toList());
            } else {
                events = events.stream()
                    .filter(event -> category.equals(event.getCategory()))
                    .collect(Collectors.toList());
            }
        }
        
        return events;
    }
    
    public Map<String, Long> getEventCountByCategory() {
        Map<String, Long> stats = technicalEventRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        event -> MAIN_CATEGORIES.contains(event.getCategory()) ? event.getCategory() : "Other",
                        Collectors.counting()
                ));
        return stats;
    }
    
    public Map<String, Long> getEventCountByCategoryForCategory(String category) {
        if ("Other".equals(category)) {
            return technicalEventRepository.findAll().stream()
                .filter(event -> !MAIN_CATEGORIES.contains(event.getCategory()))
                .collect(Collectors.groupingBy(
                        event -> "Other",
                        Collectors.counting()
                ));
        }
        return technicalEventRepository.findByCategory(category).stream()
                .collect(Collectors.groupingBy(
                        TechnicalEvent::getCategory,
                        Collectors.counting()
                ));
    }
    
    public Map<String, Long> getEventCountByCategoryForDepartment(String department) {
        return technicalEventRepository.findByDepartment(department).stream()
                .collect(Collectors.groupingBy(
                        event -> MAIN_CATEGORIES.contains(event.getCategory()) ? event.getCategory() : "Other",
                        Collectors.counting()
                ));
    }
    
    public Map<String, Long> getEventCountByCategoryForDateRange(LocalDate startDate, LocalDate endDate) {
        return technicalEventRepository.findByDateBetween(startDate, endDate).stream()
                .collect(Collectors.groupingBy(
                        event -> MAIN_CATEGORIES.contains(event.getCategory()) ? event.getCategory() : "Other",
                        Collectors.counting()
                ));
    }
    
    public Map<String, Long> getEventCountByAchievement() {
        return technicalEventRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        TechnicalEvent::getAchievement,
                        Collectors.counting()
                ));
    }
    
    public Map<String, Long> getEventCountByAchievementForCategory(String category) {
        return technicalEventRepository.findByCategory(category).stream()
                .collect(Collectors.groupingBy(
                        TechnicalEvent::getAchievement,
                        Collectors.counting()
                ));
    }
    
    public Map<String, Long> getEventCountByAchievementForDepartment(String department) {
        return technicalEventRepository.findByDepartment(department).stream()
                .collect(Collectors.groupingBy(
                        TechnicalEvent::getAchievement,
                        Collectors.counting()
                ));
    }
    
    public Map<String, Long> getEventCountByAchievementForDateRange(LocalDate startDate, LocalDate endDate) {
        return technicalEventRepository.findByDateBetween(startDate, endDate).stream()
                .collect(Collectors.groupingBy(
                        TechnicalEvent::getAchievement,
                        Collectors.counting()
                ));
    }
} 