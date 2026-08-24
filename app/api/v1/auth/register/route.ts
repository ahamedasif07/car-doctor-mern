import AuthController from "@/controllers/auth.controller";

// get registers
export async function GET() {
  return AuthController.handleGetRegister();
}
// POST /api/v1/auth/register
export async function POST(request: Request) {
  return AuthController.handlePostRegister(request);
}

