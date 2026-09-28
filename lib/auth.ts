import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const COOKIE_NAME = "malathi_admin_token";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || process.env.AUTH_SECRET || "malathi-designer-dev-secret"
);

export async function createAuthToken(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function getAuthUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return typeof payload.userId === "string" ? payload.userId : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const userId = await getAuthUserId();

  if (!userId) {
    return null;
  }

  await connectDB();

  const user = await User.findById(userId).select("-password").lean();
  return user ? { ...user, _id: String(user._id) } : null;
}

export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || "admin@malathidesigner.in",
  password: process.env.ADMIN_PASSWORD || "Admin12345!"
};
