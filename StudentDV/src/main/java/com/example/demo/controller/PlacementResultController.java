package com.example.demo.controller;

import com.example.demo.model.PlacementData;
import com.example.demo.repository.PlacementResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/placement-results")
@CrossOrigin(origins = "*")
public class PlacementResultController {

    private final PlacementResultRepository placementResultRepository;

    @Autowired
    public PlacementResultController(PlacementResultRepository placementResultRepository) {
        this.placementResultRepository = placementResultRepository;
    }

    @GetMapping
    public List<com.example.demo.entity.PlacementResult> getAllPlacementResults() {
        return placementResultRepository.findAll();
    }

    @GetMapping("/department-stats")
    public List<Map<String, Object>> getPlacementsByDepartment() {
        return placementResultRepository.findPlacementsByDepartment();
    }

    @GetMapping("/company-distribution")
    public List<Map<String, Object>> getCompanyDistribution() {
        return placementResultRepository.findCompanyDistribution();
    }

    @GetMapping("/placement-trends")
    public List<Map<String, Object>> getPlacementTrends() {
        return placementResultRepository.findPlacementTrends();
    }

    @GetMapping("/departments")
    public List<String> getDepartments() {
        return placementResultRepository.findDistinctDepartments();
    }

    @GetMapping("/companies")
    public List<String> getCompanies() {
        return placementResultRepository.findDistinctCompanies();
    }

    @GetMapping("/years")
    public List<Integer> getAcademicYears() {
        return placementResultRepository.findDistinctAcademicYears();
    }

    @GetMapping("/average-package")
    public ResponseEntity<Double> getAveragePackageByDepartment(@RequestParam String department) {
        Double avgPackage = placementResultRepository.findAveragePackageByDepartment(department);
        return ResponseEntity.ok(avgPackage != null ? avgPackage : 0.0);
    }

    @GetMapping("/search")
    public List<com.example.demo.entity.PlacementResult> searchPlacements(
            @RequestParam(required = false) String studentName,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) Integer academicYear) {
        return placementResultRepository.searchPlacements(studentName, department, company, academicYear);
    }
}