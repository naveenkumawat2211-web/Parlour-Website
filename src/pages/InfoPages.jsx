import { Link } from "react-router-dom";
import { PageHero, SectionHeading, ServiceCard } from "../components/UI";
import { getSalon, getServices, getStylists } from "../utils/storage";
import { MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";

export function About() {
  const salon = getSalon();
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title="A place for your self-care"
        text={`Welcome to ${salon.name}, your local beauty and personal-care destination in ${salon.city}.`}
      />
      <section className="section container split-section">
        <div className="about-art large">
          <span className="leaf-circle">K</span>
          <div className="about-art-caption">
            Beauty • Care
            <br />
            Confidence
          </div>
        </div>
        <div>
          <span className="eyebrow">HELLO, BEAUTIFUL</span>
          <h2>Feel good in your own skin.</h2>
          <p>
            {salon.name} is here to make beauty and grooming services easy to
            explore. Whether you are considering a facial, haircut, threading or
            nail care, contact us to discuss the right service for you.
          </p>
          <p>
            Our aim is to offer a welcoming experience and help every customer
            feel cared for.
          </p>
          <Link className="button button-dark" to="/book">
            Request an Appointment
          </Link>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="VISIT US"
            title="Come say hello"
            description="For exact directions and opening hours, please contact the salon before visiting."
          />
          <div className="contact-cards">
            <div>
              <MapPin />
              <b>Location</b>
              <span>{salon.city}</span>
            </div>
            <div>
              <Phone />
              <b>Call us</b>
              <a href={`tel:${salon.phone}`}>{salon.phone}</a>
            </div>
            <div>
              <MessageCircle />
              <b>WhatsApp</b>
              <a
                href={`https://wa.me/${salon.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                Send a message
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Services() {
  const services = getServices().filter((s) => s.active);
  const categories = ["All", ...new Set(services.map((s) => s.category))];
  const [category, setCategory] = React.useState("All");
  const shown =
    category === "All"
      ? services
      : services.filter((s) => s.category === category);
  return (
    <>
      <PageHero
        eyebrow="WHAT WE OFFER"
        title="Beauty & care services"
        text="Explore our salon services and contact us for current prices, products and appointment availability."
      />
      <section className="section container">
        <div className="filter-row">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "filter-chip active" : "filter-chip"}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="service-grid">
          {shown.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
        {!shown.length && (
          <p className="empty-state">No services in this category yet.</p>
        )}
      </section>
    </>
  );
}

import React from "react";
export function Team() {
  const stylists = getStylists();
  return (
    <>
      <PageHero
        eyebrow="MEET THE TEAM"
        title="People who care about your experience"
        text="Get in touch with our salon team to discuss your preferred service."
      />
      <section className="section container">
        <div className="team-grid">
          {stylists.map((person) => (
            <article className="team-card" key={person.id}>
              <div className="team-avatar">
                <Sparkles size={38} />
              </div>
              <span className="service-category">OUR TEAM</span>
              <h3>{person.name}</h3>
              <b>{person.role}</b>
              <p>{person.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
