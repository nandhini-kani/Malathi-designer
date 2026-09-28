import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();
    const reviews = await Review.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: {
        reviews: reviews.map((review) => ({ ...review, _id: String(review._id) }))
      }
    });
  } catch (error) {
    console.error("Admin reviews error:", error);
    return NextResponse.json({ success: false, message: "Unable to load reviews." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { id, action } = body as { id?: string; action?: "approve" | "reject" };

    if (!id || !action) {
      return NextResponse.json({ success: false, message: "Review id and action are required." }, { status: 400 });
    }

    await connectDB();
    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json({ success: false, message: "Review not found." }, { status: 404 });
    }

    review.isApproved = action === "approve";
    await review.save();

    return NextResponse.json({ success: true, data: { review }, message: action === "approve" ? "Review approved." : "Review rejected." });
  } catch (error) {
    console.error("Update admin review error:", error);
    return NextResponse.json({ success: false, message: "Unable to update review." }, { status: 500 });
  }
}
