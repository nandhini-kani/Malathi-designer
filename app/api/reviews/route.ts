import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find({
      isApproved: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        reviews: reviews.map((review) => ({
          ...review,
          _id: String(review._id),
        })),
      },
    });
  } catch (error) {
    console.error("Get reviews error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load reviews.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const rating = Number(body.rating ?? 5);

    const comment =
      typeof body.comment === "string"
        ? body.comment.trim()
        : "";

    // Validation
    if (
      !name ||
      !comment ||
      Number.isNaN(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, rating and comment are required.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    // Create approved review
    const review = await Review.create({
      name,
      rating,
      comment,

      // IMPORTANT:
      // true = customer review appears immediately
      isApproved: true,
    });

    return NextResponse.json(
      {
        success: true,

        data: {
          review: {
            _id: String(review._id),
            name: review.name,
            rating: review.rating,
            comment: review.comment,
            isApproved: review.isApproved,
          },
        },

        message: "Review submitted successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Create review error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit review.",
      },
      {
        status: 500,
      }
    );
  }
}