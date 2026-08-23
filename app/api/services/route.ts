import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";

// GET /api/services - Fetch all services from MongoDB
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Optionally extract search query parameters (e.g. /api/services?search=engine)
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const services = await Service.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: services.length,
        data: services,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch services",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service in MongoDB
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { service_id, title, img, price, description, facility } = body;

    // Basic Validation
    if (!service_id || !title || !img || !price || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields (service_id, title, img, price, description)",
        },
        { status: 400 }
      );
    }

    const newService = await Service.create({
      service_id,
      title,
      img,
      price,
      description,
      facility: facility || [],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully!",
        data: newService,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create service",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
