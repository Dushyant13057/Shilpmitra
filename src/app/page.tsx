import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import About from "@/components/about/About";
import Journey from "@/components/journey/Journey";
import Sahayak from "@/components/sahayak/Sahayak";
import Products from "@/components/products/Products";
import FinalCTA from "@/components/cta/FinalCTA";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col selection:bg-shilp-orange-100 selection:text-shilp-orange-700">
      {/* 01: Navbar */}
      <Navbar />

      {/* 02: Hero Section */}
      <Hero />

      {/* 03: AI Powered Features */}
      <Features />

      {/* 04: About ShilpMitra */}
      <About />

      {/* 05: Craft to Customer Journey */}
      <Journey />

      {/* 06: Sahayak Voice Companion */}
      <Sahayak />

      {/* 07: Product Showcase */}
      <Products />

      {/* 08: Final Call to Action */}
      <FinalCTA />

      {/* 09: Footer */}
      <Footer />
    </main>
  );
}
