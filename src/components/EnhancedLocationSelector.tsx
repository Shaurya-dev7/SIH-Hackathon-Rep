import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
  selectedLocation?: string;
  placeholder?: string;
}

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

const EnhancedLocationSelector = ({ onLocationSelect, selectedLocation = "", placeholder = "Enter your location..." }: LocationSelectorProps) => {
  const [manualLocation, setManualLocation] = useState(selectedLocation);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { toast } = useToast();

  // Get user's current location
  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser");
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Use Nominatim for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      
      if (!response.ok) throw new Error("Failed to get location details");
      
      const data = await response.json();
      const locationString = `${data.address?.city || data.address?.town || data.address?.village || data.address?.hamlet}, ${data.address?.state || data.address?.region}`;
      
      setManualLocation(locationString);
      onLocationSelect(locationString);
      setIsUsingCurrentLocation(true);
      
      toast({
        title: "Location detected",
        description: `Using your current location: ${locationString}`,
      });
    } catch (error) {
      console.error("Location error:", error);
      toast({
        title: "Location Error",
        description: "Could not get your current location. Please enter manually.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Get location suggestions
  const getLocationSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&countrycodes=US,CA,GB,AU,IN&addressdetails=1&extratags=1&namedetails=1`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.slice(0, 5));
      }
    } catch (error) {
      console.error("Failed to fetch location suggestions:", error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Debounce suggestions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (manualLocation && !isUsingCurrentLocation) {
        getLocationSuggestions(manualLocation);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [manualLocation, isUsingCurrentLocation]);

  const handleLocationInput = (value: string) => {
    setManualLocation(value);
    setIsUsingCurrentLocation(false);
    onLocationSelect(value);
  };

  const selectSuggestion = (suggestion: LocationSuggestion) => {
    const locationString = suggestion.display_name;
    setManualLocation(locationString);
    onLocationSelect(locationString);
    setSuggestions([]);
    setIsUsingCurrentLocation(false);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-foreground">Service Location</label>
      
      {/* Current Location Button */}
      <Button
        type="button"
        variant="outline"
        onClick={getCurrentLocation}
        disabled={isLoadingLocation}
        className="w-full justify-start"
      >
        {isLoadingLocation ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4 mr-2" />
        )}
        {isLoadingLocation ? "Getting location..." : "Use Current Location"}
      </Button>

      {/* Current Location Confirmation */}
      {isUsingCurrentLocation && manualLocation && (
        <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
          <p className="text-sm text-success-foreground">
            ✓ Using your current location: {manualLocation}
          </p>
        </div>
      )}

      {/* Manual Location Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
          <input
            type="text"
            value={manualLocation}
            onChange={(e) => handleLocationInput(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {isLoadingSuggestions && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 animate-spin text-muted-foreground transform -translate-y-1/2" />
          )}
        </div>

        {/* Location Suggestions */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-[rgb(245,245,245)] dark:bg-card border border-border rounded-lg shadow-card-hover max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-muted transition-smooth flex items-center space-x-2 border-b border-border last:border-b-0"
              >
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground truncate font-medium">{suggestion.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Manual Location Hint */}
      {manualLocation && !isUsingCurrentLocation && (
        <p className="text-xs text-muted-foreground">
          We'll use this location to find the nearest technician and provide accurate service estimates.
        </p>
      )}
    </div>
  );
};

export default EnhancedLocationSelector;