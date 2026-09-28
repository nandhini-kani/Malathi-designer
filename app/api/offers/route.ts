import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Offer from "@/models/Offer";

export async function GET() {
  try {
    await connectDB();
    const now = new Date();
    const offers = await Offer.find({
      isActive: true,
      $and: [
        {
          $or: [
            { startDate: { $exists: false } },
            { startDate: null },
            { startDate: { $lte: now } }
          ]
        },
        {
          $or: [
            { endDate: { $exists: false } },
            { endDate: null },
            { endDate: { $gte: now } }
          ]
        }
      ]
    }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: {
        offers: offers.map((offer) => ({ ...offer, _id: String(offer._id) }))
      }
    });
  } catch (error) {
    console.error("Get offers error:", error);
    return NextResponse.json({ success: false, message: "Unable to load offers." }, { status: 500 });
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
    const discount = typeof body.discount === "string" ? body.discount.trim() : "";
    const image = typeof body.image === "string" ? body.image : "";
    const startDate = body.startDate ? new Date(body.startDate) : null;
    const endDate = body.endDate ? new Date(body.endDate) : null;
    const isActive = body.isActive !== undefined ? Boolean(body.isActive) : true;

    if (!title || !description || !discount) {
      return NextResponse.json({ success: false, message: "Title, description and discount are required." }, { status: 400 });
    }

    await connectDB();
    const offer = await Offer.create({ title, description, discount, image, startDate, endDate, isActive });

    return NextResponse.json({ success: true, data: { offer }, message: "Offer created." }, { status: 201 });
  } catch (error) {
    console.error("Create offer error:", error);
    return NextResponse.json({ success: false, message: "Unable to create offer." }, { status: 500 });
  }
}
