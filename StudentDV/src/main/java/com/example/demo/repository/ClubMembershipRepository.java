package com.example.demo.repository;

import com.example.demo.entity.ClubMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ClubMembershipRepository extends JpaRepository<ClubMembership, Long> {

    @Query("SELECT cm FROM ClubMembership cm " +
           "WHERE (:category IS NULL OR cm.club.category = :category) " +
           "AND (:department IS NULL OR cm.student.department = :department) " +
           "AND (:startDate IS NULL OR cm.joinDate >= :startDate) " +
           "AND (:endDate IS NULL OR cm.joinDate <= :endDate)")
    List<ClubMembership> filterMemberships(
            @Param("category") String category,
            @Param("department") String department,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT cm.role as position, COUNT(cm) as count " +
           "FROM ClubMembership cm " +
           "GROUP BY cm.role")
    List<Object[]> countByPosition();
}