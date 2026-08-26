import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "default_car_doctor_secret_key_2026";

export type JWTPayload = {
  _id?: string;
  email: string;
  role?: "user" | "admin" | string;
};

// ১. টোকেন তৈরি করার ফাংশন
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // ৭ দিনের মেয়াদ
  });
}

// ২. টোকেন চেক বা ভেরিফাই করার ফাংশন
export function verifyToken<T = JWTPayload>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (error) {
    return null; // মেয়াদ শেষ বা ভুল টোকেন হলে null
  }
}
