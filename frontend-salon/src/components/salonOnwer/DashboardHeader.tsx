import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileModal } from "@/pages/salonOnerPage/ProfileModal";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  salonName: string;
}

export const DashboardHeader = ({ salonName }: DashboardHeaderProps) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
        <Container fluid className="px-4">
          <Navbar.Brand as={Link} to="/salon-owner/dashboard" className="d-flex align-items-center">
            <div className="me-3 d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10" style={{width: '48px', height: '48px'}}>
              <div className="rounded bg-primary bg-opacity-25" style={{width: '24px', height: '24px'}}></div>
            </div>
            <span className="h4 mb-0 fw-bold text-dark">{salonName}</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/salon-owner/dashboard" className="fw-medium">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/bookings" className="fw-medium">All Bookings</Nav.Link>
              <Nav.Link as={Link} to="/upcoming" className="fw-medium">Upcoming</Nav.Link>
              <Nav.Link as={Link} to="/payments" className="fw-medium">Payments</Nav.Link>
              <Nav.Link as={Link} to="/services" className="fw-medium">Services</Nav.Link>
            </Nav>
            
            <div className="d-flex align-items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground border-0">
                <Bell className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground border-0"
                onClick={() => setShowProfileModal(true)}
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ProfileModal 
        show={showProfileModal} 
        onHide={() => setShowProfileModal(false)} 
      />
    </>
  );
};