import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import BusinessSettings from "@/models/BusinessSettings";

export async function GET() {
  try {
    await connectDB();

    const settingsDoc = await BusinessSettings.findOne({});

    if (!settingsDoc) {
      const created = await BusinessSettings.create({
        businessName: "Malathi Designer",
        description:
          "Malathi Designer offers ladies tailoring, custom dress stitching and neat finishing for everyday comfort and confident styling in Namakkal.",
        phone: "+91 82487 44594",
        whatsapp: "+91 82487 44594",
        email: "malathidesigner@gmail.com",
        address:
          "2/43, West St, Kondampatti, Namakkal, Kondamanayakkanpatti, Tamil Nadu 637403",
        instagram: "",
        facebook: "",
        googleBusinessUrl: "",
        openingHours: "Mon-Sat: 9:00 AM - 8:00 PM",
        heroTitle:
          "Beautiful Stitching. Perfect Fit. Made for You.",
        heroSubtitle:
          "Custom tailoring and neat stitching designed around your style, measurements and comfort.",
        aboutText:
          "Malathi Designer provides personalised tailoring with a focus on neat finishing, custom measurements and comfortable fit for women and families in Namakkal.",
      });

      return NextResponse.json({
        success: true,
        data: {
          settings: {
            ...created.toObject(),
            _id: String(created._id),
          },
        },
      });
    }

    const settings = settingsDoc.toObject();

    return NextResponse.json({
      success: true,
      data: {
        settings: {
          ...settings,
          _id: String(settings._id),
        },
      },
    });
  } catch (error) {
    console.error("Get settings error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load business settings.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();

    await connectDB();
    const settings = await BusinessSettings.findOneAndUpdate(
      {},
      {
        businessName: body.businessName || "Malathi Designer",
        description: body.description || "",
        phone: body.phone || "",
        whatsapp: body.whatsapp || "",
        email: body.email || "",
        address: body.address || "",
        instagram: body.instagram || "",
        facebook: body.facebook || "",
        googleBusinessUrl: body.googleBusinessUrl || "",
        openingHours: body.openingHours || "",
        heroTitle: body.heroTitle || "",
        heroSubtitle: body.heroSubtitle || "",
        aboutText: body.aboutText || ""
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: { settings: { ...settings.toObject(), _id: String(settings._id) } }, message: "Settings saved." });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ success: false, message: "Unable to save settings." }, { status: 500 });
  }
}
