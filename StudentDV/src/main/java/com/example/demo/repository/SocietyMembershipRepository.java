package com.example.demo.repository;

import com.example.demo.model.SocietyMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SocietyMembershipRepository extends JpaRepository<SocietyMembership, Long> {

    // Custom query methods
    List<SocietyMembership> findByCategory(String category);
    
    List<SocietyMembership> findByYear(int year);

    List<SocietyMembership> findByDepartment(String department);
}
