package com.example.demo.repository;

import com.example.demo.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Find admin by username
    Optional<Admin> findByUsername(String username);

    // Check if admin exists by username
    boolean existsByUsername(String username);

    // Optionally, add method to delete admin by username
    void deleteByUsername(String username);
}
