package com.service.imp;

import com.model.Salon;
import com.payload.dto.SalonDTO;
import com.payload.dto.UserDTO;
import com.repository.SalonRepository;
import com.service.SaloonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaloonServiceImpl implements SaloonService {

    private final SalonRepository salonRepository;

    @Override
    public Salon createSalon(SalonDTO req, UserDTO user) {
        Salon salon = new Salon();
        salon.setName(req.getName());
        salon.setAddress(req.getAddress());
        salon.setEmail(req.getEmail());
        salon.setCity(req.getCity());
        salon.setImages(req.getImages());
        salon.setOpenTime(req.getOpenTime());
        salon.setCloseTime(req.getCloseTime());
        salon.setOwnerId(user.getId());

        //  FIX: Use mobile number from SalonDTO instead of user (which is null)
        salon.setMobileNumber(req.getMobileNumber());

        return salonRepository.save(salon);
    }

    @Override
    public Salon updateSalon(SalonDTO salonDTO, UserDTO user, Long salonId) throws Exception {
        Salon existingSalon = salonRepository.findById(salonId)
                .orElseThrow(() -> new Exception("Salon not exist"));

        if (!salonDTO.getOwnerId().equals(user.getId())) {
            throw new Exception("Unauthorized to update this salon.");
        }

        existingSalon.setCity(salonDTO.getCity());
        existingSalon.setName(salonDTO.getName());
        existingSalon.setAddress(salonDTO.getAddress());
        existingSalon.setEmail(salonDTO.getEmail());
        existingSalon.setImages(salonDTO.getImages());
        existingSalon.setOpenTime(salonDTO.getOpenTime());
        existingSalon.setCloseTime(salonDTO.getCloseTime());
        existingSalon.setOwnerId(salonDTO.getOwnerId());

        //  Use mobileNumber from DTO instead of user
        existingSalon.setMobileNumber(salonDTO.getMobileNumber());

        return salonRepository.save(existingSalon);
    }

    @Override
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    @Override
    public Salon getSalonById(Long salonId) throws Exception {
        return salonRepository.findById(salonId)
                .orElseThrow(() -> new Exception("Salon not exist"));
    }

    @Override
    public Salon getSalonByOwnerId(Long ownerId) {
        return salonRepository.findByOwnerId(ownerId);
    }

    @Override
    public List<Salon> searchSalonByCity(String city) {
        return salonRepository.searchSalons(city);
    }
}
