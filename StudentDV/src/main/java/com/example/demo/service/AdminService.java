package com.example.demo.service;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Create Admin
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Authenticate Admin (Fixed: Now it correctly verifies credentials)
    public Optional<Admin> authenticateAdmin(String username, String password) {
        return adminRepository.findByUsername(username)
                .filter(admin -> admin.getPassword().equals(password));
    }

    // Get all Admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Get Admin by ID
    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    // Update Admin
    public Admin updateAdmin(Long id, Admin updatedAdmin) {
        Admin existingAdmin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with ID: " + id));
        existingAdmin.setUsername(updatedAdmin.getUsername());
        existingAdmin.setPassword(updatedAdmin.getPassword());
        return adminRepository.save(existingAdmin);
    }

    // Delete Admin
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
