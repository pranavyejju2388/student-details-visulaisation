package com.example.demo.repository;

import com.example.demo.model.RecentEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecentEventRepository extends JpaRepository<RecentEvent, Long> {
    List<RecentEvent> findTop3ByOrderByIdDesc();
}