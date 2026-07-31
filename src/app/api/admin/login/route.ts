import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  console.log("Request Body:", body);

  const admin = await prisma.admin.findFirst({
    where: {
      email: body.email,
    },
  });

  console.log("Admin:", admin);

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

  return NextResponse.json({
    success: true,
    message: "Login successful",
  });
}