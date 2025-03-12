package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // User Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        return authService.login(user);
    }

    // Google OAuth (Placeholder for Future)
    @PostMapping("/google-login")
    public ResponseEntity<String> googleLogin(@RequestBody String token) {
        return ResponseEntity.ok("Google authentication coming soon...");
    }
}
