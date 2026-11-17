import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Menu, MessageCircle, Phone, Scissors, ShieldCheck, X } from "lucide-react";
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

export function WhatsAppButton() {
  const salon = getSalon();
  const msg = encodeURIComponent(
    `Hello ${salon.name}, I would like to enquire about your salon services and appointment availability.`,
  );
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${salon.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={25} />
    </a>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const salon = getSalon();
  return (
    <div className="min-h-screen bg-cream text-slate-800">
      <div className="top-strip">
        <span>
          <MapPin size={13} /> {salon.city}
        </span>
        <a href={`tel:${salon.phone}`}>
          <Phone size={13} /> {salon.phone}
        </a>
      </div>
      <header className="site-header">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Scissors size={23} />
          </span>
          <span>
            <b>{salon.name}</b>
            <small>BEAUTY • CARE • CONFIDENCE</small>
          </span>
        </Link>
        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav-links nav-open" : "nav-links"}>
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "nav-active" : "")}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <Link to="/book" className="button button-dark header-cta">
          Book Now
        </Link>

        <Link
          to="/my-bookings"
          className="button button-rose flex items-center gap-2"
        >
          <ShieldCheck size={19} />
          <span> MY Bookings </span>
        </Link>
      </header>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
      >
        <Outlet />
      </motion.main>
      <footer className="footer">
        <div className="footer-main">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">
                <Scissors />
              </span>
              <span>
                <b>{salon.name}</b>
                <small>BEAUTY • CARE • CONFIDENCE</small>
              </span>
            </div>
            <p>
              Beauty care and personal grooming in {salon.city}. Contact us to
              discuss services and appointments.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/about">About us</Link>
            <Link to="/services">Services</Link>
            <Link
              to="/packages"
              className="hover:text-[#d4a373] transition-colors"
            >
              PACKAGES
            </Link>
            <Link to="/team">Our team</Link>
            <Link to="/book">Book appointment</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              <MapPin size={15} /> {salon.city}
            </p>
            <a href={`tel:${salon.phone}`}>
              <Phone size={15} /> {salon.phone}
            </a>
            <a
              href={`https://wa.me/${salon.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={15} /> WhatsApp us
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {salon.name}. All rights reserved.{" "}
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
