"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error || "Invalid admin credentials.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="surface-card mx-auto w-full max-w-md rounded-[1.9rem] p-6 shadow-[0_24px_55px_rgba(28,43,71,0.12)] sm:p-7">
      <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-[#e8f0fb] text-[#1f5fa6] shadow-sm">
        <LockKeyhole size={25} />
      </div>
      <h1 className="text-3xl font-black tracking-tight text-[#14213d]">Admin Login</h1>
      <p className="mt-2 text-sm leading-6 text-[#4b5b74]">Access applications, contact messages, verification status, course management, and revenue analytics.</p>
      <label className="field-label mt-6">
        Email
        <input className="field-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <label className="field-label mt-4">
        Password
        <input className="field-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </label>
      {error && <p className="mt-4 rounded-[1rem] bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full justify-center">
        {loading ? <Loader2 className="animate-spin" size={18} /> : <LockKeyhole size={18} />} Sign In
      </button>
    </form>
  );
}
