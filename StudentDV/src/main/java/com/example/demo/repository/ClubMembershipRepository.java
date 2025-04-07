package com.example.demo.repository;

import com.example.demo.entity.ClubMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClubMembershipRepository extends JpaRepository<ClubMembership, Long> {
    
    @Query("SELECT m.role as name, COUNT(m) as value FROM ClubMembership m GROUP BY m.role")
    List<Object[]> countByRole();

    @Query("SELECT m.role as name, COUNT(m) as value FROM ClubMembership m " +
           "WHERE m.student.department = :department " +
           "GROUP BY m.role")
    List<Object[]> countByRoleAndDepartment(@Param("department") String department);
}