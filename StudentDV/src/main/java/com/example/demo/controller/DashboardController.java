package com.example.demo.controller;

import com.example.demo.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/placements-by-department")
    public ResponseEntity<?> getPlacementsByDepartment() {
        return ResponseEntity.ok(dashboardService.getPlacementsByDepartment());
    }

    @GetMapping("/placements-by-year-and-department")
    public ResponseEntity<?> getPlacementsByYearAndDepartment(
        @RequestParam int year,
        @RequestParam String departmentName
    ) {
        return ResponseEntity.ok(dashboardService.getPlacementsByYearAndDepartment(year, departmentName));
    }

    @GetMapping("/departments")
    public ResponseEntity<?> getDepartments() {
        return ResponseEntity.ok(dashboardService.getDepartments());
    }
}
