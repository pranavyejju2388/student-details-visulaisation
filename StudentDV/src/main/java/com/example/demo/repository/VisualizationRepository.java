package com.example.demo.repository;

import com.example.demo.model.Visualization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisualizationRepository extends JpaRepository<Visualization, Long> {
}
