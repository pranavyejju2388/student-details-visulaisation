package com.example.demo.controller;

import com.example.demo.model.SocietyMembership;
import com.example.demo.repository.SocietyMembershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/society")
public class SocietyMembershipController {

    @Autowired
    private SocietyMembershipRepository societyMembershipRepository;

    // 1️⃣ Get all society memberships
    @GetMapping
    public List<SocietyMembership> getAllSocietyMemberships() {
        return societyMembershipRepository.findAll();
    }

    // 2️⃣ Get a specific society membership by ID
    @GetMapping("/{id}")
    public ResponseEntity<SocietyMembership> getSocietyById(@PathVariable Long id) {
        Optional<SocietyMembership> society = societyMembershipRepository.findById(id);
        return society.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3️⃣ Get societies by category (Technical, Cultural, Professional)
    @GetMapping("/category/{category}")
    public List<SocietyMembership> getByCategory(@PathVariable String category) {
        return societyMembershipRepository.findByCategory(category);
    }

    // 4️⃣ Get societies by year
    @GetMapping("/year/{year}")
    public List<SocietyMembership> getByYear(@PathVariable int year) {
        return societyMembershipRepository.findByYear(year);
    }

    // 5️⃣ Get societies by department
    @GetMapping("/department/{department}")
    public List<SocietyMembership> getByDepartment(@PathVariable String department) {
        return societyMembershipRepository.findByDepartment(department);
    }

    // 6️⃣ Add a new society membership
    @PostMapping
    public SocietyMembership createSociety(@RequestBody SocietyMembership societyMembership) {
        return societyMembershipRepository.save(societyMembership);
    }

    // 7️⃣ Update an existing society membership
    @PutMapping("/{id}")
    public ResponseEntity<SocietyMembership> updateSociety(@PathVariable Long id, @RequestBody SocietyMembership updatedSociety) {
        return societyMembershipRepository.findById(id).map(society -> {
            society.setSocietyName(updatedSociety.getSocietyName());
            society.setCategory(updatedSociety.getCategory());
            society.setMembers(updatedSociety.getMembers());
            society.setYear(updatedSociety.getYear());
            society.setDepartment(updatedSociety.getDepartment());
            societyMembershipRepository.save(society);
            return ResponseEntity.ok(society);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 8️⃣ Delete a society membership
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSociety(@PathVariable Long id) {
        return societyMembershipRepository.findById(id).map(society -> {
            societyMembershipRepository.delete(society);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
