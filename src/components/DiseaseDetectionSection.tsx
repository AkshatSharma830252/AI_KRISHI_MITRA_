import { motion } from "framer-motion";
import { Camera, Upload, AlertCircle, CheckCircle, Bug, Pill } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const DiseaseDetectionSection = () => {
  const { t } = useLang();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | typeof mockResult>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const mockResult = {
    disease: t("Leaf Blight (Bacterial)", "पत्ती झुलसा (जीवाणुजन्य)"),
    severity: t("Moderate (60%)", "मध्यम (60%)"),
    crop: t("Rice", "चावल"),
    treatment: t(
      "1. Apply Streptocycline (1g/10L water)\n2. Spray Copper Oxychloride\n3. Ensure proper field drainage\n4. Remove infected plant debris",
      "1. स्ट्रेप्टोसाइक्लिन लगाएं (1g/10L पानी)\n2. कॉपर ऑक्सीक्लोराइड का छिड़काव\n3. उचित खेत जल निकासी सुनिश्चित करें\n4. संक्रमित पौधों के अवशेष हटाएं"
    ),
    prevention: t(
      "Use disease-resistant varieties. Practice crop rotation. Avoid excessive nitrogen fertilization. Maintain proper spacing between plants.",
      "रोग-प्रतिरोधी किस्मों का उपयोग करें। फसल चक्र अपनाएं। अत्यधिक नाइट्रोजन उर्वरक से बचें। पौधों के बीच उचित दूरी बनाएं।"
    ),
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
        setAnalyzing(true);
        setResult(null);
        setTimeout(() => {
          setAnalyzing(false);
          setResult(mockResult);
        }, 2500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="disease" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">{t("Disease Detection", "रोग पहचान")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("Upload a photo of your crop to detect diseases instantly with AI", "AI से तुरंत रोग पहचानने के लिए अपनी फसल की तस्वीर अपलोड करें")}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload area */}
          <motion.div
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] cursor-pointer card-hover"
            whileHover={{ scale: 1.02 }}
            onClick={() => fileRef.current?.click()}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            {image ? (
              <img src={image} alt="Uploaded crop" className="w-full h-64 object-cover rounded-xl" />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-medium mb-1">{t("Upload Crop Image", "फसल की तस्वीर अपलोड करें")}</p>
                <p className="text-sm text-muted-foreground">{t("Click or drag & drop", "क्लिक करें या खींचकर छोड़ें")}</p>
                <Button variant="outline" className="mt-4 border-primary/30 text-primary btn-glow" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  {t("Choose File", "फाइल चुनें")}
                </Button>
              </div>
            )}
          </motion.div>

          {/* Results */}
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {analyzing ? (
              <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                  className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-muted-foreground">{t("Analyzing image...", "तस्वीर का विश्लेषण हो रहा है...")}</p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-bold">{t("Disease Detected", "रोग पाया गया")}</span>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("Disease", "रोग")}</div>
                  <div className="text-foreground font-semibold">{result.disease}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("Severity", "गंभीरता")}</div>
                  <div className="text-accent font-semibold">{result.severity}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1"><Pill className="w-3 h-3" />{t("Treatment", "उपचार")}</div>
                  <div className="text-foreground text-sm whitespace-pre-line mt-1">{result.treatment}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1"><CheckCircle className="w-3 h-3" />{t("Prevention", "रोकथाम")}</div>
                  <div className="text-foreground text-sm mt-1">{result.prevention}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Bug className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">{t("Upload a crop image to get AI diagnosis", "AI निदान के लिए फसल की तस्वीर अपलोड करें")}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
};

export default DiseaseDetectionSection;
