package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @GetMapping("/generate")
    public String generateReport() {
        return "Generating report...";
    }
}
