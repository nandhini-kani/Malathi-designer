import mongoose, { Schema, type Document } from "mongoose";

export interface IBusinessSettings extends Document {
  businessName: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  googleBusinessUrl: string;
  openingHours: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  updatedAt: Date;
  createdAt: Date;
}

const BusinessSettingsSchema = new Schema<IBusinessSettings>(
  {
    businessName: { type: String, default: "Malathi Designer" },
    description: { type: String, default: "Malathi Designer offers ladies tailoring, custom dress stitching and neat finishing for everyday comfort and confident styling in Namakkal." },
    phone: { type: String, default: "+91 82487 44594" },
    whatsapp: { type: String, default: "+91 82487 44594" },
    email: { type: String, default: "malathidesigner@gmail.com" },
    address: { type: String, default: "2/43, West St, Kondampatti, Namakkal, Kondamanayakkanpatti, Tamil Nadu 637403" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    googleBusinessUrl: { type: String, default: "" },
    openingHours: { type: String, default: "Mon-Sat: 9:00 AM - 8:00 PM" },
    heroTitle: { type: String, default: "Beautiful Stitching. Perfect Fit. Made for You." },
    heroSubtitle: { type: String, default: "Custom tailoring and neat stitching designed around your style, measurements and comfort." },
    aboutText: { type: String, default: "Malathi Designer provides personalised tailoring with a focus on neat finishing, custom measurements and comfortable fit for women and families in Namakkal." }
  },
  { timestamps: true }
);

const BusinessSettings = mongoose.models.BusinessSettings || mongoose.model<IBusinessSettings>("BusinessSettings", BusinessSettingsSchema);

export default BusinessSettings;
