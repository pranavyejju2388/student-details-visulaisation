package com.example.demo.controller;

import com.example.demo.model.Placement;
import com.example.demo.repository.PlacementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/placements")
public class PlacementController {

    @Autowired
    private PlacementRepository placementRepository;

    // ✅ 1. Fetch all placements
    @GetMapping
    public List<Placement> getAllPlacements() {
        return placementRepository.findAll();
    }

    // ✅ 2. Get a placement by ID
    @GetMapping("/{id}")
    public ResponseEntity<Placement> getPlacementById(@PathVariable Long id) {
        Optional<Placement> placement = placementRepository.findById(id);
        return placement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ 3. Search placements by student name, company, job role, or year
    @GetMapping("/search")
    public List<Placement> searchPlacements(
            @RequestParam(required = false) String studentName,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String jobRole,
            @RequestParam(required = false) Integer year) {
        return placementRepository.findByCriteria(studentName, company, jobRole, year);
    }

    // ✅ 4. Add a new placement
    @PostMapping
    public Placement addPlacement(@RequestBody Placement placement) {
        return placementRepository.save(placement);
    }

    // ✅ 5. Update an existing placement
    @PutMapping("/{id}")
    public ResponseEntity<Placement> updatePlacement(@PathVariable Long id, @RequestBody Placement placementDetails) {
        return placementRepository.findById(id).map(placement -> {
            placement.setStudentName(placementDetails.getStudentName());
            placement.setCompany(placementDetails.getCompany());
            placement.setJobRole(placementDetails.getJobRole());
            placement.setYear(placementDetails.getYear());
            Placement updatedPlacement = placementRepository.save(placement);
            return ResponseEntity.ok(updatedPlacement);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ 6. Delete a placement
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlacement(@PathVariable Long id) {
        if (placementRepository.existsById(id)) {
            placementRepository.deleteById(id);
            return ResponseEntity.ok("Placement deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
