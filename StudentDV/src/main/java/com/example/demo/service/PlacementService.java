package com.example.demo.service;

import com.example.demo.model.Placement;
import com.example.demo.repository.PlacementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlacementService {

    @Autowired
    private PlacementRepository placementRepository;

    // Fetch all placements
    public List<Placement> getAllPlacements() {
        return placementRepository.findAll();
    }

    // Fetch placement by ID
    public Optional<Placement> getPlacementById(Long id) {
        return placementRepository.findById(id);
    }

    // Save or update placement
    @Transactional
    public Placement savePlacement(Placement placement) {
        return placementRepository.save(placement);
    }

    // Delete placement by ID
    @Transactional
    public void deletePlacement(Long id) {
        placementRepository.deleteById(id);
    }

    // Search placements dynamically
    public List<Placement> searchPlacements(Integer year, String studentName, String company) {
        if (year == null && studentName == null && company == null) {
            return getAllPlacements();
        }

        if (year != null && studentName != null && company != null) {
            return placementRepository.findByYearAndStudentNameContainingIgnoreCaseAndCompanyContainingIgnoreCase(year, studentName, company);
        } else if (year != null && studentName != null) {
            return placementRepository.findByYearAndStudentNameContainingIgnoreCase(year, studentName);
        } else if (year != null && company != null) {
            return placementRepository.findByYearAndCompanyContainingIgnoreCase(year, company);
        } else if (studentName != null && company != null) {
            return placementRepository.findByStudentNameContainingIgnoreCaseAndCompanyContainingIgnoreCase(studentName, company);
        } else if (year != null) {
            return placementRepository.findByYear(year);
        } else if (studentName != null) {
            return placementRepository.findByStudentNameContainingIgnoreCase(studentName);
        } else {
            return placementRepository.findByCompanyContainingIgnoreCase(company);
        }
    }
}
