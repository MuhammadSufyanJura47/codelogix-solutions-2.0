import type { Metadata } from "next";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Teachers & Instructors",
  description: "Meet the CODELOGIX Solutions instructors and mentors.",
  alternates: { canonical: "/teachers" },
};

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <PageHero
        eyebrow="Instructors"
        title="Learn from practical specialists"
        text="Our instructors teach through portfolio work, applied project flows, and modern toolchains that students can use immediately."
        actions={[
          { label: "View Team", href: "/team" },
          { label: "Apply Now", href: "/apply", variant: "secondary" },
        ]}
      />
      <div className="section-shell section-gap grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {teachers.map((teacher) => (
          <article key={teacher.id} className="surface-card overflow-hidden rounded-[1.5rem] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(28,43,71,0.12)]">
            <div className="profile-photo-frame profile-photo-frame--flush">
              <Image src={teacher.image} alt={teacher.name} width={900} height={600} />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-black text-[#1c2b47]">{teacher.name}</h2>
              <p className="mt-1 font-bold text-[#1f5fa6]">{teacher.role}</p>
              <p className="mt-2 text-sm font-semibold text-[#4b5b74]">{teacher.expertise}</p>
              <p className="mt-4 min-h-28 text-sm leading-7 text-[#4b5b74]">{teacher.bio}</p>
              <div className="mt-4 flex gap-2">
                <a href={teacher.linkedin} className="btn-secondary px-3 py-2" aria-label="LinkedIn"><FaLinkedinIn size={17} /></a>
                <a href={teacher.github} className="btn-secondary px-3 py-2" aria-label="GitHub"><FaGithub size={17} /></a>
                <a href={`mailto:${teacher.email}`} className="btn-secondary px-3 py-2" aria-label="Email"><FaEnvelope size={17} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
