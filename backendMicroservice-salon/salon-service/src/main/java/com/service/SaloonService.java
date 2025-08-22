package com.service;


import com.model.Salon;
import com.payload.dto.SalonDTO;
import com.payload.dto.UserDTO;

import java.util.List;

public interface SaloonService {
    //create
    Salon createSalon(SalonDTO salon, UserDTO user);

    //update
    Salon updateSalon(SalonDTO salon, UserDTO user, Long salonId) throws Exception;

    //get
    List<Salon> getAllSalons();

    Salon getSalonById(Long salonId) throws Exception;

    Salon getSalonByOwnerId(Long ownerId);

    List<Salon> searchSalonByCity(String city);


}
