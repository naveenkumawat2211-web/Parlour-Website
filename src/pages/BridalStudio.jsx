import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ChevronDown,
  Check,
  Star,
  Award,
  ShieldCheck,
  HeartHandshake,
  Hourglass,
  Palette,
  Gem,
  Camera,
} from "lucide-react";
import { getSalon } from "../utils/storage";

export default function BridalPackages() {
  const salon = getSalon();
  const whatsappNumber = salon.whatsapp || "917597386371";
  const phoneNumber = salon.phone || "7597386371";

  // FAQ State for Dropdown toggles
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: `How far in advance should I book my bridal makeup artist in ${salon.city}?`,
      a: "We recommend booking at least 2 to 3 months in advance, especially during peak wedding seasons, to secure your preferred dates and schedule your trial session.",
    },
    {
      q: "What is included in a bridal trial session?",
      a: "The trial session includes a complete makeup and hair preview tailored to your wedding outfits, skin analysis, and discussion on jewelry and overall look finalization.",
    },
    {
      q: "Do you offer home or venue visits for bridal makeup?",
      a: "Yes, our professional artists are available for venue and home visits upon special request to ensure you have a stress-free experience on your big day.",
    },
    {
      q: "What makeup brands do you use for bridal services?",
      a: "We use 100% genuine, top-tier international luxury brands (such as MAC, Huda Beauty, Bobbi Brown, NARS, and Kryolan) that ensure skin safety, high-definition finish, and long-lasting wear.",
    },
    {
      q: "Can you do makeup for the bridal party — bridesmaids, mother of the bride, etc.?",
      a: "Absolutely! We have dedicated packages and team members to style bridesmaids, family members, and guests with matching elegance.",
    },
    {
      q: "How long does bridal makeup take on the wedding day?",
      a: "Typically, a complete bridal makeup and hairstyling session takes around 2.5 to 3 hours. We arrive well in advance to keep your morning calm and unhurried.",
    },
  ];

  const looks = [
    {
      title: "Classic Traditional Bride",
      category: "TRADITIONAL",
      img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Soft HD Bridal Glow",
      category: "MODERN GLAM",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Skincare-First Natural Bride",
      category: "DEWY & NATURAL",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Bold Evening Glamour",
      category: "RECEPTION",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1c0d0d] text-[#f5ebe6] selection:bg-[#d4a373] selection:text-[#1c0d0d]">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 px-4 md:px-12 bg-gradient-to-b from-[#261414] to-[#1c0d0d] border-b border-[#3d2323] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#d4a373] font-medium block mb-3">
              • BRIDAL MAKEUP ARTIST • {salon.city.toUpperCase()} •
            </span>
            <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-6 leading-tight">
              Your Wedding Day Deserves Extraordinary Beauty
            </h1>
            <p className="text-xs md:text-sm text-[#c4b0aa] mb-8 leading-relaxed max-w-xl">
              At {salon.name}, we believe every bride carries her own kind of
              radiance. Our bridal makeup artists bring out that singular beauty
              — with precision, artistry, and makeup that photographs flawlessly
              and stays all day long.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/book"
                className="px-8 py-3.5 rounded-full bg-[#e0b86b] text-[#1c0d0d] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#ecc77e] transition shadow-lg flex items-center gap-2"
              >
                Book a Trial Session
              </Link>
              <a
                href="#packages-section"
                className="px-8 py-3.5 rounded-full border border-[#3d2323] text-white font-semibold text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition"
              >
                View Bridal Packages
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#3d2323]/80">
              <div>
                <h4 className="text-2xl font-serif text-white">5.0</h4>
                <span className="text-[10px] tracking-wider text-[#d4a373] flex items-center gap-1 mt-1">
                  <Star size={12} fill="#d4a373" /> GOOGLE RATING
                </span>
              </div>
              <div>
                <h4 className="text-2xl font-serif text-white">3+</h4>
                <span className="text-[10px] tracking-wider text-[#c4b0aa] mt-1 block">
                  YRS EXPERIENCE
                </span>
              </div>
              <div>
                <h4 className="text-2xl font-serif text-white">100%</h4>
                <span className="text-[10px] tracking-wider text-[#c4b0aa] mt-1 block">
                  PREMIUM PRODUCTS
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md h-[450px] rounded-3xl overflow-hidden border border-[#3d2323] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                alt="Bridal Look"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c0d0d]/80 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TOP INFO BAR */}
      <div className="border-b border-[#3d2323] bg-[#170a0a] py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[#c4b0aa]">
          <div className="flex items-center justify-center gap-2.5">
            <Sparkles size={16} className="text-[#d4a373]" />
            <span className="text-white font-medium">Bridal Specialist</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Clock size={16} className="text-[#d4a373]" />
            <span>
              Open <b className="text-white">10 AM – 8 PM</b> | All Days
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-center">
            <MapPin size={16} className="text-[#d4a373]" />
            <span className="truncate max-w-[220px]">{salon.city}</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Phone size={16} className="text-[#d4a373]" />
            <a
              href={`tel:${phoneNumber}`}
              className="text-white font-medium hover:text-[#d4a373] transition"
            >
              {phoneNumber}
            </a>
          </div>
        </div>
      </div>

      {/* 3. WHY BRIDES CHOOSE US (Features Grid) */}
      <section className="py-24 px-4 md:px-12 bg-[#fffaf5] text-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a373] font-semibold">
              — WHY BRIDES CHOOSE US —
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-[#1c0d0d] mt-2 mb-4">
              More Than Makeup — A Bridal Experience
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              We understand that your wedding day is unlike any other. That's
              why every bridal service at {salon.name} is crafted around your
              comfort, your vision, and the looks that truly represent you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-[#d4a373]/10 rounded-xl flex items-center justify-center text-[#d4a373] mb-6">
                <Palette size={24} />
              </div>
              <h3 className="text-xl font-serif text-[#1c0d0d] mb-3">
                Customised Bridal Looks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No two brides are alike. We begin with a thorough consultation
                to understand your style, outfit colours, venue lighting, and
                personal preferences — and then create a look uniquely yours.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-[#d4a373]/10 rounded-xl flex items-center justify-center text-[#d4a373] mb-6">
                <Gem size={24} />
              </div>
              <h3 className="text-xl font-serif text-[#1c0d0d] mb-3">
                Premium, Skin-Safe Products
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We use only top-tier, internationally trusted makeup brands. Our
                formulas are chosen for longevity, skin safety, and
                photo-readiness — so you glow from the mandap to the vidaai.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-[#d4a373]/10 rounded-xl flex items-center justify-center text-[#d4a373] mb-6">
                <Camera size={24} />
              </div>
              <h3 className="text-xl font-serif text-[#1c0d0d] mb-3">
                HD & Airbrush Ready
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our artists are trained in HD and airbrush techniques that look
                stunning in natural light, flash photography, and videography —
                because your memories deserve to look perfect.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-[#d4a373]/10 rounded-xl flex items-center justify-center text-[#d4a373] mb-6">
                <Hourglass size={24} />
              </div>
              <h3 className="text-xl font-serif text-[#1c0d0d] mb-3">
                All-Day Staying Power
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setting sprays, primers, and long-wear formulas ensure your
                bridal look stays fresh and vibrant from morning ceremonies
                through the late-night celebrations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-[#d4a373]/10 rounded-xl flex items-center justify-center text-[#d4a373] mb-6">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-xl font-serif text-[#1c0d0d] mb-3">
                Bridal Trial Included
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We offer a dedicated pre-wedding trial session so you walk into
                your wedding day with complete confidence, knowing exactly how
                you'll look — no surprises.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-[#d4a373]/10 rounded-xl flex items-center justify-center text-[#d4a373] mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-serif text-[#1c0d0d] mb-3">
                Conveniently Located
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Situated in the heart of {salon.city}, we're easily accessible.
                Ample parking and a calm, private studio setting make your visit
                relaxed and unhurried.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHOOSE YOUR BRIDAL PACKAGE (Pricing Cards) */}
      <section
        id="packages-section"
        className="py-24 px-4 md:px-12 bg-[#1c0d0d]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a373]">
              — BRIDAL PACKAGES —
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-white mt-2 mb-4">
              Choose Your Bridal Package
            </h2>
            <p className="text-xs md:text-sm text-[#c4b0aa]">
              Each package is thoughtfully designed to cover every stage of your
              wedding journey — from your first shagun to the grand reception.
              Enquire via WhatsApp for exact pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1: Starter */}
            <div className="bg-[#261414] border border-[#3d2323] p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#d4a373] block mb-2">
                  STARTER PACKAGE
                </span>
                <h3 className="text-2xl font-serif text-white mb-1">
                  Pehli Nazar
                </h3>
                <p className="text-xs text-[#c4b0aa] italic mb-8">
                  Elegant simplicity for intimate ceremonies
                </p>

                <ul className="space-y-4 text-xs text-[#f5ebe6] mb-8">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span>{" "}
                    Professional bridal makeup (1 event)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Natural
                    / dewy skin prep & primer
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Eye
                    makeup + lash application
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Lips,
                    contouring & highlight
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Setting
                    spray for all-day hold
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Includes
                    basic hair styling
                  </li>
                </ul>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello " + salon.name + ", I am interested in the Pehli Nazar Bridal Package.")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-[#3d2323] text-white font-semibold text-xs tracking-widest uppercase text-center hover:bg-[#d4a373] hover:text-[#1c0d0d] transition"
              >
                Enquire on WhatsApp
              </a>
            </div>

            {/* Card 2: Most Popular */}
            <div className="bg-[#2a1717] border-2 border-[#d4a373] p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#d4a373] text-[#1c0d0d] text-[10px] font-bold tracking-widest px-4 py-1 rounded-full uppercase shadow">
                ★ Most Popular
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#d4a373] block mb-2">
                  SIGNATURE PACKAGE
                </span>
                <h3 className="text-2xl font-serif text-white mb-1">
                  Shaadi Sitara
                </h3>
                <p className="text-xs text-[#c4b0aa] italic mb-8">
                  Full-day bridal glam for your big day
                </p>

                <ul className="space-y-4 text-xs text-[#f5ebe6] mb-8">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> HD /
                    Airbrush bridal makeup
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Skin
                    prep, primer & custom base
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Detailed
                    eye design + drama lashes
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Contour,
                    blush, highlight & setting
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Bridal
                    hair styling (bun / braid / open)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Dupatta
                    / veil draping assistance
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Touch-up
                    kit for the day
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> 1
                    pre-wedding trial session included
                  </li>
                </ul>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello " + salon.name + ", I am interested in the Shaadi Sitara Bridal Package.")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-[#e0b86b] text-[#1c0d0d] font-semibold text-xs tracking-widest uppercase text-center hover:bg-[#ecc77e] transition shadow-lg"
              >
                Enquire on WhatsApp
              </a>
            </div>

            {/* Card 3: Complete Package */}
            <div className="bg-[#261414] border border-[#3d2323] p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#d4a373] block mb-2">
                  COMPLETE PACKAGE
                </span>
                <h3 className="text-2xl font-serif text-white mb-1">
                  Dulhan Diaries
                </h3>
                <p className="text-xs text-[#c4b0aa] italic mb-8">
                  End-to-end bridal beauty, start to finish
                </p>

                <ul className="space-y-4 text-xs text-[#f5ebe6] mb-8">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Makeup
                    for 3 events (mehendi / sangeet / wedding)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> HD
                    Airbrush base + skin treatment prep
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Hair
                    styling for each event
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> Saree /
                    lehenga draping
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span>{" "}
                    Jewellery & accessories styling guidance
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span>{" "}
                    Reception / after-party look
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span>{" "}
                    Dedicated artist for the full wedding day
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#d4a373] font-bold">✦</span> 2 trial
                    sessions + unlimited consultation
                  </li>
                </ul>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello " + salon.name + ", I am interested in the Dulhan Diaries Complete Package.")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-[#3d2323] text-white font-semibold text-xs tracking-widest uppercase text-center hover:bg-[#d4a373] hover:text-[#1c0d0d] transition"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOOKS WE CREATE (Gallery Grid) */}
      <section className="py-24 px-4 md:px-12 bg-[#fffaf5] text-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a373] font-semibold">
              — BRIDAL STYLES —
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-[#1c0d0d] mt-2 mb-4">
              Looks We Create
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              Whether you envision regal tradition, a dreamy soft-glam finish,
              or a bold contemporary statement — our artists are skilled across
              every bridal aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {looks.map((item, idx) => (
              <div
                key={idx}
                className="relative h-96 rounded-2xl overflow-hidden shadow-xl group"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c0d0d] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] tracking-widest uppercase text-[#d4a373] block mb-1 font-semibold">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-serif">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (Step by Step Journey) */}
      <section className="py-24 px-4 md:px-12 bg-[#1c0d0d] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4a373]">
            — HOW IT WORKS —
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic mt-2 mb-4">
            Your Bridal Journey Step by Step
          </h2>
          <p className="text-xs md:text-sm text-[#c4b0aa] max-w-xl mx-auto mb-16">
            We've designed a simple, stress-free process so you can focus on
            celebrating — and leave all the beauty planning to us.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="bg-[#261414] border border-[#3d2323] p-8 rounded-2xl relative">
              <span className="text-4xl font-serif text-[#d4a373]/40 absolute top-4 right-6">
                01
              </span>
              <h4 className="text-lg font-serif text-white mb-2 mt-4">
                Consultation
              </h4>
              <p className="text-xs text-[#c4b0aa] leading-relaxed">
                Reach out via WhatsApp or call. Share your wedding date,
                outfits, and vision so we can plan the perfect look for you.
              </p>
            </div>

            <div className="bg-[#261414] border border-[#3d2323] p-8 rounded-2xl relative">
              <span className="text-4xl font-serif text-[#d4a373]/40 absolute top-4 right-6">
                02
              </span>
              <h4 className="text-lg font-serif text-white mb-2 mt-4">
                Trial Session
              </h4>
              <p className="text-xs text-[#c4b0aa] leading-relaxed">
                We meet at our studio 2-4 weeks before the wedding. We test
                products, refine the look, and ensure every detail is perfect.
              </p>
            </div>

            <div className="bg-[#261414] border border-[#3d2323] p-8 rounded-2xl relative">
              <span className="text-4xl font-serif text-[#d4a373]/40 absolute top-4 right-6">
                03
              </span>
              <h4 className="text-lg font-serif text-white mb-2 mt-4">
                Wedding Day
              </h4>
              <p className="text-xs text-[#c4b0aa] leading-relaxed">
                Your dedicated artist arrives on time with all supplies. We
                create your look efficiently and calmly, so your morning stays
                relaxed.
              </p>
            </div>

            <div className="bg-[#261414] border border-[#3d2323] p-8 rounded-2xl relative">
              <span className="text-4xl font-serif text-[#d4a373]/40 absolute top-4 right-6">
                04
              </span>
              <h4 className="text-lg font-serif text-white mb-2 mt-4">
                All-Day Glow
              </h4>
              <p className="text-xs text-[#c4b0aa] leading-relaxed">
                We send you off with a touch-up kit and tips to maintain your
                look through every ceremony, photograph, and dance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL WORDS FROM REAL BRIDES (Testimonials) */}
      <section className="py-24 px-4 md:px-12 bg-[#fffaf5] text-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a373] font-semibold">
              — BRIDES LOVE US —
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-[#1c0d0d] mt-2 mb-4">
              Real Words from Real Brides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 italic">
                  "I was so nervous about my bridal look, but the team at{" "}
                  {salon.name} made the entire experience so comfortable. My
                  makeup stayed perfect from the morning pheras all the way
                  through the evening reception — everyone kept complimenting
                  me!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#d4a373]/20 flex items-center justify-center font-bold text-[#d4a373]">
                  PS
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-[#1c0d0d]">
                    Priya Sharma
                  </h5>
                  <span className="text-[10px] text-slate-500">
                    Bride • {salon.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 italic">
                  "The trial session was the best decision I made for my
                  wedding. They understood my skin tone perfectly and created a
                  look that was traditional yet so fresh. My wedding photos are
                  absolutely stunning — I can't stop looking at them!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#d4a373]/20 flex items-center justify-center font-bold text-[#d4a373]">
                  MG
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-[#1c0d0d]">
                    Meenakshi Gupta
                  </h5>
                  <span className="text-[10px] text-slate-500">
                    Bride • {salon.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 italic">
                  "Booked the full Dulhan Diaries package for my mehendi,
                  sangeet, and wedding — each look was completely different and
                  perfect for the occasion. So glad I found {salon.name}! Highly
                  recommend to every bride."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#d4a373]/20 flex items-center justify-center font-bold text-[#d4a373]">
                  AV
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-[#1c0d0d]">
                    Ankita Verma
                  </h5>
                  <span className="text-[10px] text-slate-500">
                    Bride • {salon.city}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ Accordions) */}
      <section className="py-24 px-4 md:px-12 bg-[#1c0d0d] text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a373]">
              — COMMON QUESTIONS —
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#261414] border border-[#3d2323] rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-serif text-lg text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#d4a373] transform transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-6 text-xs md:text-sm text-[#c4b0aa] leading-relaxed border-t border-[#3d2323]/50 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. READY TO LOOK UNFORGETTABLE (CTA Banner) */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#2a1717] via-[#1c0d0d] to-[#2a1717] border-y border-[#3d2323] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-4">
            Ready to Look Unforgettable on Your Wedding Day?
          </h2>
          <p className="text-xs md:text-sm text-[#c4b0aa] mb-8">
            Book your bridal consultation with {salon.name} in {salon.city}{" "}
            today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phoneNumber}`}
              className="px-8 py-3.5 rounded-full bg-white text-[#1c0d0d] font-semibold text-xs tracking-widest uppercase hover:bg-[#f5ebe6] transition flex items-center gap-2 shadow-lg"
            >
              <Phone size={16} /> Call {phoneNumber}
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello " + salon.name + ", I want to book my bridal consultation.")}`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#22c55e] text-white font-semibold text-xs tracking-widest uppercase hover:bg-[#16a34a] transition flex items-center gap-2 shadow-lg"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* 10. VISIT OUR STUDIO (Map & Details Section) */}
      <section className="py-24 px-4 md:px-12 bg-[#fffaf5] text-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a373] font-semibold">
              — FIND US —
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-[#1c0d0d] mt-2 mb-6">
              Visit Our Studio in {salon.city}
            </h2>
            <p className="text-sm font-medium text-[#1c0d0d] mb-4">
              {salon.name} — Where Brides Come to Shine
            </p>

            <div className="space-y-4 text-xs text-slate-600 mb-8">
              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-[#d4a373] shrink-0" />
                <span>Shop No. 16, Main Market, {salon.city}, Rajasthan</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock size={16} className="text-[#d4a373] shrink-0" />
                <span>Open every day, 10:00 AM – 8:00 PM</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-[#d4a373] shrink-0" />
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-[#1c0d0d] font-semibold hover:underline"
                >
                  {phoneNumber} — Call to book or enquire
                </a>
              </p>
              <p className="flex items-center gap-3">
                <MessageCircle size={16} className="text-[#d4a373] shrink-0" />
                <span>
                  WhatsApp us for package details, availability & quotes
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${phoneNumber}`}
                className="px-6 py-3 rounded-full bg-[#d4a373] text-[#1c0d0d] font-semibold text-xs tracking-wider uppercase hover:bg-[#c29265] transition shadow"
              >
                Call Now — {phoneNumber}
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello " + salon.name + ", I would like to visit your studio.")}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-[#22c55e] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#16a34a] transition shadow flex items-center gap-2"
              >
                <MessageCircle size={16} /> Message on WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100">
            <div className="w-full h-[350px] rounded-2xl overflow-hidden bg-slate-100 relative">
              <iframe
                title="Khushi Beauty Parlour - Gudha Gorji Location"
                src="https://maps.google.com/maps?q=Gudha%20Gorji,%20Jhunjhunu,%20Rajasthan&t=k&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
