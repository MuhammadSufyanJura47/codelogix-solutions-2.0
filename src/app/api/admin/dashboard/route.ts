import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const studentType = searchParams.get("studentType");
  const course = searchParams.get("course");
  const q = searchParams.get("q");

  const where = {
    ...(studentType ? { studentType: studentType as "PAKISTANI" | "INTERNATIONAL" } : {}),
    ...(course ? { selectedCourse: course } : {}),
    ...(q
      ? {
          OR: [
            { fullName: { contains: q } },
            { email: { contains: q } },
            { phone: { contains: q } },
          ],
        }
      : {}),
  };

  const [applications, allApplications, contactMessages, courses, teachers] = await Promise.all([
    prisma.application.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.application.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactmessage.count(),
    prisma.course.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.teacher.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  const verified = allApplications.filter((application) => application.verificationStatus === "VERIFIED");
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const month = new Date(now.getFullYear(), now.getMonth(), 1);
  const sum = (currency: string, from?: Date) =>
    verified
      .filter((application) => application.currency === currency && (!from || application.createdAt >= from))
      .reduce((total, application) => total + application.feeAmount, 0);

  return NextResponse.json({
    stats: {
      totalApplications: allApplications.length,
      pakistaniApplications: allApplications.filter((item) => item.studentType === "PAKISTANI").length,
      internationalApplications: allApplications.filter((item) => item.studentType === "INTERNATIONAL").length,
      pendingApplications: allApplications.filter((item) => item.verificationStatus === "PENDING").length,
      verifiedApplications: verified.length,
      rejectedApplications: allApplications.filter((item) => item.verificationStatus === "REJECTED").length,
      totalCourses: courses.length,
      totalTeachers: teachers.length,
      contactMessages,
    },
    revenue: {
      nationalVerified: verified.filter((item) => item.studentType === "PAKISTANI").length,
      nationalTotalPKR: sum("PKR"),
      internationalVerified: verified.filter((item) => item.studentType === "INTERNATIONAL").length,
      internationalTotalUSD: sum("USD"),
      todayPKR: sum("PKR", today),
      todayUSD: sum("USD", today),
      monthlyPKR: sum("PKR", month),
      monthlyUSD: sum("USD", month),
      overallPKR: sum("PKR"),
      overallUSD: sum("USD"),
    },
    recentVerified: verified.slice(0, 8),
    applications,
    courses,
    teachers,
    courseStats: courses.map((course) => {
      const relatedApplications = allApplications.filter((application) => application.selectedCourse === course.title);
      const verifiedApplications = relatedApplications.filter((application) => application.verificationStatus === "VERIFIED");
      return {
        id: course.id,
        title: course.title,
        totalStudents: relatedApplications.length,
        pakistaniStudents: relatedApplications.filter((application) => application.studentType === "PAKISTANI").length,
        internationalStudents: relatedApplications.filter((application) => application.studentType === "INTERNATIONAL").length,
        revenuePKR: verifiedApplications.filter((application) => application.currency === "PKR").reduce((total, application) => total + application.feeAmount, 0),
        revenueUSD: verifiedApplications.filter((application) => application.currency === "USD").reduce((total, application) => total + application.feeAmount, 0),
      };
    }),
  });
}
