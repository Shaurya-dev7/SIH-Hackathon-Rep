import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServiceSlideshow from "@/components/ServiceSlideshow";
import ServiceDropdown from "@/components/ServiceDropdown";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BottomTaskbar from "@/components/BottomTaskbar";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navigation />
      <main>
        <Hero />
        <ServiceSlideshow />
        <ServiceDropdown />
        <FAQ />
      </main>
      <Footer />
      <BottomTaskbar />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
