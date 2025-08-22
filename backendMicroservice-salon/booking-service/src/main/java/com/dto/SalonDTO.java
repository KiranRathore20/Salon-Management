package com.dto;


import lombok.Data;

import java.time.LocalTime;
import java.util.List;

@Data
public class SalonDTO {

    private Long salonId;
    private String name;
    private List<String> images;
    private String address;
    private String email;
    private String city;
    private Long ownerId;
    private UserDTO owner;
    private String mobileNumber;
    private LocalTime openTime;
    private LocalTime closeTime;
}
