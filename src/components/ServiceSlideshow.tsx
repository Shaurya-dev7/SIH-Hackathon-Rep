import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { 
  Snowflake, 
  WashingMachine, 
  ChefHat, 
  Zap, 
  Monitor,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Snowflake,
    title: "AC Repair & Service",
    description: "Expert AC installation & repair",
    image: "from-blue-500 via-blue-400 to-cyan-400",
    category: "home-appliances"
  },
  {
    icon: WashingMachine,
    title: "Washing Machine",
    description: "All brand repair services",
    image: "from-purple-500 to-pink-500",
    category: "cleaning-laundry"
  },
  {
    icon: ChefHat,
    title: "Refrigerator Service",
    description: "Cooling system repair",
    image: "from-green-500 to-emerald-500",
    category: "kitchen-appliances"
  },
  {
    icon: Zap,
    title: "Microwave Repair",
    description: "Quick microwave fixes",
    image: "from-orange-500 to-red-500",
    category: "kitchen-appliances"
  },
  {
    icon: Monitor,
    title: "TV & Electronics",
    description: "Smart TV repair service",
    image: "from-indigo-500 to-purple-500",
    category: "home-appliances"
  }
];

type EmblaApiLike = {
  canScrollNext: () => boolean;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  on: (event: string, handler: () => void) => void;
  off: (event: string, handler: () => void) => void;
};

const ServiceSlideshow = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<EmblaApiLike | null>(null);

  useEffect(() => {
    if (!api) return;

    const autoPlay = () => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    };

    const intervalId = setInterval(autoPlay, 4000);

    const handlePointerDown = () => {
      clearInterval(intervalId);
      setTimeout(() => {
        const newIntervalId = setInterval(autoPlay, 4000);
        return () => clearInterval(newIntervalId);
      }, 8000); // Resume after 8 seconds
    };

    api.on('pointerDown', handlePointerDown);

    return () => {
      clearInterval(intervalId);
      api.off('pointerDown', handlePointerDown);
    };
  }, [api]);

  const handleBookNow = (service: typeof services[0]) => {
    navigate('/book-now', { 
      state: { 
        selectedAppliance: service.title.split(' ')[0], 
        selectedCategory: service.category 
      } 
    });
  };

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-background via-gray-50/50 to-background dark:from-background dark:via-gray-900/50 dark:to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Expert Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional repair services for all your home appliances
          </p>
        </div>

        <Carousel 
          className="w-full max-w-5xl mx-auto"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <div className="bg-card border border-border dark:border-border rounded-2xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-smooth h-full group cursor-pointer" onClick={() => handleBookNow(service)}>
                      <div className={`w-20 h-20 rounded-2xl p-4 mb-6 mx-auto group-hover:scale-105 transition-smooth ${service.image} bg-gradient-icon`}>
                        <div className="w-full h-full flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed text-center">
                        {service.description}
                      </p>
                      
                      <div className="text-center">
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="w-full group-hover:scale-105 transition-smooth"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookNow(service);
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center mt-8">
          <Link to="/all-services">
            <Button variant="outline" size="lg" className="group">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceSlideshow;