import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="CODELOGIX Solutions home">
      <Image src="/codelogix-logo.png" alt="CODELOGIX Solutions" width={52} height={52} className="h-12 w-12 shrink-0 object-contain" priority />
      <span className="leading-tight">
        <span className="block text-base font-black text-[#24365E]">CODELOGIX</span>
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#5B95E6]">
          Solutions
        </span>
      </span>
    </Link>
  );
}
