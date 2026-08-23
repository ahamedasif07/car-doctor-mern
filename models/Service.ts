import mongoose, { Schema, Model } from "mongoose";
import { IService } from "@/types";

const FacilitySchema = new Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
});

const ServiceSchema = new Schema<IService>(
  {
    service_id: {
      type: String,
      required: [true, "Service ID is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    img: {
      type: String,
      required: [true, "Service image URL is required"],
    },
    price: {
      type: Schema.Types.Mixed,
      required: [true, "Service price is required"],
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
    },
    facility: [FacilitySchema],
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model if already compiled in Next.js hot-reloads
const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
