package com.example.demo.service;

import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.PlacementRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final DepartmentRepository departmentRepository;
    private final PlacementRepository placementRepository;

    public DashboardService(DepartmentRepository departmentRepository, PlacementRepository placementRepository) {
        this.departmentRepository = departmentRepository;
        this.placementRepository = placementRepository;
    }

    // Fetch placements by department
    public List<Map<String, Object>> getPlacementsByDepartment() {
        return departmentRepository.findAll().stream()
            .map(department -> {
                Map<String, Object> result = new HashMap<>();
                result.put("department", department.getName()); // Accessing the name field of the Department entity
                result.put("placements", placementRepository.countByDepartmentName(department.getName()));
                return result;
            })
            .collect(Collectors.toList());
    }

    // Fetch placements by year and department
    public List<Map<String, Object>> getPlacementsByYearAndDepartment(int year, String departmentName) {
        return placementRepository.findByYearAndDepartmentName(year, departmentName).stream()
            .map(placement -> {
                Map<String, Object> result = new HashMap<>();
                result.put("studentName", placement.getStudentName());
                result.put("company", placement.getCompany());
                result.put("jobRole", placement.getJobRole());
                result.put("year", placement.getYear());
                result.put("packageAmount", placement.getPackageAmount()); // Added package amount
                return result;
            })
            .collect(Collectors.toList());
    }

    // Fetch all departments
    public List<String> getDepartments() {
        return departmentRepository.findAll().stream()
            .map(department -> department.getName()) // Accessing the name field of the Department entity
            .collect(Collectors.toList());
    }

    // Fetch placement statistics by department and year
    public Map<String, Object> getPlacementStatisticsByDepartmentAndYear(String departmentName, int year) {
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalPlacements", placementRepository.countPlacementsByDepartment(departmentName, year));
        statistics.put("averagePackage", placementRepository.calculateAveragePackageByDepartmentAndYear(departmentName, year));
        return statistics;
    }
}