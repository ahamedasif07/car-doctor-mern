import AuthController from "@/controllers/auth.controller";

// POST /api/v1/auth/register
export async function POST(request: Request) {
  return AuthController.handleRegister(request);
}
// get registers
export async function GET(request: Request) {
  return AuthController.handleGetRegister(request);
}
