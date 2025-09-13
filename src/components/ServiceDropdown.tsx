import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Wind, 
  Fan, 
  Tv, 
  Volume2, 
  Projector, 
  Shield, 
  Battery,
  Refrigerator,
  Microwave,
  FlameKindling,
  Zap,
  Coffee,
  Blend,
  Shirt,
  Trash2,
  Thermometer,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const serviceCategories = [
  {
    title: "Home Appliances",
    icon: Wind,
    link: "/home-appliances",
    services: [
      { name: "AC Repair", icon: Wind },
      { name: "Cooler Service", icon: Fan },
      { name: "Fan Repair", icon: Fan },
      { name: "TV Repair", icon: Tv },
      { name: "Speaker Fix", icon: Volume2 },
      { name: "Projector Service", icon: Projector },
      { name: "Air Purifier", icon: Shield },
      { name: "Inverter Repair", icon: Battery }
    ]
  },
  {
    title: "Kitchen Appliances",
    icon: Refrigerator,
    link: "/kitchen-appliances",
    services: [
      { name: "Water Purifier", icon: Shield },
      { name: "Refrigerator", icon: Refrigerator },
      { name: "Microwave", icon: Microwave },
      { name: "Chimney", icon: FlameKindling },
      { name: "Induction", icon: Zap },
      { name: "Toaster", icon: FlameKindling },
      { name: "Coffee Machine", icon: Coffee },
      { name: "Blender", icon: Blend }
    ]
  },
  {
    title: "Cleaning & Laundry",
    icon: Shirt,
    link: "/cleaning-laundry",
    services: [
      { name: "Washing Machine", icon: Shirt },
      { name: "Vacuum Cleaner", icon: Trash2 },
      { name: "Geyser", icon: Thermometer }
    ]
  }
];

const ServiceDropdown = () => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <section className="py-16 bg-secondary/30" id="services">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            All Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our comprehensive service categories
          </p>
        </div>

        <div className="space-y-4">
          {serviceCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            const isOpen = openCategory === categoryIndex;
            
            return (
              <div key={categoryIndex} className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
                <div className="flex">
                  <Link to={category.link} className="flex-1">
                    <div className="p-6 flex items-center space-x-4 hover:bg-secondary/50 transition-smooth">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 p-3 flex items-center justify-center">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">{category.services.length} services available</p>
                      </div>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => toggleCategory(categoryIndex)}
                    className="px-4 hover:bg-secondary/50"
                  >
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </Button>
                </div>
                
                {isOpen && (
                  <div className="px-6 pb-6 bg-[rgb(245,245,245)] dark:bg-card">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-border">
                      {category.services.map((service, serviceIndex) => {
                        const ServiceIcon = service.icon;
                        return (
                          <Button
                            key={serviceIndex}
                            variant="outline"
                            size="sm"
                            className="h-auto p-3 flex-col space-y-2 hover:bg-primary/5 hover:border-primary/20 bg-background"
                          >
                            <ServiceIcon className="h-5 w-5 text-primary" />
                            <span className="text-xs text-center">{service.name}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceDropdown;