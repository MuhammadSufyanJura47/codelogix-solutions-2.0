import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure admin login for CODELOGIX Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="section-shell section-gap">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#1f5fa6]">Admin access</p>
          <h1 className="max-w-xl text-4xl font-black tracking-tight text-[#14213d] sm:text-5xl">Secure dashboard access for the CODELOGIX team</h1>
          <p className="max-w-xl text-base leading-8 text-[#4b5b74] sm:text-lg">
            Sign in to manage admissions, course content, and operational reporting from a focused control surface.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <InfoCard title="Fast review" text="Handle applications and verification status without distraction." />
            <InfoCard title="Course control" text="Create, edit, and remove course offerings from one place." />
            <InfoCard title="Clean workflow" text="Designed as a professional admin space, not a marketing page." />
          </div>
        </div>
        <div className="grid place-items-center">
        <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="surface-card rounded-[1.4rem] p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(28,43,71,0.1)]">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#1f5fa6]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#4b5b74]">{text}</p>
    </article>
  );
}
