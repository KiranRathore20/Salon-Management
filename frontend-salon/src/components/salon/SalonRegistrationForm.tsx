import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSalon } from '@/contexts/SalonContext';
import { useToast } from '@/hooks/use-toast';
import { Service } from '@/types/salon';
import { Plus, X } from 'lucide-react';

const salonSchema = z.object({
  name: z.string().min(2, 'Salon name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  openTime: z.string().min(1, 'Opening time is required'),
  closeTime: z.string().min(1, 'Closing time is required'),
});

type SalonFormData = z.infer<typeof salonSchema>;

const availableServices = [
  { name: 'Hair Cut', price: 1500, duration: 45, description: 'Professional hair cutting service' },
  { name: 'Hair Coloring', price: 3500, duration: 120, description: 'Premium hair coloring' },
  { name: 'Facial', price: 2500, duration: 60, description: 'Deep cleansing facial' },
  { name: 'Manicure', price: 1200, duration: 30, description: 'Complete nail care' },
  { name: 'Pedicure', price: 1500, duration: 45, description: 'Foot care and nail polish' },
  { name: 'Bridal Makeup', price: 15000, duration: 180, description: 'Complete bridal makeover' },
  { name: 'Party Makeup', price: 5000, duration: 90, description: 'Party and event makeup' },
  { name: 'Threading', price: 500, duration: 20, description: 'Eyebrow and facial threading' },
  { name: 'Hair Wash', price: 800, duration: 30, description: 'Professional hair washing' },
  { name: 'Hair Styling', price: 2000, duration: 60, description: 'Professional hair styling' },
];

interface SalonRegistrationFormProps {
  onSuccess?: () => void;
}

const SalonRegistrationForm = ({ onSuccess }: SalonRegistrationFormProps) => {
  const { addSalon } = useSalon();
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [customService, setCustomService] = useState({ name: '', price: '', duration: '', description: '' });

  const form = useForm<SalonFormData>({
    resolver: zodResolver(salonSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      openTime: '09:00',
      closeTime: '20:00',
    },
  });

  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString(),
    };
    setSelectedServices(prev => [...prev, newService]);
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const addCustomService = () => {
    if (customService.name && customService.price && customService.duration) {
      addService({
        name: customService.name,
        price: parseInt(customService.price),
        duration: parseInt(customService.duration),
        description: customService.description || customService.name,
      });
      setCustomService({ name: '', price: '', duration: '', description: '' });
    }
  };

  const onSubmit = (data: SalonFormData) => {
    if (selectedServices.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one service',
        variant: 'destructive',
      });
      return;
    }

    const newSalon = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      services: selectedServices,
      workingHours: {
        open: data.openTime,
        close: data.closeTime,
      },
      rating: 4.5,
      image: '/placeholder.svg',
    };

    addSalon(newSalon);
    
    toast({
      title: 'Success!',
      description: 'Salon registered successfully!',
    });

    form.reset();
    setSelectedServices([]);
    onSuccess?.();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto glass-effect shadow-elegant">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-playfair salon-gradient bg-clip-text text-transparent">
           Register Your Salon
        </CardTitle>
        <CardDescription className="text-lg">
          Join our platform and reach more customers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-salon-primary font-playfair">📋 Basic Information</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salon Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter salon name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location/Address *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter complete address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+92-XXX-XXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="salon@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="openTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening Time *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="closeTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Closing Time *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Services Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-salon-primary font-playfair">💄 Select Services</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableServices.map((service, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    className="h-auto p-4 text-left justify-start"
                    onClick={() => addService(service)}
                  >
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">₨{service.price} - {service.duration}min</div>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Custom Service */}
              <div className="bg-salon-soft-gradient p-4 rounded-lg space-y-3">
                <h4 className="font-medium text-salon-primary">Add Custom Service</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Input
                    placeholder="Service name"
                    value={customService.name}
                    onChange={(e) => setCustomService(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Price (₨)"
                    type="number"
                    value={customService.price}
                    onChange={(e) => setCustomService(prev => ({ ...prev, price: e.target.value }))}
                  />
                  <Input
                    placeholder="Duration (min)"
                    type="number"
                    value={customService.duration}
                    onChange={(e) => setCustomService(prev => ({ ...prev, duration: e.target.value }))}
                  />
                  <Button type="button" onClick={addCustomService}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Selected Services */}
              {selectedServices.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-salon-primary">Selected Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((service) => (
                      <Badge key={service.id} className="salon-gradient text-white px-3 py-1">
                        {service.name} - ₨{service.price}
                        <button
                          type="button"
                          onClick={() => removeService(service.id)}
                          className="ml-2 hover:text-red-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-bold">
               Register Salon
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SalonRegistrationForm;