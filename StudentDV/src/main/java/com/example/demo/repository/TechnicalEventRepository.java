package com.example.demo.repository;

import com.example.demo.model.TechnicalEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TechnicalEventRepository extends JpaRepository<TechnicalEvent, Long> {

    // Filter methods
    List<TechnicalEvent> findByDepartmentAndCategoryAndDateBetween(String department, String category, Date startDate, Date endDate);
    List<TechnicalEvent> findByDepartmentAndDateBetween(String department, Date startDate, Date endDate);
    List<TechnicalEvent> findByCategoryAndDateBetween(String category, Date startDate, Date endDate);
    List<TechnicalEvent> findByDateBetween(Date startDate, Date endDate);
    
    // Statistics queries
    @Query("SELECT e.category AS name, COUNT(e) AS count FROM TechnicalEvent e GROUP BY e.category")
    List<CategoryStats> getCategoryStatistics();
    
    @Query("SELECT e.achievement AS name, COUNT(e) AS count FROM TechnicalEvent e GROUP BY e.achievement")
    List<AchievementStats> getAchievementStatistics();
    
    interface CategoryStats {
        String getName();
        Long getCount();
    }
    
    interface AchievementStats {
        String getName();
        Long getCount();
    }

    default Date parseYearToDate(Integer year, boolean isStartDate) {
        if (year == null || year == 0) {
            return isStartDate ? new Date(0) : new Date(Long.MAX_VALUE);
        }
        
        java.util.Calendar cal = java.util.Calendar.getInstance();
        if (isStartDate) {
            cal.set(year, java.util.Calendar.JANUARY, 1, 0, 0, 0);
        } else {
            cal.set(year, java.util.Calendar.DECEMBER, 31, 23, 59, 59);
        }
        return cal.getTime();
    }
}