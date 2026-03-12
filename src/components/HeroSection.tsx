import { motion } from "framer-motion";
import { ArrowDown, Sprout, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { t } = useLang();

  const stats = [
    { icon: Sprout, value: "50+", label: t("Crops Supported", "50+ फसलें") },
    { icon: TrendingUp, value: "95%", label: t("Accuracy", "सटीकता") },
    { icon: ShieldCheck, value: "24/7", label: t("AI Support", "AI सहायता") },
    { icon: Zap, value: "Real-time", label: t("Data Analysis", "डेटा विश्लेषण") },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-dark">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/6 w-48 h-48 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)), transparent)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sprout className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              {t("AI-Powered Smart Agriculture", "AI-संचालित स्मार्ट कृषि")}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-foreground">{t("Grow Smarter", "स्मार्ट खेती")}</span>
            <br />
            <span className="text-gradient">{t("with AI Intelligence", "AI बुद्धिमत्ता के साथ")}</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {t(
              "Real-time soil analysis, weather intelligence, crop recommendations, disease detection, and a direct farmer-to-dealer marketplace — all in one platform.",
              "वास्तविक समय मिट्टी विश्लेषण, मौसम बुद्धिमत्ता, फसल सिफारिशें, रोग पहचान, और किसान-से-डीलर बाज़ार — सब एक ही मंच पर।"
            )}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button size="lg" className="btn-glow bg-primary text-primary-foreground px-8 text-base">
              {t("Get Started Free", "मुफ्त शुरू करें")}
            </Button>
            <Button size="lg" variant="outline" className="btn-glow border-border text-foreground hover:bg-secondary px-8 text-base">
              {t("Explore Features", "सुविधाएँ देखें")}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="glass rounded-xl p-4 card-hover text-center"
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
