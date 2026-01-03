import { motion } from "framer-motion";
import { Clock, Gamepad2 } from "lucide-react";
import { coupons } from "@/data/coupons";

const NewestCouponsSidebar = () => {
  const newestCoupons = coupons.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-xl p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-foreground">Newest Coupons</h3>
      </div>

      <div className="space-y-3">
        {newestCoupons.map((coupon, i) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
              <Gamepad2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {coupon.item_name}
              </p>
              <p className="text-xs text-muted-foreground">{coupon.discount}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-primary hover:underline">
        View All →
      </button>
    </motion.div>
  );
};

export default NewestCouponsSidebar;
