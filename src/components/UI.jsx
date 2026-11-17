import { motion } from "framer-motion";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";






const serviceImages = {
  "Special Facial":
    "https://images.unsplash.com/photo-1731355771317-b2ab72c79124?w=800",

  "Fruit Facial":
    "https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?w=800",

  "Gold Facial":
    "https://images.unsplash.com/photo-1761718209793-cb6d348831e0?w=800",

  "Pearl Facial":
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",

  Bleach: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800",

  Eyebrow: "https://images.unsplash.com/photo-1790244342917-b08f24662dde?w=800",

  Haircut: "https://images.unsplash.com/photo-1675034741473-afed58a142e8?w=800",

  "U/Step/Feather Cut":
    "https://cdn.shopify.com/s/files/1/0687/8134/3010/files/a_feather_cut.jpg?v=1756714143",

  Manicure:
    "https://images.unsplash.com/photo-1674691412909-8405f0a19940?w=800",

  Pedicure:
    "https://images.unsplash.com/photo-1707725238063-0c54fb6963d1?w=800",

  "Half Hands + Half Legs":
    "https://images.unsplash.com/photo-1700760933574-9f0f4ea9aa3b?w=800",

  Underarms:
    "https://images.unsplash.com/photo-1700760934166-4c766d708139?w=800",
};



export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}) {
  return (
    <div className={`section-heading ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="eyebrow">
          <Sparkles size={14} /> {eyebrow}
        </span>
      )}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ServiceCard({ service, index = 0 }) {
  const image =
    serviceImages[service.name] ||
    "https://cdn.shopify.com/s/files/1/0687/8134/3010/files/a_feather_cut.jpg?v=1756714143";

  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
    >
      <div className="service-image">
        <img src={image} alt={service.name} loading="lazy" />
      </div>

      <span className="service-category">{service.category}</span>

      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <div className="service-meta">
        <span>
          <Clock3 size={14} />
          {service.duration || "Ask us"}
        </span>

        <b>{service.price ? `₹${service.price}` : "Price on request"}</b>
      </div>

      <Link
        to={`/book?service=${encodeURIComponent(service.name)}`}
        className="text-link"
      >
        Book this service <ArrowRight size={15} />
      </Link>
    </motion.article>
  );
}

export function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="page-hero-pattern" />
      <div className="container relative z-10">
        <span className="eyebrow eyebrow-light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
