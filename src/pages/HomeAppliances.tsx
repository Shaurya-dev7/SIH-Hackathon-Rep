import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BottomTaskbar from "@/components/BottomTaskbar";
import { MdAcUnit, MdTv, MdSpeaker, MdOutlineBatteryChargingFull, MdAir, MdHomeRepairService, MdArrowBack, MdVideoSettings } from "react-icons/md";
import { FaFan, FaWind } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const appliances = [
  { icon: MdAcUnit, name: "AC Repair", description: "Air conditioning installation and repair" },
  { icon: FaFan, name: "Cooler Service", description: "Desert cooler and air cooler repair" },
  { icon: FaFan, name: "Fan Repair", description: "Ceiling and table fan servicing" },
  { icon: MdTv, name: "TV Repair", description: "LED, LCD, Smart TV repair services" },
  { icon: MdSpeaker, name: "Speaker Repair", description: "Home theater and speaker systems" },
  { icon: MdVideoSettings, name: "Projector Service", description: "Home and office projector repair" },
  { icon: MdAir, name: "Air Purifier", description: "Air purifier maintenance and repair" },
  { icon: MdOutlineBatteryChargingFull, name: "Inverter Repair", description: "UPS and inverter battery service" }
];

const HomeAppliances = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navigation />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <Link to="/">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="mr-4">
                    <MdArrowBack className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </motion.div>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Home Appliances Repair
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
                Professional repair services for all your home appliances with certified technicians
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
                  <motion.div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-smooth"
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <motion.div whileHover={{ rotate: 10 }} className="w-16 h-16 rounded-2xl bg-gradient-cta p-4 mb-4 mx-auto">
                      <IconComponent className="w-full h-full text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
                      {appliance.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 text-center">
                      {appliance.description}
                    </p>
                    <Link to="/book-now">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="default" size="sm" className="w-full">
                          Book Service
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-6">About Our Home Appliance Services</h2>
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

export default HomeAppliances;