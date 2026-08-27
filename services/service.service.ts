import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";
import type { IService } from "@/types";
import { ServiceError } from "./auth.service";

// ─── 1. Get All Services ──────────────────────────────────────────────────────
async function getAllServices(): Promise<IService[]> {
  await dbConnect();
  const services = await Service.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(services));
}

// ─── 2. Get Single Service by MongoDB _id ─────────────────────────────────────
async function getServiceById(id: string): Promise<IService> {
  await dbConnect();

  // Validate 24-character hexadecimal ObjectId
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ServiceError("Invalid service ID format", 400);
  }

  const service = await Service.findById(id).lean();

  if (!service) {
    throw new ServiceError("Service not found with the provided ID", 404);
  }

  return JSON.parse(JSON.stringify(service));
}

// ─── 3. Create Service ────────────────────────────────────────────────────────
async function createService(data: Partial<IService>): Promise<IService> {
  await dbConnect();

  if (!data.title || !data.price || !data.img) {
    throw new ServiceError("Title, price, and image are required", 400);
  }

  const newService = await Service.create(data);
  return JSON.parse(JSON.stringify(newService));
}

// ─── 4. Update Service by MongoDB _id ─────────────────────────────────────────
async function updateService(id: string, data: Partial<IService>): Promise<IService> {
  await dbConnect();

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ServiceError("Invalid service ID format", 400);
  }

  const service = await Service.findByIdAndUpdate(
    id,
    { $set: data },
    { returnDocument: "after" }
  ).lean();

  if (!service) {
    throw new ServiceError("Service not found to update", 404);
  }

  return JSON.parse(JSON.stringify(service));
}

// ─── 5. Delete Service by MongoDB _id ─────────────────────────────────────────
async function deleteService(id: string): Promise<boolean> {
  await dbConnect();

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ServiceError("Invalid service ID format", 400);
  }

  const result = await Service.findByIdAndDelete(id);

  if (!result) {
    throw new ServiceError("Service not found to delete", 404);
  }

  return true;
}

const ServiceService = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};

export default ServiceService;
