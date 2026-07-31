import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { teacherSchema } from "@/lib/validation";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const teacherId = Number(id);
  if (!Number.isInteger(teacherId) || teacherId < 1) {
    return NextResponse.json({ error: "Invalid teacher id" }, { status: 400 });
  }

  const parsed = teacherSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid teacher data" }, { status: 400 });
  }

  try {
    const updated = await prisma.teacher.update({
      where: { id: teacherId },
      data: parsed.data,
    });
    revalidatePath("/");
    revalidatePath("/teachers");

    return NextResponse.json(updated);
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Teacher could not be updated." }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const teacherId = Number(id);
  if (!Number.isInteger(teacherId) || teacherId < 1) {
    return NextResponse.json({ error: "Invalid teacher id" }, { status: 400 });
  }

  try {
    await prisma.teacher.delete({ where: { id: teacherId } });
    revalidatePath("/");
    revalidatePath("/teachers");

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Teacher could not be deleted." }, { status: 500 });
  }
}
