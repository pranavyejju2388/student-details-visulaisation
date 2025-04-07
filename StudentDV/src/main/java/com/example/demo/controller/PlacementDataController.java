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
@CrossOrigin(origins = "*")
public class PlacementDataController {
    
    private final PlacementDataRepository placementDataRepository;

    @Autowired
    public PlacementDataController(PlacementDataRepository placementDataRepository) {
        this.placementDataRepository = placementDataRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPlacementStats(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String groupBy) {
        
        Map<String, Object> stats = new HashMap<>();
        
        // Handle "all" values
        Integer actualFromYear = fromYear != null ? fromYear : 0;
        Integer actualToYear = toYear != null ? toYear : 9999;
        
        // Total placements
        Long totalPlacements;
        if (department != null && !"all".equals(department)) {
            totalPlacements = placementDataRepository.countByDepartmentAndPassingYearBetween(
                department, actualFromYear, actualToYear);
        } else {
            totalPlacements = placementDataRepository.countByPassingYearBetween(
                actualFromYear, actualToYear);
        }
        stats.put("totalPlacements", totalPlacements);
        
        // Average package
        Double averagePackage = placementDataRepository.findAveragePackageByFilters(
            department, actualFromYear, actualToYear, company);
        stats.put("averagePackage", averagePackage != null ? averagePackage : 0);
        
        // Top company
        Object[] topCompany = placementDataRepository.findTopHiringCompanyByFilters(
            department, actualFromYear, actualToYear);
        stats.put("topCompany", topCompany != null && topCompany.length > 0 ? topCompany[0] : "N/A");
        
        // Grouped data if requested
        if (groupBy != null) {
            switch (groupBy.toLowerCase()) {
                case "department":
                    stats.put("groupedData", placementDataRepository.countByDepartmentAndPassingYearBetween(
                        actualFromYear, actualToYear));
                    break;
                case "company":
                    stats.put("groupedData", placementDataRepository.countByCompanyAndPassingYearBetween(
                        actualFromYear, actualToYear));
                    break;
                case "year":
                    stats.put("groupedData", placementDataRepository.countByYear());
                    break;
            }
        }
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/department-stats")
    public ResponseEntity<List<Object[]>> getDepartmentStats(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear,
            @RequestParam(required = false) String company) {
        
        Integer actualFromYear = fromYear != null ? fromYear : 0;
        Integer actualToYear = toYear != null ? toYear : 9999;
        
        List<Object[]> results;
        if (department != null && !"all".equals(department)) {
            results = placementDataRepository.countByDepartmentFiltered(
                department, actualFromYear, actualToYear, company);
        } else {
            results = placementDataRepository.countByDepartmentAndPassingYearBetween(
                actualFromYear, actualToYear);
        }
        
        return ResponseEntity.ok(results);
    }

    @GetMapping("/yearly-stats")
    public ResponseEntity<List<Object[]>> getYearlyStats(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear,
            @RequestParam(required = false) String company) {
        
        Integer actualFromYear = fromYear != null ? fromYear : 0;
        Integer actualToYear = toYear != null ? toYear : 9999;
        
        List<Object[]> results;
        if (department != null && !"all".equals(department)) {
            results = placementDataRepository.countByYearFiltered(
                department, actualFromYear, actualToYear, company);
        } else {
            results = placementDataRepository.countByYear();
        }
        
        return ResponseEntity.ok(results);
    }

    @GetMapping("/filter-placements")
    public ResponseEntity<List<PlacementData>> filterPlacements(
            @RequestParam(required = false, defaultValue = "all") String department,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear,
            @RequestParam(required = false, defaultValue = "all") String company,
            @RequestParam(required = false, defaultValue = "100") int limit) {
        
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
        
        return ResponseEntity.ok(results.stream().limit(limit).toList());
    }

    @GetMapping("/companies")
    public ResponseEntity<List<String>> getAllCompanies() {
        return ResponseEntity.ok(placementDataRepository.findAllCompanies());
    }
}