import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Wrench, Phone, Mail, MapPin, Calendar, Clock, Loader2, Shield, Star } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EnhancedLocationSelector from "@/components/EnhancedLocationSelector";

const BookNow = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    category: "",
    appliance: "",
    problem: "",
    preferredDate: "",
    preferredTime: "",
    urgency: ""
  });

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Pre-fill form data from navigation state
  useEffect(() => {
    if (location.state) {
      const { selectedAppliance, selectedCategory, urgency } = location.state;
      setFormData(prev => ({
        ...prev,
        ...(selectedAppliance && { appliance: selectedAppliance }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(urgency && { urgency })
      }));
    }
  }, [location.state]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const applianceCategories = {
    "home-appliances": {
      name: "Home Appliances",
      items: ["AC", "Cooler", "Fan", "TV", "Speaker", "Projector", "Air Purifier", "Inverter"]
    },
    "kitchen-appliances": {
      name: "Kitchen Appliances", 
      items: ["Water Purifier", "Refrigerator", "Microwave", "Chimney", "Induction", "Toaster", "Egg Boiler", "Coffee Machine", "Blender", "Juicer", "Air Fryer", "Dishwasher", "Rice Cooker"]
    },
    "cleaning-laundry": {
      name: "Cleaning & Laundry",
      items: ["Washing Machine", "Vacuum Cleaner", "Geyser"]
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to book a service."
      });
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          customer_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          location: formData.location,
          category: formData.category,
          appliance: formData.appliance,
          problem: formData.problem,
          preferred_date: formData.preferredDate || null,
          preferred_time: formData.preferredTime || null,
          urgency: formData.urgency || null,
          status: 'pending'
        });

      if (error) {
        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: error.message
        });
      } else {
        toast({
          title: "Booking Successful!",
          description: "Your service request has been submitted. We'll contact you within 30 minutes."
        });
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: err?.message || "Something went wrong. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-hero text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-smooth bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Wrench className="h-12 w-12 text-white mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Book Your Service</h1>
            </div>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Get expert appliance repair service at your doorstep. Fill out the form below and we'll contact you within 30 minutes.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <Card className="shadow-card-hover">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Service Details</CardTitle>
                <CardDescription>
                  Please provide your details and describe the issue with your appliance
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <EnhancedLocationSelector 
                        onLocationSelect={(location) => setFormData({...formData, location})}
                        selectedLocation={formData.location}
                        placeholder="Enter your service location..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Detailed Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="House/Flat number, Building name, Street, Area"
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  {/* Appliance Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Appliance Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Appliance Category *</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => setFormData({...formData, category: value, appliance: ""})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(applianceCategories).map(([key, category]) => (
                              <SelectItem key={key} value={key}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appliance">Specific Appliance *</Label>
                        <Select 
                          value={formData.appliance} 
                          onValueChange={(value) => setFormData({...formData, appliance: value})}
                          disabled={!formData.category}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select appliance" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.category && applianceCategories[formData.category as keyof typeof applianceCategories]?.items.map((appliance) => (
                              <SelectItem key={appliance} value={appliance}>
                                {appliance}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="problem">Problem Description *</Label>
                      <Textarea
                        id="problem"
                        value={formData.problem}
                        onChange={(e) => setFormData({...formData, problem: e.target.value})}
                        placeholder="Please describe the issue in detail (e.g., not cooling, making noise, not starting, etc.)"
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  {/* Scheduling */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Preferred Schedule</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <Select 
                          value={formData.preferredTime} 
                          onValueChange={(value) => setFormData({...formData, preferredTime: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                            <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="urgency">Service Urgency</Label>
                        <Select 
                          value={formData.urgency} 
                          onValueChange={(value) => setFormData({...formData, urgency: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emergency">Emergency (Within 2 hours)</SelectItem>
                            <SelectItem value="same-day">Same Day</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Book Service Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Features */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Call us directly</p>
                    <p className="text-sm text-muted-foreground">+91 9876543210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email support</p>
                    <p className="text-sm text-muted-foreground">support@repairup.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-success" />
                  <span className="text-sm">30-minute response time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-success" />
                  <span className="text-sm">Expert certified technicians</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-success" />
                  <span className="text-sm">Doorstep service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-success" />
                  <span className="text-sm">6-month service warranty</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;