import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CourseCard } from "@/components/CourseCard";
import { MotionSection } from "@/components/MotionSection";
import { SectionHeader } from "@/components/SectionHeader";
import { prisma } from "@/lib/prisma";
import { services, team, whyChooseUs } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <section className="section-shell min-h-[100svh] py-10 lg:py-16">
        <div className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden rounded-[2rem] px-0">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="hero-grid-overlay" aria-hidden="true" />
          <MotionSection className="relative max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#1f5fa6]">Premium tech education and solutions</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tight text-[#1c2b47] sm:text-6xl lg:text-7xl">
              CODELOGIX Solutions
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-[#4b5b74]">
              Practical courses, AI solutions, design services, and verified internship pathways for learners ready to build professional portfolios.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/courses" className="btn-primary">
                Explore Courses <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </MotionSection>
        </div>
      </section>

      <MotionSection className="section-shell section-gap">
        <SectionHeader
          eyebrow="Who we are"
          title="A practical technology learning and solutions company"
          text="CODELOGIX Solutions combines hands-on instruction, real-world projects, and professional verification workflows so students can move from learning to portfolio-building with confidence."
        />
      </MotionSection>

      <MotionSection className="section-gap">
        <div className="section-shell">
          <SectionHeader eyebrow="Services" title="Built around modern digital skills" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="surface-card rounded-[1.4rem] p-5">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#e8f0fb] text-[#1f5fa6]">
                    <Icon size={23} />
                  </div>
                  <h3 className="font-black text-[#1c2b47]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4b5b74]">{service.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-shell section-gap">
        <SectionHeader eyebrow="Featured Courses" title="Start with a focused learning path" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
        <div className="mt-10 text-center">
          <Link href="/courses" className="btn-primary">View All Courses</Link>
        </div>
      </MotionSection>

      <MotionSection className="section-gap">
        <div className="section-shell">
          <SectionHeader eyebrow="Why choose us" title="Designed for applied learning" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="surface-card rounded-[1.4rem] p-5 text-center">
                  <Icon className="mx-auto text-[#1f5fa6]" size={28} />
                  <h3 className="mt-4 font-black text-[#1c2b47]">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-shell section-gap">
        <SectionHeader eyebrow="Leadership" title="Founder preview" />
        <div className="grid gap-6 md:grid-cols-2">
          {team.map((member) => (
            <article key={member.name} className="grid gap-5 surface-card rounded-[1.5rem] p-5 sm:grid-cols-[160px_1fr]">
              <div className="profile-photo-frame profile-photo-frame--compact">
                <Image src={member.image} alt={member.name} width={320} height={360} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1c2b47]">{member.name}</h3>
                <p className="mt-1 font-bold text-[#1f5fa6]">{member.role}</p>
                <p className="mt-4 text-sm leading-7 text-[#4b5b74]">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </MotionSection>

      <section className="section-gap bg-[#1f5fa6] text-white">
        <div className="section-shell flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-black">Start your learning journey today.</h2>
            <p className="mt-3 max-w-2xl text-slate-100">Choose a course, submit your admission form, and join a practical path toward skill development and internship eligibility.</p>
          </div>
          <Link href="/apply" className="btn-secondary border-white/20 bg-white text-[#1f5fa6] hover:text-[#184b83]">Apply Now</Link>
        </div>
      </section>
    </>
  );
}
