package com.example.demo.repository;

import com.example.demo.model.ClubMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubMembershipRepository extends JpaRepository<ClubMembership, Long> {

    // Count club members (Return type changed from int to Long)
    @Query("SELECT COUNT(c) FROM ClubMembership c WHERE c.clubName = :clubName")
    Long countClubMembers(@Param("clubName") String clubName);
}
