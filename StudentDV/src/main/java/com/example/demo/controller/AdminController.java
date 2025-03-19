package com.example.demo.controller;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000") // Allows frontend (React) to access
public class AdminController {

    private final AdminRepository adminRepository;

    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // 1. Signup API (Register New Admin)
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

    // 2. Login API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin loginRequest) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(loginRequest.getUsername());

        if (existingAdmin.isPresent() && existingAdmin.get().getPassword().equals(loginRequest.getPassword())) {
            // Exclude password from the response for security
            Admin admin = existingAdmin.get();
            admin.setPassword(null);
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.badRequest().body("Invalid username or password!");
        }
    }

    // 3. Forgot Password API
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestParam String username,
            @RequestParam String newPassword
    ) {
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent()) {
            Admin existingAdmin = admin.get();
            existingAdmin.setPassword(newPassword);
            adminRepository.save(existingAdmin);
            return ResponseEntity.ok("Password updated successfully!");
        } else {
            return ResponseEntity.badRequest().body("Admin not found!");
        }
    }

    // 4. Logout API (Optional)
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // Typically handled on frontend by clearing tokens/localStorage
        return ResponseEntity.ok("Logged out successfully!");
    }
}
