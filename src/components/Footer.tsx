import { Leaf } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-gradient">KrishiMitra</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("AI-powered smart agriculture platform for Indian farmers.", "भारतीय किसानों के लिए AI-संचालित स्मार्ट कृषि मंच।")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">{t("Features", "सुविधाएँ")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#soil" className="hover:text-primary transition-colors">{t("Soil Analysis", "मिट्टी विश्लेषण")}</a></li>
              <li><a href="#weather" className="hover:text-primary transition-colors">{t("Weather Intel", "मौसम बुद्धिमत्ता")}</a></li>
              <li><a href="#crop-advisor" className="hover:text-primary transition-colors">{t("Crop Advisor", "फसल सलाहकार")}</a></li>
              <li><a href="#disease" className="hover:text-primary transition-colors">{t("Disease Detection", "रोग पहचान")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">{t("Marketplace", "बाज़ार")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#marketplace" className="hover:text-primary transition-colors">{t("Browse Crops", "फसलें देखें")}</a></li>
              <li><a href="#marketplace" className="hover:text-primary transition-colors">{t("List Your Crop", "अपनी फसल लिस्ट करें")}</a></li>
              <li><a href="#marketplace" className="hover:text-primary transition-colors">{t("Market Prices", "बाज़ार मूल्य")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">{t("Data Sources", "डेटा स्रोत")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>ISRO Bhuvan</li>
              <li>ISRIC SoilGrids</li>
              <li>IMD Weather</li>
              <li>AGMARKNET</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 KrishiMitra. {t("Empowering Indian Farmers with AI.", "AI के साथ भारतीय किसानों को सशक्त बनाना।")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
