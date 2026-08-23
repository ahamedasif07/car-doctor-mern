import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/services/[id] - Fetch single service by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: service },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: "Error fetching service", error: errorMessage },
      { status: 500 }
    );
  }
}

// PATCH /api/services/[id] - Update service details
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    const updateData = await request.json();

    const updatedService = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return NextResponse.json(
        { success: false, message: "Service not found for update" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Service updated successfully!",
        data: updatedService,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: "Failed to update service", error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete service
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json(
        { success: false, message: "Service not found to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Service deleted successfully!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, message: "Failed to delete service", error: errorMessage },
      { status: 500 }
    );
  }
}
