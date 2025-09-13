import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  Wrench, 
  User,
  CreditCard,
  TrendingUp,
  Eye,
  Download,
  MessageCircle,
  Loader2,
  Plus,
  Recycle
} from "lucide-react";
import { EWasteUpload } from "@/components/EWasteUpload";
import { EWasteRequests } from "@/components/EWasteRequests";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const Dashboard = () => {
  const [bookings, setBookings] = useState<Tables<'bookings'>[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTab = (params.get('tab') as string) || 'active';
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching bookings:', error);
        } else {
          setBookings(data || []);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const activeBookings = bookings.filter(booking => 
    booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'in-progress'
  );

  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "in-progress":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage your appliance repair bookings</p>
            </div>
            <Button variant="cta" size="lg" asChild>
              <a href="/book-now">
                <Plus className="h-4 w-4 mr-2" />
                Book New Service
              </a>
            </Button>
          </div>
        </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{activeBookings.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Services</p>
                    <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                  </div>
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{bookings.filter(b => b.status === 'pending').length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">{pastBookings.length}</p>
                  </div>
                  <Star className="h-8 w-8 text-primary fill-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="active">Bookings</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="ewaste">
          <Recycle className="w-4 h-4 mr-2" />
          E-Waste
        </TabsTrigger>
      </TabsList>
          {/* Active Bookings */}
          <TabsContent value="active" className="space-y-6">
            {activeBookings.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No active bookings at the moment.</p>
                  <Button asChild className="mt-4">
                    <a href="/book-now">Book a Service</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              activeBookings.map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{booking.appliance} Repair</h3>
                        <p className="text-muted-foreground">{booking.category.replace('-', ' ').toUpperCase()}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString() : 'No date specified'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{booking.preferred_time || 'Any time'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{booking.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{booking.phone}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Problem:</strong> {booking.problem}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call Support
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="link" size="sm" className="text-muted-foreground">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* E-Waste Section */}
          <TabsContent value="ewaste" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit E-Waste Request</CardTitle>
                  <CardDescription>
                    Upload pictures of your non-working appliances that you want to sell
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EWasteUpload />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your E-Waste Requests</CardTitle>
                  <CardDescription>
                    Track the status of your submitted e-waste requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EWasteRequests />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Service History */}
          <TabsContent value="history" className="space-y-6">
            {pastBookings.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No completed services yet.</p>
                </CardContent>
              </Card>
            ) : (
              pastBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{booking.appliance} Repair</h3>
                        <p className="text-muted-foreground">{booking.category.replace('-', ' ').toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.status === 'completed' ? 'Completed' : 'Cancelled'} on{' '}
                          {new Date(booking.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Problem:</strong> {booking.problem}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Address:</strong> {booking.address}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href="/book-now">Book Again</a>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;