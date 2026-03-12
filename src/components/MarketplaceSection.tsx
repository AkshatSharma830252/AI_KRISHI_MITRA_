import { motion } from "framer-motion";
import { Search, MapPin, Star, MessageCircle, IndianRupee, Filter, ShoppingCart } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MarketplaceSection = () => {
  const { t } = useLang();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const listings = [
    {
      farmer: t("Ramesh Kumar", "रमेश कुमार"),
      crop: t("Wheat (Grade A)", "गेहूं (ग्रेड A)"),
      qty: "50 Quintals",
      price: "₹2,500/q",
      location: t("Karnal, Haryana", "करनाल, हरियाणा"),
      rating: 4.8,
      verified: true,
      type: "wheat",
    },
    {
      farmer: t("Sita Devi", "सीता देवी"),
      crop: t("Rice (Basmati)", "चावल (बासमती)"),
      qty: "30 Quintals",
      price: "₹3,800/q",
      location: t("Dehradun, Uttarakhand", "देहरादून, उत्तराखंड"),
      rating: 4.5,
      verified: true,
      type: "rice",
    },
    {
      farmer: t("Suresh Yadav", "सुरेश यादव"),
      crop: t("Mustard (Organic)", "सरसों (जैविक)"),
      qty: "20 Quintals",
      price: "₹5,400/q",
      location: t("Alwar, Rajasthan", "अलवर, राजस्थान"),
      rating: 4.9,
      verified: false,
      type: "mustard",
    },
    {
      farmer: t("Lakshmi Bai", "लक्ष्मी बाई"),
      crop: t("Potato (Fresh)", "आलू (ताज़ा)"),
      qty: "100 Quintals",
      price: "₹900/q",
      location: t("Agra, UP", "आगरा, उप्र"),
      rating: 4.3,
      verified: true,
      type: "potato",
    },
    {
      farmer: t("Mohan Singh", "मोहन सिंह"),
      crop: t("Chickpea (Desi)", "चना (देसी)"),
      qty: "15 Quintals",
      price: "₹5,900/q",
      location: t("Indore, MP", "इंदौर, मप्र"),
      rating: 4.7,
      verified: true,
      type: "chickpea",
    },
    {
      farmer: t("Priya Sharma", "प्रिया शर्मा"),
      crop: t("Maize (Yellow)", "मक्का (पीला)"),
      qty: "40 Quintals",
      price: "₹2,100/q",
      location: t("Hoshiarpur, Punjab", "होशियारपुर, पंजाब"),
      rating: 4.6,
      verified: true,
      type: "maize",
    },
  ];

  const filtered = listings.filter((l) => {
    const matchSearch = l.crop.toLowerCase().includes(search.toLowerCase()) || l.farmer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || l.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <section id="marketplace" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">{t("Farmer-Dealer Marketplace", "किसान-डीलर बाज़ार")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("Direct crop trading — no middlemen, fair prices, full transparency", "सीधा फसल व्यापार — बिचौलिये नहीं, उचित मूल्य, पूर्ण पारदर्शिता")}
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("Search crops or farmers...", "फसल या किसान खोजें...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-secondary border-border text-foreground">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder={t("Filter", "फ़िल्टर")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Crops", "सभी फसलें")}</SelectItem>
              <SelectItem value="wheat">{t("Wheat", "गेहूं")}</SelectItem>
              <SelectItem value="rice">{t("Rice", "चावल")}</SelectItem>
              <SelectItem value="mustard">{t("Mustard", "सरसों")}</SelectItem>
              <SelectItem value="potato">{t("Potato", "आलू")}</SelectItem>
              <SelectItem value="chickpea">{t("Chickpea", "चना")}</SelectItem>
              <SelectItem value="maize">{t("Maize", "मक्का")}</SelectItem>
            </SelectContent>
          </Select>
          <Button className="btn-glow bg-primary text-primary-foreground shrink-0">
            <ShoppingCart className="w-4 h-4 mr-2" />
            {t("List My Crop", "मेरी फसल लिस्ट करें")}
          </Button>
        </motion.div>

        {/* Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-5 card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground">{item.crop}</h3>
                  <p className="text-sm text-muted-foreground">{item.farmer}</p>
                </div>
                {item.verified && (
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                    {t("Verified", "सत्यापित")} ✓
                  </Badge>
                )}
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("Quantity", "मात्रा")}</span>
                  <span className="text-foreground">{item.qty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1"><IndianRupee className="w-3 h-3" />{t("Price", "मूल्य")}</span>
                  <span className="text-accent font-bold">{item.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{t("Location", "स्थान")}</span>
                  <span className="text-foreground">{item.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3" />{t("Rating", "रेटिंग")}</span>
                  <span className="text-accent">{item.rating} ★</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 btn-glow bg-primary text-primary-foreground text-xs">
                  {t("Buy Now", "अभी खरीदें")}
                </Button>
                <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            {t("No crops found matching your search.", "आपकी खोज से मेल खाने वाली कोई फसल नहीं मिली।")}
          </div>
        )}
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
};

export default MarketplaceSection;
