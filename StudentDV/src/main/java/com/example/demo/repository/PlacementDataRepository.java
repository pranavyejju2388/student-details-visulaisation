package com.example.demo.repository;

import com.example.demo.model.PlacementData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementDataRepository extends JpaRepository<PlacementData, Long> {

    @Query("SELECT COUNT(p) FROM PlacementData p WHERE " +
           "(:department IS NULL OR p.department = :department) AND " +
           "p.passingYear BETWEEN :fromYear AND :toYear")
    Long countByDepartmentAndPassingYearBetween(String department, Integer fromYear, Integer toYear);

    @Query("SELECT COUNT(p) FROM PlacementData p WHERE " +
           "p.passingYear BETWEEN :fromYear AND :toYear")
    Long countByPassingYearBetween(Integer fromYear, Integer toYear);

    @Query("SELECT AVG(p.packageAmount) FROM PlacementData p WHERE " +
           "(:department IS NULL OR p.department = :department) AND " +
           "(:company IS NULL OR p.company = :company) AND " +
           "p.passingYear BETWEEN :fromYear AND :toYear")
    Double findAveragePackageByFilters(
        String department, Integer fromYear, Integer toYear, String company);

    @Query("SELECT p.company, COUNT(p) as count FROM PlacementData p WHERE " +
           "(:department IS NULL OR p.department = :department) AND " +
           "p.passingYear BETWEEN :fromYear AND :toYear " +
           "GROUP BY p.company ORDER BY count DESC LIMIT 1")
    Object[] findTopHiringCompanyByFilters(
        String department, Integer fromYear, Integer toYear);

    @Query("SELECT p.department, COUNT(p) FROM PlacementData p WHERE " +
           "(:department IS NULL OR p.department = :department) AND " +
           "(:company IS NULL OR p.company = :company) AND " +
           "p.passingYear BETWEEN :fromYear AND :toYear " +
           "GROUP BY p.department")
    List<Object[]> countByDepartmentFiltered(
        String department, Integer fromYear, Integer toYear, String company);

    @Query("SELECT p.department, COUNT(p) FROM PlacementData p WHERE " +
           "p.passingYear BETWEEN :fromYear AND :toYear " +
           "GROUP BY p.department")
    List<Object[]> countByDepartmentAndPassingYearBetween(Integer fromYear, Integer toYear);

    @Query("SELECT p.passingYear, COUNT(p) FROM PlacementData p GROUP BY p.passingYear ORDER BY p.passingYear DESC")
    List<Object[]> countByYear();

    @Query("SELECT p.passingYear, COUNT(p) FROM PlacementData p WHERE " +
           "(:department IS NULL OR p.department = :department) AND " +
           "(:company IS NULL OR p.company = :company) AND " +
           "p.passingYear BETWEEN :fromYear AND :toYear " +
           "GROUP BY p.passingYear ORDER BY p.passingYear DESC")
    List<Object[]> countByYearFiltered(
        String department, Integer fromYear, Integer toYear, String company);

    @Query("SELECT p.company, COUNT(p) FROM PlacementData p WHERE " +
           "p.passingYear BETWEEN :fromYear AND :toYear " +
           "GROUP BY p.company ORDER BY COUNT(p) DESC")
    List<Object[]> countByCompanyAndPassingYearBetween(Integer fromYear, Integer toYear);

    @Query("SELECT DISTINCT p.company FROM PlacementData p")
    List<String> findAllCompanies();

    @Query("SELECT p FROM PlacementData p WHERE " +
           "(:department IS NULL OR p.department = :department) AND " +
           "(:company IS NULL OR p.company = :company) AND " +
           "p.passingYear BETWEEN :fromYear AND :toYear")
    List<PlacementData> findByDepartmentAndPassingYearBetweenAndCompany(
        String department, Integer fromYear, Integer toYear, String company);

    @Query("SELECT p FROM PlacementData p WHERE " +
           "p.department = :department AND " +
           "p.passingYear BETWEEN :fromYear AND :toYear")
    List<PlacementData> findByDepartmentAndPassingYearBetween(
        String department, Integer fromYear, Integer toYear);

    @Query("SELECT p FROM PlacementData p WHERE " +
           "p.passingYear BETWEEN :fromYear AND :toYear AND " +
           "p.company = :company")
    List<PlacementData> findByPassingYearBetweenAndCompany(
        Integer fromYear, Integer toYear, String company);

    @Query("SELECT p FROM PlacementData p WHERE " +
           "p.passingYear BETWEEN :fromYear AND :toYear")
    List<PlacementData> findByPassingYearBetween(Integer fromYear, Integer toYear);
}