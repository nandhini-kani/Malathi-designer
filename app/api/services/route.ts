import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: { services: services.map((service) => ({ ...service, _id: String(service._id) })) }
    });
  } catch (error) {
    console.error("Get services error:", error);
    return NextResponse.json({ success: false, message: "Unable to load services." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const image = typeof body.image === "string" ? body.image : "";
    const price = body.price ?? "";
    const isActive = body.isActive !== undefined ? Boolean(body.isActive) : true;
    const sortOrder = Number(body.sortOrder ?? 0);

    if (!title || !description) {
      return NextResponse.json({ success: false, message: "Title and description are required." }, { status: 400 });
    }

    await connectDB();
    const service = await Service.create({
      title,
      description,
      image,
      price,
      isActive,
      sortOrder
    });

    return NextResponse.json({ success: true, data: { service }, message: "Service created." }, { status: 201 });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ success: false, message: "Unable to create service." }, { status: 500 });
  }
}
