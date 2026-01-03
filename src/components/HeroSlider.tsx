import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/coupons";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="relative w-full h-[220px] sm:h-[350px] lg:h-[450px] overflow-hidden bg-slate-950 border border-slate-800" style={{ borderRadius: '4px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          {(heroSlides[currentSlide] as any).image && (
            <div className="absolute inset-0">
              <img
                src={`/assets/${(heroSlides[currentSlide] as any).image}`}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover opacity-40 grayscale-[0.2]"
              />
            </div>
          )}

          {/* Solid Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container mx-auto px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-xl"
              >
                <div className="inline-block px-2 py-0.5 mb-3 text-[10px] font-black rounded-sm bg-amber-500 text-slate-950 tracking-tighter uppercase">
                  Featured Offer
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-2 text-white uppercase tracking-tight leading-none">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-sm sm:text-base text-slate-400 mb-6 font-medium max-w-md line-clamp-2">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <button
                  className="bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-black px-6 py-2.5 text-xs lg:text-sm uppercase tracking-widest transition-all cursor-pointer relative z-20"
                  style={{ borderRadius: '4px' }}
                >
                  {heroSlides[currentSlide].cta}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-20">
        <button
          onClick={prevSlide}
          className="w-9 h-9 rounded border border-slate-700 bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextSlide}
          className="w-9 h-9 rounded border border-slate-700 bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-6 flex gap-1.5 z-20">
        {heroSlides.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-300 ${i === currentSlide ? "w-8 bg-amber-500" : "w-2 bg-slate-700"
              }`}
            style={{ borderRadius: '1px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
