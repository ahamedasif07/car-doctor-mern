import AuthService, { ServiceError } from "@/services/auth.service";
import type { RegisterPayload } from "@/types";

// ─── 1. Get All Users (GET /api/v1/auth/login or /api/v1/auth/register) ─────
async function handleGetAllUsers(): Promise<Response> {
  try {
    // Fetch all users from service layer
    const users = await AuthService.getUsers();

    // Return successful response
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

    // Handle custom service errors (e.g., 404 Not Found)
    if (error instanceof ServiceError) {
      return Response.json(
        {
          success: false,
          error: error.message,
        },
        { status: error.statusCode }
      );
    }

    // Handle unexpected server errors
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
    // Parse request body
    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return Response.json(
        {
          success: false,
          error: "Name, email, and password are required",
        },
        { status: 400 }
      );
    }

    // Register user via service layer
    await AuthService.registerUser({
      name,
      email,
      password,
    });

    // Return created response
    return Response.json(
      {
        success: true,
        message: "Registration successful",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Handle custom service errors (e.g., 409 Conflict)
    if (error instanceof ServiceError) {
      return Response.json(
        {
          success: false,
          error: error.message,
        },
        { status: error.statusCode }
      );
    }

    // Handle unexpected server errors
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

// ─── 3. Handle User Login (POST /api/v1/auth/login) ───────────────────────────
async function handlePostLogin(request: Request): Promise<Response> {
  try {
    // 1. Await request JSON
    const body = await request.json();
    const { email, password } = body;

    // 2. Validate input fields
    if (!email || !password) {
      return Response.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // 3. Authenticate user via service layer
    const user = await AuthService.loginUser({ email, password });

    // 4. Return successful login response
    return Response.json(
      {
        success: true,
        message: "Login successful",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof ServiceError) {
      return Response.json(
        {
          success: false,
          error: error.message,
        },
        { status: error.statusCode }
      );
    }

    console.error("[Auth Controller] Login error:", error);
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
  handleGetAllUsers,
  handlePostRegister,
  handlePostLogin,
};

export default AuthController;