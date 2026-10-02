
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Visit from "@/models/Visit";
import { connectDB } from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

function getDevice(userAgent: string) {
  if (/tablet|ipad/i.test(userAgent)) {
    return "Tablet";
  }

  if (/mobile|android|iphone|ipod/i.test(userAgent)) {
    return "Mobile";
  }

  return "Desktop";
}

function getBrowser(userAgent: string) {
  if (/edg/i.test(userAgent)) {
    return "Edge";
  }

  if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) {
    return "Chrome";
  }

  if (/firefox/i.test(userAgent)) {
    return "Firefox";
  }

  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
    return "Safari";
  }

  if (/opera|opr/i.test(userAgent)) {
    return "Opera";
  }

  return "Unknown";
}

function getOS(userAgent: string) {
  if (/windows/i.test(userAgent)) {
    return "Windows";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return "iOS";
  }

  if (/macintosh|mac os/i.test(userAgent)) {
    return "macOS";
  }

  if (/linux/i.test(userAgent)) {
    return "Linux";
  }

  return "Unknown";
}

function getClientIp(request: NextRequest) {
  const forwardedFor =
    request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return (
    request.headers.get("x-real-ip") ||
    ""
  );
}

async function getLocation(ip: string) {
  try {
    if (
      !ip ||
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.")
    ) {
      return {
        city: "Local",
        region: "",
        country: "Local",
      };
    }

    const response = await fetch(
      `https://ipapi.co/${ip}/json/`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        city: "Unknown",
        region: "Unknown",
        country: "Unknown",
      };
    }

    const data = await response.json();

    return {
      city: data.city || "Unknown",
      region: data.region || "Unknown",
      country: data.country_name || "Unknown",
    };
  } catch (error) {
    console.error(
      "Visitor location error:",
      error
    );

    return {
      city: "Unknown",
      region: "Unknown",
      country: "Unknown",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const page =
      typeof body.page === "string"
        ? body.page
        : "/";

    let visitorId =
      request.cookies.get("visitor_id")?.value;

    const isNewVisitor = !visitorId;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
    }

    const userAgent =
      request.headers.get("user-agent") || "";

    const device = getDevice(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    let visitor = await Visitor.findOne({
      visitorId,
    });

    if (!visitor) {
      const ip = getClientIp(request);

      const location = await getLocation(ip);

      visitor = await Visitor.create({
        visitorId,
        firstVisit: new Date(),
        lastVisit: new Date(),
        visitCount: 1,
        pagesViewed: [page],
        device,
        browser,
        os,
        location,
      });
    } else {
      visitor.lastVisit = new Date();

      visitor.visitCount += 1;

      if (!visitor.pagesViewed.includes(page)) {
        visitor.pagesViewed.push(page);
      }

      await visitor.save();
    }

    const response = NextResponse.json({
      success: true,
      visitorId,
      newVisitor: isNewVisitor,
    });

    response.cookies.set(
      "visitor_id",
      visitorId,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Visitor tracking error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to track visitor.",
      },
      {
        status: 500,
      }
    );
  }
}

