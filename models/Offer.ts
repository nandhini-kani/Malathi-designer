import mongoose, { Schema, type Document } from "mongoose";

export interface IOffer extends Document {
  title: string;
  description: string;
  discount: string;
  image?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema = new Schema<IOffer>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    discount: { type: String, required: true },
    image: { type: String, default: "" },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Offer = mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);

export default Offer;
