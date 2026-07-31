import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid contact data" }, { status: 400 });
  }

  const message = await prisma.contactmessage.create({ data: parsed.data });

  if (process.env.FORMSPREE_ENDPOINT) {
    await fetch(process.env.FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    }).catch(() => null);
  }

  return NextResponse.json({ id: message.id }, { status: 201 });
}
