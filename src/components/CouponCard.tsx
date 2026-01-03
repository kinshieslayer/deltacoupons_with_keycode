import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Coupon } from "@/data/coupons";
import PlatformModal from "./PlatformModal";
import KeyGenerationModal from "./KeyGenerationModal";

interface CouponCardProps {
  coupon: Coupon;
  index: number;
}

const CouponCard = ({ coupon, index }: CouponCardProps) => {
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const handleShowCode = () => {
    if (coupon.multi_platform) {
      setShowPlatformModal(true);
    } else {
      setSelectedPlatform(coupon.platforms[0]);
      setShowKeyModal(true);
    }
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    setShowPlatformModal(false);
    setShowKeyModal(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group glass-card-hover rounded-xl overflow-hidden"
      >
        {/* Card Image/Background */}
        <div className="relative h-32 sm:h-40 bg-gradient-to-br from-card via-muted to-card overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Gamepad2 className="w-16 h-16 text-primary/20" />
          </div>
          
          {/* Discount Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-bold rounded-md bg-primary text-primary-foreground shadow-glow">
              {coupon.discount}
            </span>
          </div>

          {/* Verified Badge */}
          {coupon.verified && (
            <div className="absolute top-3 left-3 verified-badge">
              <CheckCircle className="w-3 h-3" />
              <span>Verified</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Card Content */}
        <div className="p-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {coupon.category}
          </span>
          <h3 className="font-semibold text-foreground mt-1 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {coupon.item_name}
          </h3>

          {/* Platforms */}
          <div className="flex flex-wrap gap-1 mb-3">
            {coupon.platforms.slice(0, 2).map((platform) => (
              <span
                key={platform}
                className="text-[10px] px-2 py-0.5 rounded bg-muted/50 text-muted-foreground"
              >
                {platform.split(" ")[0]}
              </span>
            ))}
            {coupon.platforms.length > 2 && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-muted/50 text-muted-foreground">
                +{coupon.platforms.length - 2}
              </span>
            )}
          </div>

          <Button
            onClick={handleShowCode}
            className="w-full btn-glow bg-accent-gradient text-primary-foreground font-medium text-sm"
          >
            Show Coupon Code
          </Button>

          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Expires: {coupon.expires}
          </p>
        </div>
      </motion.div>

      <PlatformModal
        open={showPlatformModal}
        onClose={() => setShowPlatformModal(false)}
        platforms={coupon.platforms}
        onSelect={handlePlatformSelect}
        gameName={coupon.item_name}
      />

      <KeyGenerationModal
        open={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        gameName={coupon.item_name}
        platform={selectedPlatform || ""}
      />
    </>
  );
};

export default CouponCard;
