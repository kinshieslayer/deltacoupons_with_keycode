import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Shield, Gamepad2, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeyGenerationModalProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
  multiPlatform: boolean;
  platforms: string[];
  description?: string;
  backgroundImage?: string;
  icon?: string;
  externalUrl?: string;
}

const KeyGenerationModal = ({
  open,
  onClose,
  gameName,
  multiPlatform,
  platforms,
  description,
  backgroundImage,
  icon,
  externalUrl = "https://google.com" // Fallback
}: KeyGenerationModalProps) => {
  const [status, setStatus] = useState<"info" | "platform" | "verifying" | "ready">("info");
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Verifying account...");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [couponsLeft, setCouponsLeft] = useState(182);
  const [usedToday, setUsedToday] = useState(64);

  // Initialize random counters when modal opens
  useEffect(() => {
    if (open) {
      setStatus("info");
      setProgress(0);
      setLoadingText("Verifying account...");
      setSelectedPlatform(null);
      // Set random starting number between 150-200
      setCouponsLeft(Math.floor(Math.random() * 51) + 150);
      // Set random "Used Today" between 50-80
      setUsedToday(Math.floor(Math.random() * 31) + 50);
    }
  }, [open]);

  // Sync counters: Every 10-20 seconds, simulate a real user claim
  useEffect(() => {
    if (open && couponsLeft > 50 && usedToday < 500) {
      const randomDelay = Math.floor(Math.random() * 10000) + 10000; // 10-20 seconds
      const timer = setTimeout(() => {
        setCouponsLeft(prev => Math.max(50, prev - 1));
        setUsedToday(prev => prev + 1);
      }, randomDelay);

      return () => clearTimeout(timer);
    }
  }, [open, couponsLeft, usedToday]);

  useEffect(() => {
    if (status === "verifying") {
      const duration = 5000; // 5 seconds (High-Trust Animation)
      const interval = 50;
      const step = 100 / (duration / interval);

      const timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + step;
          if (next >= 100) {
            clearInterval(timer);
            setStatus("ready");
            return 100;
          }

          if (next > 66) setLoadingText("Securing key...");
          else if (next > 33) setLoadingText("Checking region...");

          return next;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [status]);

  const handleProceed = () => {
    if (status === "info") {
      if (multiPlatform && platforms.length > 0) {
        setStatus("platform");
      } else {
        setStatus("verifying");
      }
    } else if (status === "ready") {
      // Call the content locker function
      if (typeof (window as any).og_load === "function") {
        (window as any).og_load();
      } else {
        // Fallback if script didn't load
        window.open(externalUrl, "_blank");
      }
    }
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    setStatus("verifying");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card w-full max-w-md overflow-hidden flex flex-col relative shadow-2xl"
            style={{ borderRadius: '8px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Background Image */}
            <div className="relative h-40 bg-muted shrink-0">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center rounded-full transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {backgroundImage ? (
                <>
                  <img src={`/assets/${backgroundImage}`} className="w-full h-full object-cover opacity-50" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Key className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              {/* Top Info Overlay */}
              <div className="absolute top-4 left-4 z-10 flex items-start gap-3">
                <div className="w-12 h-12 rounded border border-white/10 bg-black/20 overflow-hidden shadow-lg">
                  {icon ? (
                    <img src={`/assets/${icon}`} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <Gamepad2 className="w-6 h-6 text-white m-3" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-bold text-shadow-sm leading-tight text-lg max-w-[200px] line-clamp-1">{gameName}</h3>
                  <p className="text-xs text-amber-500 font-bold uppercase tracking-wider mt-0.5">Free Game Key</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded text-[10px] text-slate-300 border border-white/5 font-medium">
                      <Key className="w-3 h-3" />
                      <span>{couponsLeft} coupons left</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[10px] text-white border border-white/10 font-bold">
                      <CheckCircle className="w-3 h-3 text-white" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 relative">
              {/* Ticket Shape Header */}
              <div className="relative -mt-12 mb-6 bg-primary rounded-xl p-4 text-center shadow-lg mx-2 transform shadow-primary/20">
                {/* Decorative cutouts */}
                <div className="absolute top-1/2 -left-2 w-4 h-4 bg-card rounded-full transform -translate-y-1/2" />
                <div className="absolute top-1/2 -right-2 w-4 h-4 bg-card rounded-full transform -translate-y-1/2" />

                <h2 className="text-xl font-black text-primary-foreground leading-tight mb-1">{gameName}</h2>
                <p className="text-xs font-bold text-primary-foreground/80 uppercase tracking-widest">
                  {selectedPlatform || (multiPlatform ? "Choose Platform" : (platforms[0]?.toLowerCase().includes("ps") ? "PlayStation" : platforms[0]?.toLowerCase().includes("xbox") ? "Xbox" : platforms[0] || "Universal"))}
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex justify-between px-6 mb-6 text-center">
                <div>
                  <p className="text-primary font-black text-lg">5.0</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">100 Ratings</p>
                </div>
                <div>
                  <p className="text-card-foreground font-black text-lg">{usedToday}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Used Today</p>
                </div>
                <div>
                  <p className="text-card-foreground font-black text-lg">30</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Expires In</p>
                </div>
              </div>

              <div className="h-px w-full bg-border mb-6" />

              <div className="min-h-[120px]">
                {status === "info" && (
                  <div className="space-y-2">
                    <h3 className="text-card-foreground font-bold text-sm">Details</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {description || `The ${gameName} code unlocks exclusive content and rewards. This offer has been verified by our community and is available for a limited time.`}
                    </p>
                  </div>
                )}

                {status === "platform" && (
                  <div className="space-y-2">
                    <p className="text-sm text-card-foreground font-medium mb-3">Select your platform:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {platforms.map((p) => {
                        let logoSrc = "";
                        let displayName = p;

                        // Determine logo and friendly display name
                        if (p.toLowerCase().includes("xbox")) {
                          logoSrc = "/assets/xbox_logo.webp";
                          displayName = "Xbox";
                        } else if (p.toLowerCase().includes("ps") || p.toLowerCase().includes("playstation")) {
                          logoSrc = "/assets/playstation_logo.webp";
                          displayName = "PlayStation";
                        } else if (p.toLowerCase().includes("pc") || p.toLowerCase().includes("steam")) {
                          logoSrc = "/assets/pc_logo.webp";
                          displayName = "PC";
                        }

                        return (
                          <button
                            key={p}
                            onClick={() => handlePlatformSelect(p)}
                            className="w-full py-3 px-4 bg-muted hover:bg-accent text-card-foreground font-bold text-sm flex items-center justify-between border border-border hover:border-primary transition-all rounded"
                          >
                            <div className="flex items-center gap-3">
                              {logoSrc ? (
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <img src={logoSrc} alt={displayName} className="w-full h-full object-contain" />
                                </div>
                              ) : <Shield className="w-4 h-4 text-muted-foreground" />}
                              <span>{displayName}</span>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-border group-hover:bg-primary" />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {(status === "verifying") && (
                  <div className="pt-2">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">
                        {loadingText}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "tween", ease: "linear" }}
                      />
                    </div>
                  </div>
                )}

                {status === "ready" && (
                  <div className="animate-in fade-in zoom-in duration-300">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-card-foreground mb-1">Your Coupon Code is Ready!</h3>
                      <p className="text-xs text-muted-foreground">Download 1-2 apps from our sponsors to unlock your code</p>
                    </div>

                    <div className="relative border-2 border-dashed border-primary/50 bg-muted p-6 rounded-lg text-center mx-2 mb-6">
                      <div className="flex flex-col items-center justify-center gap-2 mb-2 opacity-40 blur-[8px] select-none">
                        <span className="text-[10px] uppercase font-bold text-primary tracking-widest">Coupon Code</span>
                        <div className="text-2xl font-black text-card-foreground tracking-widest">XXXXX-XXXXX-XX</div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-card/90 px-3 py-1 rounded border border-border flex items-center gap-2 shadow-xl">
                          <Shield className="w-3 h-3 text-primary" />
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">LOCKED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Main Button */}
              {status !== "platform" && (
                <div className="mt-2">
                  <Button
                    onClick={handleProceed}
                    disabled={status === "verifying"}
                    className={`w-full py-6 font-black uppercase tracking-widest text-sm transition-all duration-300 ${status === "ready"
                      ? "bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 shadow-lg shadow-amber-500/20"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      }`}
                    style={{ borderRadius: '6px' }}
                  >
                    {status === "info" ? "Show Coupon Code" : status === "ready" ? "Get Full Code" : "Processing..."}
                  </Button>

                  {status === "ready" && (
                    <div className="text-center mt-4 space-y-2 animate-in slide-in-from-bottom-2 fade-in duration-500">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Rate this coupon</p>
                      <div className="flex justify-center gap-4">
                        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-green-400 transition-colors">
                          <span className="text-sm">👍</span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-red-400 transition-colors">
                          <span className="text-sm">👎</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyGenerationModal;
