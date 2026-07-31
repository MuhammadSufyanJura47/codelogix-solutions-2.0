import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { applicationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid application data" }, { status: 400 });
  }

  const data = parsed.data;
  const course = await prisma.course.findFirst({ where: { title: data.selectedCourse } });
  if (!course) {
    return NextResponse.json({ error: "Selected course is not available" }, { status: 400 });
  }

  try {
    const created = await prisma.application.create({
      data: {
        studentType: data.studentType,
        fullName: data.fullName,
        fatherName: data.fatherName,
        phone: data.phone,
        email: data.email,
        linkedin: data.linkedin,
        selectedCourse: data.selectedCourse,
        semesterClass: data.semesterClass,
        department: data.department,
        university: data.university,
        city: data.studentType === "PAKISTANI" ? data.city : null,
        country: data.studentType === "INTERNATIONAL" ? data.country : null,
        profilePictureLink: data.profilePictureLink,
        paymentProofLink: data.paymentProofLink,
        feeAmount: data.studentType === "PAKISTANI" ? course.pricePKR : course.priceUSD,
        currency: data.studentType === "PAKISTANI" ? "PKR" : "USD",
      },
    });

    return NextResponse.json({ id: created.id, status: created.verificationStatus }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "One application per course is allowed for each email." }, { status: 409 });
    }
    return NextResponse.json({ error: "Application could not be saved." }, { status: 500 });
  }
}
