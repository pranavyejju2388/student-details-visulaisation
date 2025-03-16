package com.example.demo.imp;

import com.example.demo.model.Bicycle;
import com.example.demo.model.ClassroomKey;
import com.example.demo.model.User;
import com.example.demo.repository.BicycleRepository;
import com.example.demo.repository.ClassroomKeyRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BicycleRepository bicycleRepository;

    @Override
    public ResponseEntity signup(User student) {
        if (!"STUDENT".equals(student.getRole())) {
            return ResponseEntity.status(403).body(Map.of("error", "Invalid role for student signup"));
        }
        userRepository.save(student);

        // Prepare response with success message and user details
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Student registered successfully");
        response.put("user", student);  // Include the user details in the response

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity login(User student) {
        Optional<User> existingStudent = userRepository.findByUsername(student.getUsername());
        if (existingStudent.isPresent() && existingStudent.get().getPassword().equals(student.getPassword()) && "STUDENT".equals(existingStudent.get().getRole())) {

            // Prepare response with success message and user details
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Student login successful");
            response.put("user", existingStudent.get());  // Include the user details in the response

            return ResponseEntity.ok(response);
        }

        // Return error if credentials are incorrect or role is invalid
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials or role"));
    }
    
    @Autowired
    private ClassroomKeyRepository classroomKeyRepository;

    @Override
    public ResponseEntity<String> bookClassroomKey(Long keyId, Long userId) {
        // Use the injected classroomKeyRepository instance to call findById
        Optional<ClassroomKey> keyOptional = classroomKeyRepository.findById(keyId);
        if (keyOptional.isPresent()) {
            ClassroomKey classroomKey = keyOptional.get();
            if (classroomKey.getIsAvailable()==1) {
                classroomKey.setIsAvailable(0);  // Mark the key as booked (unavailable)
                classroomKeyRepository.save(classroomKey);  // Save the updated status
                return ResponseEntity.ok("Classroom key booked successfully.");
            } else {
                return ResponseEntity.status(400).body("Classroom key is already booked.");
            }
        } else {
            return ResponseEntity.status(404).body("Classroom key not found.");
        }
    }

    @Override
    public ResponseEntity<Integer> checkKeyAvailability(Long keyId) {
        // Again, use classroomKeyRepository instance
        Optional<ClassroomKey> keyOptional = classroomKeyRepository.findById(keyId);
        if (keyOptional.isPresent()) {
            return ResponseEntity.ok(keyOptional.get().getIsAvailable());
        } else {
            return ResponseEntity.status(404).body(-1);
        }
    }
    @Override
    public ResponseEntity<List<Map<String, Object>>> getAvailableRooms() {
        List<ClassroomKey> availableRooms = classroomKeyRepository.findByIsAvailable(1);

        // Convert ClassroomKey entities to a simpler Map with only necessary details
        List<Map<String, Object>> response = availableRooms.stream().map(room -> {
            Map<String, Object> roomDetails = new HashMap<>();
            roomDetails.put("blockName", room.getBlockName());
            roomDetails.put("classroomName", room.getClassroomName());
            roomDetails.put("isAvailable", room.getIsAvailable());
            return roomDetails;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    //For Bicycle Management
    @Override
    public ResponseEntity<String> bookBicycle(Long bicycleId, Long userId) {
        Optional<Bicycle> bicycleOptional = bicycleRepository.findById(bicycleId);
        if (bicycleOptional.isPresent()) {
            Bicycle bicycle = bicycleOptional.get();
            if (bicycle.getIsAvailable()) {
                bicycle.setAvailable(false);  // Mark bicycle as booked
                bicycleRepository.save(bicycle);
                return ResponseEntity.ok("Bicycle booked successfully by user ID: " + userId);
            } else {
                return ResponseEntity.status(400).body("Bicycle is already booked.");
            }
        } else {
            return ResponseEntity.status(404).body("Bicycle not found.");
        }
    }

    @Override
    public List<Bicycle> listAvailableBicycles() {
        return bicycleRepository.findByIsAvailable(true);
    }

    @Override
    public List<Bicycle> listAllBicycles() {
        return bicycleRepository.findAll();
    }

}
