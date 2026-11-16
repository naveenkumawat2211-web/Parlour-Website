import {
  defaultAdmin,
  initialServices,
  initialStylists,
  SALON,
} from "../data/seed";

const K = {
  services: "khushi_services",
  stylists: "khushi_stylists",
  appointments: "khushi_appointments",
  payments: "khushi_payments",
  admin: "khushi_admin",
  salon: "khushi_salon",
  session: "khushi_admin_session",
};
function read(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
export function initialiseStore() {
  [
    [K.services, initialServices],
    [K.stylists, initialStylists],
    [K.appointments, []],
    [K.payments, []],
    [K.admin, defaultAdmin],
    [K.salon, SALON],
  ].forEach(([key, value]) => {
    if (localStorage.getItem(key) === null)
      localStorage.setItem(key, JSON.stringify(value));
  });
}
export const getServices = () => read(K.services, initialServices);
export const saveServices = (v) =>
  localStorage.setItem(K.services, JSON.stringify(v));
export const getStylists = () => read(K.stylists, initialStylists);
export const saveStylists = (v) =>
  localStorage.setItem(K.stylists, JSON.stringify(v));
export const getAppointments = () => read(K.appointments, []);
export const saveAppointments = (v) =>
  localStorage.setItem(K.appointments, JSON.stringify(v));
export const getPayments = () => read(K.payments, []);
export const savePayments = (v) =>
  localStorage.setItem(K.payments, JSON.stringify(v));
export const getAdmin = () => read(K.admin, defaultAdmin);
export const saveAdmin = (v) =>
  localStorage.setItem(K.admin, JSON.stringify(v));
export const getSalon = () => read(K.salon, SALON);
export const saveSalon = (v) =>
  localStorage.setItem(K.salon, JSON.stringify(v));
export const isAdminLoggedIn = () => read(K.session, false) === true;
export const setAdminSession = (v) =>
  localStorage.setItem(K.session, JSON.stringify(v));
export const clearAdminSession = () => localStorage.removeItem(K.session);
export const makeId = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
