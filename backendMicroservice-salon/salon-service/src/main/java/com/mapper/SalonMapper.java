package com.mapper;

import com.model.Salon;
import com.payload.dto.SalonDTO;

public class SalonMapper {

    public static SalonDTO mapTODTO(Salon salon) {
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setSalonId(salon.getId());

        salonDTO.setName(salon.getName());
        salonDTO.setAddress(salon.getAddress());
        salonDTO.setCity(salon.getCity());
        salonDTO.setImages(salon.getImages());
        salonDTO.setCloseTime(salon.getCloseTime());
        salonDTO.setOpenTime(salon.getOpenTime());
        salonDTO.setMobileNumber(salon.getMobileNumber());
        salonDTO.setOwnerId(salon.getOwnerId());
        salonDTO.setEmail(salon.getEmail());
        return salonDTO;
    }
}
