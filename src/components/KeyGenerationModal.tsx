import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, CheckCircle, Loader2, Shield, Globe, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface KeyGenerationModalProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
  platform: string;
}

const generationSteps = [
  { text: "Connecting to secure server...", icon: Shield },
  { text: "Validating region...", icon: Globe },
  { text: "Generating unique code...", icon: Key },
];

const generateCode = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `DELTA-${segment()}-${segment()}`;
};

const KeyGenerationModal = ({ open, onClose, gameName, platform }: KeyGenerationModalProps) => {
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(0);
      setIsGenerating(true);
      setGeneratedCode("");
      setCopied(false);

      const stepDuration = 833; // 2.5s / 3 steps
      
      const timer1 = setTimeout(() => setStep(1), stepDuration);
      const timer2 = setTimeout(() => setStep(2), stepDuration * 2);
      const timer3 = setTimeout(() => {
        setIsGenerating(false);
        setGeneratedCode(generateCode());
      }, 2500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      toast({
        title: "Code copied!",
        description: "The coupon code has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the code manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">
                  {isGenerating ? "Generating Code" : "Your Code"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {gameName} • {platform}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isGenerating ? (
              /* Generation Animation */
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step + 1) / 3) * 100}%` }}
                    className="h-full bg-accent-gradient rounded-full"
                  />
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  {generationSteps.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i === step;
                    const isComplete = i < step;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.5 }}
                        animate={{
                          opacity: isActive || isComplete ? 1 : 0.5,
                        }}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary/10 border border-primary/30"
                            : isComplete
                            ? "bg-green-500/10 border border-green-500/30"
                            : "bg-muted/20"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isComplete
                              ? "bg-green-500/20"
                              : isActive
                              ? "bg-primary/20"
                              : "bg-muted/30"
                          }`}
                        >
                          {isActive ? (
                            <Loader2 className="w-4 h-4 text-primary animate-spin" />
                          ) : isComplete ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Icon className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            isActive || isComplete
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {s.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Generated Code Display */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-muted/30 border border-border/30 text-center">
                  <p className="text-2xl font-display font-bold tracking-wider text-primary">
                    {generatedCode}
                  </p>
                </div>

                <Button
                  onClick={handleCopy}
                  className="w-full btn-glow bg-accent-gradient text-primary-foreground font-semibold"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Click to Copy
                    </>
                  )}
                </Button>

                <a
                  href="#"
                  className="block text-center text-sm text-primary hover:underline"
                >
                  View redemption instructions →
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyGenerationModal;
