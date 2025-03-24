package com.example.demo.controller;

import com.example.demo.model.PlacementData;
import com.example.demo.repository.PlacementDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/placement-data")
public class PlacementDataController {
    
    private final PlacementDataRepository placementDataRepository;

    @Autowired
    public PlacementDataController(PlacementDataRepository placementDataRepository) {
        this.placementDataRepository = placementDataRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPlacementStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Total placements
        Long totalPlacements = placementDataRepository.countTotalPlacements();
        stats.put("totalPlacements", totalPlacements);
        
        // Average package
        Double averagePackage = placementDataRepository.findAveragePackage();
        stats.put("averagePackage", averagePackage != null ? averagePackage : 0);
        
        // Top company
        Object[] topCompany = placementDataRepository.findTopHiringCompany();
        stats.put("topCompany", topCompany != null && topCompany.length > 0 ? topCompany[0] : "N/A");
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/department-stats")
    public ResponseEntity<List<Object[]>> getDepartmentStats() {
        return ResponseEntity.ok(placementDataRepository.countByDepartment());
    }

    @GetMapping("/yearly-stats")
    public ResponseEntity<List<Object[]>> getYearlyStats() {
        return ResponseEntity.ok(placementDataRepository.countByYear());
    }

    @GetMapping
    public ResponseEntity<List<PlacementData>> filterPlacements(
            @RequestParam(required = false, defaultValue = "all") String department,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear,
            @RequestParam(required = false, defaultValue = "all") String company) {
        
        // Handle "all" values
        Integer actualFromYear = fromYear != null ? fromYear : 0;
        Integer actualToYear = toYear != null ? toYear : 9999;
        
        List<PlacementData> results;
        
        if (!"all".equals(department) && !"all".equals(company)) {
            results = placementDataRepository.findByDepartmentAndPassingYearBetweenAndCompany(
                department, actualFromYear, actualToYear, company);
        } else if (!"all".equals(department)) {
            results = placementDataRepository.findByDepartmentAndPassingYearBetween(
                department, actualFromYear, actualToYear);
        } else if (!"all".equals(company)) {
            results = placementDataRepository.findByPassingYearBetweenAndCompany(
                actualFromYear, actualToYear, company);
        } else {
            results = placementDataRepository.findByPassingYearBetween(
                actualFromYear, actualToYear);
        }
        
        return ResponseEntity.ok(results);
    }

    @PostMapping
    public ResponseEntity<PlacementData> createPlacement(@RequestBody PlacementData placementData) {
        return ResponseEntity.ok(placementDataRepository.save(placementData));
    }
}