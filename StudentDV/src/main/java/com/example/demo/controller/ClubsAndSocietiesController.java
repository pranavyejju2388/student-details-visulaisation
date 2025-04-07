package com.example.demo.controller;

import com.example.demo.entity.Club;
import com.example.demo.repository.ClubRepository;
import com.example.demo.repository.ClubMembershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clubs")
public class ClubsAndSocietiesController {

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private ClubMembershipRepository membershipRepository;

    @GetMapping
    public ResponseEntity<List<Club>> getClubs(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String department) {
        try {
            List<Club> clubs;
            
            if (category != null && !category.isEmpty() && department != null && !department.isEmpty()) {
                clubs = clubRepository.findByCategoryAndDepartment(category, department);
            } else if (category != null && !category.isEmpty()) {
                clubs = clubRepository.findByCategoryIgnoreCase(category);
            } else if (department != null && !department.isEmpty()) {
                clubs = clubRepository.findByDepartment(department);
            } else {
                clubs = clubRepository.findAll();
            }
            
            // Initialize memberships
            clubs.forEach(club -> {
                if (club.getMemberships() != null) {
                    club.getMemberships().size(); // Force initialization
                }
            });
            
            return ResponseEntity.ok(clubs != null ? clubs : List.of());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getClubCategories() {
        try {
            List<String> categories = clubRepository.findDistinctCategories();
            return ResponseEntity.ok(categories != null ? categories : List.of());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/memberships-by-category")
    public ResponseEntity<List<Map<String, Object>>> getMembershipsByCategory(
            @RequestParam(required = false) String department) {
        try {
            List<Object[]> results = clubRepository.countMembershipsByCategoryAndDepartment(department);
            
            List<Map<String, Object>> formattedResults = results.stream()
                .map(result -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", result[0] != null ? result[0].toString() : "Unknown");
                    map.put("count", result[1] != null ? ((Number) result[1]).longValue() : 0L);
                    return map;
                })
                .collect(Collectors.toList());
            return ResponseEntity.ok(formattedResults);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/memberships-by-position")
    public ResponseEntity<List<Map<String, Object>>> getMembershipsByPosition(
            @RequestParam(required = false) String department) {
        try {
            List<Object[]> results = department != null && !department.isEmpty() 
                ? membershipRepository.countByRoleAndDepartment(department)
                : membershipRepository.countByRole();
            
            List<Map<String, Object>> formattedResults = results.stream()
                .map(result -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", result[0] != null ? result[0].toString() : "Unknown");
                    map.put("value", result[1] != null ? ((Number) result[1]).longValue() : 0L);
                    return map;
                })
                .collect(Collectors.toList());
            return ResponseEntity.ok(formattedResults);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}