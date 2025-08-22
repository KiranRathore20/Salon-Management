import React from 'react';
import { useNavigate } from 'react-router-dom';
import SalonRegistrationForm from '@/components/salon/SalonRegistrationForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SalonRegistration = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/salon-owner/dashboard');
  };

  return (
    <div className="min-h-screen salon-soft-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <SalonRegistrationForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default SalonRegistration;