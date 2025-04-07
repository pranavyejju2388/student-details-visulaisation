package com.example.demo.controller;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AdminControllerTest {

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private AdminController adminController;

    @Test
    public void testSignup_Success() {
        // Arrange
        Admin newAdmin = new Admin("admin1", "password123");
        when(adminRepository.findByUsername("admin1")).thenReturn(Optional.empty());
        when(adminRepository.save(any(Admin.class))).thenReturn(newAdmin);

        // Act
        ResponseEntity<String> response = adminController.signup(newAdmin);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Admin registered successfully!", response.getBody());
        verify(adminRepository, times(1)).save(newAdmin);
    }

    @Test
    public void testSignup_UsernameExists() {
        // Arrange
        Admin existingAdmin = new Admin("admin1", "password123");
        when(adminRepository.findByUsername("admin1")).thenReturn(Optional.of(existingAdmin));

        // Act
        ResponseEntity<String> response = adminController.signup(existingAdmin);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Username already exists!", response.getBody());
        verify(adminRepository, never()).save(any());
    }

    @Test
    public void testLogin_Success() {
        // Arrange
        Admin admin = new Admin("admin1", "password123");
        when(adminRepository.findByUsername("admin1")).thenReturn(Optional.of(admin));

        // Act
        ResponseEntity<?> response = adminController.login(new Admin("admin1", "password123"));

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Admin responseAdmin = (Admin) response.getBody();
        assertNotNull(responseAdmin);
        assertEquals("admin1", responseAdmin.getUsername());
        assertNull(responseAdmin.getPassword()); // Password should be null in response
    }

    @Test
    public void testLogin_InvalidCredentials() {
        // Arrange
        when(adminRepository.findByUsername("admin1")).thenReturn(Optional.empty());

        // Act
        ResponseEntity<?> response = adminController.login(new Admin("admin1", "wrongpassword"));

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid username or password!", response.getBody());
    }

    @Test
    public void testForgotPassword_Success() {
        // Arrange
        Admin admin = new Admin("admin1", "oldpassword");
        when(adminRepository.findByUsername("admin1")).thenReturn(Optional.of(admin));
        when(adminRepository.save(any(Admin.class))).thenReturn(admin);

        // Act
        ResponseEntity<String> response = adminController.forgotPassword("admin1", "newpassword");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Password updated successfully!", response.getBody());
        assertEquals("newpassword", admin.getPassword());
        verify(adminRepository, times(1)).save(admin);
    }

    @Test
    public void testForgotPassword_AdminNotFound() {
        // Arrange
        when(adminRepository.findByUsername("admin1")).thenReturn(Optional.empty());

        // Act
        ResponseEntity<String> response = adminController.forgotPassword("admin1", "newpassword");

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Admin not found!", response.getBody());
        verify(adminRepository, never()).save(any());
    }

    @Test
    public void testLogout_Success() {
        // Act
        ResponseEntity<String> response = adminController.logout();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Logged out successfully!", response.getBody());
    }
}