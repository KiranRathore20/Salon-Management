import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Users, Heart } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: <Award className="w-8 h-8 text-salon-gold" />,
      number: "15+",
      label: "Years Experience"
    },
    {
      icon: <Users className="w-8 h-8 text-salon-gold" />,
      number: "5000+",
      label: "Happy Clients"
    },
    {
      icon: <Clock className="w-8 h-8 text-salon-gold" />,
      number: "7",
      label: "Days a Week"
    },
    {
      icon: <Heart className="w-8 h-8 text-salon-gold" />,
      number: "100%",
      label: "Satisfaction"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-salon-dark mb-6">
              About Luxe Salon
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              For over 15 years, Luxe Salon has been the premier destination for luxury hair and beauty services. 
              Our team of expert stylists and beauty professionals are dedicated to helping you look and feel your absolute best.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              We believe that great style knows no gender. Whether you're looking for a classic cut, bold color transformation, 
              or complete makeover, our personalized approach ensures every client leaves feeling confident and beautiful.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-salon-gold/20 hover:border-salon-gold transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-3">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-salon-dark mb-1">{stat.number}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-salon-gold/20 to-salon-gold-light/20 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Award className="w-24 h-24 text-salon-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-salon-dark mb-2">Award-Winning Team</h3>
                <p className="text-muted-foreground">
                  Our stylists are certified professionals with extensive training in the latest techniques and trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;