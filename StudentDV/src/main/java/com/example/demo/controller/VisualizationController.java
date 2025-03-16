package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/visualizations")
public class VisualizationController {

    @GetMapping("/charts")
    public String getCharts() {
        return "Fetching data for visualizations...";
    }
}
