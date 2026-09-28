import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { COOKIE_NAME, ADMIN_CREDENTIALS, createAuthToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required." }, { status: 400 });
    }

    await connectDB();

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      const fallbackEmail = (ADMIN_CREDENTIALS.email || "").toLowerCase();
      const fallbackPassword = ADMIN_CREDENTIALS.password || "";

      if (email !== fallbackEmail || password !== fallbackPassword) {
        return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
      }

      const hashedPassword = await bcrypt.hash(fallbackPassword, 10);
      const createdAdmin = await User.create({
        name: "Malathi Designer Admin",
        email: fallbackEmail,
        password: hashedPassword,
        role: "admin"
      });

      const token = await createAuthToken(String(createdAdmin._id));
      const response = NextResponse.json({ success: true, message: "Login successful." }, { status: 200 });

      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7
      });

      return response;
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
    }

    const token = await createAuthToken(String(admin._id));
    const response = NextResponse.json({ success: true, message: "Login successful." }, { status: 200 });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong during login." }, { status: 500 });
  }
}
