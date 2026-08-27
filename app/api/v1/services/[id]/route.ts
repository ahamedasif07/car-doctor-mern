import ServiceController from "@/controllers/service.controller";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/v1/services/[id]
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  return ServiceController.handleGetServiceById(id);
}

// PUT /api/v1/services/[id]
export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  return ServiceController.handleUpdateService(id, request);
}

// DELETE /api/v1/services/[id]
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;
  return ServiceController.handleDeleteService(id);
}
