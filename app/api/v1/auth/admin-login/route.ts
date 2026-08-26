import AuthController from "@/controllers/auth.controller";

// POST /api/v1/auth/admin-login
export async function POST(request: Request) {
  return AuthController.handlePostAdminLogin(request);
}
