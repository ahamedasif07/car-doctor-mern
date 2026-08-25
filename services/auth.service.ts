import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import type { RegisterPayload, IUser, LoginPayload } from "@/types";

// ─── Custom Error with Status Code ──────────────────────────────────────────
export class ServiceError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = statusCode;
  }
}

// ─── Register User ──────────────────────────────────────────────────────────
async function registerUser(
  userData: RegisterPayload
): Promise<Omit<IUser, "password">> {
  await dbConnect();

  // Check for existing user with same email
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new ServiceError("This email is already registered", 409);
  }

  // Create new user (password hashing handled by model pre-save hook in models/User.ts)
  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });

  // Return user data without password
  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

// ─── Get All Users ──────────────────────────────────────────────────────────
async function getUsers(): Promise<IUser[]> {
  await dbConnect();

  const users = await User.find();
  if (!users || users.length === 0) {
    throw new ServiceError("Users not found", 404);
  }

  return users;
}

// ─── Login User ─────────────────────────────────────────────────────────────
async function loginUser(
  userData: LoginPayload
): Promise<Omit<IUser, "password">> {
  await dbConnect();

  // Find user by email (include password for verification)
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new ServiceError("User not found", 404);
  }

  // Compare plain password with stored bcrypt hashed password
  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) {
    throw new ServiceError("Incorrect password", 401);
  }

  // Return user data without password
  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

const AuthService = {
  registerUser,
  getUsers,
  loginUser,
};

export default AuthService;