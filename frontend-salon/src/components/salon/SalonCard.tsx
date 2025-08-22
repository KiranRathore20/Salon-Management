import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Clock } from 'lucide-react';
import { Salon } from '@/types/salon';

interface SalonCardProps {
  salon: Salon;
  onBook: (salonId: string) => void;
  onContact: (salonId: string) => void;
}

const SalonCard = ({ salon, onBook, onContact }: SalonCardProps) => {
  return (
    <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-105 border-0 glass-effect group">
      <CardHeader className="relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-2xl font-playfair text-salon-primary group-hover:text-salon-secondary transition-colors">
               {salon.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-2 py-1 rounded-full">
                <Star className="h-4 w-4 fill-white text-white" />
                <span className="text-sm font-bold text-white">{salon.rating}</span>
              </div>
              <span className="text-xs text-salon-primary font-medium">Premium Salon</span>
            </div>
          </div>
          <div className="relative">
            <img 
              src={salon.image} 
              alt={salon.name}
              className="w-20 h-20 rounded-xl object-cover shadow-soft border-2 border-salon-primary/20"
            />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-salon-primary to-salon-secondary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">💎</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 p-2 rounded-lg salon-soft-gradient">
            <MapPin className="h-5 w-5 text-salon-primary" />
            <span className="text-salon-primary font-medium"> {salon.address}</span>
          </div>
          {/* <div className="flex items-center gap-3 p-2 rounded-lg salon-soft-gradient">
            <Phone className="h-5 w-5 text-salon-secondary" />
            <span className="text-salon-secondary font-medium"> {salon.phone}</span>
          </div> */}
          <div className="flex items-center gap-3 p-2 rounded-lg salon-soft-gradient">
            <Clock className="h-5 w-5 text-salon-accent" />
            <span className="text-salon-accent font-medium"> {salon.workingHours.open} - {salon.workingHours.close}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-salon-primary/10 to-salon-secondary/10 p-4 rounded-xl">
          <h4 className="font-bold mb-3 text-salon-primary font-playfair"> Premium Services:</h4>
          <div className="flex flex-wrap gap-2">
            {salon.services.slice(0, 3).map((service) => (
              <Badge key={service.id} className="salon-gradient text-white px-3 py-1 text-xs font-medium shadow-soft">
                 {service.name} - ₨{service.price}
              </Badge>
            ))}
            {salon.services.length > 3 && (
              <Badge variant="outline" className="text-xs border-salon-primary text-salon-primary hover:salon-gradient hover:text-white transition-all">
                +{salon.services.length - 3} more services
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={() => onBook(salon.id)} className="flex-1 h-12 text-base font-bold">
             Book Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onContact(salon.id)}
            className="flex-1 h-12 text-base font-medium"
          >
             Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCard;