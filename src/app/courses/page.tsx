import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CourseCard } from "@/components/CourseCard";
import { MotionSection } from "@/components/MotionSection";
import { benefits, internshipBenefits } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore CODELOGIX Solutions courses with practical learning, certificates, and internship eligibility.",
  alternates: { canonical: "/courses" },
};

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <PageHero
        eyebrow="Courses"
        title="Practical programs with clear outcomes"
        text="Every course includes real projects, mentorship, completion certification, and eligibility for a free internship at CODELOGIX Solutions after successful completion."
        actions={[
          { label: "Apply Now", href: "/apply" },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
      />
      <MotionSection className="section-shell section-gap grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => <CourseCard key={course.id} course={course} />)}
      </MotionSection>
      <MotionSection className="section-shell section-gap grid gap-6 lg:grid-cols-2">
        <div className="surface-card rounded-[1.5rem] p-6">
          <h2 className="text-2xl font-black text-[#1c2b47]">Student Benefits</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-7 text-[#4b5b74]">
            {benefits.map((benefit) => <li key={benefit}>• {benefit}</li>)}
          </ul>
        </div>
        <div className="surface-card rounded-[1.5rem] p-6">
          <h2 className="text-2xl font-black text-[#1c2b47]">Free Internship Opportunity</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-7 text-[#4b5b74]">
            {internshipBenefits.map((benefit) => <li key={benefit}>• {benefit}</li>)}
          </ul>
          <p className="mt-5 rounded-[1rem] bg-[#eef3f9] p-4 text-sm font-bold text-[#1c2b47]">
            Top performers may be featured on the official CODELOGIX Solutions LinkedIn page and leadership profiles.
          </p>
        </div>
      </MotionSection>
    </div>
  );
}
