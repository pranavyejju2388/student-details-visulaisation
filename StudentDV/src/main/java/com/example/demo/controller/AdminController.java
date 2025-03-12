package com.example.demo.controller;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminRepository adminRepository;

    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // Signup API (Register New Admin)
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Admin admin) {
        // Check if username already exists
        if (adminRepository.findByUsername(admin.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }

        // Save new admin
        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered successfully!");
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin loginRequest) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(loginRequest.getUsername());

        if (existingAdmin.isPresent() && existingAdmin.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.badRequest().body("Invalid username or password!");
        }
    }
}
