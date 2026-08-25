import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IUser } from "@/types";

export type SafeUser = Omit<IUser, "password">;

export interface AuthState {
  user: SafeUser | null;
  isLoading: boolean;
  login: (userData: SafeUser) => void;
  logout: () => void;
  setUser: (userData: SafeUser | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 👉 ১. প্রাথমিক স্টেট (Initial State):
      user: null,
      isLoading: false,

      // 👉 ২. অ্যাকশন ফাংশনসমূহ (Actions):
      login: (userData: SafeUser) => set({ user: userData }),
      logout: () => set({ user: null }),
      setUser: (userData: SafeUser | null) => set({ user: userData }),
    }),
    {
      // 👉 ৩. LocalStorage সিঙ্ক সেটিংস:
      name: "car_doctor_user",
      storage: createJSONStorage(() => 
        typeof window !== "undefined" ? localStorage : ({} as Storage)
      ),
    }
  )
);

