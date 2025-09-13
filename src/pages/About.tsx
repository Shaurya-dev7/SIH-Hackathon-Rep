import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BottomTaskbar from "@/components/BottomTaskbar";

const About = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About RepairUp
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
              Your trusted partner for professional home appliance repair services
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                Coming soon... We'll share our journey and mission here.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                Content will be added here about our commitment to excellence in appliance repair services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose RepairUp?</h2>
              <p className="text-muted-foreground">
                Details about our expertise, warranty, and customer service will be featured here.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomTaskbar />
    </div>
  );
};

export default About;