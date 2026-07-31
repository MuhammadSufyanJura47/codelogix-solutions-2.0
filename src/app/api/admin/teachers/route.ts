import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { teacherSchema } from "@/lib/validation";

export async function GET() {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teachers = await prisma.teacher.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(teachers);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = teacherSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid teacher data" }, { status: 400 });
  }

  const created = await prisma.teacher.create({ data: parsed.data });
  revalidatePath("/");
  revalidatePath("/teachers");

  return NextResponse.json(created, { status: 201 });
}
