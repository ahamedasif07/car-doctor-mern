import AuthController from "@/controllers/auth.controller";

// GET /api/v1/auth/login
export async function GET() {
  return AuthController.handleGetAllUsers();
}


export async function POST(request: Request) {
  return AuthController.handlePostLogin(request);
}