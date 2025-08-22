import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSalon } from '@/contexts/SalonContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Salon, Service } from '@/types/salon';
import { CreditCard, Smartphone, Banknote, QrCode, Wallet } from 'lucide-react';

const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Please enter a valid phone number'),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  salon: Salon;
  onSuccess?: () => void;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
];

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'cash', name: 'Cash on Visit', icon: Banknote },
  { id: 'mobile_banking', name: 'Mobile Banking', icon: Smartphone },
  { id: 'digital_wallet', name: 'Digital Wallet', icon: Wallet },
  { id: 'qr_code', name: 'QR Code Payment', icon: QrCode },
];

const BookingForm = ({ salon, onSuccess }: BookingFormProps) => {
  const { addBooking } = useSalon();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showPayment, setShowPayment] = useState(false);
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: '',
      date: '',
      time: '',
      customerName: user?.name || '',
      customerPhone: user?.phone || '',
      paymentMethod: '',
    },
  });

  const selectedServiceId = form.watch('serviceId');
  const selectedService = salon.services.find(s => s.id === selectedServiceId);

  const onSubmit = async (data: BookingFormData) => {
    if (!user || !selectedService) return;

    try {
      addBooking({
        salonId: salon.id,
        userId: user.id,
        serviceId: data.serviceId,
        date: data.date,
        time: data.time,
        status: 'pending',
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        totalAmount: selectedService.price,
      });

      toast({
        title: 'Success',
        description: 'Booking request submitted successfully!',
      });
      
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit booking. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>
          Book your appointment at {salon.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {salon.services.map((service: Service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ₨{service.price} ({service.duration} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedService && (
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-semibold">{selectedService.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedService.description}</p>
                <p className="text-sm font-medium">
                  Price: ₨{selectedService.price} | Duration: {selectedService.duration} minutes
                </p>
              </div>
            )}
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" min={minDate} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <div className="grid grid-cols-1 gap-3">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div
                          key={method.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-salon-primary/50 ${
                            field.value === method.id 
                              ? 'border-salon-primary bg-salon-primary/5 shadow-glow' 
                              : 'border-border'
                          }`}
                          onClick={() => field.onChange(method.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-salon-primary" />
                            <span className="font-medium">{method.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedService && form.watch('paymentMethod') && (
              <div className="p-4 bg-gradient-to-r from-salon-primary/10 to-salon-secondary/10 rounded-lg border border-salon-primary/20">
                <h4 className="font-semibold text-salon-primary mb-2">💳 Payment Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-bold text-salon-primary">₨{selectedService.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-medium">
                      {paymentMethods.find(m => m.id === form.watch('paymentMethod'))?.name}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-salon-primary to-salon-secondary hover:from-salon-primary/90 hover:to-salon-secondary/90 text-white shadow-glow"
            >
              💳 Confirm Booking & Payment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;