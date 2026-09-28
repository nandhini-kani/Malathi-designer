import mongoose, { Schema, type Document } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  publicId: string;
  category: "Blouse" | "Dress" | "Churidar" | "Kids" | "Alteration" | "Other";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    category: {
      type: String,
      enum: ["Blouse", "Dress", "Churidar", "Kids", "Alteration", "Other"],
      default: "Other"
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Gallery = mongoose.models.Gallery || mongoose.model<IGalleryItem>("Gallery", GallerySchema);

export default Gallery;
