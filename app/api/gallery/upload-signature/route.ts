import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST() {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Cloudinary configuration is missing.",
        },
        { status: 500 }
      );
    }

    const timestamp = Math.round(Date.now() / 1000);

    // Gallery images will be stored here
    const folder = "malathi-designer/gallery";

    const params = {
      timestamp,
      folder,
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      apiSecret
    );

    return NextResponse.json({
      success: true,
      data: {
        cloudName,
        apiKey,
        timestamp,
        signature,
        folder,
      },
    });
  } catch (error) {
    console.error("Upload signature error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to generate upload signature.",
      },
      { status: 500 }
    );
  }
}