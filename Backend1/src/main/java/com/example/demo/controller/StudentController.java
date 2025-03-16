package com.example.demo.controller;

import com.example.demo.model.Bicycle;
import com.example.demo.model.User;
import com.example.demo.service.StudentService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User student) {
        return studentService.signup(student);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User student) {
        return studentService.login(student);
    }

    @PostMapping("/book-classroom-key/{keyId}")
    public ResponseEntity<String> bookClassroomKey(@PathVariable Long keyId, @RequestParam Long userId) {
        return studentService.bookClassroomKey(keyId, userId);
    }

    // Endpoint to check key availability
    @GetMapping("/check-key-availability/{keyId}")
    public ResponseEntity<Integer> checkKeyAvailability(@PathVariable Long keyId) {  // Use @PathVariable instead of @RequestParam
        return studentService.checkKeyAvailability(keyId);
    }

    // Endpoint to check key availability for all available rooms
    @GetMapping("/available-rooms")
    public ResponseEntity<List<Map<String, Object>>> getAvailableRooms() {
        return studentService.getAvailableRooms();
    }
    
    // New API Endpoints for Bicycle Management
    
    @PostMapping("/bookbicycle/{bicycleId}")
    public ResponseEntity<String> bookBicycle(@PathVariable Long bicycleId, @RequestParam Long userId) {
        return studentService.bookBicycle(bicycleId, userId);
    }

    @GetMapping("/available-bicycles")
    public ResponseEntity<List<Bicycle>> listAvailableBicycles() {
        List<Bicycle> bicycles = studentService.listAvailableBicycles();
        return ResponseEntity.ok(bicycles);
    }

    @GetMapping("/all-bicycles")
    public ResponseEntity<List<Bicycle>> listAllBicycles() {
        List<Bicycle> bicycles = studentService.listAllBicycles();
        return ResponseEntity.ok(bicycles);
    }
}
