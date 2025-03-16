package com.example.demo.repository;

import com.example.demo.model.ClassroomKey;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassroomKeyRepository extends JpaRepository<ClassroomKey, Long> {
	List<ClassroomKey> findByIsAvailable(int isAvailable);
}
