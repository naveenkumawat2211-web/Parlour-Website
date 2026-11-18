import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Page बदलते ही तुरंत टॉप पर पहुँच जाएगा
    });
  }, [pathname]);

  return null;
}
