// src/services/adminAuth.js

import API from "./api";

// Admin Login
export const adminLogin = async (email, password) => {
  const res = await API.post("/api/admin/login", { email, password });
  return res.data;
};

// Verify Admin Token
export const verifyAdmin = async () => {
  const res = await API.get("/api/admin/verify");
  return res.data;
};
