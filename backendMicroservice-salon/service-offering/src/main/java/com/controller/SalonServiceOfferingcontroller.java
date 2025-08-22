package com.controller;

import com.dto.CategoryDTO;
import com.dto.SalonDTO;
import com.dto.ServiceDTO;
import com.model.ServiceOffering;
import com.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service-offering/salon-owner")
@RequiredArgsConstructor
public class SalonServiceOfferingcontroller {
    private final ServiceOfferingService serviceOfferingService;

    // create
    @PostMapping
    public ResponseEntity<ServiceOffering> createService (
            @RequestBody ServiceDTO serviceDTO) {
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setSalonId(1L);

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategoryId(serviceDTO.getCategoryId());// from sevice dto we will get category id

        ServiceOffering serviceOfferings = serviceOfferingService.createService(salonDTO, serviceDTO, categoryDTO);
        return ResponseEntity.ok(serviceOfferings);

    }
    @PostMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateService (
           @PathVariable Long id,
            @RequestBody ServiceOffering serviceOffering) throws Exception {
        ServiceOffering serviceOfferings = serviceOfferingService.updateService(id,serviceOffering);
        return ResponseEntity.ok(serviceOfferings);

    }
}
