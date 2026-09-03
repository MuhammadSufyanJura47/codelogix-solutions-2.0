"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/teachers", label: "Teachers" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/80 backdrop-blur-xl">
      {/* <div className="sale-marquee bg-[#0b6b3a] text-white">
        <div className="sale-marquee-track py-2 text-sm font-black uppercase tracking-[0.12em]">
          <span>🇵🇰 Azadi Sale is live: special course discounts available till 14 August 2026.</span>
          <span>🇵🇰 Azadi Sale is live: special course discounts available till 14 August 2026.</span>
          <span>🇵🇰 Azadi Sale is live: special course discounts available till 14 August 2026.</span>
        </div>
      </div> */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                pathname === item.href ? "bg-[#e8f0fb] text-[#1f5fa6] shadow-sm" : "text-[#41516b] hover:bg-[#f7f9fc] hover:text-[#1f5fa6]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Link href="/admin/login" className="btn-secondary px-4 py-2 text-sm">
            Admin
          </Link>
          <Link href="/apply" className="btn-primary px-5 py-2.5">
            Apply Now
          </Link>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-[#d6dfeb] bg-white text-[#1c2b47] shadow-sm transition hover:-translate-y-0.5 hover:border-[#b7cae3] hover:text-[#1f5fa6] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[#d6dfeb] bg-white/95 px-4 py-4 shadow-[0_20px_40px_rgba(28,43,71,0.1)] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${pathname === item.href ? "bg-[#e8f0fb] text-[#1f5fa6]" : "text-[#1c2b47] hover:bg-[#f7f9fc]"}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/admin/login" className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#1c2b47] hover:bg-[#f7f9fc]" onClick={() => setOpen(false)}>
              Admin Login
            </Link>
            <Link href="/apply" className="btn-primary mt-2 justify-center" onClick={() => setOpen(false)}>
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
