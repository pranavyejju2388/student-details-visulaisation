package com.studentdv.repository;

import com.studentdv.model.TechnicalEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;

@Repository
public interface TechnicalEventRepository extends JpaRepository<TechnicalEvent, Long> {
    List<TechnicalEvent> findByDepartment(String department);
    
    @Query("SELECT t FROM TechnicalEvent t WHERE t.date BETWEEN :startDate AND :endDate")
    List<TechnicalEvent> findByDateRange(LocalDate startDate, LocalDate endDate);
    
    List<TechnicalEvent> findByCategory(String category);
    
    @Query("SELECT t.category, COUNT(t) FROM TechnicalEvent t GROUP BY t.category")
    List<Object[]> countEventsByCategory();
    
    @Query("SELECT t.achievement, COUNT(t) FROM TechnicalEvent t GROUP BY t.achievement")
    List<Object[]> countEventsByAchievement();

    List<TechnicalEvent> findByDateBetween(LocalDate startDate, LocalDate endDate);
} 