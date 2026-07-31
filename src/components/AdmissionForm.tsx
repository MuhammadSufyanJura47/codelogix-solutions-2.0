"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { internationalPayment, pakistaniPayment } from "@/lib/data";

type StudentType = "PAKISTANI" | "INTERNATIONAL";

type CourseOption = {
  title: string;
  pricePKR: number;
  priceUSD: number;
};

const emptyForm = {
  fullName: "",
  fatherName: "",
  phone: "",
  email: "",
  linkedin: "",
  selectedCourse: "",
  semesterClass: "",
  department: "",
  university: "",
  city: "",
  country: "",
  profilePictureLink: "",
  paymentProofLink: "",
  acknowledgement: false,
};

export function AdmissionForm({ courses }: { courses: CourseOption[] }) {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get("course") || "";
  const [studentType, setStudentType] = useState<StudentType | null>(null);
  const [form, setForm] = useState({ ...emptyForm, selectedCourse: initialCourse });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const selectedCourseData = useMemo(
    () => courses.find((course) => course.title === form.selectedCourse),
    [courses, form.selectedCourse],
  );

  const fee = selectedCourseData && studentType ? (studentType === "PAKISTANI" ? selectedCourseData.pricePKR : selectedCourseData.priceUSD) : 0;
  const currency = studentType === "PAKISTANI" ? "PKR" : "USD";
  const payment = studentType === "PAKISTANI" ? pakistaniPayment : internationalPayment;

  function update(name: string, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, studentType }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setStatus("error");
      setMessage(payload.error || "Application could not be submitted.");
      return;
    }

    setStatus("success");
    setMessage("Application submitted. Your payment status is pending verification.");
    setForm({ ...emptyForm, selectedCourse: "" });
  }

  if (!studentType) {
    return (
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <aside className="surface-card rounded-[1.75rem] p-6">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#1f5fa6]">Choose Student Type</p>
          <h2 className="mt-3 text-3xl font-black text-[#1c2b47]">Before applying, tell us which admission track you need.</h2>
          <p className="mt-4 text-sm leading-7 text-[#4b5b74]">
            Pakistani applicants see PKR fees and local payment guidance. International applicants see USD fees and the international payment path.
          </p>
          <div className="mt-6 grid gap-3">
            {([
              { type: "PAKISTANI", title: "Pakistani Student", description: "PKR fee structure and local payment instructions." },
              { type: "INTERNATIONAL", title: "International Student", description: "USD fee structure and international payment instructions." },
            ] as const).map((option) => (
              <button
                key={option.type}
                type="button"
                onClick={() => setStudentType(option.type)}
                className="rounded-[1.25rem] border border-[#d6dfeb] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#1f5fa6] hover:shadow-lg"
              >
                <p className="text-base font-black text-[#1c2b47]">{option.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#4b5b74]">{option.description}</p>
              </button>
            ))}
          </div>
        </aside>
        <div className="surface-card relative overflow-hidden rounded-[1.75rem]">
          <Image src="/images/apply-hero.jpg" alt="Students preparing an admission form" width={1400} height={1000} className="h-full w-full object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="space-y-5">
        <div className="surface-card rounded-[1.5rem] p-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0864DD]">Student Type</p>
          <div className="mt-4 grid gap-3">
            {(["PAKISTANI", "INTERNATIONAL"] as StudentType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setStudentType(type)}
                className={`rounded-lg border px-4 py-3 text-left font-bold transition ${
                  studentType === type
                    ? "border-[#1f5fa6] bg-[#e8f0fb] text-[#1f5fa6]"
                    : "border-[#d6dfeb] bg-white text-[#1c2b47]"
                }`}
              >
                {type === "PAKISTANI" ? "Pakistani Student" : "International Student"}
              </button>
            ))}
          </div>
        </div>
        <div className="surface-card rounded-[1.5rem] p-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0864DD]">Course Fee</p>
          <p className="mt-3 text-3xl font-black text-[#1c2b47]">
            {fee && studentType ? `${currency} ${fee.toLocaleString()}` : "Select a course"}
          </p>
          <div className="mt-5 space-y-2 text-sm leading-6 text-[#4b5b74]">
            <p><strong>Account Title:</strong> {payment.accountTitle}</p>
            <p><strong>Account Number:</strong> {payment.accountNumber}</p>
            <p><strong>Bank / Wallet:</strong> {payment.bank}</p>
            <p>{payment.instructions}</p>
          </div>
        </div>
      </aside>

      <form onSubmit={submit} className="surface-card rounded-[1.75rem] p-5 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full Name" name="fullName" value={form.fullName} onChange={update} />
          <Input label="Father's Name" name="fatherName" value={form.fatherName} onChange={update} />
          <Input label="Phone Number" name="phone" value={form.phone} onChange={update} />
          <Input label="Email Address" name="email" value={form.email} onChange={update} type="email" />
          <Input label="LinkedIn Profile" name="linkedin" value={form.linkedin} onChange={update} />
          <label className="field-label">
            Selected Course
            <select
              className="field-input"
              value={form.selectedCourse}
              onChange={(event) => update("selectedCourse", event.target.value)}
              required
            >
              <option value="">Choose a course</option>
              {courses.map((course) => (
                <option key={course.title} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
          <Input label="Semester / Class" name="semesterClass" value={form.semesterClass} onChange={update} />
          <Input label="Department" name="department" value={form.department} onChange={update} />
          <Input label="University / Institute" name="university" value={form.university} onChange={update} />
          {studentType === "PAKISTANI" ? (
            <Input label="City" name="city" value={form.city} onChange={update} />
          ) : (
            <Input label="Country" name="country" value={form.country} onChange={update} />
          )}
          <Input label="Google Drive Link (Profile Picture)" name="profilePictureLink" value={form.profilePictureLink} onChange={update} />
          <Input label="Google Drive Link (Payment Proof)" name="paymentProofLink" value={form.paymentProofLink} onChange={update} />
        </div>
        <label className="mt-5 flex gap-3 rounded-[1rem] border border-[#d6dfeb] bg-[#f7f9fc] p-4 text-sm leading-6 text-[#4b5b74]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            checked={form.acknowledgement}
            onChange={(event) => update("acknowledgement", event.target.checked)}
            required
          />
          I confirm that all submitted information is correct and both Google Drive links are publicly accessible.
        </label>
        {message && (
          <div className={`mt-5 rounded-[1rem] p-4 text-sm font-semibold ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message}
          </div>
        )}
        <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 w-full justify-center">
          {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
          Submit Application
        </button>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <label className="field-label">
      {label}
      <input className="field-input" type={type} value={value} onChange={(event) => onChange(name, event.target.value)} required />
    </label>
  );
}
