package com.example.demo.repository;

import com.example.demo.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    // Find an admin by username (used in authentication)
    Optional<Admin> findByUsername(String username);
    
    // Check if an admin exists by username (for registration validation)
    boolean existsByUsername(String username);

    // Optionally, add a method to delete an admin by username
    void deleteByUsername(String username);
}
