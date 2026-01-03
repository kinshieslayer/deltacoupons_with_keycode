import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Gamepad, Joystick } from "lucide-react";

interface PlatformModalProps {
  open: boolean;
  onClose: () => void;
  platforms: string[];
  onSelect: (platform: string) => void;
  gameName: string;
}

const platformIcons: Record<string, typeof Monitor> = {
  Steam: Monitor,
  "Xbox Series X|S": Gamepad,
  "PlayStation 5": Joystick,
};

const PlatformModal = ({ open, onClose, platforms, onSelect, gameName }: PlatformModalProps) => {
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
                  Select Platform
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose your platform for {gameName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Platform Options */}
            <div className="space-y-3">
              {platforms.map((platform) => {
                const Icon = platformIcons[platform] || Monitor;
                return (
                  <motion.button
                    key={platform}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(platform)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{platform}</p>
                      <p className="text-xs text-muted-foreground">Get code for this platform</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlatformModal;
