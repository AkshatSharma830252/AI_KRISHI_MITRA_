import { motion } from "framer-motion";
import { Send, Mic, Bot, User, Sprout } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "bot";
  text: string;
}

const AIChatSection = () => {
  const { t, lang } = useLang();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: lang === "en"
        ? "Hello! I'm KrishiMitra AI 🌾 Ask me anything about farming — crops, soil, weather, diseases, or market prices. I'm here to help!"
        : "नमस्ते! मैं कृषिमित्र AI हूँ 🌾 खेती के बारे में कुछ भी पूछें — फसलें, मिट्टी, मौसम, रोग, या बाज़ार मूल्य। मैं मदद के लिए यहाँ हूँ!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickQuestions = lang === "en"
    ? [
        "Which crop should I grow this season?",
        "Why are my leaves turning yellow?",
        "How to increase soil fertility?",
        "What's the market price of wheat?",
      ]
    : [
        "इस मौसम में कौन सी फसल उगाऊं?",
        "मेरी पत्तियाँ पीली क्यों हो रही हैं?",
        "मिट्टी की उर्वरता कैसे बढ़ाएं?",
        "गेहूं का बाज़ार भाव क्या है?",
      ];

  const botResponses: Record<string, { en: string; hi: string }> = {
    "crop": {
      en: "Based on your region's soil (pH 6.8, moderate N) and current Rabi season, I recommend:\n\n🌾 **Wheat** — Best suited, yield ~45 q/ha, profit ₹68,000/ha\n🌿 **Mustard** — Good rotation option after rice\n🫘 **Chickpea** — Excellent for nitrogen fixation\n\nWould you like detailed sowing guidance?",
      hi: "आपके क्षेत्र की मिट्टी (pH 6.8, मध्यम N) और वर्तमान रबी सीज़न के आधार पर, मेरी सिफारिश:\n\n🌾 **गेहूं** — सबसे उपयुक्त, उपज ~45 क्विंटल/हेक्टेयर, लाभ ₹68,000/हेक्टेयर\n🌿 **सरसों** — चावल के बाद अच्छा चक्र विकल्प\n🫘 **चना** — नाइट्रोजन स्थिरीकरण के लिए उत्कृष्ट\n\nक्या आप विस्तृत बुवाई मार्गदर्शन चाहेंगे?",
    },
    "yellow": {
      en: "Yellow leaves can indicate several issues:\n\n1. **Nitrogen deficiency** — Apply urea (46-0-0) at 50kg/acre\n2. **Iron chlorosis** — Spray ferrous sulphate (0.5%)\n3. **Overwatering** — Check drainage\n4. **Possible disease** — Upload a photo in the Disease Detection section for AI diagnosis\n\nWhich crop are you growing?",
      hi: "पीली पत्तियाँ कई समस्याओं का संकेत हो सकती हैं:\n\n1. **नाइट्रोजन की कमी** — यूरिया (46-0-0) 50 किग्रा/एकड़ लगाएं\n2. **आयरन क्लोरोसिस** — फेरस सल्फेट (0.5%) का छिड़काव\n3. **अधिक पानी** — जल निकासी जांचें\n4. **संभावित रोग** — AI निदान के लिए रोग पहचान अनुभाग में तस्वीर अपलोड करें\n\nआप कौन सी फसल उगा रहे हैं?",
    },
    "soil": {
      en: "To improve soil fertility naturally:\n\n🌱 **Green manure** — Grow dhaincha/sunhemp before main crop\n🐄 **FYM/Vermicompost** — Apply 5-10 tonnes/hectare\n🔄 **Crop rotation** — Alternate cereals with legumes\n🧪 **Soil testing** — Get tested every 2 seasons\n💧 **Mulching** — Retains moisture and adds organic matter\n\nShall I recommend specific inputs based on your soil test?",
      hi: "मिट्टी की उर्वरता प्राकृतिक रूप से बढ़ाने के लिए:\n\n🌱 **हरी खाद** — मुख्य फसल से पहले ढैंचा/सनहेम्प उगाएं\n🐄 **FYM/वर्मीकम्पोस्ट** — 5-10 टन/हेक्टेयर लगाएं\n🔄 **फसल चक्र** — अनाज और दलहन बारी-बारी उगाएं\n🧪 **मिट्टी परीक्षण** — हर 2 सीज़न में करवाएं\n💧 **मल्चिंग** — नमी बनाए रखती है और जैविक पदार्थ जोड़ती है\n\nक्या मैं आपकी मिट्टी परीक्षण रिपोर्ट के आधार पर विशिष्ट इनपुट सुझाऊं?",
    },
    "price": {
      en: "Current market prices (AGMARKNET data):\n\n🌾 **Wheat**: ₹2,450/q (MSP: ₹2,275) ↑ 7.7%\n🌿 **Mustard**: ₹5,200/q (MSP: ₹5,650) ↓ 8%\n🫘 **Chickpea**: ₹5,800/q (MSP: ₹5,440) ↑ 6.6%\n🥔 **Potato**: ₹900/q ↓ 15%\n\nWheat and Chickpea are trading above MSP. Good time to sell!",
      hi: "वर्तमान बाज़ार मूल्य (AGMARKNET डेटा):\n\n🌾 **गेहूं**: ₹2,450/क्विंटल (MSP: ₹2,275) ↑ 7.7%\n🌿 **सरसों**: ₹5,200/क्विंटल (MSP: ₹5,650) ↓ 8%\n🫘 **चना**: ₹5,800/क्विंटल (MSP: ₹5,440) ↑ 6.6%\n🥔 **आलू**: ₹900/क्विंटल ↓ 15%\n\nगेहूं और चना MSP से ऊपर बिक रहे हैं। बेचने का अच्छा समय!",
    },
  };

  const getBotResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();
    if (lower.includes("crop") || lower.includes("फसल") || lower.includes("grow") || lower.includes("उगा")) {
      return botResponses.crop[lang];
    }
    if (lower.includes("yellow") || lower.includes("पील") || lower.includes("leaf") || lower.includes("पत्त")) {
      return botResponses.yellow[lang];
    }
    if (lower.includes("soil") || lower.includes("मिट्टी") || lower.includes("fertil") || lower.includes("उर्वर")) {
      return botResponses.soil[lang];
    }
    if (lower.includes("price") || lower.includes("भाव") || lower.includes("market") || lower.includes("बाज़ार") || lower.includes("wheat") || lower.includes("गेहू")) {
      return botResponses.price[lang];
    }
    return lang === "en"
      ? "I can help you with crop selection, soil analysis, weather planning, disease detection, and market prices. Try asking a specific question about your farm!"
      : "मैं फसल चयन, मिट्टी विश्लेषण, मौसम योजना, रोग पहचान, और बाज़ार मूल्य में आपकी मदद कर सकता हूँ। अपने खेत के बारे में कोई विशिष्ट प्रश्न पूछें!";
  };

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getBotResponse(msg) }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="assistant" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">{t("AI Farming Assistant", "AI कृषि सहायक")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("Ask anything about farming in English or Hindi", "खेती के बारे में हिंदी या अंग्रेज़ी में कुछ भी पूछें")}
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto glass rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Chat header */}
          <div className="px-5 py-3 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sprout className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">KrishiMitra AI</div>
              <div className="text-xs text-primary">{t("Online", "ऑनलाइन")}</div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-secondary rounded-xl px-4 py-3 flex gap-1">
                  <motion.span className="w-2 h-2 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
                  <motion.span className="w-2 h-2 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                  <motion.span className="w-2 h-2 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick questions */}
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary shrink-0">
              <Mic className="w-5 h-5" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t("Type your question...", "अपना प्रश्न लिखें...")}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button size="icon" className="bg-primary text-primary-foreground btn-glow shrink-0" onClick={() => handleSend()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
};

export default AIChatSection;
