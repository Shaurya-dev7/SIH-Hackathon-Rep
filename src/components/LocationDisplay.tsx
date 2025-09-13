import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

const LocationDisplay = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              // Using a free geocoding service (you can replace with your preferred service)
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await response.json();
              setCity(data.city || data.locality || "Your Location");
              setLoading(false);
            },
            () => {
              // Fallback if location permission denied
              setCity("Enable Location");
              setLoading(false);
            }
          );
        } else {
          setCity("Location Not Available");
          setLoading(false);
        }
      } catch (error) {
        setCity("Location Not Available");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <MapPin className="h-4 w-4 mr-1" />
      <span>
        {loading ? "Detecting..." : city}
      </span>
    </div>
  );
};

export default LocationDisplay;