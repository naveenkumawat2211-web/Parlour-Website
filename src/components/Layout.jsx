import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  CalendarCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { getSalon } from "../utils/storage";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Packages", "/packages"],
  ["Our Team", "/team"],
  ["Book Appointment", "/book"],
];

// WhatsApp Floating Button (Sabse Neeche - Right Side)
export function WhatsAppButton() {
  const salon = getSalon();
  const msg = encodeURIComponent(
    `Hello ${salon.name}, I would like to enquire about your salon services and appointment availability.`,
  );
  return (
    <a
      className="whatsapp-float fixed bottom-6 right-6 z-50 bg-green-600 text-white p-3.5 rounded-full shadow-2xl hover:bg-green-500 transition flex items-center justify-center"
      href={`https://wa.me/${salon.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}

// My Bookings Floating Button (Mobile me WhatsApp ke upar dikhega, Desktop me hidden rahega)
export function MobileMyBookingsFloat() {
  return (
    <Link
      to="/my-bookings"
      className="md:hidden fixed bottom-20 right-6 z-50 bg-[#e0b86b] text-[#1c0d0d] p-3.5 rounded-full shadow-2xl hover:bg-[#ecc77e] transition flex items-center justify-center font-semibold"
      title="View My Bookings"
      aria-label="My Bookings"
    >
      <CalendarCheck size={26} />
    </Link>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const salon = getSalon();

  return (
    <div className="min-h-screen bg-cream text-slate-800 relative">
      <div className="top-strip px-4 py-2 flex justify-between items-center text-xs">
        <span className="flex items-center gap-1">
          <MapPin size={13} /> {salon.city}
        </span>
        <a href={`tel:${salon.phone}`} className="flex items-center gap-1">
          <Phone size={13} /> {salon.phone}
        </a>
      </div>

      <header className="site-header px-4 md:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="brand flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark p-2 bg-[#d4a373]/20 rounded-lg">
            <Scissors size={23} />
          </span>
          <span className="flex flex-col">
            <b className="text-base md:text-lg leading-tight">{salon.name}</b>
            <small className="text-[10px] tracking-widest text-slate-500">
              BEAUTY • CARE • CONFIDENCE
            </small>
          </span>
        </Link>

        <nav
          className={
            open
              ? "nav-links nav-open"
              : "nav-links hidden md:flex items-center gap-6"
          }
        >
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "nav-active font-medium text-[#d4a373]"
                  : "hover:text-[#d4a373] transition"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA & My Bookings Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/book"
            className="button button-dark header-cta px-5 py-2.5 rounded-full bg-[#1c0d0d] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition"
          >
            Book Now
          </Link>
          <Link
            to="/my-bookings"
            className="button button-rose flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#3d2323]/20 text-xs font-semibold tracking-wider uppercase hover:shadow-md transition"
          >
            <CalendarCheck size={18} />
            <span>My Bookings</span>
          </Link>
        </div>

        <button
          className="mobile-menu md:hidden p-2 text-slate-800 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
      >
        <Outlet />
      </motion.main>

      <footer className="footer bg-[#1c0d0d] text-[#f5ebe6] px-6 py-12 mt-16">
        <div className="footer-main max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="brand footer-brand flex items-center gap-2 mb-4">
              <span className="brand-mark p-2 bg-[#d4a373]/20 rounded-lg">
                <Scissors size={20} />
              </span>
              <span>
                <b className="text-base">{salon.name}</b>
                <small className="block text-[10px] tracking-widest text-slate-400">
                  BEAUTY • CARE • CONFIDENCE
                </small>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Beauty care and personal grooming in {salon.city}. Contact us to
              discuss services and appointments.
            </p>
          </div>
          <div className="flex flex-col space-y-2 text-xs ">
            <h4 className="font-semibold text-sm text-[#d4a373] uppercase tracking-wider mb-2">
              Explore
            </h4>
            <Link to="/about" className="hover:text-white transition">
              About us
            </Link>
            <Link to="/services" className="hover:text-white transition">
              Services
            </Link>
            <Link to="/packages" className="hover:text-white transition">
              Packages
            </Link>
            <Link to="/team" className="hover:text-white transition">
              Our team
            </Link>
            <Link to="/book" className="hover:text-white transition">
              Book appointment
            </Link>
          </div>
          <div className="flex flex-col space-y-2 text-xs">
            <h4 className="font-semibold text-sm text-[#d4a373] uppercase tracking-wider mb-2">
              Contact
            </h4>
            <p className="flex items-center gap-2 text-slate-300">
              <MapPin size={15} /> {salon.city}
            </p>
            <a
              href={`tel:${salon.phone}`}
              className="flex items-center gap-2 text-slate-300 hover:text-white"
            >
              <Phone size={15} /> {salon.phone}
            </a>
            <a
              href={`https://wa.me/${salon.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white"
            >
              <MessageCircle size={15} /> WhatsApp us
            </a>
          </div>
        </div>
        <div className="footer-bottom text-center text-xs text-slate-400 border-t border-slate-800 mt-8 pt-6">
          © {new Date().getFullYear()} {salon.name}. All rights reserved.
        </div>
      </footer>

      {/* Floating Buttons: Mobile me WhatsApp ke upar My Bookings ka gol icon */}
      <MobileMyBookingsFloat />
      <WhatsAppButton />
    </div>
  );
}
