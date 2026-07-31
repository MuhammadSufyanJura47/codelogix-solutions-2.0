import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-shell grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0864DD]">404</p>
        <h1 className="mt-3 text-4xl font-black text-[#24365E]">Page not found</h1>
        <p className="mt-4 text-[#374151]">The page you requested is not available.</p>
        <Link href="/" className="btn-primary mt-6">Return Home</Link>
      </div>
    </div>
  );
}
