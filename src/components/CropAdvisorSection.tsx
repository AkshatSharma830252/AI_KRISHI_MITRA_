import { motion } from "framer-motion";
import { TrendingUp, Leaf, IndianRupee, ShieldCheck, BarChart3, RotateCw } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CropAdvisorSection = () => {
  const { t } = useLang();
  const [showResults, setShowResults] = useState(false);
  const [season, setSeason] = useState("");
  const [prevCrop, setPrevCrop] = useState("");

  const recommendations = [
    {
      crop: t("Wheat (गेहूं)", "गेहूं (Wheat)"),
      yield: "45 q/ha",
      profit: "₹68,000/ha",
      sustainability: 92,
      risk: t("Low", "कम"),
      riskColor: "text-primary",
    },
    {
      crop: t("Mustard (सरसों)", "सरसों (Mustard)"),
      yield: "18 q/ha",
      profit: "₹52,000/ha",
      sustainability: 88,
      risk: t("Low", "कम"),
      riskColor: "text-primary",
    },
    {
      crop: t("Chickpea (चना)", "चना (Chickpea)"),
      yield: "22 q/ha",
      profit: "₹48,000/ha",
      sustainability: 95,
      risk: t("Medium", "मध्यम"),
      riskColor: "text-accent",
    },
    {
      crop: t("Potato (आलू)", "आलू (Potato)"),
      yield: "250 q/ha",
      profit: "₹1,20,000/ha",
      sustainability: 70,
      risk: t("High", "उच्च"),
      riskColor: "text-destructive",
    },
  ];

  return (
    <section id="crop-advisor" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">{t("AI Crop Advisor", "AI फसल सलाहकार")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t(
              "Smart crop recommendations based on soil, weather, market demand & crop rotation",
              "मिट्टी, मौसम, बाज़ार मांग और फसल चक्र पर आधारित स्मार्ट फसल सिफारिशें"
            )}
          </p>
        </motion.div>

        {/* Inputs */}
        <motion.div
          className="max-w-2xl mx-auto glass rounded-2xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">{t("Season", "मौसम")}</label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder={t("Select season", "मौसम चुनें")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rabi">{t("Rabi (Winter)", "रबी (सर्दी)")}</SelectItem>
                  <SelectItem value="kharif">{t("Kharif (Monsoon)", "खरीफ (मानसून)")}</SelectItem>
                  <SelectItem value="zaid">{t("Zaid (Summer)", "ज़ायद (गर्मी)")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">{t("Previous Crop", "पिछली फसल")}</label>
              <Select value={prevCrop} onValueChange={setPrevCrop}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder={t("Select crop", "फसल चुनें")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">{t("Rice", "चावल")}</SelectItem>
                  <SelectItem value="wheat">{t("Wheat", "गेहूं")}</SelectItem>
                  <SelectItem value="maize">{t("Maize", "मक्का")}</SelectItem>
                  <SelectItem value="pulses">{t("Pulses", "दालें")}</SelectItem>
                  <SelectItem value="cotton">{t("Cotton", "कपास")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full btn-glow bg-primary text-primary-foreground" onClick={() => setShowResults(true)}>
            <Leaf className="w-4 h-4 mr-2" />
            {t("Get AI Recommendations", "AI सिफारिशें प्राप्त करें")}
          </Button>
        </motion.div>

        {/* Crop rotation tip */}
        <motion.div
          className="max-w-2xl mx-auto glass rounded-xl p-5 mb-8 border-l-4 border-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-3">
            <RotateCw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">{t("Crop Rotation Tip", "फसल चक्र सुझाव")}</h4>
              <p className="text-sm text-muted-foreground">
                {t(
                  "After Rice (Kharif), grow Wheat or Mustard in Rabi season. Follow with Moong/Mash in Zaid. This preserves soil nitrogen and breaks pest cycles.",
                  "चावल (खरीफ) के बाद रबी में गेहूं या सरसों उगाएं। ज़ायद में मूंग/माश उगाएं। इससे मिट्टी का नाइट्रोजन संरक्षित रहता है और कीट चक्र टूटता है।"
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {showResults && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {recommendations.map((crop, i) => (
              <motion.div
                key={i}
                className="glass rounded-xl p-5 card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="font-bold text-foreground text-lg mb-3">{crop.crop}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1"><BarChart3 className="w-3 h-3" />{t("Yield", "उपज")}</span>
                    <span className="text-foreground font-medium">{crop.yield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1"><IndianRupee className="w-3 h-3" />{t("Profit", "लाभ")}</span>
                    <span className="text-accent font-medium">{crop.profit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1"><ShieldCheck className="w-3 h-3" />{t("Sustainability", "स्थिरता")}</span>
                    <span className="text-primary font-medium">{crop.sustainability}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("Risk", "जोखिम")}</span>
                    <span className={`font-medium ${crop.riskColor}`}>{crop.risk}</span>
                  </div>
                </div>
                {/* Sustainability bar */}
                <div className="mt-3 w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${crop.sustainability}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Market prices */}
        {showResults && (
          <motion.div
            className="mt-10 max-w-3xl mx-auto glass rounded-2xl p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              {t("Market Price Trends (AGMARKNET)", "बाज़ार मूल्य रुझान (AGMARKNET)")}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground">{t("Crop", "फसल")}</th>
                    <th className="text-right py-2 text-muted-foreground">{t("MSP", "MSP")}</th>
                    <th className="text-right py-2 text-muted-foreground">{t("Market Price", "बाज़ार मूल्य")}</th>
                    <th className="text-right py-2 text-muted-foreground">{t("Trend", "रुझान")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { crop: t("Wheat", "गेहूं"), msp: "₹2,275", market: "₹2,450", trend: "↑ +7.7%" },
                    { crop: t("Mustard", "सरसों"), msp: "₹5,650", market: "₹5,200", trend: "↓ -8.0%" },
                    { crop: t("Chickpea", "चना"), msp: "₹5,440", market: "₹5,800", trend: "↑ +6.6%" },
                    { crop: t("Potato", "आलू"), msp: "—", market: "₹800/q", trend: "↓ -15%" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-3 text-foreground">{row.crop}</td>
                      <td className="py-3 text-right text-muted-foreground">{row.msp}</td>
                      <td className="py-3 text-right text-foreground font-medium">{row.market}</td>
                      <td className={`py-3 text-right font-medium ${row.trend.includes("↑") ? "text-primary" : "text-destructive"}`}>
                        {row.trend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
};

export default CropAdvisorSection;
