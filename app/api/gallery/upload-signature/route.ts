import { NextResponse } from "next/server";

import cloudinary, { cloudinaryFolder } from "@/lib/cloudinary";

export async function POST() {
  try {
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ success: false, message: "Cloudinary configuration is missing." }, { status: 500 });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const params = {
      timestamp,
      folder: cloudinaryFolder
    };

    const signature = cloudinary.utils.api_sign_request(params, apiSecret);

    return NextResponse.json({
      success: true,
      data: {
        cloudName,
        apiKey,
        timestamp,
        signature,
        folder: cloudinaryFolder
      }
    });
  } catch (error) {
    console.error("Upload signature error:", error);
    return NextResponse.json({ success: false, message: "Unable to generate upload signature." }, { status: 500 });
  }
}
