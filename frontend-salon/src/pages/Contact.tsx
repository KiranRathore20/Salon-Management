import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-salon-gold" />,
      title: "Location",
      details: ["123 Beauty Avenue", "Downtown, City 12345"]
    },
    {
      icon: <Phone className="w-6 h-6 text-salon-gold" />,
      title: "Phone",
      details: ["(555) 123-4567", "Call for appointments"]
    },
    {
      icon: <Mail className="w-6 h-6 text-salon-gold" />,
      title: "Email",
      details: ["info@luxesalon.com", "We respond within 24 hours"]
    },
    {
      icon: <Clock className="w-6 h-6 text-salon-gold" />,
      title: "Hours",
      details: ["Mon-Sat: 9AM-8PM", "Sunday: 10AM-6PM"]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-salon-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-salon-dark mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your look? Contact us today to schedule your appointment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-salon-dark mb-8">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-salon-gold/20 hover:border-salon-gold transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      {info.icon}
                      <CardTitle className="text-lg text-salon-dark">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className={detailIndex === 0 ? "font-semibold text-salon-dark" : "text-muted-foreground text-sm"}>
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-salon-gold/20">
            <CardHeader>
              <CardTitle className="text-2xl text-salon-dark">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-salon-dark">First Name</label>
                    <Input className="mt-1 border-2 border-[#007D88] focus:border-[#007D88] focus:ring-1 focus:ring-[#007D88] outline-none" placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-salon-dark">Last Name</label>
                    <Input className="mt-1" placeholder="Your last name" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-salon-dark">Email</label>
                  <Input className="mt-1" type="email" placeholder="your.email@example.com" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-salon-dark">Phone Number</label>
                  <Input className="mt-1" type="tel" placeholder="(555) 123-4567" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-salon-dark">Message</label>
                  <Textarea 
                    className="mt-1" 
                    placeholder="Tell us about the services you're interested in..."
                    rows={4}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full salon-gradient hover:bg-salon-gradient text-salon-dark font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;