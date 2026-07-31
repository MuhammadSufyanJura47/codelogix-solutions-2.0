import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact CODELOGIX Solutions for courses, admissions, services, and support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Talk to CODELOGIX Solutions"
        text="Get in touch for course guidance, admissions help, and service inquiries. We respond with a practical next step, not a generic reply."
        actions={[
          { label: "Apply Now", href: "/apply" },
          { label: "View Courses", href: "/courses", variant: "secondary" },
        ]}
      />
      <div className="section-shell section-gap grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-4">
          <Info icon={<Mail size={20} />} title="Email" text={siteConfig.email} />
          <Info icon={<Phone size={20} />} title="Phone" text={siteConfig.phone} />
          <Info icon={<MapPin size={20} />} title="Location" text="Online-first training for Pakistani and International students" />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="surface-card rounded-[1.5rem] p-5">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-[#e8f0fb] text-[#1f5fa6]">{icon}</div>
      <h2 className="font-black text-[#1c2b47]">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-[#4b5b74]">{text}</p>
    </div>
  );
}
