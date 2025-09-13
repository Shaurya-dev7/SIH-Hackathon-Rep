import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BottomTaskbar from "@/components/BottomTaskbar";
import { MdKitchen, MdOutlineWaterDrop, MdMicrowave, MdOutlineKitchen, MdCoffeeMaker, MdEgg, MdBlender, MdAir, MdRiceBowl } from "react-icons/md";
import { FaFan, FaWind, FaBlender, FaCoffee, FaEgg, FaUtensils, FaArrowLeft, FaGlassWhiskey, FaSoap } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const appliances = [
  { icon: MdOutlineWaterDrop, name: "Water Purifier", description: "RO, UV, UF water purifier service" },
  { icon: MdKitchen, name: "Refrigerator", description: "Single & double door fridge repair" },
  { icon: MdMicrowave, name: "Microwave", description: "Microwave oven repair and service" },
  { icon: MdOutlineKitchen, name: "Chimney", description: "Kitchen chimney cleaning and repair" },
  { icon: FaGlassWhiskey, name: "Induction", description: "Induction cooktop repair service" },
  { icon: FaUtensils, name: "Toaster", description: "Bread toaster and sandwich maker" },
  { icon: FaEgg, name: "Egg Boiler", description: "Electric egg boiler repair" },
  { icon: MdCoffeeMaker, name: "Coffee Machine", description: "Coffee maker and espresso machine" },
  { icon: FaBlender, name: "Blender", description: "Mixer grinder and blender repair" },
  { icon: FaGlassWhiskey, name: "Juicer", description: "Electric juicer and extractor repair" },
  { icon: MdAir, name: "Air Fryer", description: "Air fryer maintenance and repair" },
  { icon: FaSoap, name: "Dishwasher", description: "Dishwasher repair and service" },
  { icon: MdRiceBowl, name: "Rice Cooker", description: "Electric rice cooker repair" }
];

const KitchenAppliances = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navigation />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <Link to="/">
                <Button variant="ghost" size="sm" className="mr-4">
                  <FaArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Kitchen Appliances Repair
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
              <p className="text-xl text-foreground max-w-3xl mx-auto font-medium">
                Expert repair services for all your kitchen appliances with warranty
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {appliances.map((appliance, index) => {
                const IconComponent = appliance.icon;
                return (
                  <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-smooth">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-cta p-4 mb-4 mx-auto">
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
                      {appliance.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 text-center">
                      {appliance.description}
                    </p>
                    <Link to="/book-now">
                      <Button variant="default" size="sm" className="w-full">
                        Book Service
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-6">About Our Kitchen Appliance Services</h2>
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

export default KitchenAppliances;