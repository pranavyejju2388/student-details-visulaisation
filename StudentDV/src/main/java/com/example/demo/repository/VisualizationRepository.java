package com.example.demo.repository;

import com.example.demo.model.Visualization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VisualizationRepository extends JpaRepository<Visualization, Long> {

    // Count placements by department for a specific year
    @Query("SELECT COUNT(p) FROM Placement p WHERE p.departmentName = :departmentName AND FUNCTION('YEAR', p.date) = :year")
    Long countPlacementsByDepartment(@Param("departmentName") String departmentName, @Param("year") int year);

    // Count students participating in events for a given year
    @Query("SELECT COUNT(e) FROM Event e WHERE FUNCTION('YEAR', e.date) = :year")
    Long countEventsByYear(@Param("year") int year);

    // Count students in club memberships
    @Query("SELECT COUNT(c) FROM ClubMembership c WHERE c.clubName = :clubName")
    Long countClubMembers(@Param("clubName") String clubName);
}