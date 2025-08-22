package com.controller;

import com.mapper.SalonMapper;
import com.model.Salon;
import com.payload.dto.SalonDTO;
import com.payload.dto.UserDTO;
import com.service.SaloonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salon")
@RequiredArgsConstructor

public class SalonController {
    private final SaloonService saloonService;

    // http://localhost:8081:/api/salon
    @PostMapping
    public ResponseEntity<SalonDTO> createSalon(@RequestBody SalonDTO salonDTO) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        Salon salon = saloonService.createSalon(salonDTO, userDTO);
        SalonDTO salonDTO1 = SalonMapper.mapTODTO(salon);
        return ResponseEntity.ok(salonDTO1);
    }

    // http://localhost:8081:/api/salon/2
    @PatchMapping("/{id}")
    public ResponseEntity<SalonDTO> updateSalon(
            @PathVariable("id") Long salonId,
            @RequestBody SalonDTO salonDTO) throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        Salon salon = saloonService.updateSalon(salonDTO, userDTO, salonId);
        SalonDTO salonDTO1 = SalonMapper.mapTODTO(salon);
        return ResponseEntity.ok(salonDTO1);
    }

    // http://localhost:8081/api/salon
    @GetMapping()
    public ResponseEntity<List<SalonDTO>> getSalons() throws Exception {
        List<Salon> salons = (List<Salon>) saloonService.getAllSalons();
        List<SalonDTO> salonDTOS = salons.stream().map((salon) ->
                {
                    SalonDTO salonDTO = SalonMapper.mapTODTO(salon);
                    return salonDTO;
                }
        ).toList();
        return ResponseEntity.ok(salonDTOS);
    }

    // http://localhost:8081/api/salon/5
    @GetMapping("/{salonId}")
    public ResponseEntity<SalonDTO> getSalonBYID(
            @PathVariable Long salonId

    ) throws Exception {


        Salon salon = saloonService.getSalonById(salonId);
        SalonDTO salonDTO = SalonMapper.mapTODTO(salon);
        return ResponseEntity.ok(salonDTO);

    }
    // http://localhost:8081/api/salon/search?city=mumbai

    @GetMapping("/search")
    public ResponseEntity<List<SalonDTO>> searchSalons(
            @RequestParam("city") String city
    ) throws Exception {

        List<Salon> salons = saloonService.searchSalonByCity(city);
        List<SalonDTO> salonDTOS = salons.stream().map((salon) ->
                {
                    SalonDTO salonDTO = SalonMapper.mapTODTO(salon);
                    return salonDTO;
                }
        ).toList();
        return ResponseEntity.ok(salonDTOS);
    }

    // http://localhost:8081/api/salon/5
    @GetMapping("/owner")
    public ResponseEntity<SalonDTO> getSalonBYOwnerID(
            @PathVariable Long salonId

    ) throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);

        Salon salon = saloonService.getSalonByOwnerId(userDTO.getId());
        SalonDTO salonDTO = SalonMapper.mapTODTO(salon);
        return ResponseEntity.ok(salonDTO);

    }


}

