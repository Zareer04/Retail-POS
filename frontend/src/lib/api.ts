// src/lib/api.ts
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token automatically if you store it in localStorage (JWT)
api.interceptors.request.use((config) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore on server
  }
  return config;
});

// A single shared React Query client for browser usage
export const queryClient = new QueryClient();
