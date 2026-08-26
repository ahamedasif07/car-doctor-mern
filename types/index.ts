// TypeScript definitions for Car Doctor Application

export interface IService {
  _id?: string;
  service_id: string;
  title: string;
  img: string;
  price: string | number;
  description: string;
  facility?: Array<{
    name: string;
    details: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  username?: string;
  email: string;
  password?: string;
  role?: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RegisterPayload {
  name: string;
  username?: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginPayload {
  username: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

