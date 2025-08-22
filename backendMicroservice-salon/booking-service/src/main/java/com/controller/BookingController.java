package com.controller;

import com.domain.BookingStatus;
import com.dto.*;
import com.mapper.BookingMapper;
import com.model.Booking;
import com.model.SalonReport;
import com.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // Create a new booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestParam Long salonId,
            @RequestBody BookingRequest bookingRequest) throws Exception {

        // Static user and service (for testing purposes)
        UserDTO user = new UserDTO();
        user.setId(1L);

        SalonDTO salon = new SalonDTO();
        salon.setSalonId(salonId);
        salon.setOpenTime(LocalTime.of(9, 0));
        salon.setCloseTime(LocalTime.of(21, 0));

        Set<ServiceDTO> serviceDTOSet = new HashSet<>();
        ServiceDTO serviceDTO = new ServiceDTO();
        serviceDTO.setId(1L);
        serviceDTO.setPrice(399);
        serviceDTO.setName("Hair cut for men");
        serviceDTOSet.add(serviceDTO);

        Booking booking = bookingService.createBooking(bookingRequest, user, salon, serviceDTOSet);
        return ResponseEntity.ok(booking);
    }

    // Get bookings by customer
    @GetMapping("/customer")
    public ResponseEntity<Set<BookingDTO>> getBookingsByCustomer() {
        List<Booking> bookings = bookingService.getBookingsByCustomer(1L);
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }

    // Get bookings by salon
    @GetMapping("/salon")
    public ResponseEntity<Set<BookingDTO>> getBookingsBySalon() {
        List<Booking> bookings = bookingService.getBookingsBySalon(1L);
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }

    // Helper method to map bookings to DTOs
    private Set<BookingDTO> getBookingDTOs(List<Booking> bookings) {
        return bookings.stream()
                .map(BookingMapper::toDTO)
                .collect(Collectors.toSet());
    }

    // Get booking by ID
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(
            @PathVariable Long bookingId) throws Exception {
        Booking booking = bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(BookingMapper.toDTO(booking));
    }

    // Update booking status
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingDTO> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam BookingStatus status) throws Exception {
        Booking booking = bookingService.updateBooking(bookingId, status);
        return ResponseEntity.ok(BookingMapper.toDTO(booking));
    }

    // Get booked slots for a salon on a specific date
    @GetMapping("/slots/salon/{salonId}/date/{date}")
    public ResponseEntity<List<BookingDTO>> getBookedSlot(
            @PathVariable Long salonId,
            @PathVariable String date) throws Exception {
        LocalDate bookingDate = LocalDate.parse(date);
        List<Booking> bookingList = bookingService.getBookingByDate(bookingDate, salonId);
        List<BookingDTO> bookingDTOs = bookingList.stream()
                .map(BookingMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookingDTOs);
    }

    // Get bookings by date and salon
    @GetMapping("/date")
    public ResponseEntity<List<Booking>> getBookingsByDate(
            @RequestParam String date,
            @RequestParam Long salonId) {
        LocalDate bookingDate = LocalDate.parse(date);
        return ResponseEntity.ok(bookingService.getBookingByDate(bookingDate, salonId));
    }

    // Get salon report
    @GetMapping("/salon/{salonId}/report")
    public ResponseEntity<SalonReport> getSalonReport(@PathVariable Long salonId) {
        return ResponseEntity.ok(bookingService.getSalonReport(salonId));
    }
}
