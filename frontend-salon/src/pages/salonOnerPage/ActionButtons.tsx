import { Button, Row, Col } from 'react-bootstrap';
import { Plus, Calendar, Settings, Users } from "lucide-react";

export const ActionButtons = () => {
  return (
    <Row className="g-3">
      <Col lg={3} md={6}>
        <Button className="w-100 py-3 d-flex align-items-center justify-content-center fw-semibold" size="lg">
          <Plus className="me-2" size={20} />
          Add New Service
        </Button>
      </Col>
      <Col lg={3} md={6}>
        <Button variant="outline-primary" className="w-100 py-3 d-flex align-items-center justify-content-center fw-semibold" size="lg">
          <Calendar className="me-2" size={20} />
          Add New Booking
        </Button>
      </Col>
      <Col lg={3} md={6}>
        <Button variant="outline-primary" className="w-100 py-3 d-flex align-items-center justify-content-center fw-semibold" size="lg">
          <Users className="me-2" size={20} />
          Add New Client
        </Button>
      </Col>
      <Col lg={3} md={6}>
        <Button variant="outline-primary" className="w-100 py-3 d-flex align-items-center justify-content-center fw-semibold" size="lg">
          <Settings className="me-2" size={20} />
          Update Settings
        </Button>
      </Col>
    </Row>
  );
};