package com.example.demo.controller;

import com.example.demo.entity.Club;
import com.example.demo.repository.ClubRepository;
import com.example.demo.repository.ClubMembershipRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClubsAndSocietiesControllerTest {

    @Mock
    private ClubRepository clubRepository;

    @Mock
    private ClubMembershipRepository membershipRepository;

    @InjectMocks
    private ClubsAndSocietiesController controller;

    private Club createTestClub(Long id, String name, String category, String department) {
        // Assuming Club has a constructor with these parameters
        // If not, you'll need to modify this based on your actual Club entity structure
        return new Club(id, name, category, department);
    }

    @Test
    void getClubs_ShouldReturnAll_WhenNoFilters() {
        // Arrange
        Club club1 = createTestClub(1L, "Chess Club", "Sports", "CS");
        Club club2 = createTestClub(2L, "Music Club", "Arts", "ME");
        when(clubRepository.findAll()).thenReturn(Arrays.asList(club1, club2));

        // Act
        ResponseEntity<List<Club>> response = controller.getClubs(null, null);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        verify(clubRepository).findAll();
    }

    @Test
    void getClubs_ShouldFilterByCategoryAndDepartment() {
        // Arrange
        Club club = createTestClub(1L, "CS Chess Club", "Sports", "CS");
        when(clubRepository.findByCategoryAndDepartment("Sports", "CS"))
            .thenReturn(Collections.singletonList(club));

        // Act
        ResponseEntity<List<Club>> response = controller.getClubs("Sports", "CS");

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals("CS Chess Club", response.getBody().get(0).getName());
    }

    @Test
    void getClubs_ShouldFilterByCategoryOnly() {
        // Arrange
        Club club = createTestClub(1L, "Chess Club", "Sports", "CS");
        when(clubRepository.findByCategoryIgnoreCase("Sports"))
            .thenReturn(Collections.singletonList(club));

        // Act
        ResponseEntity<List<Club>> response = controller.getClubs("Sports", null);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals("Chess Club", response.getBody().get(0).getName());
    }

    @Test
    void getClubs_ShouldFilterByDepartmentOnly() {
        // Arrange
        Club club = createTestClub(1L, "CS Club", "Technical", "CS");
        when(clubRepository.findByDepartment("CS"))
            .thenReturn(Collections.singletonList(club));

        // Act
        ResponseEntity<List<Club>> response = controller.getClubs(null, "CS");

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals("CS Club", response.getBody().get(0).getName());
    }

    @Test
    void getClubs_ShouldReturnEmptyList_WhenNoClubsExist() {
        // Arrange
        when(clubRepository.findAll()).thenReturn(Collections.emptyList());

        // Act
        ResponseEntity<List<Club>> response = controller.getClubs(null, null);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().isEmpty());
    }

    @Test
    void getClubs_ShouldReturn500_WhenRepositoryFails() {
        // Arrange
        when(clubRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        // Act
        ResponseEntity<List<Club>> response = controller.getClubs(null, null);

        // Assert
        assertEquals(500, response.getStatusCodeValue());
    }

    @Test
    void getClubCategories_ShouldReturnCategories() {
        // Arrange
        when(clubRepository.findDistinctCategories())
            .thenReturn(Arrays.asList("Sports", "Arts", "Technical"));

        // Act
        ResponseEntity<List<String>> response = controller.getClubCategories();

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(3, response.getBody().size());
        assertTrue(response.getBody().contains("Arts"));
    }

    @Test
    void getClubCategories_ShouldReturn500_WhenRepositoryFails() {
        // Arrange
        when(clubRepository.findDistinctCategories())
            .thenThrow(new RuntimeException("Database error"));

        // Act
        ResponseEntity<List<String>> response = controller.getClubCategories();

        // Assert
        assertEquals(500, response.getStatusCodeValue());
    }

    @Test
    void getMembershipsByCategory_ShouldReturnFormattedResults() {
        // Arrange
        Object[] result1 = new Object[]{"Sports", 10L};
        Object[] result2 = new Object[]{"Arts", 5L};
        when(clubRepository.countMembershipsByCategoryAndDepartment(null))
            .thenReturn(Arrays.asList(result1, result2));

        // Act
        ResponseEntity<List<Map<String, Object>>> response = 
            controller.getMembershipsByCategory(null);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        assertEquals("Sports", response.getBody().get(0).get("name"));
        assertEquals(10L, response.getBody().get(0).get("count"));
    }

    @Test
    void getMembershipsByPosition_ShouldReturnDepartmentSpecificResults() {
        // Arrange
        Object[] result = new Object[]{"President", 2L};
        when(membershipRepository.countByRoleAndDepartment("CS"))
            .thenReturn(Collections.singletonList(result));

        // Act
        ResponseEntity<List<Map<String, Object>>> response = 
            controller.getMembershipsByPosition("CS");

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals(2L, response.getBody().get(0).get("value"));
    }

    @Test
    void getMembershipsByPosition_ShouldHandleNullDepartment() {
        // Arrange
        Object[] result = new Object[]{"Member", 15L};
        when(membershipRepository.countByRole())
            .thenReturn(Collections.singletonList(result));

        // Act
        ResponseEntity<List<Map<String, Object>>> response = 
            controller.getMembershipsByPosition(null);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals("Member", response.getBody().get(0).get("name"));
    }
}