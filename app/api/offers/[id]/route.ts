import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Offer from "@/models/Offer";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const offer = await Offer.findById(id).lean();

    if (!offer) {
      return NextResponse.json({ success: false, message: "Offer not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { offer: { ...offer, _id: String(offer._id) } } });
  } catch (error) {
    console.error("Get offer error:", error);
    return NextResponse.json({ success: false, message: "Unable to load offer." }, { status: 500 });
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

    const offer = await Offer.findById(id);
    if (!offer) {
      return NextResponse.json({ success: false, message: "Offer not found." }, { status: 404 });
    }

    offer.title = typeof body.title === "string" ? body.title.trim() : offer.title;
    offer.description = typeof body.description === "string" ? body.description.trim() : offer.description;
    offer.discount = typeof body.discount === "string" ? body.discount.trim() : offer.discount;
    offer.image = typeof body.image === "string" ? body.image : offer.image;
    offer.startDate = body.startDate ? new Date(body.startDate) : null;
    offer.endDate = body.endDate ? new Date(body.endDate) : null;
    offer.isActive = body.isActive !== undefined ? Boolean(body.isActive) : offer.isActive;

    await offer.save();
    return NextResponse.json({ success: true, data: { offer }, message: "Offer updated." });
  } catch (error) {
    console.error("Update offer error:", error);
    return NextResponse.json({ success: false, message: "Unable to update offer." }, { status: 500 });
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
    const offer = await Offer.findById(id);

    if (!offer) {
      return NextResponse.json({ success: false, message: "Offer not found." }, { status: 404 });
    }

    await offer.deleteOne();
    return NextResponse.json({ success: true, message: "Offer deleted." });
  } catch (error) {
    console.error("Delete offer error:", error);
    return NextResponse.json({ success: false, message: "Unable to delete offer." }, { status: 500 });
  }
}
