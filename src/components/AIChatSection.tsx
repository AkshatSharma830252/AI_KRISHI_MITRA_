import { motion } from "framer-motion";
import { Send, Mic, Bot, User, Sprout } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { streamChat } from "@/lib/ai-chat";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatSection = () => {
  const { t, lang } = useLang();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: lang === "en"
        ? "Hello! I'm KrishiMitra AI 🌾 Ask me anything about farming — crops, soil, weather, diseases, or market prices. I'm here to help!"
        : "नमस्ते! मैं कृषिमित्र AI हूँ 🌾 खेती के बारे में कुछ भी पूछें — फसलें, मिट्टी, मौसम, रोग, या बाज़ार मूल्य। मैं मदद के लिए यहाँ हूँ!",
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
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

  const handleSend = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || isStreaming) return;

    const userMsg: Message = { role: "user", content: msg };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > updatedMessages.length) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev.slice(0, -1), prev[prev.length - 1], { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      // First token creates the assistant message
      let firstToken = true;
      await streamChat({
        messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        onDelta: (chunk) => {
          assistantSoFar += chunk;
          setMessages((prev) => {
            if (firstToken) {
              firstToken = false;
              return [...prev, { role: "assistant", content: assistantSoFar }];
            }
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          });
        },
        onDone: () => setIsStreaming(false),
        onError: (err) => {
          toast.error(err);
          setIsStreaming(false);
        },
      });
    } catch {
      toast.error("Failed to connect to AI");
      setIsStreaming(false);
    }
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
            {t("Ask anything about farming — powered by real AI", "खेती के बारे में कुछ भी पूछें — असली AI द्वारा संचालित")}
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
              <div className="text-xs text-primary">{isStreaming ? t("Thinking...", "सोच रहा है...") : t("Online", "ऑनलाइन")}</div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </motion.div>
            ))}
            {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
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
                disabled={isStreaming}
                className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t("Type your question...", "अपना प्रश्न लिखें...")}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              disabled={isStreaming}
            />
            <Button size="icon" className="bg-primary text-primary-foreground btn-glow shrink-0" onClick={() => handleSend()} disabled={isStreaming}>
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
