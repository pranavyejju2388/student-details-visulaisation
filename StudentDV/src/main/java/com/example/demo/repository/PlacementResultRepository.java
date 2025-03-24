package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PlacementResult;

import java.util.List;
import java.util.Map;

@Repository
public interface PlacementResultRepository extends JpaRepository<PlacementResult, Long> {
    
    @Query("SELECT pr.department as department, COUNT(pr) as placements FROM PlacementResult pr GROUP BY pr.department")
    List<Map<String, Object>> findPlacementsByDepartment();
    
    @Query("SELECT pr.company as company, COUNT(pr) as count FROM PlacementResult pr GROUP BY pr.company")
    List<Map<String, Object>> findCompanyDistribution();
    
    @Query("SELECT pr.academicYear as year, COUNT(pr) as placements FROM PlacementResult pr GROUP BY pr.academicYear ORDER BY pr.academicYear")
    List<Map<String, Object>> findPlacementTrends();
    
    @Query("SELECT DISTINCT pr.department FROM PlacementResult pr")
    List<String> findDistinctDepartments();
    
    @Query("SELECT DISTINCT pr.company FROM PlacementResult pr")
    List<String> findDistinctCompanies();
    
    @Query("SELECT DISTINCT pr.academicYear FROM PlacementResult pr ORDER BY pr.academicYear")
    List<Integer> findDistinctAcademicYears();
    
    @Query("SELECT AVG(pr.salaryPackage) FROM PlacementResult pr WHERE pr.department = ?1")
    Double findAveragePackageByDepartment(String department);
    
    @Query("SELECT pr FROM PlacementResult pr WHERE " +
           "(:studentName IS NULL OR pr.studentName LIKE %:studentName%) AND " +
           "(:department IS NULL OR pr.department = :department) AND " +
           "(:company IS NULL OR pr.company = :company) AND " +
           "(:academicYear IS NULL OR pr.academicYear = :academicYear)")
    List<PlacementResult> searchPlacements(
            @Param("studentName") String studentName,
            @Param("department") String department,
            @Param("company") String company,
            @Param("academicYear") Integer academicYear);
}