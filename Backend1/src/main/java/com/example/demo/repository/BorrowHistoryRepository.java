package com.example.demo.repository;

import com.example.demo.model.BorrowHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowHistoryRepository extends JpaRepository<BorrowHistory, Long> {
}
