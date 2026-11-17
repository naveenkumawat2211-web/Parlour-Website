import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { About, Services, Team } from "./pages/InfoPages";
import Booking from "./pages/Booking";
import { AdminDashboard, AdminLogin } from "./pages/Admin";
import { initialiseStore } from "./utils/storage";
import Packages from "./pages/Packages";
import MyBookings from "./pages/MyBookings";

export default function App() {
  useEffect(() => {
    initialiseStore();
  }, []);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />

        {/* // <Routes> ke andar ye line add karein: */}
        <Route path="/packages" element={<Packages />} />
        <Route path="team" element={<Team />} />
        <Route path="book" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* App.jsx mein ye karein */}
      <Route
        path="/khushi-secret-owner-portal"
        element={<AdminDashboard />}
      />{" "}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
