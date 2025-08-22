import { DashboardHeader } from "@/components/salonOnwer/DashboardHeader";
import { Footer } from "@/pages/Footer";
import { Container, Row, Col, Card, Button, Form, Modal, Table, Badge } from 'react-bootstrap';
import { Plus, Edit, Trash2, Clock, DollarSign, Scissors } from 'lucide-react';
import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  isActive: boolean;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Hair Coloring",
    description: "Professional hair coloring with premium products",
    duration: "2-3 hours",
    price: 120,
    category: "Hair",
    isActive: true
  },
  {
    id: "2",
    name: "Hair Cut & Style",
    description: "Precision haircut with styling",
    duration: "1 hour",
    price: 45,
    category: "Hair",
    isActive: true
  },
  {
    id: "3",
    name: "Facial Treatment",
    description: "Deep cleansing facial with moisturizing",
    duration: "1.5 hours",
    price: 85,
    category: "Skincare",
    isActive: true
  },
  {
    id: "4",
    name: "Manicure",
    description: "Professional nail care and polish",
    duration: "45 minutes",
    price: 35,
    category: "Nails",
    isActive: true
  },
  {
    id: "5",
    name: "Pedicure",
    description: "Foot care and nail treatment",
    duration: "1 hour",
    price: 45,
    category: "Nails",
    isActive: true
  },
  {
    id: "6",
    name: "Bridal Makeup",
    description: "Complete bridal makeup package",
    duration: "3 hours",
    price: 250,
    category: "Makeup",
    isActive: false
  }
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    price: 0,
    category: '',
    isActive: true
  });

  const categories = ["Hair", "Skincare", "Nails", "Makeup", "Other"];

  const handleShowModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        duration: service.duration,
        price: service.price,
        category: service.category,
        isActive: service.isActive
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        duration: '',
        price: 0,
        category: '',
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      // Update existing service
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData }
          : service
      ));
    } else {
      // Add new service
      const newService: Service = {
        id: Date.now().toString(),
        ...formData
      };
      setServices([...services, newService]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  const handleToggleStatus = (serviceId: string) => {
    setServices(services.map(service =>
      service.id === serviceId
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <DashboardHeader salonName="Salon Name" />
      
      <Container fluid className="py-4 flex-grow-1">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold text-dark mb-1">Manage Services</h2>
                <p className="text-muted mb-0">Add, edit, and manage your salon services</p>
              </div>
              <Button variant="primary" size="lg" onClick={() => handleShowModal()}>
                <Plus className="me-2" size={20} />
                Add New Service
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0 fw-bold text-dark">Service List</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 fw-semibold text-muted">Service Name</th>
                        <th className="border-0 fw-semibold text-muted">Category</th>
                        <th className="border-0 fw-semibold text-muted">Duration</th>
                        <th className="border-0 fw-semibold text-muted">Price</th>
                        <th className="border-0 fw-semibold text-muted">Status</th>
                        <th className="border-0 fw-semibold text-muted">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service.id}>
                          <td className="py-3 border-0">
                            <div>
                              <h6 className="mb-1 fw-medium text-dark">{service.name}</h6>
                              <small className="text-muted">{service.description}</small>
                            </div>
                          </td>
                          <td className="py-3 border-0">
                            <Badge bg="secondary" className="px-3 py-2">
                              {service.category}
                            </Badge>
                          </td>
                          <td className="py-3 text-muted border-0">
                            <div className="d-flex align-items-center">
                              <Clock className="me-2" size={16} />
                              {service.duration}
                            </div>
                          </td>
                          <td className="py-3 border-0">
                            <div className="d-flex align-items-center text-success fw-bold">
                              <DollarSign className="me-1" size={16} />
                              {service.price}
                            </div>
                          </td>
                          <td className="py-3 border-0">
                            <Badge 
                              bg={service.isActive ? "success" : "secondary"}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleToggleStatus(service.id)}
                            >
                              {service.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="py-3 border-0">
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => handleShowModal(service)}
                              >
                                <Edit size={14} />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDelete(service.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Add/Edit Service Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <Scissors className="me-2" size={24} />
            {editingService ? 'Edit Service' : 'Add New Service'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter service name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter service description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., 1 hour, 45 minutes"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Service is active and available for booking"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingService ? 'Update Service' : 'Add Service'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
      <Footer />
    </div>
  );
};

export default Services;