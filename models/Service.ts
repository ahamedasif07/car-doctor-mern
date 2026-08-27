import mongoose, { Schema, type Document } from "mongoose";

export interface IServiceDocument extends Document {
  title: string;
  img: string;
  price: number | string;
  description: string;
  facility: Array<{
    name: string;
    details: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDocument>(
  {
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
    facility: [
      {
        name: { type: String, required: true },
        details: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Service =
  mongoose.models.Service ||
  mongoose.model<IServiceDocument>("Service", ServiceSchema);

export default Service;
