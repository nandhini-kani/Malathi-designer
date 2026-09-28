
import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================================================
   GET SINGLE GALLERY ITEM
   ========================================================= */

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    await connectDB();

    const item = await Gallery.findById(id).lean();

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery item not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        item: {
          ...item,
          _id: String(item._id),
        },
      },
    });
  } catch (error) {
    console.error(
      "Get gallery item error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load gallery item.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   UPDATE GALLERY ITEM
   ========================================================= */

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    /* -----------------------------
       CHECK ADMIN
    ----------------------------- */

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

    /* -----------------------------
       GET ID
    ----------------------------- */

    const { id } = await params;

    /* -----------------------------
       READ BODY
    ----------------------------- */

    const body = await request.json();

    /* -----------------------------
       CONNECT DATABASE
    ----------------------------- */

    await connectDB();

    /* -----------------------------
       FIND GALLERY ITEM
    ----------------------------- */

    const item = await Gallery.findById(id);

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gallery item not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* -----------------------------
       UPDATE FIELDS
    ----------------------------- */

    if (typeof body.title === "string") {
      const title = body.title.trim();

      if (!title) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Gallery title is required.",
          },
          {
            status: 400,
          }
        );
      }

      item.title = title;
    }

    if (
      typeof body.description ===
      "string"
    ) {
      item.description =
        body.description;
    }

    if (
      typeof body.category === "string"
    ) {
      item.category = body.category;
    }

    if (
      typeof body.imageUrl === "string"
    ) {
      item.imageUrl =
        body.imageUrl;
    }

    if (
      typeof body.publicId === "string"
    ) {
      item.publicId =
        body.publicId;
    }

    if (
      body.isActive !== undefined
    ) {
      item.isActive =
        Boolean(body.isActive);
    }

    /* -----------------------------
       SAVE
    ----------------------------- */

    await item.save();

    /* -----------------------------
       RESPONSE
    ----------------------------- */

    return NextResponse.json({
      success: true,
      message:
        "Gallery item updated successfully.",
      data: {
        item: {
          ...item.toObject(),
          _id: String(item._id),
        },
      },
    });
  } catch (error) {
    console.error(
      "Update gallery item error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update gallery item.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE GALLERY ITEM
   ========================================================= */

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    /* -----------------------------
       CHECK ADMIN
    ----------------------------- */

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

    /* -----------------------------
       GET ID
    ----------------------------- */

    const { id } = await params;

    /* -----------------------------
       CONNECT DATABASE
    ----------------------------- */

    await connectDB();

    /* -----------------------------
       FIND ITEM
    ----------------------------- */

    const item = await Gallery.findById(id);

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gallery item not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* -----------------------------
       DELETE CLOUDINARY IMAGE
    ----------------------------- */

    if (item.publicId) {
      try {
        await cloudinary.uploader.destroy(
          item.publicId
        );
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary delete error:",
          cloudinaryError
        );

        // Continue deleting database record.
      }
    }

    /* -----------------------------
       DELETE DATABASE ITEM
    ----------------------------- */

    await item.deleteOne();

    return NextResponse.json({
      success: true,
      message:
        "Gallery item deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete gallery item error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to delete gallery item.",
      },
      {
        status: 500,
      }
    );
  }
}