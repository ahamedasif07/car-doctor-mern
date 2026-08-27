import ServiceController from "@/controllers/service.controller";

// GET /api/v1/services - Get all services
export async function GET() {
  return ServiceController.handleGetAllServices();
}

// POST /api/v1/services - Create a new service
export async function POST(request: Request) {
  return ServiceController.handleCreateService(request);
}
