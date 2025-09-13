import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BottomTaskbar from "@/components/BottomTaskbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Wind, 
  Shirt, 
  Refrigerator, 
  Microwave, 
  Tv,
  ArrowLeft,
  ArrowRight,
  Shield,
  Star,
  Clock
} from "lucide-react";

const serviceCategories = [
  {
    title: "Home Appliances",
    description: "AC, TV, Speaker, Fan, Air Purifier & more",
    icon: Wind,
    link: "/home-appliances",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Kitchen Appliances", 
    description: "Refrigerator, Microwave, Water Purifier & more",
    icon: Refrigerator,
    link: "/kitchen-appliances",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Cleaning & Laundry",
    description: "Washing Machine, Vacuum Cleaner, Geyser",
    icon: Shirt,
    link: "/cleaning-laundry", 
    color: "from-purple-500 to-pink-500"
  }
];

const AllServices = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navigation />
      <main className="pt-20">
        {/* Enhanced Header with Modern Hero Design */}
        <section className="relative py-20 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <Link to="/">
                <Button variant="ghost" size="sm" className="mr-4 text-white hover:text-white/80 bg-white/10 backdrop-blur-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <div className="text-center text-black dark:text-white">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
                All Our Services
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10">
                  <span className="inline-block text-2xl">⭐</span>
                  <span className="font-semibold text-foreground">4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10">
                  <span className="inline-block text-2xl">👥</span>
                  <span className="font-semibold text-foreground">10,000+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10">
                  <span className="inline-block text-2xl">⚡</span>
                  <span className="font-semibold text-foreground">Same Day Service</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10">
                  <span className="inline-block text-2xl">🛡️</span>
                  <span className="font-semibold text-foreground">28-day Warranty</span>
                </div>
              </div>
              <p className="text-xl text-foreground max-w-3xl mx-auto font-medium mb-8">
                Professional repair services for all your home and kitchen appliances
              </p>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Link key={index} to={category.link}>
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-smooth h-full group hover:scale-105">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} p-5 mb-6 mx-auto shadow-glow`}>
                        <IconComponent className="w-full h-full text-black dark:text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed text-center">
                        {category.description}
                      </p>
                      
                      <div className="text-center">
                        <Button variant="default" size="lg" className="w-full group-hover:bg-gradient-cta">
                          View Services
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Our Services?</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {/* Empty content section - you can add your HTML content here */}
                <p>Add your custom HTML content here...</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomTaskbar />
    </div>
  );
};

export default AllServices;