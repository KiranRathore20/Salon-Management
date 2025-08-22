import { DashboardHeader } from "@/components/salonOnwer/DashboardHeader";
import { Footer } from "@/pages/Footer";
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Clock, Calendar, Phone, Mail, MapPin } from 'lucide-react';

interface UpcomingBooking {
  id: string;
  client: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  amount: number;
  phone: string;
  email: string;
  notes?: string;
  status: "Confirmed" | "Pending";
}

const mockUpcomingBookings: UpcomingBooking[] = [
  {
    id: "1",
    client: "Emma Johnson",
    service: "Hair Coloring",
    date: "2025-07-31",
    time: "10:00 AM",
    duration: "2 hours",
    amount: 120,
    phone: "+1 234-567-8901",
    email: "emma.johnson@email.com",
    notes: "First-time client, prefers natural colors",
    status: "Confirmed"
  },
  {
    id: "2",
    client: "Michael Brown",
    service: "Haircut & Styling",
    date: "2025-07-31",
    time: "11:30 AM",
    duration: "1 hour",
    amount: 55,
    phone: "+1 234-567-8902",
    email: "michael.brown@email.com",
    status: "Pending"
  },
  {
    id: "3",
    client: "Sarah Wilson",
    service: "Bridal Makeup",
    date: "2025-08-01",
    time: "9:00 AM",
    duration: "3 hours",
    amount: 250,
    phone: "+1 234-567-8903",
    email: "sarah.wilson@email.com",
    notes: "Wedding appointment - special occasion",
    status: "Confirmed"
  },
  {
    id: "4",
    client: "Lisa Garcia",
    service: "Facial Treatment",
    date: "2025-08-01",
    time: "2:00 PM",
    duration: "1.5 hours",
    amount: 85,
    phone: "+1 234-567-8904",
    email: "lisa.garcia@email.com",
    status: "Confirmed"
  },
  {
    id: "5",
    client: "Robert Davis",
    service: "Beard Trimming",
    date: "2025-08-02",
    time: "4:30 PM",
    duration: "45 minutes",
    amount: 35,
    phone: "+1 234-567-8905",
    email: "robert.davis@email.com",
    status: "Pending"
  }
];

const UpcomingBookings = () => {
  const getStatusVariant = (status: string) => {
    return status === "Confirmed" ? "success" : "warning";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const bookingDate = new Date(dateString);
    return today.toDateString() === bookingDate.toDateString();
  };

  const isTomorrow = (dateString: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const bookingDate = new Date(dateString);
    return tomorrow.toDateString() === bookingDate.toDateString();
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <DashboardHeader salonName="Salon Name" />
      
      <Container fluid className="py-4 flex-grow-1">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold text-dark mb-1">Upcoming Appointments</h2>
                <p className="text-muted mb-0">Manage your scheduled appointments</p>
              </div>
              <Button variant="primary" size="lg">
                <Calendar className="me-2" size={20} />
                Add New Appointment
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          {mockUpcomingBookings.map((booking) => (
            <Col lg={6} xl={4} key={booking.id} className="mb-4">
              <Card className="shadow-sm border-0 h-100 position-relative">
                {isToday(booking.date) && (
                  <div className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 rounded-end small fw-bold">
                    TODAY
                  </div>
                )}
                {isTomorrow(booking.date) && (
                  <div className="position-absolute top-0 start-0 bg-warning text-dark px-3 py-1 rounded-end small fw-bold">
                    TOMORROW
                  </div>
                )}
                
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1 fw-bold text-dark">{booking.client}</h5>
                      <p className="text-primary mb-0 fw-medium">{booking.service}</p>
                    </div>
                    <Badge bg={getStatusVariant(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2 text-muted">
                      <Calendar className="me-2" size={16} />
                      <small>{formatDate(booking.date)}</small>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-muted">
                      <Clock className="me-2" size={16} />
                      <small>{booking.time} ({booking.duration})</small>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-muted">
                      <Phone className="me-2" size={16} />
                      <small>{booking.phone}</small>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-muted">
                      <Mail className="me-2" size={16} />
                      <small>{booking.email}</small>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mb-3">
                      <p className="small text-muted mb-0">
                        <strong>Notes:</strong> {booking.notes}
                      </p>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <div>
                      <h5 className="mb-0 text-success fw-bold">${booking.amount}</h5>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline-success" size="sm">
                        Confirm
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {mockUpcomingBookings.length === 0 && (
          <Row>
            <Col>
              <Card className="shadow-sm border-0">
                <Card.Body className="text-center py-5">
                  <Calendar className="text-muted mb-3" size={48} />
                  <h5 className="text-muted mb-2">No Upcoming Appointments</h5>
                  <p className="text-muted mb-4">You don't have any appointments scheduled for the coming days.</p>
                  <Button variant="primary">
                    <Calendar className="me-2" size={16} />
                    Schedule New Appointment
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      
      <Footer />
    </div>
  );
};

export default UpcomingBookings;