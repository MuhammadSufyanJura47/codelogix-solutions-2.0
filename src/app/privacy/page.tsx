import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for CODELOGIX Solutions admissions and contact forms.",
  alternates: { canonical: "/privacy" },
};

const items = [
  ["What data is collected", "Admission forms collect identity, contact, education, course, LinkedIn, profile picture link, and payment proof link details. Contact forms collect name, email, phone, subject, and message."],
  ["Why it is collected", "Data is used to process admissions, verify fee submissions, respond to inquiries, manage student records, and provide support."],
  ["Payment proof links", "Payment screenshots are reviewed only for fee verification. Students must provide public Google Drive links rather than uploading files directly."],
  ["Contact submissions", "Contact messages are stored for inquiry management and may optionally be forwarded through Formspree when configured."],
  ["Privacy protection", "Sensitive routes are protected, passwords are hashed, and database access is handled through Prisma with environment-managed secrets."],
];

export default function PrivacyPage() {
  return <Policy title="Privacy Policy" items={items} />;
}

function Policy({ title, items }: { title: string; items: string[][] }) {
  return (
    <div className="section-shell py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black text-[#24365E]">{title}</h1>
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
