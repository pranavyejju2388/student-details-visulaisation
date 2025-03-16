package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/society-memberships")
public class SocietyMembershipController {

    @GetMapping("/all")
    public String getAllMemberships() {
        return "Fetching all professional society memberships...";
    }
}
