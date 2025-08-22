package com.service;

import com.dto.CategoryDTO;
import com.dto.SalonDTO;
import com.dto.ServiceDTO;
import com.model.ServiceOffering;

import java.util.Set;

public interface ServiceOfferingService {

    ServiceOffering createService (SalonDTO salonDTO,
                                   ServiceDTO serviceDTO,
                           CategoryDTO categoryDTO);
    ServiceOffering updateService(Long serviceId,ServiceOffering service) throws Exception;
    Set<ServiceOffering>getAllServiceBySalonId(Long salonId,Long categoryId);
    Set<ServiceOffering>getServicesByIds(Set<Long>ids);
    ServiceOffering getServiceById(Long id) throws Exception;

}

