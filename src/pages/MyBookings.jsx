import React, { useState, useEffect, useMemo } from "react";
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
  const salon = getSalon();

  const [appointments, setAppointments] = useState(getAppointments());
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

  // Search States
  const [searchPhone, setSearchPhone] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

  const chosen = useMemo(
    () => services.find((s) => s.name === form.service),
    [services, form.service],
  );

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Smart phone cleaner (jaise +91, spaces ya formatting hatane ke liye)
  const cleanPhone = (phoneStr) => {
    if (!phoneStr) return "";
    const digits = phoneStr.replace(/\D/g, "");
    return digits.slice(-10);
  };

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

    const updatedAppointments = [appointment, ...appointments];
    setAppointments(updatedAppointments);

    // Sirf popup dikhayega, WhatsApp apne aap nahi khulega
    setDone(appointment);
  }

  // Search by Phone Number
  const handleSearch = (e) => {
    e.preventDefault();
    const cleanedSearch = cleanPhone(searchPhone);
    if (!cleanedSearch) return;

    const matched = appointments.filter((item) => {
      return cleanPhone(item.phone) === cleanedSearch;
    });

    setFilteredBookings(matched);
    setHasSearched(true);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-900/40 text-green-300 border-green-500/50";
      case "Completed":
        return "bg-blue-900/40 text-blue-300 border-blue-500/50";
      case "Cancelled":
        return "bg-red-900/40 text-red-300 border-red-500/50";
      default:
        return "bg-yellow-900/40 text-yellow-300 border-yellow-500/50";
    }
  };

  // Agar booking successful ho gayi hai toh Success Popup Card dikhayega
  if (done) {
    const message = encodeURIComponent(
      `Hello ${salon.name || "Khushi Beauty Parlour"}, my appointment request:\nName: ${done.name}\nPhone: ${done.phone}\nService: ${done.service}\nDate: ${done.date}\nTime: ${done.time}\nNotes: ${done.notes || "None"}`,
    );
    const whatsappNumber = salon.whatsapp || "917597386371";

    return (
      <div className="min-h-screen bg-[#1c0d0d] text-[#f5ebe6] flex items-center justify-center py-16 px-4">
        <motion.div
          className="max-w-md w-full bg-[#261414] border border-[#3d2323] p-8 rounded-2xl shadow-2xl text-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex justify-center mb-4 text-green-400">
            <CheckCircle2 size={52} />
          </div>
          <span className="text-xs tracking-[0.2em] uppercase text-[#d4a373]">
            REQUEST SAVED
          </span>
          <h1 className="text-2xl font-serif italic text-white mt-2 mb-3">
            Thank you, {done.name}!
          </h1>
          <p className="text-xs text-[#c4b0aa] mb-6">
            Aapki booking safalpurvak darj ho gayi hai aur status Pending hai.
          </p>

          <div className="bg-[#1c0d0d] border border-[#3d2323] p-4 rounded-xl mb-6 text-left space-y-1">
            <b className="text-sm text-white block">{done.service}</b>
            <span className="text-xs text-[#d4a373] block">
              📅 {done.date} | ⏰ {done.time}
            </span>
            <span className="text-[11px] text-yellow-400 block mt-1">
              Status: Pending confirmation
            </span>
          </div>

          <a
            className="w-full py-3 mb-4 rounded-full bg-green-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-green-600 transition"
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} /> Send details on WhatsApp
          </a>
          <Link
            className="text-xs text-[#d4a373] underline hover:text-white"
            to="/"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c0d0d] text-[#f5ebe6] pb-16">
      <PageHero
        eyebrow="BOOK A VISIT"
        title="Request an Appointment &amp; Check Status"
        text="Apni details bharkar booking karein ya apna phone number daal kar status dekhein."
      />

      <div className="max-w-5xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: Booking Form */}
        <div className="bg-[#261414] border border-[#3d2323] p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-serif text-white mb-6">
            Appointment Form
          </h3>

          {error && (
            <p className="bg-red-900/40 border border-red-500/50 text-red-200 text-xs p-3 rounded-lg mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c4b0aa] mb-1">
                Full name *
              </label>
              <input
                name="name"
                required
                value={form.name}
                onChange={update}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-lg bg-[#1c0d0d] border border-[#3d2323] text-white focus:outline-none focus:border-[#d4a373]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c4b0aa] mb-1">
                Mobile number *
              </label>
              <input
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={update}
                placeholder="Enter mobile number (e.g. 9983259588)"
                className="w-full px-4 py-2.5 rounded-lg bg-[#1c0d0d] border border-[#3d2323] text-white focus:outline-none focus:border-[#d4a373]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c4b0aa] mb-1">
                Select service *
              </label>
              <select
                name="service"
                required
                value={form.service}
                onChange={update}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1c0d0d] border border-[#3d2323] text-white focus:outline-none focus:border-[#d4a373]"
              >
                <option value="">Choose a service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c4b0aa] mb-1">
                  Preferred date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                  value={form.date}
                  onChange={update}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1c0d0d] border border-[#3d2323] text-white focus:outline-none focus:border-[#d4a373]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c4b0aa] mb-1">
                  Preferred time *
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  value={form.time}
                  onChange={update}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1c0d0d] border border-[#3d2323] text-white focus:outline-none focus:border-[#d4a373]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c4b0aa] mb-1">
                Notes (optional)
              </label>
              <textarea
                name="notes"
                rows="2"
                value={form.notes}
                onChange={update}
                placeholder="Any preferences or questions?"
                className="w-full px-4 py-2.5 rounded-lg bg-[#1c0d0d] border border-[#3d2323] text-white focus:outline-none focus:border-[#d4a373]"
              />
            </div>

            {chosen && (
              <div className="chosen-service bg-[#1c0d0d] p-3 rounded-lg border border-[#3d2323] text-xs">
                <b className="text-[#d4a373]">{chosen.name}</b>
                <span className="block text-[#c4b0aa] mt-0.5">
                  {chosen.price ? `₹${chosen.price}` : "Price on request"} •{" "}
                  {chosen.duration}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#e0b86b] text-[#1c0d0d] font-semibold text-xs tracking-[0.18em] uppercase hover:bg-[#ecc77e] transition cursor-pointer mt-2"
            >
              Submit Appointment Request
            </button>
          </form>
        </div>

        {/* Right Side: Check Booking Status by Phone */}
        <div className="bg-[#261414] border border-[#3d2323] p-8 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-serif text-white mb-2">
              Check Booking Status
            </h3>
            <p className="text-xs text-[#c4b0aa] mb-6">
              Apna mobile number daal kar apni booking ka live status dekhein.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <input
                type="tel"
                required
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="Mobile number daalein..."
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#1c0d0d] border border-[#3d2323] text-white text-sm focus:outline-none focus:border-[#d4a373]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#e0b86b] text-[#1c0d0d] font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#ecc77e] transition cursor-pointer"
              >
                Search
              </button>
            </form>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {hasSearched ? (
                filteredBookings.length > 0 ? (
                  filteredBookings.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#1c0d0d] border border-[#3d2323] p-4 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-semibold text-white text-sm">
                          {item.service}
                        </h4>
                        <p className="text-xs text-[#d4a373] mt-0.5">
                          {item.name} ({item.phone})
                        </p>
                        <p className="text-[11px] text-[#8c6d6d] mt-1">
                          📅 {item.date} | ⏰ {item.time}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-semibold border uppercase tracking-wider inline-block ${getStatusStyle(item.status)}`}
                        >
                          {item.status || "Pending"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[#8c6d6d] py-8 text-sm bg-[#1c0d0d] rounded-xl border border-[#3d2323]">
                    Is number par koi booking nahi mili.
                  </p>
                )
              ) : (
                <p className="text-center text-[#8c6d6d] py-12 text-sm bg-[#1c0d0d] rounded-xl border border-[#3d2323]">
                  Upar apna mobile number daal kar search karein.
                </p>
              )}
            </div>
          </div>

          <div className="aside-note border-t border-[#3d2323] pt-4 mt-6 text-xs text-[#c4b0aa]">
            <b>Need help?</b> Call{" "}
            <a href={`tel:${salon.phone}`} className="text-[#d4a373] underline">
              {salon.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
