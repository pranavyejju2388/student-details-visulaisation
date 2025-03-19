package com.example.demo.controller;

import com.example.demo.model.Placement;
import com.example.demo.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/placements")
@CrossOrigin(origins = "http://localhost:3000") // Adjust based on frontend deployment
public class PlacementController {

    @Autowired
    private PlacementService placementService;

    // ✅ 1. Fetch all placements
    @GetMapping
    public List<Placement> getAllPlacements() {
        return placementService.getAllPlacements();
    }

    // ✅ 2. Get placement by ID
    @GetMapping("/{id}")
    public ResponseEntity<Placement> getPlacementById(@PathVariable Long id) {
        Optional<Placement> placement = placementService.getPlacementById(id);
        return placement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ 3. Search placements by criteria
    @GetMapping("/search")
    public List<Placement> searchPlacements(
            @RequestParam(required = false) String studentName,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String jobRole,
            @RequestParam(required = false) Integer year) {
        return placementService.searchPlacements(studentName, company, jobRole, year);
    }

    // ✅ 4. Add a new placement
    @PostMapping
    public ResponseEntity<Placement> addPlacement(@RequestBody Placement placement) {
        Placement savedPlacement = placementService.savePlacement(placement);
        return ResponseEntity.ok(savedPlacement);
    }

    // ✅ 5. Update an existing placement
    @PutMapping("/{id}")
    public ResponseEntity<Placement> updatePlacement(@PathVariable Long id, @RequestBody Placement placementDetails) {
        Optional<Placement> existingPlacement = placementService.getPlacementById(id);
        if (existingPlacement.isPresent()) {
            Placement placement = existingPlacement.get();
            placement.setStudentName(placementDetails.getStudentName());
            placement.setCompany(placementDetails.getCompany());
            placement.setJobRole(placementDetails.getJobRole());
            placement.setYear(placementDetails.getYear());
            placement.setPackageAmount(placementDetails.getPackageAmount());
            placement.setDepartmentName(placementDetails.getDepartmentName());  // ✅ Fixed incorrect field
            return ResponseEntity.ok(placementService.savePlacement(placement));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ 6. Get placement statistics (Fixed type mismatch)
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPlacementStatistics() {
        Long totalPlacements = placementService.getTotalPlacements();
        Double averagePackage = placementService.getAveragePackage();

        return ResponseEntity.ok(Map.of(
                "totalPlacements", totalPlacements != null ? totalPlacements.intValue() : 0,
                "averagePackage", averagePackage
        ));
    }

    // ✅ 7. Get companies by department and year
    @GetMapping("/companies")
    public ResponseEntity<List<String>> getCompanies(@RequestParam String department, @RequestParam int year) {
        return ResponseEntity.ok(placementService.getCompaniesByDepartmentAndYear(department, year));
    }
}
