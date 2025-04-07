package com.example.demo.repository;
import java.util.*;
import com.example.demo.model.PlacementData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacementRepository extends JpaRepository<PlacementData, Long> {
    // Add any custom queries if needed
    @Query("SELECT p.department, AVG(p.packageAmount) FROM PlacementData p " +
       "WHERE p.passingYear BETWEEN :fromYear AND :toYear " +
       "GROUP BY p.department")
List<Object[]> getDepartmentPackageStats(
    @Param("fromYear") Integer fromYear,
    @Param("toYear") Integer toYear);

@Query("SELECT p.department, p.passingYear, COUNT(p) FROM PlacementData p " +
       "WHERE (:department IS NULL OR p.department = :department) AND " +
       "p.passingYear BETWEEN :fromYear AND :toYear " +
       "GROUP BY p.department, p.passingYear " +
       "ORDER BY p.passingYear")
List<Object[]> getDepartmentYearlyStats(
    @Param("department") String department,
    @Param("fromYear") Integer fromYear,
    @Param("toYear") Integer toYear);
}
