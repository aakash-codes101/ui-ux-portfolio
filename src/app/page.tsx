import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RoomsSection from "@/components/RoomsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <RoomsSection />
      <TestimonialsSection />
      <LocationSection />
      <Footer />
    </main>
  );
}
