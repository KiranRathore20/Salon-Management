export interface Salon {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  services: Service[];
  workingHours: {
    open: string;
    close: string;
  };
  rating: number;
  image: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
}

export interface Booking {
  id: string;
  salonId: string;
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  customerName: string;
  customerPhone: string;
  totalAmount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded';
  method: 'cash' | 'card' | 'online';
  date: string;
}