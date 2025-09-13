import { Button } from "@/components/ui/button";
import { 
  Wind, 
  Shirt, 
  Refrigerator, 
  Microwave, 
  Tv, 
  Lightbulb,
  Wrench,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Wind,
    title: "Air Conditioner",
    description: "AC installation, repair & maintenance",
    color: "from-blue-500 to-cyan-500",
    popular: true
  },
  {
    icon: Shirt,
    title: "Washing Machine",
    description: "Front & top load repair services",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Refrigerator,
    title: "Refrigerator",
    description: "Cooling system & compressor repair",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Microwave,
    title: "Microwave",
    description: "Heating & electrical issue fixes",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Tv,
    title: "TV & Electronics",
    description: "Smart TV & home theater repair",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Lightbulb,
    title: "Electrical",
    description: "Wiring, switches & appliance electrical",
    color: "from-yellow-500 to-orange-500"
  }
];

const ServiceCategories = () => {
  return (
    <section className="py-20 bg-secondary/30" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Expert Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional repair services for all your home appliances. Our certified technicians 
            provide reliable solutions with genuine parts and warranty coverage.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-card border border-border rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-smooth cursor-pointer"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-accent-orange text-accent-orange-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-button">
                    Popular
                  </div>
                )}

                {/* Icon with Gradient Background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-6 shadow-card`}>
                  <IconComponent className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-smooth">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Action */}
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary hover:text-primary-hover">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                  </Button>
                  <Button variant="cta" size="sm">
                    Book Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card max-w-2xl mx-auto">
            <Wrench className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Don't See Your Appliance?
            </h3>
            <p className="text-muted-foreground mb-6">
              We service over 50+ appliance brands. Contact us for any home appliance repair needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg">
                Call Support: +1 (555) 123-4567
              </Button>
              <Button variant="outline" size="lg">
                Request Custom Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;