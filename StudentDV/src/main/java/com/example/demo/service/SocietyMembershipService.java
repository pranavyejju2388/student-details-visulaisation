package com.example.demo.service;

import com.example.demo.model.SocietyMembership;
import com.example.demo.repository.SocietyMembershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SocietyMembershipService {

    @Autowired
    private SocietyMembershipRepository societyMembershipRepository;

    public List<SocietyMembership> getAllMemberships() {
        return societyMembershipRepository.findAll();
    }

    public Optional<SocietyMembership> getMembershipById(Long id) {
        return societyMembershipRepository.findById(id);
    }

    public SocietyMembership saveMembership(SocietyMembership membership) {
        return societyMembershipRepository.save(membership);
    }

    public void deleteMembership(Long id) {
        societyMembershipRepository.deleteById(id);
    }
}
