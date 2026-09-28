import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const enquiry = await Enquiry.findById(id).lean();

    if (!enquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        enquiry: {
          ...enquiry,
          _id: String(enquiry._id),
        },
      },
    });
  } catch (error) {
    console.error("Get enquiry error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load enquiry.",
      },
      {
        status: 500,
      }
    );
  }
}