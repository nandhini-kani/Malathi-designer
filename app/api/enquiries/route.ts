import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: {
        enquiries: enquiries.map((enquiry) => ({ ...enquiry, _id: String(enquiry._id) }))
      }
    });
  } catch (error) {
    console.error("Get enquiries error:", error);
    return NextResponse.json({ success: false, message: "Unable to load enquiries." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !phone || !message) {
      return NextResponse.json({ success: false, message: "Name, phone and message are required." }, { status: 400 });
    }

    await connectDB();
    const enquiry = await Enquiry.create({ name, phone, email, service, message, status: "new" });

    return NextResponse.json({ success: true, data: { enquiry }, message: "Enquiry submitted successfully." }, { status: 201 });
  } catch (error) {
    console.error("Create enquiry error:", error);
    return NextResponse.json({ success: false, message: "Unable to submit enquiry." }, { status: 500 });
  }
}
