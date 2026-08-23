import AuthService, {  ServiceError } from "@/services/auth.service";
import type { RegisterPayload, ApiResponse, IUser } from "@/types";

// ─── Helper: JSON Response ───────────────────────────────────────────────────
function jsonResponse<T>(body: ApiResponse<T>, status: number): Response {
  return Response.json(body, { status });
}

// ─── Handle Register ─────────────────────────────────────────────────────────
 async function handleRegister(
  request: Request
): Promise<Response> {
  try {
    // Parse request body
    const body = (await request.json()) as Partial<RegisterPayload>;

    // Validate required fields
    const { name, email, password } = body;

   

    // Delegate to service layer
    const user = await AuthService.registerUser({ name:name!, email:email!, password:password! });

    return jsonResponse<Omit<IUser, "password">>(
      {
        success: true,
        message: "Registration successful",
        data: user,
      },
      201
    );
  } catch (error: unknown) {
    // Known service errors (e.g., duplicate email)
    if (error instanceof ServiceError) {
      return jsonResponse(
        { success: false, error: error.message },
        error.statusCode
      );
    }

    // Unexpected errors
    console.error("[Auth Controller] Registration error:", error);
    return jsonResponse(
      { success: false, error: "Internal server error" },
      500
    );
  }
}

// ------------ get register ---------
 async function handleGetRegister(
 
): Promise<Response> {
  try {
      const getUsers = await AuthService.getUsers();

      return jsonResponse<IUser[]>(
        {
          success: true,
          message: "Registration successful",
          data: getUsers,
        },
        201
      );


  }catch (error: unknown) {
    console.error("[Auth Controller] Registration error:", error);
    return jsonResponse(
      { success: false, error: "Internal server error" },
      500
    );
  }
}

const AuthController = {
  handleRegister,
  handleGetRegister,
};

export default AuthController;