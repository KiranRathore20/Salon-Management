import { DashboardHeader } from "@/components/salonOnwer/DashboardHeader";
import { Footer } from "@/pages/Footer";
import { Container, Row, Col, Card, Table, Badge, Button, Form } from 'react-bootstrap';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Booking {
  id: string;
  client: string;
  service: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  amount: number;
  paymentStatus: "Paid" | "Pending" | "Refunded";
}

const mockBookings: Booking[] = [
  {
    id: "1",
    client: "Emma Johnson",
    service: "Hair Coloring",
    date: "2025-07-30",
    time: "10:00 AM",
    status: "Confirmed",
    amount: 120,
    paymentStatus: "Paid"
  },
  {
    id: "2",
    client: "Michael Brown",
    service: "Haircut",
    date: "2025-07-30",
    time: "11:30 AM",
    status: "Pending",
    amount: 45,
    paymentStatus: "Pending"
  },
  {
    id: "3",
    client: "Olivia Martinez",
    service: "Manicure",
    date: "2025-07-29",
    time: "2:00 PM",
    status: "Completed",
    amount: 65,
    paymentStatus: "Paid"
  },
  {
    id: "4",
    client: "Sarah Wilson",
    service: "Facial Treatment",
    date: "2025-07-28",
    time: "3:30 PM",
    status: "Completed",
    amount: 90,
    paymentStatus: "Paid"
  },
  {
    id: "5",
    client: "David Lee",
    service: "Hair Styling",
    date: "2025-07-31",
    time: "1:00 PM",
    status: "Cancelled",
    amount: 75,
    paymentStatus: "Refunded"
  }
];

const AllBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Confirmed": return "primary";
      case "Completed": return "success";
      case "Pending": return "warning";
      case "Cancelled": return "danger";
      default: return "secondary";
    }
  };

  const getPaymentVariant = (status: string) => {
    switch (status) {
      case "Paid": return "success";
      case "Pending": return "warning";
      case "Refunded": return "info";
      default: return "secondary";
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <DashboardHeader salonName="Salon Name" />
      
      <Container fluid className="py-4 flex-grow-1">
        <Row>
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-bottom">
                <Row className="align-items-center">
                  <Col>
                    <h4 className="mb-0 fw-bold text-dark">All Bookings</h4>
                    <small className="text-muted">Manage all your salon appointments</small>
                  </Col>
                </Row>
              </Card.Header>
              
              <Card.Body className="p-4">
                {/* Search and Filter Controls */}
                <Row className="mb-4">
                  <Col md={6}>
                    <div className="position-relative">
                      <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
                      <Form.Control
                        type="text"
                        placeholder="Search by client or service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ps-5"
                      />
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="position-relative">
                      <Filter className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
                      <Form.Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="ps-5"
                      >
                        <option value="All">All Status</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </Form.Select>
                    </div>
                  </Col>
                  <Col md={3}>
                    <Button variant="primary" className="w-100">
                      Add New Booking
                    </Button>
                  </Col>
                </Row>

                {/* Bookings Table */}
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 fw-semibold text-muted">Client</th>
                        <th className="border-0 fw-semibold text-muted">Service</th>
                        <th className="border-0 fw-semibold text-muted">Date</th>
                        <th className="border-0 fw-semibold text-muted">Time</th>
                        <th className="border-0 fw-semibold text-muted">Amount</th>
                        <th className="border-0 fw-semibold text-muted">Status</th>
                        <th className="border-0 fw-semibold text-muted">Payment</th>
                        <th className="border-0 fw-semibold text-muted">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="py-3 fw-medium text-dark border-0">{booking.client}</td>
                          <td className="py-3 text-muted border-0">{booking.service}</td>
                          <td className="py-3 text-muted border-0">{booking.date}</td>
                          <td className="py-3 text-muted border-0">{booking.time}</td>
                          <td className="py-3 text-muted border-0">${booking.amount}</td>
                          <td className="py-3 border-0">
                            <Badge bg={getStatusVariant(booking.status)}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-3 border-0">
                            <Badge bg={getPaymentVariant(booking.paymentStatus)}>
                              {booking.paymentStatus}
                            </Badge>
                          </td>
                          <td className="py-3 border-0">
                            <div className="d-flex gap-2">
                              <Button variant="outline-primary" size="sm">
                                <Eye size={14} />
                              </Button>
                              <Button variant="outline-secondary" size="sm">
                                <Edit size={14} />
                              </Button>
                              <Button variant="outline-danger" size="sm">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                
                {filteredBookings.length === 0 && (
                  <div className="text-center py-5">
                    <p className="text-muted mb-0">No bookings found matching your criteria.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
};

export default AllBookings;