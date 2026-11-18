import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { About, Services, Team } from "./pages/InfoPages";
import Booking from "./pages/Booking";
import { AdminDashboard, AdminLogin } from "./pages/Admin";
import { initialiseStore } from "./utils/storage";
import Packages from "./pages/Packages";
import MyBookings from "./pages/MyBookings";
import BridalPackages from "./pages/BridalPackages";
import BridalStudio from "./pages/BridalStudio";

// ScrollToTop component (पेج बदलते ही ऑटोमैटिक टॉप पर ले जाने के लिए)
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    initialiseStore();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />

          {/* Bridal & Packages Routes */}
          <Route path="/packages" element={<Packages />} />
          <Route path="/bridal-packages" element={<BridalPackages />} />
          <Route path="/bridal-studio" element={<BridalStudio />} />

          <Route path="team" element={<Team />} />
          <Route path="book" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/khushi-secret-owner-portal"
          element={<AdminDashboard />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
