package com.example.demo.repository;

import com.example.demo.model.SportEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SportEventRepository extends JpaRepository<SportEvent, Long> {

    List<SportEvent> findByTypeAndCategoryAndDateBetween(String type, String category, Date startDate, Date endDate);
    List<SportEvent> findByTypeAndDateBetween(String type, Date startDate, Date endDate);
    List<SportEvent> findByCategoryAndDateBetween(String category, Date startDate, Date endDate);
    List<SportEvent> findByDateBetween(Date startDate, Date endDate);
    
    @Query("SELECT e.category AS name, COUNT(e) AS count FROM SportEvent e GROUP BY e.category")
    List<CategoryStats> getCategoryStatistics();
    
    @Query("SELECT e.type AS name, COUNT(e) AS count FROM SportEvent e GROUP BY e.type")
    List<TypeStats> getTypeStatistics();
    
    interface CategoryStats {
        String getName();
        Long getCount();
    }
    
    interface TypeStats {
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