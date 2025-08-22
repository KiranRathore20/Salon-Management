import { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { User, Phone, Mail, Scissors } from 'lucide-react';

interface ProfileModalProps {
  show: boolean;
  onHide: () => void;
}

interface UserProfile {
  name: string;
  mobile: string;
  email: string;
  salonName: string;
}

export const ProfileModal = ({ show, onHide }: ProfileModalProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    mobile: '+1 234-567-8900',
    email: 'john.doe@example.com',
    salonName: 'Salon Name'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the profile data
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="d-flex align-items-center">
          <User className="me-2" size={24} />
          Profile Information
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        <Form>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center fw-bold">
                  <User className="me-2" size={18} />
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-light' : ''}
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center fw-bold">
                  <Phone className="me-2" size={18} />
                  Mobile Number
                </Form.Label>
                <Form.Control
                  type="tel"
                  value={profile.mobile}
                  onChange={(e) => handleChange('mobile', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-light' : ''}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center fw-bold">
                  <Mail className="me-2" size={18} />
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-light' : ''}
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center fw-bold">
                  <Scissors className="me-2" size={18} />
                  Salon Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={profile.salonName}
                  onChange={(e) => handleChange('salonName', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-light' : ''}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <div className="text-center">
            {!isEditing ? (
              <Button 
                variant="primary" 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2"
              >
                Edit Profile
              </Button>
            ) : (
              <div className="d-flex justify-content-center gap-3">
                <Button 
                  variant="success" 
                  onClick={handleSave}
                  className="px-4 py-2"
                >
                  Save Changes
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};