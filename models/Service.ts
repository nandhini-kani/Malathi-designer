import mongoose, { Schema, type Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  image?: string;
  price?: number | string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    price: { type: Schema.Types.Mixed, default: null },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
