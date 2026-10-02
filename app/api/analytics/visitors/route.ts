import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

export async function GET() {
  try {
    await connectDB();

    const visitors = await Visitor.find({})
      .sort({ lastVisit: -1 })
      .limit(100)
      .lean();

    return NextResponse.json({
      success: true,
      data: visitors.map((visitor) => ({
        visitorId: visitor.visitorId,
        firstVisit: visitor.firstVisit,
        lastVisit: visitor.lastVisit,
        visitCount: visitor.visitCount,
        pagesViewed: visitor.pagesViewed || [],
        device: visitor.device || "Unknown",
        browser: visitor.browser || "Unknown",
        os: visitor.os || "Unknown",
        location: visitor.location || {
          city: "Unknown",
          region: "Unknown",
          country: "Unknown",
        },
      })),
    });
  } catch (error) {
    console.error("Visitors API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load visitor details.",
      },
      { status: 500 }
    );
  }
}