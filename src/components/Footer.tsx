import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Wrench, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-gray-100 dark:from-background dark:to-gray-900 border-t border-border">
      {/* Newsletter Section */}
      <div className="bg-gradient-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-black dark:text-white">
            <h3 className="text-2xl font-bold mb-2">Stay Updated with RepairUp</h3>
            <p className="text-black dark:text-white mb-8 max-w-2xl mx-auto">
              Get maintenance tips, exclusive offers, and be the first to know about our new services.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              />
              <Button variant="secondary" size="lg" className="bg-white text-accent-orange hover:bg-white/90">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">RepairUp</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted partner for professional home appliance repair services. 
              Expert technicians, genuine parts, and reliable solutions.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-smooth">Our Services</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">About Us</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-smooth">Pricing</a></li>
              <li><a href="#careers" className="text-muted-foreground hover:text-primary transition-smooth">Careers</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-smooth">FAQ</a></li>
              <li><a href="#blog" className="text-muted-foreground hover:text-primary transition-smooth">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="#ac-repair" className="text-muted-foreground hover:text-primary transition-smooth">AC Repair</a></li>
              <li><a href="#washing-machine" className="text-muted-foreground hover:text-primary transition-smooth">Washing Machine</a></li>
              <li><a href="#refrigerator" className="text-muted-foreground hover:text-primary transition-smooth">Refrigerator</a></li>
              <li><a href="#microwave" className="text-muted-foreground hover:text-primary transition-smooth">Microwave</a></li>
              <li><a href="#tv-repair" className="text-muted-foreground hover:text-primary transition-smooth">TV Repair</a></li>
              <li><a href="#emergency" className="text-muted-foreground hover:text-primary transition-smooth">Emergency Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">+91 9229440845</p>
                  <p className="text-sm text-muted-foreground">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">support@repairup.com</p>
                  <p className="text-sm text-muted-foreground">Quick Response</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Service Area</p>
                  <p className="text-sm text-muted-foreground">All major cities</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Mon-Sun 8AM-10PM</p>
                  <p className="text-sm text-muted-foreground">Extended Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 RepairUp. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-primary transition-smooth">
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-primary transition-smooth">
              Terms of Service
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-primary transition-smooth">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;