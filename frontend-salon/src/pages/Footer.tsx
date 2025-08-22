import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from 'react-router-dom';

export const Footer = () => {
  // return (
  //   <footer className="bg-dark text-white py-4 mt-5">
  //     <Container>
  //       <Row>
  //         <Col md={4} className="mb-3">
  //           <div className="d-flex align-items-center mb-3">
  //             <Scissors className="me-2" size={24} />
  //             <h5 className="mb-0">Salon Management</h5>
  //           </div>
  //           <p className="text-light mb-0">
  //             Professional salon management system for modern beauty businesses.
  //           </p>
  //         </Col>
          
  //         <Col md={4} className="mb-3">
  //           <h6 className="mb-3">Contact Info</h6>
  //           <div className="d-flex align-items-center mb-2">
  //             <Phone className="me-2" size={16} />
  //             <small>+1 (555) 123-4567</small>
  //           </div>
  //           <div className="d-flex align-items-center mb-2">
  //             <Mail className="me-2" size={16} />
  //             <small>info@salonmanagement.com</small>
  //           </div>
  //           <div className="d-flex align-items-center">
  //             <MapPin className="me-2" size={16} />
  //             <small>123 Beauty Street, City, State</small>
  //           </div>
  //         </Col>
          
  //         <Col md={4} className="mb-3">
  //           <h6 className="mb-3">Quick Links</h6>
  //           <div className="d-flex flex-column">
  //             <a href="/bookings" className="text-light text-decoration-none mb-1">
  //               <small>All Bookings</small>
  //             </a>
  //             <a href="/payments" className="text-light text-decoration-none mb-1">
  //               <small>Payment Records</small>
  //             </a>
  //             <a href="/services" className="text-light text-decoration-none mb-1">
  //               <small>Manage Services</small>
  //             </a>
  //             <a href="/upcoming" className="text-light text-decoration-none">
  //               <small>Upcoming Appointments</small>
  //             </a>
  //           </div>
  //         </Col>
  //       </Row>
        
  //       <hr className="text-light" />
        
  //       <Row>
  //         <Col className="text-center">
  //           <small className="text-light">
  //             © 2025 Salon Management System. All rights reserved.
  //           </small>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </footer>
  // );

   return (
    <footer className="bg-salon-dark text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-salon-gold mb-4">Luxe Salon</h3>
            <p className="text-white/80 mb-4">
              Premium salon services for both men and women. Experience luxury and style like never before.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-salon-gold hover:text-salon-gold-light cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-salon-gold hover:text-salon-gold-light cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-salon-gold hover:text-salon-gold-light cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/80">
              <li>Hair Cut & Styling</li>
              <li>Hair Coloring</li>
              <li>Chemical Services</li>
              <li>Facial Treatments</li>
              <li>Beard Grooming</li>
              <li>Makeup Services</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link to="#home" className="hover:text-salon-gold transition-colors">Home</Link></li>
              <li><Link to="#services" className="hover:text-salon-gold transition-colors">Services</Link></li>
              <li><Link to="#about" className="hover:text-salon-gold transition-colors">About</Link></li>
              <li><Link to="#contact" className="hover:text-salon-gold transition-colors">Contact</Link></li>
              <li><Link to="#" className="hover:text-salon-gold transition-colors">Booking</Link></li>
              <li><Link to="#" className="hover:text-salon-gold transition-colors">Gallery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-salon-gold" />
                <span>123 Beauty Avenue, Downtown</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-salon-gold" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-salon-gold" />
                <span>info@luxesalon.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2024 Luxe Salon. All rights reserved. | Designed with care for your beauty journey.</p>
        </div>
      </div>
    </footer>
  );

};




// import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-salon-dark text-white py-12">
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-2xl font-bold text-salon-gold mb-4">Luxe Salon</h3>
//             <p className="text-white/80 mb-4">
//               Premium salon services for both men and women. Experience luxury and style like never before.
//             </p>
//             <div className="flex space-x-4">
//               <Facebook className="w-6 h-6 text-salon-gold hover:text-salon-gold-light cursor-pointer transition-colors" />
//               <Instagram className="w-6 h-6 text-salon-gold hover:text-salon-gold-light cursor-pointer transition-colors" />
//               <Twitter className="w-6 h-6 text-salon-gold hover:text-salon-gold-light cursor-pointer transition-colors" />
//             </div>
//           </div>
          
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Services</h4>
//             <ul className="space-y-2 text-white/80">
//               <li>Hair Cut & Styling</li>
//               <li>Hair Coloring</li>
//               <li>Chemical Services</li>
//               <li>Facial Treatments</li>
//               <li>Beard Grooming</li>
//               <li>Makeup Services</li>
//             </ul>
//           </div>
          
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-white/80">
//               <li><a href="#home" className="hover:text-salon-gold transition-colors">Home</a></li>
//               <li><a href="#services" className="hover:text-salon-gold transition-colors">Services</a></li>
//               <li><a href="#about" className="hover:text-salon-gold transition-colors">About</a></li>
//               <li><a href="#contact" className="hover:text-salon-gold transition-colors">Contact</a></li>
//               <li><a href="#" className="hover:text-salon-gold transition-colors">Booking</a></li>
//               <li><a href="#" className="hover:text-salon-gold transition-colors">Gallery</a></li>
//             </ul>
//           </div>
          
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
//             <div className="space-y-3 text-white/80">
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-salon-gold" />
//                 <span>123 Beauty Avenue, Downtown</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone className="w-5 h-5 text-salon-gold" />
//                 <span>(555) 123-4567</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Mail className="w-5 h-5 text-salon-gold" />
//                 <span>info@luxesalon.com</span>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
//           <p>&copy; 2024 Luxe Salon. All rights reserved. | Designed with care for your beauty journey.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;