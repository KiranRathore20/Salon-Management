import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Salon, Booking, Payment } from '@/types/salon';

interface SalonContextType {
  salons: Salon[];
  bookings: Booking[];
  payments: Payment[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  getSalonById: (id: string) => Salon | undefined;
  addSalon: (salon: Omit<Salon, 'id'>) => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

// Mock salon data
const mockSalons: Salon[] = [
  {
    id: '1',
    name: 'Elite Beauty Salon',
    address: 'Block A, Gulberg III, Lahore',
    phone: '+92-42-35714001',
    email: 'info@elitebeauty.com',
    rating: 4.8,
    image: '/placeholder.svg',
    workingHours: { open: '09:00', close: '20:00' },
    services: [
      { id: '1', name: 'Hair Cut', price: 1500, duration: 45, description: 'Professional hair cutting service' },
      { id: '2', name: 'Hair Coloring', price: 3500, duration: 120, description: 'Premium hair coloring' },
      { id: '3', name: 'Facial', price: 2500, duration: 60, description: 'Deep cleansing facial' },
      { id: '4', name: 'Manicure', price: 1200, duration: 30, description: 'Complete nail care' },
    ]
  },
  {
    id: '2',
    name: 'Glamour Studio',
    address: 'Main Boulevard, DHA Phase 5, Karachi',
    phone: '+92-21-35820001',
    email: 'contact@glamourstudio.com',
    rating: 4.6,
    image: '/placeholder.svg',
    workingHours: { open: '10:00', close: '22:00' },
    services: [
      { id: '5', name: 'Bridal Makeup', price: 15000, duration: 180, description: 'Complete bridal makeover' },
      { id: '6', name: 'Party Makeup', price: 5000, duration: 90, description: 'Party and event makeup' },
      { id: '7', name: 'Threading', price: 500, duration: 20, description: 'Eyebrow and facial threading' },
      { id: '8', name: 'Pedicure', price: 1500, duration: 45, description: 'Foot care and nail polish' },
    ]
  }
];

export const SalonProvider = ({ children }: { children: ReactNode }) => {
  const [salons, setSalons] = useState<Salon[]>(mockSalons);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...payment,
      id: Date.now().toString(),
    };
    setPayments(prev => [...prev, newPayment]);
  };

  const getSalonById = (id: string): Salon | undefined => {
    return salons.find(salon => salon.id === id);
  };

  const addSalon = (salon: Omit<Salon, 'id'>) => {
    const newSalon: Salon = {
      ...salon,
      id: Date.now().toString(),
    };
    setSalons(prev => [...prev, newSalon]);
  };

  return (
    <SalonContext.Provider value={{
      salons,
      bookings,
      payments,
      addBooking,
      updateBookingStatus,
      addPayment,
      getSalonById,
      addSalon
    }}>
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (context === undefined) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};