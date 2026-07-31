import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CODELOGIX Solutions, mission, vision, and student-first practical technology training.",
  alternates: { canonical: "/about" },
};

const sections = [
  ["Who We Are", "CODELOGIX Solutions is a modern technology learning and services company focused on practical training, digital products, and career-ready student outcomes."],
  ["Our Mission", "To make professional technology education accessible, structured, and directly connected to real-world projects and mentorship."],
  ["Our Vision", "To become a trusted learning and innovation platform for students and early professionals across Pakistan and international markets."],
  ["What We Do", "We provide online courses, web development, AI solutions, graphic design services, and tech training programs supported by admission and verification systems."],
  ["Why Students Choose Us", "Students choose CODELOGIX Solutions for practical sessions, affordable fees, certificates, internship eligibility, and responsive learning support."],
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        title="Practical learning with professional systems"
        text="CODELOGIX Solutions blends instruction, mentorship, and career-focused delivery so students can build real skills with clarity and structure."
        actions={[
          { label: "Explore Courses", href: "/courses" },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
      />
      <MotionSection className="section-shell section-gap grid gap-5 md:grid-cols-2">
        {sections.map(([title, text]) => (
          <article key={title} className="surface-card rounded-[1.5rem] p-6">
            <h2 className="text-2xl font-black text-[#1c2b47]">{title}</h2>
            <p className="mt-4 leading-8 text-[#4b5b74]">{text}</p>
          </article>
        ))}
      </MotionSection>
    </div>
  );
}
