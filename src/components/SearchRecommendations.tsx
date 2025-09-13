import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Search, Wind, Shirt, Refrigerator, Microwave, Tv, Wrench } from "lucide-react";

const appliances = [
  { id: 'ac', name: 'AC Repair', icon: Wind, category: 'home-appliances' },
  { id: 'washing-machine', name: 'Washing Machine', icon: Shirt, category: 'cleaning-laundry' },
  { id: 'refrigerator', name: 'Refrigerator', icon: Refrigerator, category: 'home-appliances' },
  { id: 'microwave', name: 'Microwave', icon: Microwave, category: 'kitchen-appliances' },
  { id: 'tv', name: 'TV Repair', icon: Tv, category: 'home-appliances' },
  { id: 'dishwasher', name: 'Dishwasher', icon: Wrench, category: 'kitchen-appliances' },
  { id: 'oven', name: 'Oven Repair', icon: Wrench, category: 'kitchen-appliances' },
  { id: 'dryer', name: 'Dryer Repair', icon: Shirt, category: 'cleaning-laundry' },
  { id: 'water-heater', name: 'Water Heater', icon: Wrench, category: 'home-appliances' },
  { id: 'garbage-disposal', name: 'Garbage Disposal', icon: Wrench, category: 'kitchen-appliances' },
];

interface SearchRecommendationsProps {
  searchTerm: string;
  onSelect: (appliance: string, category: string) => void;
  isVisible: boolean;
}

const SearchRecommendations = ({ searchTerm, onSelect, isVisible }: SearchRecommendationsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredAppliances = searchTerm.trim() === ""
    ? appliances
    : appliances.filter(appliance =>
        appliance.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleSelect = (appliance: typeof appliances[0]) => {
    onSelect(appliance.name, appliance.category);
  };

  const handleNoResults = () => {
    toast({
      title: "Service not found",
      description: "We couldn't find that specific service. Try searching for similar appliances or contact us for custom service requests.",
      variant: "destructive",
    });
  };

  if (!isVisible || !searchTerm) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-xl shadow-card max-h-60 overflow-y-auto">
      {filteredAppliances.length > 0 ? (
        filteredAppliances.slice(0, 5).map((appliance) => {
          const IconComponent = appliance.icon;
          return (
            <button
              key={appliance.id}
              onClick={() => handleSelect(appliance)}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-smooth flex items-center space-x-3 border-b border-border last:border-b-0"
            >
              <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <div className="font-medium text-foreground">{appliance.name}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {appliance.category.replace('-', ' & ')}
                </div>
              </div>
            </button>
          );
        })
      ) : (
        <div className="px-4 py-6 text-center">
          <p className="text-muted-foreground mb-3">No exact matches found</p>
          <button
            onClick={handleNoResults}
            className="text-sm text-primary hover:text-primary-hover underline"
          >
            Get help finding your service
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchRecommendations;