import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Admission, fee verification, refund, certificate, and student responsibility terms.",
  alternates: { canonical: "/terms" },
};

const items = [
  ["Admission rules", "One application is required per course. Students applying for additional courses must submit a separate form."],
  ["Fee verification policy", "All applications begin as pending verification. Only verified payment proof changes an application to verified status."],
  ["Fake payment proof policy", "Fake, edited, inaccessible, or mismatched payment proof may result in rejection and removal from the admission process."],
  ["Refund policy", "Refund handling depends on the announced course policy and the timing of the request before or after class access begins."],
  ["Student responsibilities", "Students must provide accurate information, valid links, accessible payment proof, and respectful communication."],
  ["Certificate policy", "Course and internship certificates are issued after successful completion and internal verification of course requirements."],
];

export default function TermsPage() {
  return (
    <div className="section-shell py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black text-[#24365E]">Terms & Conditions</h1>
        <div className="mt-8 space-y-5">
          {items.map(([heading, text]) => (
            <section key={heading} className="rounded-lg border border-[#D4DBEA] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#24365E]">{heading}</h2>
              <p className="mt-3 leading-8 text-[#374151]">{text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
