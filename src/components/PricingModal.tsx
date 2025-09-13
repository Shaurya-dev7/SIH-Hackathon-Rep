import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wind, Shirt, Refrigerator, Microwave, Tv, Wrench, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  { icon: Wind, name: 'AC Repair & Service', price: '₹100' },
  { icon: Shirt, name: 'Washing Machine Repair', price: '₹100' },
  { icon: Refrigerator, name: 'Refrigerator Service', price: '₹100' },
  { icon: Microwave, name: 'Microwave Repair', price: '₹100' },
  { icon: Tv, name: 'TV & Electronics', price: '₹100' },
  { icon: Wrench, name: 'Other Appliances', price: '₹100' },
];

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const navigate = useNavigate();

  const handleBookService = () => {
    onClose();
    navigate('/book-now');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Service Pricing</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-muted/50 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                  </div>
                  <div className="text-xl font-bold text-primary">{service.price}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success" />
                    <span>28 Days Warranty</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success" />
                    <span>Same Day Service</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success" />
                    <span>Expert Technicians</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button onClick={handleBookService} size="lg" className="px-8">
            Book Service Now
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            All prices include service charges. Additional parts cost extra.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;