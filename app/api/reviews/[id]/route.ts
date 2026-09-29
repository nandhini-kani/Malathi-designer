import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { isMongoObjectId } from "@/lib/ids";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function DELETE(
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
          message: "Review ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const review = await Review.findById(id);

    if (!review) {
      return NextResponse.json(
        {
          success: false,
          message: "Review not found.",
        },
        {
          status: 404,
        }
      );
    }

    await review.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete review.",
      },
      {
        status: 500,
      }
    );
  }
}