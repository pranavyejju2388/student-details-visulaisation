package com.studentdv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.studentdv.model")
@EnableJpaRepositories("com.studentdv.repository")
public class StudentDvApplication {
    public static void main(String[] args) {
        SpringApplication.run(StudentDvApplication.class, args);
    }
} 