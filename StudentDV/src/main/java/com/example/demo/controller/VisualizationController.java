package com.example.demo.controller;

import com.example.demo.service.VisualizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/visualizations")
@CrossOrigin(origins = "http://localhost:3000") // Adjust for frontend deployment
public class VisualizationController {

    @Autowired
    private VisualizationService visualizationService;

    // Get placement stats by department
    @GetMapping("/placements/{department}/{year}")
    public ResponseEntity<Long> getPlacementStats(@PathVariable String department, @PathVariable int year) {
        Long count = visualizationService.getPlacementCountByDepartment(department, year);
        return ResponseEntity.ok(count);
    }

    // Get event stats by year
    @GetMapping("/events/{year}")
    public ResponseEntity<Long> getEventStats(@PathVariable int year) {
        Long count = visualizationService.getEventCountByYear(year);
        return ResponseEntity.ok(count);
    }

    // Get club membership count
    @GetMapping("/club/{clubName}")
    public ResponseEntity<Long> getClubMembershipStats(@PathVariable String clubName) {
        Long count = visualizationService.getClubMembershipCount(clubName);
        return ResponseEntity.ok(count);
    }
}
