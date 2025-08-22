import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useSalon } from "@/contexts/SalonContext";
import SalonCard from "@/components/salon/SalonCard";
import BookingForm from "@/components/booking/BookingForm";
import { useToast } from "@/hooks/use-toast";
import { Search, LogOut, User, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import Contact from "./Contact";

const Index = () => {
  const { user, logout } = useAuth();
  const { salons, getSalonById } = useSalon();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const filteredSalons = salons.filter(
    (salon) =>
      salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBook = (salonId: string) => {
    setSelectedSalon(salonId);
    setIsBookingOpen(true);
  };

  const handleContact = (salonId: string) => {
    const salon = getSalonById(salonId);
    if (salon) {
      toast({
        title: "Contact Info",
        description: `Call ${salon.name} at ${salon.phone}`,
      });
    }
  };

  const handleBookingSuccess = () => {
    setIsBookingOpen(false);
    setSelectedSalon(null);
  };

  const salon = selectedSalon ? getSalonById(selectedSalon) : null;

  return (
    <div className="min-h-screen salon-soft-gradient">
      {/* Header */}
      <div className="border-b glass-effect">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold font-playfair salon-gradient bg-clip-text text-transparent">
            Salon Management System
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span>Welcome, {user.name}</span>
            </div>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/register-salon")}
              className="text-sm"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Register Salon
            </Button>
            {user.role === "admin" && (
              <Button
                variant="premium"
                onClick={() => navigate("/salon_admin_pannel")}
              >
                Admin Panel
              </Button>
            )}
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8 shadow-soft border-0 glass-effect animate-float">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-playfair text-salon-primary">
              {" "}
              Find Your Perfect Salon
            </CardTitle>
            <CardDescription className="text-lg">
              Discover amazing salons in your area and book instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-salon-primary" />
              <Input
                placeholder="🔍 Search salons by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg border-salon-primary/30 focus:border-salon-primary focus:ring-salon-primary/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Salons Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSalons.map((salon) => (
            <SalonCard
              key={salon.id}
              salon={salon}
              onBook={handleBook}
              onContact={handleContact}
            />
          ))}
        </div>

        {filteredSalons.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No salons found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {salon && (
            <BookingForm salon={salon} onSuccess={handleBookingSuccess} />
          )}
        </DialogContent>
      </Dialog>
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
