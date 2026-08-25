import AuthController from "@/controllers/auth.controller";

// GET /api/v1/auth/register
export async function GET() {
  return AuthController.handleGetAllUsers();
}
// POST /api/v1/auth/register
export async function POST(request: Request) {
  return AuthController.handlePostRegister(request);
}

