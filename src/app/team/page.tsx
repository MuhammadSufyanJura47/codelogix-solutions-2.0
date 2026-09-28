import type { Metadata } from "next";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Founders & Team",
  description: "Founder profiles and leadership team for CODELOGIX Solutions - Muhammad Sufyan Jura and Zeeshan Manzoor.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <div>
      <PageHero
        eyebrow="Team"
        title="Founders and leadership"
        text="A compact leadership team focused on delivery, student support, and operational clarity from first inquiry to completion."
        actions={[
          { label: "Contact Us", href: "/contact" },
          { label: "Apply Now", href: "/apply", variant: "secondary" },
        ]}
      />
      <div className="section-shell section-gap mx-auto grid max-w-3xl justify-items-center gap-4 md:grid-cols-2">
        {team.map((member) => (
          <article key={member.name} className="surface-card w-full max-w-[320px] overflow-hidden rounded-[1.25rem]">
            <div className="profile-photo-frame profile-photo-frame--flush team-photo-frame">
              <Image
                src={member.image}
                alt={member.name}
                width={600}
                height={800}
                className="profile-photo-image"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-black text-[#1c2b47]">{member.name}</h2>
              <p className="mt-1 text-sm font-bold text-[#1f5fa6]">{member.role}</p>
              <p className="mt-3 text-sm leading-6 text-[#4b5b74]">{member.bio}</p>
              <div className="mt-4 flex gap-2">
                <a className="btn-secondary px-3 py-2" href={member.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn size={17} /></a>
                <a className="btn-secondary px-3 py-2" href={member.socials.github} aria-label="GitHub"><FaGithub size={17} /></a>
                <a className="btn-secondary px-3 py-2" href={`mailto:${member.socials.email}`} aria-label="Email"><FaEnvelope size={17} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
