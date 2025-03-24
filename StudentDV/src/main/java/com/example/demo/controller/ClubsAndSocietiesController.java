package com.example.demo.controller;

import com.example.demo.repository.ClubMembershipRepository;
import com.example.demo.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clubs")
@CrossOrigin(origins = "*")
public class ClubsAndSocietiesController {

    private final ClubRepository clubRepository;
    private final ClubMembershipRepository clubMembershipRepository;

    @Autowired
    public ClubsAndSocietiesController(ClubRepository clubRepository, 
                                     ClubMembershipRepository clubMembershipRepository) {
        this.clubRepository = clubRepository;
        this.clubMembershipRepository = clubMembershipRepository;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getClubCategories() {
        return ResponseEntity.ok(clubRepository.findDistinctCategories());
    }

    @GetMapping("/category-stats")
    public ResponseEntity<List<Map<String, Object>>> getCategoryStatistics() {
        List<Object[]> results = clubRepository.countMembershipsByCategory();
        return ResponseEntity.ok(results.stream()
            .map(r -> Map.of("name", r[0], "count", r[1]))
            .collect(Collectors.toList()));
    }

    @GetMapping("/position-stats")
    public ResponseEntity<List<Map<String, Object>>> getPositionStatistics() {
        List<Object[]> results = clubMembershipRepository.countByPosition();
        return ResponseEntity.ok(results.stream()
            .map(r -> Map.of("name", r[0], "value", r[1]))
            .collect(Collectors.toList()));
    }

    @GetMapping("/memberships")
    public ResponseEntity<List<com.example.demo.entity.ClubMembership>> filterMemberships(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String fromYear,
            @RequestParam(required = false) String toYear) {
        
        LocalDate fromDate = fromYear != null ? LocalDate.of(Integer.parseInt(fromYear), 1, 1) : null;
        LocalDate toDate = toYear != null ? LocalDate.of(Integer.parseInt(toYear), 12, 31) : null;
        
        return ResponseEntity.ok(clubMembershipRepository.filterMemberships(
            category, department, fromDate, toDate));
    }
}