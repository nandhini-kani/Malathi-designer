import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { connectDB } from "@/lib/mongodb";
import { isMongoObjectId } from "@/lib/ids";
import User from "@/models/User";

export const COOKIE_NAME = "malathi_admin_token";

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET || process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be configured with at least 32 characters.");
  }

  return new TextEncoder().encode(secret);
}

export function getBootstrapAdminCredentials() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return null;
  }

  return { email, password };
}

export async function createAuthToken(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAuthSecret());
}

export async function getAuthUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    return typeof payload.userId === "string" ? payload.userId : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const userId = await getAuthUserId();

  if (!userId || !isMongoObjectId(userId)) {
    return null;
  }

  await connectDB();

  const userDoc = await User.findById(userId).select("-password");

  if (!userDoc) {
    return null;
  }

  const user = userDoc.toObject();

  return {
    ...user,
    _id: String(user._id),
  };
}

