package com.example.demo.repository;

import com.example.demo.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    
    @Query("SELECT DISTINCT c.category FROM Club c")
    List<String> findDistinctCategories();
    
    @Query("SELECT c.category as name, COUNT(cm) as count FROM Club c LEFT JOIN c.memberships cm GROUP BY c.category")
    List<Object[]> countMembershipsByCategory();
}