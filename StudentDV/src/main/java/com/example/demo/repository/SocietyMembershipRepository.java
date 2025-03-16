package com.example.demo.repository;

import com.example.demo.model.SocietyMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocietyMembershipRepository extends JpaRepository<SocietyMembership, Long> {
}
