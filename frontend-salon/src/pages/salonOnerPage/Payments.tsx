import { DashboardHeader } from "@/components/salonOnwer/DashboardHeader";
import { Footer } from "@/pages/Footer";
import { Container, Row, Col, Card, Table, Badge, Button, Form } from 'react-bootstrap';
import { Search, Filter, CreditCard, DollarSign, Receipt, Download } from 'lucide-react';
import { useState } from 'react';

interface Payment {
  id: string;
  client: string;
  service: string;
  amount: number;
  baseAmount: number;
  gst: number;
  gstRate: number;
  paymentMethod: "Cash" | "Card" | "UPI" | "Online Transfer";
  paymentDate: string;
  transactionId?: string;
  status: "Success" | "Pending" | "Failed" | "Refunded";
}

const mockPayments: Payment[] = [
  {
    id: "1",
    client: "Emma Johnson",
    service: "Hair Coloring",
    baseAmount: 100,
    gst: 20,
    gstRate: 18,
    amount: 120,
    paymentMethod: "Card",
    paymentDate: "2025-07-30",
    transactionId: "TXN123456789",
    status: "Success"
  },
  {
    id: "2",
    client: "Michael Brown",
    service: "Haircut",
    baseAmount: 38.14,
    gst: 6.86,
    gstRate: 18,
    amount: 45,
    paymentMethod: "UPI",
    paymentDate: "2025-07-30",
    transactionId: "UPI987654321",
    status: "Success"
  },
  {
    id: "3",
    client: "Olivia Martinez",
    service: "Manicure",
    baseAmount: 55.08,
    gst: 9.92,
    gstRate: 18,
    amount: 65,
    paymentMethod: "Cash",
    paymentDate: "2025-07-29",
    status: "Success"
  },
  {
    id: "4",
    client: "Sarah Wilson",
    service: "Facial Treatment",
    baseAmount: 76.27,
    gst: 13.73,
    gstRate: 18,
    amount: 90,
    paymentMethod: "Online Transfer",
    paymentDate: "2025-07-28",
    transactionId: "NET456789123",
    status: "Success"
  },
  {
    id: "5",
    client: "David Lee",
    service: "Hair Styling",
    baseAmount: 63.56,
    gst: 11.44,
    gstRate: 18,
    amount: 75,
    paymentMethod: "Card",
    paymentDate: "2025-07-27",
    transactionId: "REF789123456",
    status: "Refunded"
  }
];

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (payment.transactionId && payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "All" || payment.paymentMethod === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Success": return "success";
      case "Pending": return "warning";
      case "Failed": return "danger";
      case "Refunded": return "info";
      default: return "secondary";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Card": return <CreditCard size={16} className="me-1" />;
      case "UPI": return <DollarSign size={16} className="me-1" />;
      case "Cash": return <Receipt size={16} className="me-1" />;
      case "Online Transfer": return <CreditCard size={16} className="me-1" />;
      default: return null;
    }
  };

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalGST = filteredPayments.reduce((sum, payment) => sum + payment.gst, 0);
  const totalBaseAmount = filteredPayments.reduce((sum, payment) => sum + payment.baseAmount, 0);

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <DashboardHeader salonName="Salon Name" />
      
      <Container fluid className="py-4 flex-grow-1">
        {/* Summary Cards */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <div className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-2" style={{width: '48px', height: '48px'}}>
                  <DollarSign className="text-white" size={24} />
                </div>
                <h5 className="mb-1">${totalAmount.toFixed(2)}</h5>
                <small className="text-muted">Total Revenue</small>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center mb-2" style={{width: '48px', height: '48px'}}>
                  <Receipt className="text-white" size={24} />
                </div>
                <h5 className="mb-1">${totalBaseAmount.toFixed(2)}</h5>
                <small className="text-muted">Base Amount</small>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <div className="rounded-circle bg-warning d-inline-flex align-items-center justify-content-center mb-2" style={{width: '48px', height: '48px'}}>
                  <CreditCard className="text-white" size={24} />
                </div>
                <h5 className="mb-1">${totalGST.toFixed(2)}</h5>
                <small className="text-muted">Total GST (18%)</small>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <div className="rounded-circle bg-info d-inline-flex align-items-center justify-content-center mb-2" style={{width: '48px', height: '48px'}}>
                  <Receipt className="text-white" size={24} />
                </div>
                <h5 className="mb-1">{filteredPayments.length}</h5>
                <small className="text-muted">Total Transactions</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-bottom">
                <Row className="align-items-center">
                  <Col>
                    <h4 className="mb-0 fw-bold text-dark">Payment Records</h4>
                    <small className="text-muted">Track all payment transactions and GST details</small>
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-primary" className="d-flex align-items-center">
                      <Download size={16} className="me-2" />
                      Export Records
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              
              <Card.Body className="p-4">
                {/* Search and Filter Controls */}
                <Row className="mb-4">
                  <Col md={4}>
                    <div className="position-relative">
                      <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
                      <Form.Control
                        type="text"
                        placeholder="Search by client, service, or transaction ID..."
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
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                      </Form.Select>
                    </div>
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={methodFilter}
                      onChange={(e) => setMethodFilter(e.target.value)}
                    >
                      <option value="All">All Methods</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                      <option value="Online Transfer">Online Transfer</option>
                    </Form.Select>
                  </Col>
                </Row>

                {/* Payments Table */}
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 fw-semibold text-muted">Client</th>
                        <th className="border-0 fw-semibold text-muted">Service</th>
                        <th className="border-0 fw-semibold text-muted">Base Amount</th>
                        <th className="border-0 fw-semibold text-muted">GST (18%)</th>
                        <th className="border-0 fw-semibold text-muted">Total Amount</th>
                        <th className="border-0 fw-semibold text-muted">Payment Method</th>
                        <th className="border-0 fw-semibold text-muted">Transaction ID</th>
                        <th className="border-0 fw-semibold text-muted">Date</th>
                        <th className="border-0 fw-semibold text-muted">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="py-3 fw-medium text-dark border-0">{payment.client}</td>
                          <td className="py-3 text-muted border-0">{payment.service}</td>
                          <td className="py-3 text-muted border-0">${payment.baseAmount.toFixed(2)}</td>
                          <td className="py-3 text-muted border-0">${payment.gst.toFixed(2)}</td>
                          <td className="py-3 fw-bold text-success border-0">${payment.amount.toFixed(2)}</td>
                          <td className="py-3 border-0">
                            <div className="d-flex align-items-center">
                              {getMethodIcon(payment.paymentMethod)}
                              <span className="small">{payment.paymentMethod}</span>
                            </div>
                          </td>
                          <td className="py-3 text-muted border-0">
                            <small className="font-monospace">{payment.transactionId || "N/A"}</small>
                          </td>
                          <td className="py-3 text-muted border-0">{payment.paymentDate}</td>
                          <td className="py-3 border-0">
                            <Badge bg={getStatusVariant(payment.status)}>
                              {payment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                
                {filteredPayments.length === 0 && (
                  <div className="text-center py-5">
                    <p className="text-muted mb-0">No payment records found matching your criteria.</p>
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

export default Payments;