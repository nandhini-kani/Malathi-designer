import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const enquiry = await Enquiry.findById(id).lean();

    if (!enquiry) {
      return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { enquiry: { ...enquiry, _id: String(enquiry._id) } } });
  } catch (error) {
    console.error("Get enquiry error:", error);
    return NextResponse.json({ success: false, message: "Unable to load enquiry." }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    await connectDB();
    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 });
    }

    const status = body.status;
    if (status === "new" || status === "contacted" || status === "completed") {
      enquiry.status = status;
    }

    await enquiry.save();
    return NextResponse.json({ success: true, data: { enquiry }, message: "Enquiry updated." });
  } catch (error) {
    console.error("Update enquiry error:", error);
    return NextResponse.json({ success: false, message: "Unable to update enquiry." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 });
    }

    await enquiry.deleteOne();
    return NextResponse.json({ success: true, message: "Enquiry deleted." });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    return NextResponse.json({ success: false, message: "Unable to delete enquiry." }, { status: 500 });
  }
}
