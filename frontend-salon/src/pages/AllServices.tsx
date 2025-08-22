import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Scissors, Palette, Sparkles, Users, Crown, Zap, Droplets, Eye, Heart, Star } from "lucide-react";

const Services = () => {
  const hairServices = [
    {
      icon: <Droplets className="w-6 h-6 text-salon-gold" />,
      title: "Hair Oil",
      description: "Nourishing hair oils for healthy, shiny hair",
      price: "From $25"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-salon-gold" />,
      title: "Hair Serum",
      description: "Protective serums for smooth, frizz-free hair",
      price: "From $35"
    },
    {
      icon: <Droplets className="w-6 h-6 text-salon-gold" />,
      title: "Hair Shampoo",
      description: "Professional cleansing for all hair types",
      price: "From $40"
    },
    {
      icon: <Heart className="w-6 h-6 text-salon-gold" />,
      title: "Hair Conditioner",
      description: "Deep conditioning treatments",
      price: "From $45"
    },
    {
      icon: <Crown className="w-6 h-6 text-salon-gold" />,
      title: "Hair Cream and Masks",
      description: "Intensive repair and styling creams",
      price: "From $50"
    },
    {
      icon: <Scissors className="w-6 h-6 text-salon-gold" />,
      title: "Hair Treatment & Styling",
      description: "Professional styling and treatments",
      price: "From $80"
    },
    {
      icon: <Star className="w-6 h-6 text-salon-gold" />,
      title: "Hair Kits",
      description: "Complete hair care packages",
      price: "From $120"
    }
  ];

  const skinServices = [
    {
      icon: <Sparkles className="w-6 h-6 text-salon-gold" />,
      title: "Face Care",
      description: "Complete facial treatments and care",
      price: "From $75"
    },
    {
      icon: <Droplets className="w-6 h-6 text-salon-gold" />,
      title: "Moisturizers",
      description: "Hydrating treatments for all skin types",
      price: "From $45"
    },
    {
      icon: <Heart className="w-6 h-6 text-salon-gold" />,
      title: "Facewash & Cleansers",
      description: "Deep cleansing facial treatments",
      price: "From $35"
    },
    {
      icon: <Star className="w-6 h-6 text-salon-gold" />,
      title: "Exfoliants",
      description: "Gentle exfoliation for smooth skin",
      price: "From $55"
    },
    {
      icon: <Palette className="w-6 h-6 text-salon-gold" />,
      title: "Toners",
      description: "Balancing toners for healthy skin",
      price: "From $30"
    },
    {
      icon: <Crown className="w-6 h-6 text-salon-gold" />,
      title: "Sunscreen",
      description: "Professional sun protection treatments",
      price: "From $40"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-salon-gold" />,
      title: "Facial Kit",
      description: "Complete facial care packages",
      price: "From $95"
    },
    {
      icon: <Heart className="w-6 h-6 text-salon-gold" />,
      title: "Skin Serum",
      description: "Anti-aging and brightening serums",
      price: "From $65"
    },
    {
      icon: <Users className="w-6 h-6 text-salon-gold" />,
      title: "Hand & Foot Care",
      description: "Complete hand and foot treatments",
      price: "From $50"
    }
  ];

  const makeupServices = [
    {
      icon: <Palette className="w-6 h-6 text-salon-gold" />,
      title: "Foundation & Compact",
      description: "Perfect base makeup application",
      price: "From $60"
    },
    {
      icon: <Eye className="w-6 h-6 text-salon-gold" />,
      title: "Eye Makeup",
      description: "Professional eye makeup artistry",
      price: "From $45"
    },
    {
      icon: <Zap className="w-6 h-6 text-salon-gold" />,
      title: "Eyeliner",
      description: "Precision eyeliner application",
      price: "From $25"
    },
    {
      icon: <Eye className="w-6 h-6 text-salon-gold" />,
      title: "Mascara",
      description: "Volumizing mascara application",
      price: "From $20"
    },
    {
      icon: <Heart className="w-6 h-6 text-salon-gold" />,
      title: "Lips",
      description: "Lip color and contouring",
      price: "From $30"
    },
    {
      icon: <Star className="w-6 h-6 text-salon-gold" />,
      title: "Nail Polish",
      description: "Professional nail art and polish",
      price: "From $35"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-salon-gold" />,
      title: "Makeup Serum",
      description: "Primer and setting serums",
      price: "From $40"
    },
    {
      icon: <Crown className="w-6 h-6 text-salon-gold" />,
      title: "Bridal Cosmetics",
      description: "Complete bridal makeup packages",
      price: "From $250"
    }
  ];

  const menServices = [
    {
      icon: <Scissors className="w-6 h-6 text-salon-gold" />,
      title: "Classic Haircuts",
      description: "Traditional and modern cuts tailored to your style",
      price: "From $45",
      popular: true
    },
    {
      icon: <Zap className="w-6 h-6 text-salon-gold" />,
      title: "Beard Grooming",
      description: "Beard trimming, shaping, and styling services",
      price: "From $35",
      popular: true
    },
    {
      icon: <Palette className="w-6 h-6 text-salon-gold" />,
      title: "Hair Coloring",
      description: "Gray coverage, highlights, and creative color",
      price: "From $85",
      popular: false
    },
    {
      icon: <Users className="w-6 h-6 text-salon-gold" />,
      title: "Father & Son",
      description: "Special bonding haircut experience",
      price: "From $75",
      popular: false
    },
    {
      icon: <Sparkles className="w-6 h-6 text-salon-gold" />,
      title: "Scalp Treatments",
      description: "Deep cleansing and nourishing scalp care",
      price: "From $55",
      popular: false
    },
    {
      icon: <Crown className="w-6 h-6 text-salon-gold" />,
      title: "Grooming Packages",
      description: "Complete grooming for special occasions",
      price: "From $120",
      popular: false
    }
  ];

  const ServiceCard = ({ service }: { service: any }) => (
    <Card className="h-full hover:shadow-[var(--shadow-elegant)] transition-all duration-300 border-salon-cream group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-salon-cream group-hover:bg-salon-gold/20 transition-colors">
              {service.icon}
            </div>
            <CardTitle className="text-lg md:text-xl text-salon-dark">{service.title}</CardTitle>
          </div>
          {service.popular && (
            <Badge className="bg-salon-gold text-salon-dark">Popular</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-sm md:text-base">{service.description}</p>
        <p className="text-xl md:text-2xl font-bold text-salon-gold">{service.price}</p>
      </CardContent>
    </Card>
  );

  return (
    <section id="services" className="py-12 md:py-20 bg-gradient-to-b from-salon-cream to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-salon-dark mb-4">
            Our Complete Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive beauty and grooming services with premium products and professional expertise
          </p>
        </div>

        <Tabs defaultValue="hair" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 md:grid-cols-4 mb-8 md:mb-12 h-auto">
            <TabsTrigger value="hair" className="text-sm md:text-base py-2 md:py-3">Hair</TabsTrigger>
            <TabsTrigger value="skin" className="text-sm md:text-base py-2 md:py-3">Skin</TabsTrigger>
            <TabsTrigger value="makeup" className="text-sm md:text-base py-2 md:py-3">Make Up</TabsTrigger>
            <TabsTrigger value="men" className="text-sm md:text-base py-2 md:py-3">Men's</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hair">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {hairServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="skin">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {skinServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="makeup">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {makeupServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="men">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {menServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Services;