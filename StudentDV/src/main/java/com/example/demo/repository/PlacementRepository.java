package com.example.demo.repository;

import com.example.demo.model.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementRepository extends JpaRepository<Placement, Long> {

    // Fetch placements by year and department
    List<Placement> findByYearAndDepartmentName(int year, String departmentName);

    // Count placements by department
    @Query("SELECT COUNT(p) FROM Placement p WHERE p.departmentName = :departmentName")
    Long countByDepartmentName(@Param("departmentName") String departmentName);

    // Count placements by department and year
    @Query("SELECT COUNT(p) FROM Placement p WHERE p.departmentName = :departmentName AND p.year = :year")
    Long countPlacementsByDepartment(@Param("departmentName") String departmentName, @Param("year") int year);

    // Search placements with filters (null-safe)
    @Query("SELECT p FROM Placement p WHERE " +
           "(:studentName IS NULL OR LOWER(p.studentName) LIKE LOWER(CONCAT('%', :studentName, '%'))) AND " +
           "(:company IS NULL OR LOWER(p.company) LIKE LOWER(CONCAT('%', :company, '%'))) AND " +
           "(:jobRole IS NULL OR LOWER(p.jobRole) LIKE LOWER(CONCAT('%', :jobRole, '%'))) AND " +
           "(:year IS NULL OR p.year = :year)")
    List<Placement> searchPlacements(
        @Param("studentName") String studentName,
        @Param("company") String company,
        @Param("jobRole") String jobRole,
        @Param("year") Integer year
    );

    // Count total placements
    @Query("SELECT COUNT(p) FROM Placement p")
    Long countTotalPlacements();

    // Calculate average package (null-safe)
    @Query("SELECT COALESCE(AVG(p.packageAmount), 0) FROM Placement p")
    Double calculateAveragePackage();

    // Calculate average package by department and year
    @Query("SELECT COALESCE(AVG(p.packageAmount), 0) FROM Placement p WHERE p.departmentName = :departmentName AND p.year = :year")
    Double calculateAveragePackageByDepartmentAndYear(@Param("departmentName") String departmentName, @Param("year") int year);

    // Fetch distinct companies for a department and year
    @Query("SELECT DISTINCT p.company FROM Placement p WHERE p.departmentName = :departmentName AND p.year = :year")
    List<String> findCompaniesByDepartmentNameAndYear(@Param("departmentName") String departmentName, @Param("year") int year);

    // Fetch placements by company name
    List<Placement> findByCompany(String company);

    // Fetch placements by job role
    List<Placement> findByJobRole(String jobRole);

    // Fetch placements by student name (case-insensitive search)
    @Query("SELECT p FROM Placement p WHERE LOWER(p.studentName) LIKE LOWER(CONCAT('%', :studentName, '%'))")
    List<Placement> findByStudentNameContainingIgnoreCase(@Param("studentName") String studentName);

    // Fetch placements by year
    List<Placement> findByYear(int year);

    // Fetch placements by department
    List<Placement> findByDepartmentName(String departmentName);
}