package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.model.Bicycle;
import com.example.demo.model.ClassroomKey;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface StudentService {
    ResponseEntity<String> signup(User student);
    ResponseEntity<String> login(User student);
    
    // New methods for classroom key management
    ResponseEntity<String> bookClassroomKey(Long keyId, Long userId);
    ResponseEntity<Integer> checkKeyAvailability(Long keyId);
    ResponseEntity<List<Map<String, Object>>> getAvailableRooms();
 // New methods for cycle key management
    ResponseEntity<String> bookBicycle(Long bicycleId, Long userId);
    List<Bicycle> listAvailableBicycles();
    List<Bicycle> listAllBicycles();
}
