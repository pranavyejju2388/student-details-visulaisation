package com.example.demo.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.example.demo.model.CulturalEvent;
import com.example.demo.repository.CulturalEventRepository;

@ExtendWith(MockitoExtension.class)
public class CulturalEventControllerTest {

    @Mock
    private CulturalEventRepository repository;

    @InjectMocks
    private CulturalEventController controller;

    @Test
    public void getAllEvents_ShouldReturnEvents() {
        CulturalEvent event = new CulturalEvent();
        event.setEventName("Test Event");
        
        when(repository.findAll()).thenReturn(Collections.singletonList(event));
        
        ResponseEntity<List<CulturalEvent>> response = controller.getAllCulturalEvents();
        
        assertEquals(1, response.getBody().size());
        assertEquals("Test Event", response.getBody().get(0).getEventName());
    }
}