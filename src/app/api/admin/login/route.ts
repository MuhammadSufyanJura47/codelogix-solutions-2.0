import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authCookie, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();

  const admin = await prisma.admin.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!admin) {
    return NextResponse.json(
      { error: "Admin not found" },
      { status: 401 }
    );
  }

  if (body.password !== admin.password) {
    return NextResponse.json(
      { error: "Password incorrect" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
    message: "Login successful",
  });

  response.cookies.set(authCookie.name, createSessionToken(admin.email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: authCookie.maxAge,
  });

  return response;
}
