package com.example.demo.service;

import com.example.demo.model.Bicycle;
import com.example.demo.model.ClassroomKey;
import com.example.demo.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface AdminService {
    ResponseEntity<String> signup(User admin);
    ResponseEntity<String> login(User admin);
    void addClassroom(ClassroomKey classroomKey);
    List<ClassroomKey> listAvailableKeys();
    List<ClassroomKey> listAllKeys();
    // New methods for bicycles
    void addBicycle(Bicycle bicycle);
    ResponseEntity<String> bookBicycle(Long bicycleId, Long userId);
    List<Bicycle> listAvailableBicycles();
    List<Bicycle> listAllBicycles();
}
