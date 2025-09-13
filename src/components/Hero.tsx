import { Button } from "@/components/ui/button";
import { Search, MapPin, Star, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-mechanic.jpg";
import SearchRecommendations from "./SearchRecommendations";
import PricingModal from "./PricingModal";
import AIChat from "./AIChat";
import EnhancedLocationSelector from "./EnhancedLocationSelector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [locationTerm, setLocationTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setShowRecommendations(true);
    } else {
      toast({
        title: "Search Required",
        description: "Please enter an appliance name to search.",
        variant: "destructive",
      });
    }
  };

  const handleSearchSelect = (appliance: string, category: string) => {
    setShowRecommendations(false);
    navigate('/book-now', { state: { selectedAppliance: appliance, selectedCategory: category } });
  };

  const handleLocationSearch = () => {
    if (locationTerm.trim()) {
      const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(locationTerm + ' appliance repair')}`;
      window.open(mapsUrl, '_blank');
    } else {
      toast({
        title: "Location Required",
        description: "Please enter a location to find services.",
        variant: "destructive",
      });
    }
  };

  const handleEmergencyService = () => {
    navigate('/book-now', { state: { urgency: 'emergency' } });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional mechanic servicing home appliances" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  <div className="text-center text-black dark:text-white">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white dark:bg-black rounded-2xl p-2 shadow-card-hover relative">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowRecommendations(e.target.value.length > 0);
                    }}
                    onFocus={() => searchTerm && setShowRecommendations(true)}
                    onBlur={() => setTimeout(() => setShowRecommendations(false), 200)}
                    placeholder="Search your appliances here"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-foreground placeholder:text-black dark:placeholder:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <SearchRecommendations 
                    searchTerm={searchTerm}
                    onSelect={handleSearchSelect}
                    isVisible={showRecommendations}
                  />
                </div>
                <Button variant="outline" size="lg" className="px-4 md:px-8 bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white" onClick={handleSearch}>
                  <span className="hidden sm:inline text-black dark:text-white">Search</span>
                  <Search className="h-4 w-4 sm:hidden text-black dark:text-white" />
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.8/5 Rating</span>
            </div>
            <div className="hidden md:block h-4 w-px bg-white/30"></div>
            <div className="text-sm font-medium">10,000+ Happy Customers</div>
            <div className="hidden md:block h-4 w-px bg-white/30"></div>
            <div className="text-sm font-medium">Same Day Service</div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional
            <span className="block text-accent-orange-foreground">Home Appliance</span>
            <span className="block">Repair Service</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-black dark:text-white mb-12 max-w-3xl mx-auto">
            Expert technicians for Electronic Items to repairs. 
            Book now and get same-day service with 28-day warranty.
          </p>

          {/* Location Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <EnhancedLocationSelector
              onLocationSelect={setLocationTerm}
              selectedLocation={locationTerm}
              placeholder="Enter your location for service..."
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" className="px-10 bg-red-600 dark:bg-red-700 text-white border border-red-700 dark:border-red-500 shadow-md hover:bg-red-700 dark:hover:bg-red-800 hover:text-white" onClick={handleEmergencyService}>
              Book Emergency Service
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-10 bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white"
              onClick={() => setShowPricing(true)}
            >
              View Services & Pricing
            </Button>
          </div>

          {/* Chat Now Button */}
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white"
              onClick={() => setShowAIChat(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat Now - AI Assistant
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-accent-orange-foreground mb-2">24/7</div>
              <div className="text-white/90">Emergency Service</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-accent-orange-foreground mb-2">30 Min</div>
              <div className="text-white/90">Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-accent-orange-foreground mb-2">28 Days</div>
              <div className="text-white/90">Service Warranty</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
      <AIChat isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
    </section>
  );
};

export default Hero;