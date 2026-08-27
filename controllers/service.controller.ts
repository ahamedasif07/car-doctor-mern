import { NextResponse } from "next/server";
import ServiceService from "@/services/service.service";
import { ServiceError } from "@/services/auth.service";

async function handleGetAllServices(): Promise<Response> {
  try {
    const services = await ServiceService.getAllServices();
    return NextResponse.json(
      {
        success: true,
        message: "Services fetched successfully",
        data: services,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[Service Controller] Get all error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error while fetching services",
      },
      { status: 500 }
    );
  }
}

async function handleGetServiceById(id: string): Promise<Response> {
  try {
    const service = await ServiceService.getServiceById(id);
    return NextResponse.json(
      {
        success: true,
        message: "Service details fetched successfully",
        data: service,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof ServiceError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }
    console.error("[Service Controller] Get by ID error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleCreateService(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const newService = await ServiceService.createService(body);
    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: newService,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof ServiceError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }
    console.error("[Service Controller] Create error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleUpdateService(id: string, request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const updated = await ServiceService.updateService(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Service updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof ServiceError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }
    console.error("[Service Controller] Update error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleDeleteService(id: string): Promise<Response> {
  try {
    await ServiceService.deleteService(id);
    return NextResponse.json(
      {
        success: true,
        message: "Service deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof ServiceError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }
    console.error("[Service Controller] Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

const ServiceController = {
  handleGetAllServices,
  handleGetServiceById,
  handleCreateService,
  handleUpdateService,
  handleDeleteService,
};

export default ServiceController;
