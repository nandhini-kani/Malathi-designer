import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { isMongoObjectId } from "@/lib/ids";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isMongoObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid service ID." }, { status: 400 });
    }

    await connectDB();

    const serviceDoc = await Service.findById(id);

    if (!serviceDoc) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found.",
        },
        {
          status: 404,
        }
      );
    }

    const service = serviceDoc.toObject();

    return NextResponse.json({
      success: true,
      data: {
        service: {
          ...service,
          _id: String(service._id),
        },
      },
    });
  } catch (error) {
    console.error("Get service by id error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load service.",
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
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;

    if (!isMongoObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid service ID." }, { status: 400 });
    }

    const body = await request.json();

    await connectDB();
    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found." }, { status: 404 });
    }

    service.title = typeof body.title === "string" ? body.title.trim() : service.title;
    service.description = typeof body.description === "string" ? body.description.trim() : service.description;
    service.image = typeof body.image === "string" ? body.image : service.image;
    service.price = body.price !== undefined ? body.price : service.price;
    service.isActive = body.isActive !== undefined ? Boolean(body.isActive) : service.isActive;
    service.sortOrder = Number(body.sortOrder ?? service.sortOrder);

    await service.save();

    return NextResponse.json({ success: true, data: { service }, message: "Service updated." });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json({ success: false, message: "Unable to update service." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;

    if (!isMongoObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid service ID." }, { status: 400 });
    }

    await connectDB();
    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found." }, { status: 404 });
    }

    await service.deleteOne();

    return NextResponse.json({ success: true, message: "Service deleted." });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json({ success: false, message: "Unable to delete service." }, { status: 500 });
  }
}
