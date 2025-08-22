package com.service;

import com.domain.BookingStatus;
import com.dto.BookingRequest;
import com.dto.SalonDTO;
import com.dto.ServiceDTO;
import com.dto.UserDTO;
import com.model.Booking;
import com.model.SalonReport;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookingService {

    Booking createBooking(BookingRequest booking, UserDTO user,
                          SalonDTO salon, Set<ServiceDTO> serviceDTOSet) throws Exception;

    List<Booking> getBookingsByCustomer(Long customerId);
    List<Booking> getBookingsBySalon(Long salonId);
    Booking getBookingById (Long id) throws Exception;
    Booking updateBooking(Long bookingId, BookingStatus status) throws Exception;
    List<Booking>getBookingByDate(LocalDate date,Long salonId);
    SalonReport getSalonReport (Long salonId);

}
