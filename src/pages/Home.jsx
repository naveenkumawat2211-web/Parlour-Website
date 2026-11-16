import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import { SectionHeading, ServiceCard } from "../components/UI";
import { getSalon, getServices } from "../utils/storage";

export default function Home() {
  const salon = getSalon();
  const services = getServices()
    .filter((s) => s.active)
    .slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="container hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">
              <Sparkles size={14} /> WELCOME TO {salon.name.toUpperCase()}
            </span>
            <h1>
              Feel beautiful.
              <br />
              <em>Feel confident.</em>
            </h1>
            <p className="hero-lead">
              A little time for yourself can make a beautiful difference.
              Discover beauty and personal-care services in {salon.city}.
            </p>
            <div className="hero-actions">
              <Link to="/book" className="button button-rose">
                Book an Appointment <ArrowRight size={17} />
              </Link>
              <Link to="/services" className="button button-outline">
                Explore Services
              </Link>
            </div>
            <div className="hero-trust">
              <span>
                <CheckCircle2 /> Personal care
              </span>
              <span>
                <Heart /> Feel-good experience
              </span>
            </div>
          </motion.div>
          <motion.div
            className="hero-art"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-photo">
              <div className="photo-overlay">
                <span>YOUR BEAUTY, OUR CARE</span>
                <b>Glow from within</b>
              </div>
            </div>
            <div className="floating-note">
              <Sparkles />
              <span>
                <b>Beauty starts here</b>
                <small>Make time for yourself</small>
              </span>
            </div>
            <div className="round-stamp">
              BEAUTY
              <br />& CARE
            </div>
          </motion.div>
        </div>
      </section>
      <section className="quick-info container">
        <div>
          <span className="quick-icon">
            <MapPin />
          </span>
          <span>
            <b>Visit our salon</b>
            <small>{salon.city}</small>
          </span>
        </div>
        <div>
          <span className="quick-icon">
            <CalendarCheck />
          </span>
          <span>
            <b>Appointments</b>
            <small>Contact us to book a visit</small>
          </span>
        </div>
        <div>
          <span className="quick-icon">
            <Heart />
          </span>
          <span>
            <b>Personal care</b>
            <small>Services for your needs</small>
          </span>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="Care that makes you feel special"
          description="Explore our beauty, hair and grooming services. Contact the salon for current pricing and availability."
        />
        <div className="service-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
        <div className="center-action">
          <Link className="button button-dark" to="/services">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="about-band">
        <div className="container about-band-grid">
          <div className="about-art">
            <span className="leaf-circle">K</span>
            <div className="about-art-caption">
              A moment
              <br />
              just for you
            </div>
          </div>
          <div>
            <span className="eyebrow">ABOUT {salon.name.toUpperCase()}</span>
            <h2>
              Beauty is personal.
              <br />
              <em>Your care should be too.</em>
            </h2>
            <p>
              At {salon.name}, we believe that self-care is an important part of
              feeling confident. Our team is here to help you choose services
              that suit your preferences.
            </p>
            <Link to="/about" className="text-link">
              Know more about us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="READY WHEN YOU ARE"
          title="Your self-care appointment awaits"
          description="Tell us which service you are interested in and request a convenient appointment time."
        />
        <div className="booking-cta">
          <div>
            <h3>Let's plan your salon visit.</h3>
            <p>Book online or message us directly on WhatsApp.</p>
          </div>
          <Link to="/book" className="button button-light">
            Book Appointment <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
