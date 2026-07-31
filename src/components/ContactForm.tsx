"use client";

import { Loader2, Send, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error || "Message could not be submitted.");
      return;
    }
    setModal(true);
    setForm(initial);
  }

  return (
    <>
      <form onSubmit={submit} className="surface-card rounded-[1.75rem] p-5 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          {(["name", "email", "phone", "subject"] as const).map((field) => (
            <label key={field} className="field-label">
              {field === "name" ? "Full Name" : field.charAt(0).toUpperCase() + field.slice(1)}
              <input
                className="field-input"
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
                required
              />
            </label>
          ))}
        </div>
        <label className="field-label mt-4">
          Message
          <textarea
            className="field-input min-h-36 resize-y"
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            required
          />
        </label>
        {error && <p className="mt-4 rounded-[1rem] bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full justify-center">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Submit Message
        </button>
      </form>
      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#24365E]/60 p-4 backdrop-blur-sm">
          <div className="surface-card w-full max-w-md rounded-[1.75rem] p-7 text-center">
            <button className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-[#d6dfeb]" onClick={() => setModal(false)} aria-label="Close modal">
              <X size={18} />
            </button>
            <h2 className="mt-3 text-2xl font-black text-[#1c2b47]">Thank you!</h2>
            <p className="mt-3 text-[#4b5b74]">Your message has been submitted successfully.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/" className="btn-secondary justify-center">Go Back</Link>
              <button type="button" className="btn-primary justify-center" onClick={() => setModal(false)}>
                Submit Another Message
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
