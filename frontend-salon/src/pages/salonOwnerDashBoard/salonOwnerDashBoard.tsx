

import { DashboardHeader } from "@/components/salonOnwer/DashboardHeader";
import { MetricCard } from "@/components/salonOnwer/MetricCard";
import { CalendarWidget } from "@/components/salonOnwer/CalendarWidget";
import { RecentBookings } from "@/pages/salonOnerPage/RecentBookings";
import { ActionButtons } from "@/pages/salonOnerPage/ActionButtons";
import { Footer } from "@/pages/Footer";
import { CheckCircle, DollarSign, Users, BarChart3 } from "lucide-react";
import { Container, Row, Col, Button } from 'react-bootstrap';

const Index = () => {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <DashboardHeader salonName="Salon Name" />
      
      <Container fluid className="py-4 flex-grow-1">
        {/* Metrics Row */}
        <Row className="g-4 mb-4">
          <Col lg={3} md={6}>
            <MetricCard
              title="Booking"
              value="120"
              icon={CheckCircle}
              color="success"
            />
          </Col>
          <Col lg={3} md={6}>
            <MetricCard
              title="Payments Received"
              value="3,3800"
              icon={DollarSign}
              color="primary"
            />
          </Col>
          <Col lg={3} md={6}>
            <MetricCard
              title="Total Clients"
              value="56"
              icon={Users}
              color="info"
            />
          </Col>
          <Col lg={3} md={6}>
            <MetricCard
              title="Calendar"
              value=""
              icon={BarChart3}
              color="warning"
              action={
                <Button variant="link" className="text-primary p-0 text-decoration-none">
                  View
                </Button>
              }
            />
          </Col>
        </Row>

        {/* Calendar and Bookings Row */}
        <Row className="g-4 mb-4">
          <Col lg={4} md={6}>
            <CalendarWidget />
          </Col>
          <Col lg={8} md={6}>
            <RecentBookings />
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row>
          <Col>
            <ActionButtons />
          </Col>
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
};

export default Index;