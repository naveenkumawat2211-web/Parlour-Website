import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Clock, MapPin, Phone } from "lucide-react";
import { getSalon } from "../utils/storage";

export default function BridalPackages() {
  const salon = getSalon();

  return (
    <div className="min-h-[85vh] bg-[#1c0d0d] text-[#f5ebe6] flex flex-col justify-between relative overflow-hidden">
      {/* Main Hero Banner Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow Text */}
          <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#d4a373] font-medium mb-4">
            • BRIDAL PACKAGES •
          </span>

          {/* Main Italic Heading */}
          <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-7 tracking-wide">
            Special Bridal Packages
          </h1>

          {/* Pill Outline Button -> Redirects to /packages */}
          <Link
            to="/bridal-studio"
            className="px-9 py-3 rounded-full border border-[#d4a373]/70 text-[#f5ebe6] hover:bg-[#d4a373] hover:text-[#1c0d0d] text-xs tracking-[0.2em] uppercase font-medium transition duration-300 mb-10 shadow-lg"
          >
            View Packages
          </Link>

          {/* Description Paragraph */}
          <p className="text-xs md:text-sm text-[#c4b0aa] max-w-2xl leading-relaxed font-light">
            At {salon.name || "Khushi Beauty Parlour"}, we believe every bride
            carries her own kind of radiance. Our bridal makeup artists in{" "}
            {salon.city || "Gudha Gorji, Jhunjhunu"} bring out that singular
            beauty — with precision, artistry, and makeup that photographs
            flawlessly and stays all day long.
          </p>
        </motion.div>
      </div>

      {/* Bottom 4-Column Info Strip (Exact match to screenshot) */}
      <div className="border-t border-[#3d2323]/70 bg-[#170a0a]/60 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[#c4b0aa]">
          {/* Item 1: Bridal Specialist */}
          <div className="flex items-center justify-center gap-2.5">
            <Sparkles size={16} className="text-[#d4a373] shrink-0" />
            <span className="font-medium text-white/90">Bridal Specialist</span>
          </div>

          {/* Item 2: Open Timing */}
          <div className="flex items-center justify-center gap-2.5">
            <Clock size={16} className="text-[#d4a373] shrink-0" />
            <span>
              Open <b className="text-white/90 font-semibold">10 AM – 8 PM</b> |
              All Days
            </span>
          </div>

          {/* Item 3: Location */}
          <div className="flex items-center justify-center gap-2.5 text-center">
            <MapPin size={16} className="text-[#d4a373] shrink-0" />
            <span className="truncate max-w-[200px]" title={salon.city}>
              {salon.city || "Gudha Gorji, Jhunjhunu"}
            </span>
          </div>

          {/* Item 4: Phone Number */}
          <div className="flex items-center justify-center gap-2.5">
            <Phone size={16} className="text-[#d4a373] shrink-0" />
            <a
              href={`tel:${salon.phone}`}
              className="text-white/90 font-medium hover:text-[#d4a373] transition"
            >
              {salon.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
