"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "@/types";

type SafeUser = Omit<IUser, "password">;

interface AuthContextType {
  user: SafeUser | null;
  login: (userData: SafeUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const storedUser = localStorage.getItem("car_doctor_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser) as SafeUser);
        }
      } catch (e) {
        console.error("Failed to load user from localStorage:", e);
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  const login = (userData: SafeUser) => {
    setUser(userData);
    localStorage.setItem("car_doctor_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("car_doctor_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
