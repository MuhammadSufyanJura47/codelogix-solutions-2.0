import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import { Mail, MapPinned, Phone } from "lucide-react";
import Link from "next/link";
import { siteConfig, team } from "@/lib/data";
import { Logo } from "./Logo";

const quickLinks = [
  ["Home", "/"],
  ["Courses", "/courses"],
  ["Apply", "/apply"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Privacy Policy", "/privacy"],
  ["Terms & Conditions", "/terms"],
];

export function Footer() {
  return (
    <footer className="border-t border-[#d6dfeb] bg-[#18263f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div className="space-y-5">
          <div className="surface-card rounded-3xl p-4">
            <Logo />
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-200">
            CODELOGIX Solutions builds practical learning paths, technology services, and internship pathways for students who want market-ready skills.
          </p>
          <div className="flex gap-3">
            <a className="footer-icon" href={siteConfig.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn size={18} /></a>
            <a className="footer-icon" href={siteConfig.socials.instagram} aria-label="Instagram"><FaInstagram size={18} /></a>
            <a className="footer-icon" href={siteConfig.socials.tiktok} aria-label="TikTok"><FaTiktok size={18} /></a>
            <a className="footer-icon" href={siteConfig.socials.github} aria-label="GitHub"><FaGithub size={18} /></a>
            <a className="footer-icon" href={siteConfig.socials.facebook} aria-label="Facebook"><FaFacebookF size={18} /></a>
          </div>
        </div>
        <div>
          <h2 className="footer-title">Quick Links</h2>
          <div className="mt-5 grid gap-3">
            {quickLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm text-slate-200 transition hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="footer-title">Leadership</h2>
          <div className="mt-5 grid gap-4">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                <p className="font-semibold text-white">{member.name}</p>
                <p className="mt-1 text-sm text-slate-200">{member.role}</p>
              </div>
            ))}
          </div>
          <a href={`mailto:${siteConfig.email}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-slate-200">
            <Mail size={17} /> {siteConfig.email}
          </a>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-slate-200">
            <Phone size={17} /> {siteConfig.phone}
          </a>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-200">
            <MapPinned size={16} /> Online-first across Pakistan and international markets
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-300">
        Copyright {new Date().getFullYear()} CODELOGIX Solutions. All rights reserved.
      </div>
    </footer>
  );
}
