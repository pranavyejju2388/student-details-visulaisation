package com.example.demo.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "key_requests")
public class KeyRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "classroom_key_id", nullable = false)
    private ClassroomKey classroomKey;

    @Column(nullable = false)
    private Timestamp requestTime;

    @Column(nullable = false)
    private String status;  // PENDING, APPROVED, REJECTED

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public ClassroomKey getClassroomKey() {
        return classroomKey;
    }

    public void setClassroomKey(ClassroomKey classroomKey) {
        this.classroomKey = classroomKey;
    }

    public Timestamp getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(Timestamp requestTime) {
        this.requestTime = requestTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
