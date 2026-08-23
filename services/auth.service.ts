import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import type { RegisterPayload, IUser } from "@/types";

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
  payload: RegisterPayload
): Promise<Omit<IUser, "password">> {
  await dbConnect();

  // Check for existing user with same email
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new ServiceError("This email is already registered", 409);
  }

  // Create new user (password hashing handled by model pre-save hook)
  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: payload.password,
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


// get register 
 async function getUsers(): Promise<IUser[]> {
  await dbConnect();

  // Check for existing user with same email
  const existingUser = await User.find();
  if (!existingUser) {
    throw new ServiceError("Users not found", 404);
  }

  return existingUser;
}


const AuthService = {
  registerUser,
  getUsers
};

export default AuthService;