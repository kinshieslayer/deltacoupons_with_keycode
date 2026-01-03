import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Gamepad2, ArrowRight } from "lucide-react";
import { coupons } from "@/data/coupons";
import KeyGenerationModal from "./KeyGenerationModal";

const NewestCouponsSidebar = () => {
  const newestCoupons = coupons.slice(0, 5);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<typeof coupons[0] | null>(null);

  const handleCouponClick = (coupon: typeof coupons[0]) => {
    setSelectedCoupon(coupon);
    setShowKeyModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border p-5 rounded"
      style={{ borderRadius: '4px' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recent Drops</h3>
        </div>
        <div className="h-px flex-1 bg-border ml-4" />
      </div>

      <div className="space-y-4">
        {newestCoupons.map((coupon, i) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleCouponClick(coupon)}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded border border-border bg-muted overflow-hidden flex-shrink-0 relative">
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors z-10" />
              {coupon.icon ? (
                <img
                  src={`/assets/${coupon.icon}`}
                  alt={coupon.item_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : coupon.background_file ? (
                <img
                  src={`/assets/${coupon.background_file}`}
                  alt={coupon.item_name}
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-card-foreground truncate group-hover:text-primary transition-colors uppercase tracking-tight">
                {coupon.item_name}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black text-primary">{coupon.discount}</span>
                <span className="text-[10px] text-muted-foreground">•</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">{coupon.category.split(' ')[0]}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedCoupon && (
        <KeyGenerationModal
          open={showKeyModal}
          onClose={() => setShowKeyModal(false)}
          gameName={selectedCoupon.item_name}
          multiPlatform={selectedCoupon.multi_platform}
          platforms={selectedCoupon.platforms}
          description={selectedCoupon.description}
          backgroundImage={selectedCoupon.background_file}
          icon={selectedCoupon.icon}
          externalUrl={selectedCoupon.external_url}
        />
      )}
    </motion.div>
  );
};

export default NewestCouponsSidebar;
