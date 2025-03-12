package com.example.demo.repository;

import com.example.demo.model.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlacementRepository extends JpaRepository<Placement, Long> {

    @Query("SELECT p FROM Placement p WHERE " +
            "(:studentName IS NULL OR LOWER(p.studentName) LIKE LOWER(CONCAT('%', :studentName, '%'))) AND " +
            "(:company IS NULL OR LOWER(p.company) LIKE LOWER(CONCAT('%', :company, '%'))) AND " +
            "(:jobRole IS NULL OR LOWER(p.jobRole) LIKE LOWER(CONCAT('%', :jobRole, '%'))) AND " +
            "(:year IS NULL OR p.year = :year)")
    List<Placement> findByCriteria(
            @Param("studentName") String studentName,
            @Param("company") String company,
            @Param("jobRole") String jobRole,
            @Param("year") Integer year
    );
}
