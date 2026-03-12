import { motion } from "framer-motion";
import { Droplets, Thermometer, FlaskConical, Gauge } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SoilSection = () => {
  const { t } = useLang();
  const [location, setLocation] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const soilData = [
    { icon: Gauge, label: t("pH Level", "pH स्तर"), value: "6.8", status: t("Optimal", "इष्टतम"), color: "text-primary" },
    { icon: Droplets, label: t("Moisture", "नमी"), value: "42%", status: t("Good", "अच्छा"), color: "text-primary" },
    { icon: FlaskConical, label: t("Nitrogen (N)", "नाइट्रोजन (N)"), value: "280 kg/ha", status: t("Medium", "मध्यम"), color: "text-accent" },
    { icon: Thermometer, label: t("Phosphorus (P)", "फॉस्फोरस (P)"), value: "22 kg/ha", status: t("Low", "कम"), color: "text-destructive" },
    { icon: FlaskConical, label: t("Potassium (K)", "पोटैशियम (K)"), value: "340 kg/ha", status: t("High", "उच्च"), color: "text-primary" },
  ];

  return (
    <section id="soil" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">{t("Soil Intelligence", "मिट्टी बुद्धिमत्ता")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("Analyze soil health with satellite data and IoT sensors", "उपग्रह डेटा और IoT सेंसर से मिट्टी स्वास्थ्य विश्लेषण")}
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          className="max-w-lg mx-auto mb-12 flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Input
            placeholder={t("Enter your farm location...", "अपने खेत का स्थान दर्ज करें...")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button className="btn-glow bg-primary text-primary-foreground shrink-0" onClick={() => setAnalyzed(true)}>
            {t("Analyze", "विश्लेषण")}
          </Button>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {soilData.map((item, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-5 card-hover text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.color}`} />
              <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {analyzed ? item.value : "--"}
              </div>
              <span className={`text-xs font-medium ${item.color}`}>
                {analyzed ? item.status : t("Waiting", "प्रतीक्षा")}
              </span>
            </motion.div>
          ))}
        </div>

        {analyzed && (
          <motion.div
            className="mt-8 glass rounded-xl p-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="font-semibold text-foreground mb-2">{t("AI Recommendation", "AI सिफारिश")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                "Your soil shows good pH and moisture levels. Nitrogen is moderate — consider adding urea or organic compost. Phosphorus is low — apply DAP or bone meal. Potassium is sufficient for most crops. Best suited for: Wheat, Rice, Maize, and Pulses.",
                "आपकी मिट्टी का pH और नमी स्तर अच्छा है। नाइट्रोजन मध्यम है — यूरिया या जैविक खाद डालें। फॉस्फोरस कम है — DAP या हड्डी का चूर्ण लगाएं। पोटैशियम अधिकांश फसलों के लिए पर्याप्त है। सबसे उपयुक्त: गेहूं, चावल, मक्का, और दालें।"
              )}
            </p>
          </motion.div>
        )}
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
};

export default SoilSection;
