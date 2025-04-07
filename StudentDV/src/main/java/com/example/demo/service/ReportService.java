package com.example.demo.service;

import com.example.demo.model.Report;
import com.example.demo.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public Page<Report> getFilteredReports(
            String search, String department, String fromYear, 
            String toYear, String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        
        if (search != null && !search.isEmpty()) {
            return reportRepository.findBySearchCriteria(
                    search.toLowerCase(), department, fromYear, toYear, category, pageable);
        } else {
            return reportRepository.findByFilters(
                    department, fromYear, toYear, category, pageable);
        }
    }

    public List<String> getAllDepartments() {
        return reportRepository.findAllDepartments();
    }

    public List<String> getAllAcademicYears() {
        return reportRepository.findAllAcademicYears();
    }

    public List<String> getAllCategories() {
        return reportRepository.findAllCategories();
    }

    public List<String> getAllCompanies() {
        return reportRepository.findAllCompanies();
    }

    public String exportReports(String format) {
        return "Exported placement reports in " + format + " format";
    }
}