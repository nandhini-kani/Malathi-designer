import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { isMongoObjectId } from "@/lib/ids";
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

    if (!isMongoObjectId(id)) {
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

    const enquiryDoc = await Enquiry.findById(id);

    if (!enquiryDoc) {
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

    const enquiry = enquiryDoc.toObject();

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isMongoObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid enquiry ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validStatuses = ["new", "contacted", "completed"] as const;

    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, message: "A valid enquiry status is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    enquiry.status = body.status;
    await enquiry.save();

    return NextResponse.json({
      success: true,
      data: {
        enquiry: {
          ...enquiry.toObject(),
          _id: String(enquiry._id),
        },
      },
      message: "Enquiry status updated.",
    });
  } catch (error) {
    console.error("Update enquiry error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update enquiry." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isMongoObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid enquiry ID." },
        { status: 400 }
      );
    }

    await connectDB();

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    await enquiry.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete enquiry." },
      { status: 500 }
    );
  }
}