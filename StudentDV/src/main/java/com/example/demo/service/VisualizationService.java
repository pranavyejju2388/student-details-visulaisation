package com.example.demo.service;

import com.example.demo.repository.PlacementRepository;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.ClubMembershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisualizationService {

    @Autowired
    private PlacementRepository placementRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ClubMembershipRepository clubMembershipRepository;

    // Generate placement statistics by department and year
    public Long getPlacementCountByDepartment(String department, int year) {
        return placementRepository.countPlacementsByDepartment(department, year);
    }

    // Generate event statistics for a given year
    public Long getEventCountByYear(int year) {
        return eventRepository.countEventsByYear(year);
    }

    // Get club membership count
    public Long getClubMembershipCount(String clubName) {
        return clubMembershipRepository.countClubMembers(clubName);
    }
}