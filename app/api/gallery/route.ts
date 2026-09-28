import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find({ isActive: true }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: {
        gallery: items.map((item) => ({ ...item, _id: String(item._id) }))
      }
    });
  } catch (error) {
    console.error("Get gallery error:", error);
    return NextResponse.json({ success: false, message: "Unable to load gallery." }, { status: 500 });
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
    const description = typeof body.description === "string" ? body.description : "";
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";
    const publicId = typeof body.publicId === "string" ? body.publicId.trim() : "";
    const category = typeof body.category === "string" ? body.category : "Other";
    const isActive = body.isActive !== undefined ? Boolean(body.isActive) : true;

    if (!title || !imageUrl) {
      return NextResponse.json({ success: false, message: "Title and image URL are required." }, { status: 400 });
    }

    await connectDB();
    const item = await Gallery.create({
      title,
      description,
      imageUrl,
      publicId,
      category,
      isActive
    });

    return NextResponse.json({ success: true, data: { item }, message: "Gallery item created." }, { status: 201 });
  } catch (error) {
    console.error("Create gallery item error:", error);
    return NextResponse.json({ success: false, message: "Unable to create gallery item." }, { status: 500 });
  }
}
