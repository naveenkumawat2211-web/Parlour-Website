import React from "react";

const packagesData = [
  {
    id: "basic-glow",
    badge: "BASIC GLOW PACKAGE",
    price: "1,299",
    originalPrice: "1,590",
    subtitle: "EVERYDAY ESSENTIALS & REFRESH",
    featured: false,
    services: [
      "Fruit Facial (₹500)",
      "Face Bleach (₹250)",
      "Eyebrow Threading (₹40)",
      "Basic Haircut (₹250)",
      "Half Hands + Half Legs Waxing (₹350)",
      "Underarms Waxing (₹100)",
    ],
  },
  {
    id: "signature-pamper",
    badge: "★ SIGNATURE PAMPER PACKAGE",
    price: "2,299",
    originalPrice: "2,740",
    subtitle: "COMPLETE SALON LUXURY EXPERIENCE",
    featured: true,
    services: [
      "Gold Facial / Special Facial (₹700)",
      "Face Bleach (₹250)",
      "U / Step / Feather Haircut (₹350)",
      "Deluxe Manicure (₹350)",
      "Deluxe Pedicure (₹450)",
      "Half Hands + Half Legs Waxing (₹350)",
      "Underarms Waxing (₹100)",
      "Eyebrow Threading (₹40)",
    ],
  },
  {
    id: "royal-radiance",
    badge: "ROYAL RADIANCE COMBO",
    price: "2,699",
    originalPrice: "3,190",
    subtitle: "PARTY & OCCASION READY GLOW",
    featured: false,
    services: [
      "Pearl Facial (₹800)",
      "Special Glow Facial (₹700)",
      "Face Bleach (₹250)",
      "U / Step / Feather Haircut (₹350)",
      "Manicure + Pedicure Combo (₹800)",
      "Half Hands + Half Legs + Underarms Wax (₹450)",
      "Eyebrow Shaping (₹40)",
    ],
  },
];

export default function Packages() {
  // Apna WhatsApp number yahan dalein (country code 91 ke saath, bina + ke)
  const whatsappNumber = "917597386371";

  const handleWhatsAppBook = (pkg) => {
    const message = `Namaste Khushi Beauty Parlour! Mujhe aapka *${pkg.badge}* (₹${pkg.price}) book karna hai.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="min-h-screen bg-[#1c0d0de3] text-[#f5ebe6] py-16 px-4 sm:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Top Header Section */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.25em] uppercase text-[#d4a373] mb-3">
            ✦ SPECIAL PACKAGES ✦
          </p>
          <h1 className="text-4xl md:text-5xl font-serif italic text-[#fff8f3] mb-4">
            Beauty &amp; Care Packages
          </h1>
          <p className="text-sm md:text-base text-[#c4b0aa] max-w-xl mx-auto">
            Curated beauty &amp; grooming combos crafted from our signature
            salon services for your special occasions.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch ">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
          className={`rounded-2xl p-8 flex flex-col justify-between transition-transform duration-300 hover:border-[#d4a373]/60 hover:-translate-y-1 ${
                pkg.featured
                  ? "bg-[#2b1717]  border border-[#d4a373]/60 shadow-2xl shadow-black/50"
                  : "bg-[#261414] border border-[#3d2323]"
              }`}
            >
              <div>
                {/* Top Pill Badge */}
                <div className="mb-6 ">
                  <span
                    className={`inline-block text-[10px] tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full font-semibold ${
                      pkg.featured
                        ? "bg-[#4a3222] text-[#f3c677]"
                        : "bg-[#382121] text-[#d6b8b8]"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                </div>

                {/* Price & Subtitle */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl md:text-5xl font-serif text-white">
                      ₹{pkg.price}
                    </span>
                    <span className="text-sm line-through text-[#8c6d6d]">
                      ₹{pkg.originalPrice}
                    </span>
                  </div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#a88989] mt-2">
                    {pkg.subtitle}
                  </p>
                </div>

                {/* Services List */}
                <ul className="divide-y divide-[#3a2222] border-t border-b border-[#3a2222] my-6">
                  {pkg.services.map((service, idx) => (
                    <li
                      key={idx}
                      className="py-3 text-sm text-[#e8d8d5] flex items-center gap-2.5"
                    >
                      <span className="text-[#d4a373] text-xs">•</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA Button */}
              <button
                onClick={() => handleWhatsAppBook(pkg)}
                className={`w-full mt-4 py-3.5 px-6 rounded-full text-xs tracking-[0.18em] uppercase font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  pkg.featured
                    ? "bg-[#e0b86b] text-[#1c0d0d] hover:bg-[#ecc77e]"
                    : "bg-transparent border border-[#5e3b3b] text-[#f5ebe6] hover:bg-[#382121]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                WHATSAPP TO BOOK
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
