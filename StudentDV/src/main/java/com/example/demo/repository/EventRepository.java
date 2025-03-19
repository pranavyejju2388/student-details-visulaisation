package com.example.demo.repository;

import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // Find events by event type
    List<Event> findByEventType(String eventType);

    // Filter events based on department, date range, category, and type
    List<Event> findByDepartmentAndDateBetweenAndCategoryAndEventType(
        String department, java.time.LocalDate fromDate, java.time.LocalDate toDate, String category, String eventType
    );

    // Count events by category
    @Query("SELECT e.category, COUNT(e) FROM Event e GROUP BY e.category")
    List<Object[]> countEventsByCategory();

    // Count events by type
    @Query("SELECT e.eventType, COUNT(e) FROM Event e GROUP BY e.eventType")
    List<Object[]> countEventsByType();

    // Count events by achievement
    @Query("SELECT e.achievement, COUNT(e) FROM Event e GROUP BY e.achievement")
    List<Object[]> countEventsByAchievement();

    // Count events by year
    @Query("SELECT YEAR(e.date), COUNT(e) FROM Event e GROUP BY YEAR(e.date)")
    List<Object[]> countEventsByYear();

    // Count events for a specific year
    @Query("SELECT COUNT(e) FROM Event e WHERE YEAR(e.date) = :year")
    Long countEventsByYear(@Param("year") int year);
}
