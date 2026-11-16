import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { About, Services, Team } from "./pages/InfoPages";
import Booking from "./pages/Booking";
import { AdminDashboard, AdminLogin } from "./pages/Admin";
import { initialiseStore } from "./utils/storage";

export default function App() {
  useEffect(() => { initialiseStore(); }, []);
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="team" element={<Team />} />
      <Route path="book" element={<Booking />} />
    </Route>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}