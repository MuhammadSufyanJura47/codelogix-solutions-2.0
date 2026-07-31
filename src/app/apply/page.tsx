import type { Metadata } from "next";
import { Suspense } from "react";
import { AdmissionForm } from "@/components/AdmissionForm";
import { PageHero } from "@/components/PageHero";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Course Admission",
  description: "Apply as a Pakistani or International student for CODELOGIX Solutions courses.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <ApplyContent />
  );
}

async function ApplyContent() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <PageHero
        eyebrow="Admission"
        title="Apply for your selected course"
        text="Choose Pakistani or International student admission, complete the required fields, and submit your public Google Drive links for profile picture and payment proof."
        actions={[{ label: "View Courses", href: "/courses" }, { label: "Contact Us", href: "/contact", variant: "secondary" }]}
      />
      <div className="section-shell section-gap">
        <Suspense fallback={<div className="surface-card rounded-[1.5rem] p-8 text-center font-bold text-[#1c2b47]">Loading admission form...</div>}>
          <AdmissionForm courses={courses} />
        </Suspense>
      </div>
    </div>
  );
}
