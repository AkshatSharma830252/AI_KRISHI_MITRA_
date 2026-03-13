import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Globe, LogIn, LayoutDashboard } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { en: "Home", hi: "होम", href: "#home" },
  { en: "Soil Analysis", hi: "मिट्टी विश्लेषण", href: "#soil" },
  { en: "Weather", hi: "मौसम", href: "#weather" },
  { en: "Crop Advisor", hi: "फसल सलाहकार", href: "#crop-advisor" },
  { en: "Disease Detection", hi: "रोग पहचान", href: "#disease" },
  { en: "Marketplace", hi: "बाज़ार", href: "#marketplace" },
  { en: "AI Assistant", hi: "AI सहायक", href: "#assistant" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLang();
  const { user } = useAuth();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 glass"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-gradient">KrishiMitra</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.en}
              href={item.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 rounded-md hover:bg-primary/5"
            >
              {lang === "en" ? item.en : item.hi}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLang}
            className="btn-glow border-primary/30 text-primary hover:bg-primary/10 gap-1.5"
          >
            <Globe className="w-4 h-4" />
            {lang === "en" ? "हिंदी" : "English"}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden glass border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.en}
                  href={item.href}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                >
                  {lang === "en" ? item.en : item.hi}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
