package com.example.demo.repository;

import com.example.demo.model.Visualization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VisualizationRepository extends JpaRepository<Visualization, Long> {
    List<Visualization> findByChartType(String chartType);
    List<Visualization> findByCategory(String category);
    List<Visualization> findByFilterCriteria(String filterCriteria);
    List<Visualization> findByEventDateBetween(LocalDate startDate, LocalDate endDate);
    List<Visualization> findByDataCountGreaterThanEqual(int dataCount);
}