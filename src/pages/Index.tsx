import { useState, useCallback } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LoadingAnimation from "@/components/LoadingAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SoilSection from "@/components/SoilSection";
import WeatherSection from "@/components/WeatherSection";
import CropAdvisorSection from "@/components/CropAdvisorSection";
import DiseaseDetectionSection from "@/components/DiseaseDetectionSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import AIChatSection from "@/components/AIChatSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <LanguageProvider>
      {loading && <LoadingAnimation onComplete={handleComplete} />}
      {!loading && (
        <div className="min-h-screen bg-background">
          <Navbar />
          <HeroSection />
          <SoilSection />
          <WeatherSection />
          <CropAdvisorSection />
          <DiseaseDetectionSection />
          <MarketplaceSection />
          <AIChatSection />
          <Footer />
        </div>
      )}
    </LanguageProvider>
  );
};

export default Index;
