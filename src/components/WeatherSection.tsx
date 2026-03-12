import { motion } from "framer-motion";
import { CloudRain, Sun, Thermometer, Wind, Droplets, AlertTriangle } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const WeatherSection = () => {
  const { t } = useLang();

  const forecast = [
    { day: t("Today", "आज"), icon: Sun, temp: "34°C", rain: "10%", condition: t("Sunny", "धूप") },
    { day: t("Tomorrow", "कल"), icon: CloudRain, temp: "30°C", rain: "65%", condition: t("Rain", "बारिश") },
    { day: t("Day 3", "दिन 3"), icon: CloudRain, temp: "28°C", rain: "80%", condition: t("Heavy Rain", "भारी बारिश") },
    { day: t("Day 4", "दिन 4"), icon: Sun, temp: "32°C", rain: "15%", condition: t("Clear", "साफ़") },
    { day: t("Day 5", "दिन 5"), icon: Sun, temp: "33°C", rain: "5%", condition: t("Sunny", "धूप") },
  ];

  return (
    <section id="weather" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">{t("Weather Intelligence", "मौसम बुद्धिमत्ता")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("Localized weather forecasts for smarter farming decisions", "बेहतर खेती निर्णयों के लिए स्थानीय मौसम पूर्वानुमान")}
          </p>
        </motion.div>

        {/* Current conditions */}
        <motion.div
          className="glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Thermometer className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">34°C</div>
              <div className="text-xs text-muted-foreground">{t("Temperature", "तापमान")}</div>
            </div>
            <div className="text-center">
              <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">68%</div>
              <div className="text-xs text-muted-foreground">{t("Humidity", "आर्द्रता")}</div>
            </div>
            <div className="text-center">
              <Wind className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">12 km/h</div>
              <div className="text-xs text-muted-foreground">{t("Wind Speed", "हवा की गति")}</div>
            </div>
            <div className="text-center">
              <CloudRain className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">45mm</div>
              <div className="text-xs text-muted-foreground">{t("Rainfall (week)", "वर्षा (सप्ताह)")}</div>
            </div>
          </div>
        </motion.div>

        {/* 5-day forecast */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto mb-8">
          {forecast.map((day, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-4 text-center card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm text-muted-foreground mb-2">{day.day}</div>
              <day.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-lg font-bold text-foreground">{day.temp}</div>
              <div className="text-xs text-primary">{t("Rain", "बारिश")}: {day.rain}</div>
            </motion.div>
          ))}
        </div>

        {/* Weather alert */}
        <motion.div
          className="max-w-4xl mx-auto glass rounded-xl p-5 border-l-4 border-accent"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">{t("Weather Alert", "मौसम चेतावनी")}</h4>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Heavy rainfall expected on Day 3. Delay sowing activities and ensure proper drainage in fields. Consider covering harvested crops.",
                  "दिन 3 पर भारी बारिश अपेक्षित। बुवाई गतिविधियाँ स्थगित करें और खेतों में उचित जल निकासी सुनिश्चित करें। कटी फसलों को ढकने पर विचार करें।"
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
};

export default WeatherSection;
