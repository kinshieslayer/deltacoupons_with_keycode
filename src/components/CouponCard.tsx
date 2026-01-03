import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Coupon } from "@/data/coupons";
import KeyGenerationModal from "./KeyGenerationModal";

interface CouponCardProps {
  coupon: Coupon;
  index: number;
}

const CouponCard = ({ coupon, index }: CouponCardProps) => {
  const [showKeyModal, setShowKeyModal] = useState(false);

  const handleShowCode = () => {
    setShowKeyModal(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group bg-card border border-border overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
        style={{ borderRadius: '4px' }}
      >
        {/* Card Image Area */}
        <div className="relative h-24 sm:h-32 overflow-hidden bg-muted">
          {coupon.background_file ? (
            <img
              src={`/assets/${coupon.background_file}`}
              alt={coupon.item_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-muted-foreground/50" />
            </div>
          )}

          {/* Discount Badge */}
          <div className="absolute top-2 right-2">
            <span className="px-1.5 py-0.5 text-[10px] font-black rounded-sm bg-primary text-primary-foreground uppercase tracking-tighter">
              {coupon.discount}
            </span>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        </div>

        {/* Card Content */}
        <div className="p-3 flex-1 flex flex-col">
          <div className="mb-3">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block mb-0.5">
              {coupon.category}
            </span>
            <h3 className="font-bold text-card-foreground text-sm sm:text-base leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {coupon.item_name}
            </h3>
          </div>

          <div className="mt-auto">
            <button
              onClick={handleShowCode}
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-black text-[11px] h-9 uppercase tracking-widest transition-colors"
              style={{ borderRadius: '4px' }}
            >
              Show Code
            </button>

            <div className="flex items-center justify-between mt-2.5 px-0.5">
              {coupon.verified ? (
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-2.5 h-2.5 text-green-500" />
                  <span className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">Verified</span>
                </div>
              ) : <div />}
              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-tighter">
                EXP: {coupon.expires.split(',')[0]}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <KeyGenerationModal
        open={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        gameName={coupon.item_name}
        multiPlatform={coupon.multi_platform}
        platforms={coupon.platforms}
        description={coupon.description}
        backgroundImage={coupon.background_file}
        icon={coupon.icon}
        externalUrl={coupon.external_url}
      />
    </>
  );
};

export default CouponCard;
