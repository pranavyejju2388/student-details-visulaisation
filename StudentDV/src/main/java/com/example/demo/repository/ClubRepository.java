package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.Club;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    
    @Query("SELECT DISTINCT c.category FROM Club c")
    List<String> findDistinctCategories();
    
    @Query("SELECT c.category as name, COUNT(cm) as count FROM Club c LEFT JOIN c.memberships cm GROUP BY c.category")
    List<Object[]> countMembershipsByCategory();
    
    @Query("SELECT c FROM Club c WHERE LOWER(c.category) = LOWER(:category)")
    List<Club> findByCategoryIgnoreCase(@Param("category") String category);

    @Query("SELECT c FROM Club c JOIN c.memberships cm WHERE cm.student.department = :department")
    List<Club> findByDepartment(@Param("department") String department);

    @Query("SELECT c FROM Club c JOIN c.memberships cm WHERE LOWER(c.category) = LOWER(:category) AND cm.student.department = :department")
    List<Club> findByCategoryAndDepartment(@Param("category") String category, @Param("department") String department);

    @Query("SELECT c.category as name, COUNT(cm) as count FROM Club c " +
           "LEFT JOIN c.memberships cm " +
           "WHERE (:department IS NULL OR cm.student.department = :department) " +
           "GROUP BY c.category")
    List<Object[]> countMembershipsByCategoryAndDepartment(@Param("department") String department);
}