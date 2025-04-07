package com.example.demo.repository;

import com.example.demo.model.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT r FROM Report r WHERE " +
           "(:department IS NULL OR r.department = :department) AND " +
           "(:fromYear IS NULL OR r.academicYear >= :fromYear) AND " +
           "(:toYear IS NULL OR r.academicYear <= :toYear) AND " +
           "(:category IS NULL OR r.category = :category)")
    Page<Report> findByFilters(
            @Param("department") String department,
            @Param("fromYear") String fromYear,
            @Param("toYear") String toYear,
            @Param("category") String category,
            Pageable pageable);

    @Query("SELECT r FROM Report r WHERE " +
           "(LOWER(r.studentName) LIKE %:search% OR " +
           "LOWER(r.department) LIKE %:search% OR " +
           "LOWER(r.company) LIKE %:search%) AND " +
           "(:department IS NULL OR r.department = :department) AND " +
           "(:fromYear IS NULL OR r.academicYear >= :fromYear) AND " +
           "(:toYear IS NULL OR r.academicYear <= :toYear) AND " +
           "(:category IS NULL OR r.category = :category)")
    Page<Report> findBySearchCriteria(
            @Param("search") String search,
            @Param("department") String department,
            @Param("fromYear") String fromYear,
            @Param("toYear") String toYear,
            @Param("category") String category,
            Pageable pageable);

    @Query("SELECT DISTINCT r.department FROM Report r")
    List<String> findAllDepartments();

    @Query("SELECT DISTINCT r.academicYear FROM Report r ORDER BY r.academicYear DESC")
    List<String> findAllAcademicYears();

    @Query("SELECT DISTINCT r.category FROM Report r WHERE r.category IS NOT NULL")
    List<String> findAllCategories();

    @Query("SELECT DISTINCT r.company FROM Report r")
    List<String> findAllCompanies();
}