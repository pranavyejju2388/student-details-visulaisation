package com.example.demo.service;

import com.example.demo.model.PlacementData;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.PlacementDataRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final DepartmentRepository departmentRepository;
    private final PlacementDataRepository placementDataRepository;

    public DashboardService(DepartmentRepository departmentRepository, PlacementDataRepository placementDataRepository) {
        this.departmentRepository = departmentRepository;
        this.placementDataRepository = placementDataRepository;
    }

    public List<Map<String, Object>> getPlacementsByDepartment() {
        List<PlacementData> allPlacements = placementDataRepository.findAll();

        Map<String, Long> placementsByDepartment = allPlacements.stream()
            .filter(placement -> placement.getDepartment() != null)
            .collect(Collectors.groupingBy(
                PlacementData::getDepartment, 
                Collectors.counting()
            ));

        return departmentRepository.findAll().stream()
            .map(department -> {
                Map<String, Object> result = new HashMap<>();
                result.put("department", department.getName());
                result.put("placements", placementsByDepartment.getOrDefault(department.getName(), 0L));
                return result;
            })
            .collect(Collectors.toList());
    }

    public Object getDepartments() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getDepartments'");
    }

    public Object getPlacementsByYearAndDepartment(int year, String departmentName) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPlacementsByYearAndDepartment'");
    }
}
