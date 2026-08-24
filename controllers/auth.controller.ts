import AuthService, { ServiceError } from "@/services/auth.service";
import type { RegisterPayload } from "@/types";

// ─── 1. Get All Users (GET /api/v1/auth/register) ────────────────────────────
async function handleGetRegister(): Promise<Response> {
  try {
    // Service লেয়ার থেকে সব ইউজার নিয়ে আসা
    const users = await AuthService.getUsers();

    // সরাসরি Response.json দিয়ে রিটার্ন (200 OK)
    return Response.json(
      {
        success: true,
        message: "Users fetched successfully",
        data: users,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[Auth Controller] Get users error:", error);

    // কোনো কাস্টম সার্ভিস এরর থাকলে (যেমন: 404)
    if (error instanceof ServiceError) {
      return Response.json(
        {
          success: false,
          error: error.message,
        },
        { status: error.statusCode }
      );
    }

    // অপ্রত্যাশিত কোনো সার্ভার এরর হলে 500
    return Response.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// ─── 2. Handle User Registration (POST /api/v1/auth/register) ─────────────────
async function handlePostRegister(request: Request): Promise<Response> {
  try {
    // Request body পার্স করা
    const body = await request.json()
    const { name, email, password } = body;

    // ১. ফিল্ড ভ্যালিডেশন (কোনো ফিল্ড খালি থাকলে 400 Bad Request)
    if (!name || !email || !password) {
      return Response.json(
        {
          success: false,
          error: "Name, email, and password are required",
        },
        { status: 400 }
      );
    }

    // ২. সার্ভিস লেয়ারে ডাটা পাঠিয়ে ইউজার তৈরি করা
    const user = await AuthService.registerUser({
    
      name,
      email,
      password,
    });

    // ৩. সফল হলে 201 Created রেসপন্স পাঠানো
    return Response.json(
      {
        success: true,
        message: "Registration successful",
        data: user,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // সার্ভিস লেয়ারের কাস্টম এরর (যেমন: 409 Duplicate Email)
    if (error instanceof ServiceError) {
      return Response.json(
        {
          success: false,
          error: error.message,
        },
        { status: error.statusCode }
      );
    }

    // অপ্রত্যাশিত সার্ভার এরর (500)
    console.error("[Auth Controller] Registration error:", error);
    return Response.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// ─── Export Controller ────────────────────────────────────────────────────────
const AuthController = {
  handleGetRegister,
  handlePostRegister,
};

export default AuthController;