package com.example.demo.repository;

import com.example.demo.model.PlacementData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacementRepository extends JpaRepository<PlacementData, Long> {
    // Add any custom queries if needed
}
