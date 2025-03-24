package com.example.demo.repository;

import com.example.demo.model.PlacementData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PlacementDataRepository extends JpaRepository<PlacementData, Long> {

    // Filter methods
    List<PlacementData> findByDepartmentAndPassingYearBetweenAndCompany(
        String department, Integer fromYear, Integer toYear, String company);
    
    List<PlacementData> findByDepartmentAndPassingYearBetween(
        String department, Integer fromYear, Integer toYear);
    
    List<PlacementData> findByPassingYearBetweenAndCompany(
        Integer fromYear, Integer toYear, String company);
    
    List<PlacementData> findByPassingYearBetween(
        Integer fromYear, Integer toYear);
    
    // Statistics queries
    @Query("SELECT COUNT(p) FROM PlacementData p")
    Long countTotalPlacements();
    
    @Query("SELECT AVG(p.packageAmount) FROM PlacementData p")
    Double findAveragePackage();
    
    @Query("SELECT p.company, COUNT(p) FROM PlacementData p GROUP BY p.company ORDER BY COUNT(p) DESC LIMIT 1")
    Object[] findTopHiringCompany();
    
    @Query("SELECT p.department, COUNT(p) FROM PlacementData p GROUP BY p.department")
    List<Object[]> countByDepartment();
    
    @Query("SELECT p.passingYear, COUNT(p) FROM PlacementData p GROUP BY p.passingYear ORDER BY p.passingYear")
    List<Object[]> countByYear();
}