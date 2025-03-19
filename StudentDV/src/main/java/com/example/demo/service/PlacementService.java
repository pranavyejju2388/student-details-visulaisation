package com.example.demo.service;

import com.example.demo.model.Placement;
import com.example.demo.repository.PlacementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // Get placement by ID
    public Optional<Placement> getPlacementById(Long id) {
        return placementRepository.findById(id);
    }

    // Search placements
    public List<Placement> searchPlacements(String studentName, String company, String jobRole, Integer year) {
        return placementRepository.searchPlacements(studentName, company, jobRole, year);
    }

    // Save or update placement
    public Placement savePlacement(Placement placement) {
        return placementRepository.save(placement);
    }

    // Delete placement
    public void deletePlacement(Long id) {
        placementRepository.deleteById(id);
    }

    // Get total placements count (Changed return type from int → Long)
    public Long getTotalPlacements() {
        return placementRepository.countTotalPlacements();
    }

    // Get average package
    public Double getAveragePackage() {
        return placementRepository.calculateAveragePackage();
    }

    // Get companies by department and year
    public List<String> getCompaniesByDepartmentAndYear(String department, int year) {
        return placementRepository.findCompaniesByDepartmentNameAndYear(department, year);
    }
}