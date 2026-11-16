import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { PageHero } from "../components/UI";
import {
  getAppointments,
  getSalon,
  getServices,
  makeId,
  saveAppointments,
} from "../utils/storage";

export default function Booking() {
  const [params] = useSearchParams();
  const services = getServices().filter((s) => s.active);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: params.get("service") || "",
    date: "",
    time: "",
    notes: "",
  });
  const [done, setDone] = useState(null);
  const [error, setError] = useState("");
  const salon = getSalon();
  const chosen = useMemo(
    () => services.find((s) => s.name === form.service),
    [services, form.service],
  );
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  function submit(e) {
    e.preventDefault();
    setError("");
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.service ||
      !form.date ||
      !form.time
    ) {
      setError("Please complete all required fields.");
      return;
    }
    const appointment = {
      id: makeId(),
      ...form,
      price: chosen?.price || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    saveAppointments([appointment, ...getAppointments()]);
    setDone(appointment);
  }
  if (done) {
    const message = encodeURIComponent(
      `Hello ${salon.name}, my appointment request:\nName: ${done.name}\nPhone: ${done.phone}\nService: ${done.service}\nDate: ${done.date}\nTime: ${done.time}\nNotes: ${done.notes || "None"}`,
    );
    return (
      <section className="success-wrap container">
        <motion.div
          className="success-card"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle2 size={52} />
          <span className="eyebrow">REQUEST SAVED</span>
          <h1>Thank you, {done.name}!</h1>
          <p>
            Your appointment request has been saved in this browser. Please
            contact the salon to confirm availability.
          </p>
          <div className="appointment-summary">
            <b>{done.service}</b>
            <span>
              {done.date} • {done.time}
            </span>
            <small>Status: Pending confirmation</small>
          </div>
          <a
            className="button button-rose"
            href={`https://wa.me/${salon.whatsapp}?text=${message}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} /> Send details on WhatsApp
          </a>
          <Link className="text-link" to="/">
            Back to Home
          </Link>
        </motion.div>
      </section>
    );
  }
  return (
    <>
      <PageHero
        eyebrow="BOOK A VISIT"
        title="Request an appointment"
        text="Share your details and preferred time. The salon will confirm availability with you."
      />
      <section className="section container booking-layout">
        <div className="booking-aside">
          <span className="eyebrow">A LITTLE TIME FOR YOU</span>
          <h2>Let's find a time that works.</h2>
          <p>
            Choose a service and your preferred date and time. Your request will
            be stored in this browser and can be shared through WhatsApp.
          </p>
          <div className="aside-note">
            <b>Need help?</b>
            <span>Call {salon.phone}</span>
            <a href={`tel:${salon.phone}`}>Call the salon</a>
          </div>
        </div>
        <form className="booking-form" onSubmit={submit}>
          <h3>Your details</h3>
          <label>
            Full name *
            <input
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Enter your name"
            />
          </label>
          <label>
            Mobile number *
            <input
              name="phone"
              value={form.phone}
              onChange={update}
              placeholder="Enter mobile number"
              inputMode="tel"
            />
          </label>
          <label>
            Select service *
            <select name="service" value={form.service} onChange={update}>
              <option value="">Choose a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <div className="form-two">
            <label>
              Preferred date *
              <input
                type="date"
                name="date"
                min={new Date().toISOString().slice(0, 10)}
                value={form.date}
                onChange={update}
              />
            </label>
            <label>
              Preferred time *
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={update}
              />
            </label>
          </div>
          <label>
            Notes (optional)
            <textarea
              name="notes"
              rows="3"
              value={form.notes}
              onChange={update}
              placeholder="Any preferences or questions?"
            />
          </label>
          {chosen && (
            <div className="chosen-service">
              <b>{chosen.name}</b>
              <span>
                {chosen.price ? `₹${chosen.price}` : "Price on request"} •{" "}
                {chosen.duration}
              </span>
            </div>
          )}
          {error && <p className="form-error">{error}</p>}
          <button className="button button-dark w-full" type="submit">
            Submit Appointment Request
          </button>
          <small className="form-disclaimer">
            Submitting does not confirm a slot. The salon must confirm your
            appointment.
          </small>
        </form>
      </section>
    </>
  );
}
