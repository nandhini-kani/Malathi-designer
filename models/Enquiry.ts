import mongoose, { Schema, type Document } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    service: { type: String, default: "" },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "contacted", "completed"], default: "new" }
  },
  { timestamps: true }
);

const Enquiry = mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

export default Enquiry;
